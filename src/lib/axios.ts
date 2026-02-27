import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

/* ------------------------------------------------------------------ */
/*  Axios instance — same-origin /api proxied to backend via rewrites  */
/*  Auth via HttpOnly cookies (first-party, no localStorage)           */
/* ------------------------------------------------------------------ */

const api = axios.create({
  baseURL: "/api",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

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
  resolve: () => void;
  reject: (err: Error) => void;
}> = [];

function processQueue(error: Error | null) {
  refreshQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve();
    }
  });
  refreshQueue = [];
}

/** Refresh via HttpOnly cookie — browser sends cookie automatically */
async function refreshAccessToken(): Promise<void> {
  await axios.post("/api/auth/refresh", {}, {
    headers: { "Content-Type": "application/json" },
  });
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
        return new Promise<void>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;
      try {
        await refreshAccessToken();
        processQueue(null);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr as Error);
        // Don't redirect — let zustand auth-store handle session cleanup
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
