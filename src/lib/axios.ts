import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { getTokens, setTokens, clearTokens } from "@/lib/auth-tokens";

/* ------------------------------------------------------------------ */
/*  Axios instance — points to admin.operis.vn/api                     */
/* ------------------------------------------------------------------ */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://admin.operis.vn/api",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

/* ------------------------------------------------------------------ */
/*  Request interceptor — attach Bearer token                          */
/* ------------------------------------------------------------------ */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getTokens();
    if (tokens?.token) {
      config.headers.set("Authorization", `Bearer ${tokens.token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ------------------------------------------------------------------ */
/*  Response interceptor — Vietnamese error mapping + token refresh     */
/* ------------------------------------------------------------------ */

interface ApiErrorResponse {
  message?: string;
  error?: string;
  code?: string;
}

const errorViMap: Record<string, string> = {
  "Invalid email or password": "Email hoặc mật khẩu không đúng",
  "Invalid credentials": "Thông tin đăng nhập không đúng",
  "Email already exists": "Email đã được sử dụng",
  "Email already in use": "Email đã được sử dụng",
  "User not found": "Không tìm thấy tài khoản",
  "Account disabled": "Tài khoản đã bị vô hiệu hóa",
  "Account locked": "Tài khoản đã bị khóa",
  "Token expired": "Phiên đăng nhập đã hết hạn",
  "Invalid token": "Phiên đăng nhập không hợp lệ",
  "Unauthorized": "Phiên đăng nhập đã hết hạn",
  "Forbidden": "Bạn không có quyền truy cập",
  "Not found": "Không tìm thấy tài nguyên",
  "Validation error": "Dữ liệu không hợp lệ",
  "Internal server error": "Lỗi hệ thống, vui lòng thử lại sau",
  "Too many requests": "Quá nhiều yêu cầu, vui lòng thử lại sau",
  "Password too short": "Mật khẩu quá ngắn",
  "Password too weak": "Mật khẩu quá yếu",
  "Invalid email format": "Định dạng email không hợp lệ",
  "Missing required fields": "Vui lòng điền đầy đủ thông tin",
  "Insufficient balance": "Số dư không đủ",
  "Deposit not found": "Không tìm thấy đơn nạp tiền",
  "Deposit already cancelled": "Đơn nạp tiền đã bị hủy",
  "Deposit already completed": "Đơn nạp tiền đã hoàn thành",
  "Order not found": "Không tìm thấy đơn hàng",
};

function toVietnamese(msg: string): string {
  if (errorViMap[msg]) return errorViMap[msg];
  const key = Object.keys(errorViMap).find((k) => k.toLowerCase() === msg.toLowerCase());
  return key ? errorViMap[key] : msg;
}

/* ------------------------------------------------------------------ */
/*  Token refresh queue — prevents concurrent refresh calls             */
/* ------------------------------------------------------------------ */

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: Error) => void;
}> = [];

function processQueue(error: Error | null, token: string | null) {
  refreshQueue.forEach((p) => {
    if (error || !token) {
      p.reject(error ?? new Error("Refresh failed"));
    } else {
      p.resolve(token);
    }
  });
  refreshQueue = [];
}

async function refreshAccessToken(): Promise<string> {
  const tokens = getTokens();
  const rt = tokens?.refreshToken;
  if (!rt) {
    console.warn("[api] No refresh token — skipping refresh");
    throw new Error("No refresh token");
  }

  console.log("[api] Attempting token refresh...");
  const { data } = await axios.post(
    `${api.defaults.baseURL}/auth/refresh`,
    { refreshToken: rt },
    { headers: { "Content-Type": "application/json" } },
  );

  const newToken = data.accessToken ?? data.token;
  const newRefresh = data.refreshToken ?? data.refresh_token ?? rt;
  if (!newToken) throw new Error("No token in refresh response");

  console.log("[api] Token refresh successful");
  setTokens(newToken, newRefresh);
  return newToken;
}

/* ------------------------------------------------------------------ */
/*  Response interceptor                                               */
/* ------------------------------------------------------------------ */

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    // Network error
    if (!error.response) {
      console.error("[api] Network error:", error.message);
      return Promise.reject(new Error("Lỗi kết nối mạng. Vui lòng thử lại."));
    }

    const { status, data } = error.response;
    const raw = data?.message || data?.error || error.message || "Đã xảy ra lỗi";
    const message = toVietnamese(raw);

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const requestUrl = originalRequest?.url ?? "";
    const isAuthRoute =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh");

    /* ---------- 401: try refresh token ---------- */
    if (status === 401 && !isAuthRoute && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Another request is already refreshing — wait in queue
        return new Promise<string>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
          return api(originalRequest);
        });
      }

      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);
        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr as Error, null);
        // Refresh failed — clear tokens and redirect to login
        clearTokens();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(new Error("Phiên đăng nhập đã hết hạn"));
      } finally {
        isRefreshing = false;
      }
    }

    /* ---------- Other status codes ---------- */
    switch (status) {
      case 401:
        // Auth routes (login/register) or already retried
        return Promise.reject(new Error(message));
      case 403:
        return Promise.reject(new Error("Bạn không có quyền truy cập."));
      case 404:
        return Promise.reject(new Error("Không tìm thấy tài nguyên."));
      case 422:
        return Promise.reject(new Error(message));
      case 429:
        return Promise.reject(
          new Error("Quá nhiều yêu cầu. Vui lòng thử lại sau."),
        );
      case 500:
      default:
        console.error(`[api] ${status}:`, message);
        return Promise.reject(new Error(message));
    }
  },
);

export default api;
