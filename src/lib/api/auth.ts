import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  tokenBalance: number;
  gatewayUrl: string;
  gatewayToken: string;
  gatewayHooksToken: string | null;
}

export interface LoginResponse {
  user: AuthUser;
}

/* ------------------------------------------------------------------ */
/*  Mapper                                                             */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapUser(raw: any, fallback?: Partial<AuthUser>): AuthUser {
  return {
    id: raw.id ?? raw._id ?? fallback?.id ?? "",
    name: raw.name ?? raw.fullName ?? fallback?.name ?? "",
    email: raw.email ?? fallback?.email ?? "",
    phone: raw.phone ?? raw.phoneNumber ?? raw.phone_number ?? fallback?.phone ?? "",
    address: raw.address ?? fallback?.address ?? "",
    role: raw.role ?? fallback?.role ?? "user",
    tokenBalance: raw.tokenBalance ?? raw.token_balance ?? raw.tokens ?? fallback?.tokenBalance ?? 0,
    gatewayUrl: raw.gatewayUrl ?? raw.gateway_url ?? fallback?.gatewayUrl ?? "",
    gatewayToken: raw.gatewayToken ?? raw.gateway_token ?? fallback?.gatewayToken ?? "",
    gatewayHooksToken: raw.gatewayHooksToken ?? raw.gateway_hooks_token ?? fallback?.gatewayHooksToken ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post("/auth/login", { email, password });
  const raw = data.user ?? data;
  return { user: mapUser(raw, { email }) };
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const { data } = await api.post("/auth/register", payload);
  const raw = data.user ?? data;
  return { user: mapUser(raw, { name: payload.name, email: payload.email }) };
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function fetchMe(fallbackUser?: Partial<AuthUser>): Promise<AuthUser> {
  const { data } = await api.get("/auth/me");
  const raw = data.user ?? data;
  return mapUser(raw, fallbackUser);
}
