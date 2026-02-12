import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UsageStats {
  totalRequests: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  totalCostTokens: number;
}

export interface DailyData {
  date: string;
  requests: number;
  tokens: number;
}

export interface HistoryItem {
  id: string;
  requestType: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  costTokens: number;
  messagePreview: string;
  stream: boolean;
  createdAt: string;
}

export interface UsageResponse {
  stats: UsageStats;
  prevStats: UsageStats | null;
  dailyData: DailyData[];
}

export interface HistoryResponse {
  records: HistoryItem[];
  total: number;
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapStats(raw: any): UsageStats {
  return {
    totalRequests: raw.total_requests ?? raw.totalRequests ?? 0,
    totalInputTokens: raw.total_input_tokens ?? raw.totalInputTokens ?? 0,
    totalOutputTokens: raw.total_output_tokens ?? raw.totalOutputTokens ?? 0,
    totalTokens: raw.total_tokens ?? raw.totalTokens ?? 0,
    totalCostTokens: raw.total_cost_tokens ?? raw.totalCostTokens ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDailyItem(raw: any): DailyData {
  return {
    date: raw.date ?? "",
    requests: raw.total_requests ?? raw.totalRequests ?? 0,
    tokens: raw.total_tokens ?? raw.totalTokens ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapHistoryItem(raw: any): HistoryItem {
  return {
    id: raw.id ?? raw._id ?? "",
    requestType: raw.request_type ?? raw.requestType ?? "chat",
    model: raw.model ?? "",
    inputTokens: raw.input_tokens ?? raw.inputTokens ?? 0,
    outputTokens: raw.output_tokens ?? raw.outputTokens ?? 0,
    totalTokens: raw.total_tokens ?? raw.totalTokens ?? 0,
    costTokens: raw.cost_tokens ?? raw.costTokens ?? 0,
    messagePreview: raw.metadata?.message_preview ?? raw.metadata?.messagePreview ?? "",
    stream: raw.metadata?.stream ?? false,
    createdAt: raw.created_at ?? raw.createdAt ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseUsageData(data: any): UsageResponse {
  const current = data.current ?? data.stats ?? data.data ?? data;
  const daily: unknown[] = data.daily ?? [];
  return {
    stats: mapStats(current),
    prevStats: data.previous ? mapStats(data.previous) : null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dailyData: daily.map((d: any) => mapDailyItem(d)),
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

/** GET /analytics/usage — stats by preset period */
export async function getUsage(period: string): Promise<UsageResponse> {
  const { data } = await api.get("/analytics/usage", { params: { period } });
  return parseUsageData(data);
}

/** GET /analytics/usage/range — stats by custom date range */
export async function getUsageRange(start: string, end: string): Promise<UsageResponse> {
  const { data } = await api.get("/analytics/usage/range", {
    params: { start, end },
  });
  return parseUsageData(data);
}

/** GET /analytics/usage/history — detailed usage history */
export async function getUsageHistory(): Promise<HistoryResponse> {
  const { data } = await api.get("/analytics/usage/history");
  const raw: unknown[] = data.records ?? data.data ?? data.history ?? (Array.isArray(data) ? data : []);
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    records: raw.map((item: any) => mapHistoryItem(item)),
    total: data.total ?? raw.length,
  };
}
