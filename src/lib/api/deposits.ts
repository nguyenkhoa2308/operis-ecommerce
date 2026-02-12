import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type   TransactionType = "token" | "order";

export interface PricingTier {
  id: string;
  name: string;
  tokens: number;
  price: number;
  bonus: number;
  popular: boolean;
}

export interface DepositInfo {
  id: string;
  type: TransactionType;
  amount: number;
  tokens: number | undefined;
  status: string;
  qrUrl: string | undefined;
  bankName: string | undefined;
  bankAccount: string | undefined;
  bankAccountName: string | undefined;
  transferContent: string | undefined;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  orderCode: string;
  tokenAmount: number;
  amountVnd: number;
  status: string;
  createdAt: string;
}

export interface DepositDetail {
  id: string;
  type: TransactionType;
  orderCode: string;
  tokenAmount: number;
  amountVnd: number;
  status: string;
  createdAt: string;
  expiresAt: string;
  paymentInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    transferContent: string;
    qrCodeUrl: string;
  } | null;
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDepositInfo(d: any, fallbackAmount?: number): DepositInfo {
  const pi = d.paymentInfo ?? d.payment_info;
  return {
    id: d.id ?? "",
    type: d.type === "order" ? "order" : "token",
    amount: d.amountVnd ?? d.amount_vnd ?? d.amount ?? fallbackAmount ?? 0,
    tokens: d.tokenAmount ?? d.token_amount ?? d.tokens,
    status: d.status ?? "pending",
    qrUrl: pi?.qrCodeUrl ?? pi?.qr_code_url ?? d.qrUrl ?? d.qr_url ?? d.qrCode,
    bankName: pi?.bankName ?? pi?.bank_name ?? d.bankName,
    bankAccount: pi?.accountNumber ?? pi?.account_number ?? d.bankAccount ?? d.accountNumber,
    bankAccountName: pi?.accountName ?? pi?.account_name ?? d.bankAccountName ?? d.accountName,
    transferContent: pi?.transferContent ?? pi?.transfer_content ?? d.transferContent ?? d.content,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTransaction(raw: any): Transaction {
  return {
    id: raw.id ?? raw._id ?? "",
    type: raw.type === "order" ? "order" : "token",
    orderCode: raw.orderCode ?? "",
    tokenAmount: raw.tokenAmount ?? 0,
    amountVnd: raw.amountVnd ?? raw.amount_vnd ?? 0,
    status: raw.status ?? "pending",
    createdAt: raw.createdAt ?? raw.created_at ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDepositDetail(d: any, fallback?: Partial<Transaction>): DepositDetail {
  return {
    id: d.id ?? d._id ?? fallback?.id ?? "",
    type: (d.type ?? fallback?.type) === "order" ? "order" : "token",
    orderCode: d.orderCode ?? fallback?.orderCode ?? "",
    tokenAmount: d.tokenAmount ?? fallback?.tokenAmount ?? 0,
    amountVnd: d.amountVnd ?? d.amount_vnd ?? fallback?.amountVnd ?? 0,
    status: d.status ?? fallback?.status ?? "pending",
    createdAt: d.createdAt ?? d.created_at ?? fallback?.createdAt ?? "",
    expiresAt: d.expiresAt ?? d.expires_at ?? "",
    paymentInfo: d.paymentInfo ?? d.payment_info ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

/** GET /deposits/pricing — get token pricing tiers */
export async function getPricing(): Promise<PricingTier[]> {
  const { data } = await api.get("/deposits/pricing");
  const raw = data.packages ?? data.tiers ?? data.data ?? (Array.isArray(data) ? data : []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return raw.map((p: any) => ({
    id: p.id,
    name: p.name,
    tokens: p.tokens,
    price: p.priceVnd ?? p.price ?? 0,
    bonus: p.bonus ?? 0,
    popular: p.popular ?? false,
  }));
}

/** GET /deposits/pending — check if user has a pending deposit */
export async function getPending(): Promise<DepositInfo | null> {
  const { data } = await api.get("/deposits/pending");
  const d = data.deposit ?? data.order ?? data.data ?? data;
  if (d && d.id) return mapDepositInfo(d);
  return null;
}

/** POST /deposits — create a new deposit (token or order) */
export async function createDeposit(
  body: { tierId: string } | { amount: number } | { type: "order"; amountVnd: number },
): Promise<DepositInfo> {
  const { data } = await api.post("/deposits", body);
  const d = data.deposit ?? data.order ?? data.data ?? data;
  const fallbackAmount =
    "amountVnd" in body ? body.amountVnd :
    "amount" in body ? body.amount : undefined;
  return mapDepositInfo(d, fallbackAmount);
}

/** GET /deposits/:id — check deposit status */
export async function getDeposit(id: string): Promise<{
  status: string;
  tokenBalance?: number;
}> {
  const { data } = await api.get(`/deposits/${id}`);
  const d = data.deposit ?? data.data ?? data;
  return {
    status: d.status ?? "pending",
    tokenBalance: d.tokenBalance ?? d.token_balance ?? d.balance,
  };
}

/** GET /deposits/:id — get full deposit detail (for transactions page) */
export async function getDepositDetail(
  id: string,
  fallback?: Partial<Transaction>,
): Promise<DepositDetail> {
  const { data } = await api.get(`/deposits/${id}`);
  const d = data.order ?? data.deposit ?? data;
  return mapDepositDetail(d, fallback);
}

/** DELETE /deposits/:id — cancel a deposit */
export async function cancelDeposit(id: string): Promise<void> {
  await api.delete(`/deposits/${id}`);
}

/** GET /deposits/history — get transaction history */
export async function getHistory(): Promise<Transaction[]> {
  const { data } = await api.get("/deposits/history");
  const raw = data.orders ?? data.deposits ?? data.data ?? (Array.isArray(data) ? data : []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return raw.map((t: any) => mapTransaction(t));
}
