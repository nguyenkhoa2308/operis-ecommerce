"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import { DatePicker, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { formatTokenCount } from "@/data/token-plans";
import { analyticsApi } from "@/lib/api";
import type { UsageStats, DailyData, HistoryItem } from "@/lib/api/analytics";

dayjs.locale("vi");

const AreaChart = dynamic(() => import("recharts").then((m) => m.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then((m) => m.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false });

type PeriodType = "today" | "week" | "month" | "year" | "custom";

const presetPeriods: Exclude<PeriodType, "custom">[] = ["today", "week", "month", "year"];

const periodLabels: Record<PeriodType, string> = {
  today: "HÔM NAY",
  week: "TUẦN",
  month: "THÁNG",
  year: "NĂM",
  custom: "TÙY CHỌN",
};

const periodCompare: Record<string, string> = {
  today: "so với hôm qua",
  week: "so với tuần trước",
  month: "so với tháng trước",
  year: "so với năm trước",
};

const chartTitleByPeriod: Record<PeriodType, string> = {
  today: "Lượt gọi & Token hôm nay",
  week: "Lượt gọi & Token tuần này",
  month: "Lượt gọi & Token tháng này",
  year: "Lượt gọi & Token năm nay",
  custom: "Lượt gọi & Token tùy chọn",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function shortModel(model: string): string {
  if (!model) return "—";
  const m = model.toLowerCase();
  if (m.includes("opus")) return "Opus";
  if (m.includes("sonnet")) return "Sonnet";
  if (m.includes("haiku")) return "Haiku";
  return model.split("-").slice(0, 2).join(" ");
}

function pctChange(current: number, previous: number): number | null {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ApiUsagePage() {
  const [period, setPeriod] = useState<PeriodType>("today");

  /* Custom date range */
  const [customFrom, setCustomFrom] = useState<Dayjs | null>(null);
  const [customTo, setCustomTo] = useState<Dayjs | null>(null);

  /* Stats (current + previous for comparison) */
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [prevStats, setPrevStats] = useState<UsageStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  /* Chart */
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [loadingChart, setLoadingChart] = useState(true);

  /* History */
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 10;

  /* ---------------------------------------------------------------- */
  /*  Fetch by preset period (today/week/month/year)                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (period === "custom") return;
    setLoadingStats(true);
    setLoadingChart(true);
    (async () => {
      try {
        const res = await analyticsApi.getUsage(period);
        setStats(res.stats);
        setPrevStats(res.prevStats);
        setDailyData([...res.dailyData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      } catch {
        setStats(null); setPrevStats(null); setDailyData([]);
      } finally {
        setLoadingStats(false); setLoadingChart(false);
      }
    })();
  }, [period]);

  /* ---------------------------------------------------------------- */
  /*  Fetch by custom range via /analytics/usage/range                 */
  /* ---------------------------------------------------------------- */

  const fetchCustomRange = async (from: Dayjs, to: Dayjs) => {
    setLoadingStats(true);
    setLoadingChart(true);
    try {
      const res = await analyticsApi.getUsageRange(from.format("YYYY-MM-DD"), to.format("YYYY-MM-DD"));
      setStats(res.stats);
      setPrevStats(res.prevStats);
      setDailyData([...res.dailyData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    } catch {
      setStats(null); setPrevStats(null); setDailyData([]);
    } finally {
      setLoadingStats(false); setLoadingChart(false);
    }
  };

  /* When a date is picked — auto-fetch with smart defaults */
  const handleFromChange = (date: Dayjs | null) => {
    setCustomFrom(date);
    if (date) {
      fetchCustomRange(date, customTo ?? dayjs());
    }
  };

  const handleToChange = (date: Dayjs | null) => {
    setCustomTo(date);
    if (date) {
      fetchCustomRange(customFrom ?? dayjs("2020-01-01"), date);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Initial fetch — history (only once)                              */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    (async () => {
      try {
        const res = await analyticsApi.getUsageHistory();
        setHistory(res.records);
        setHistoryTotal(res.total);
      } catch {
        setHistory([]); setHistoryTotal(0);
      } finally {
        setLoadingHistory(false);
      }
    })();
  }, []);

  /* Client-side pagination for history */
  const totalHistoryPages = Math.ceil(history.length / historyPerPage);
  const paginatedHistory = history.slice(
    (historyPage - 1) * historyPerPage,
    historyPage * historyPerPage,
  );

  /* ---------------------------------------------------------------- */
  /*  Stat card helper                                                 */
  /* ---------------------------------------------------------------- */

  const StatCard = ({ label, value, prev }: { label: string; value: string; prev: number | null }) => (
    <div className="bg-muted/60 rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {prev !== null && period !== "custom" && (
        <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-medium ${prev >= 0 ? "text-green-600" : "text-red-500"}`}>
          {prev >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {prev >= 0 ? "+" : ""}{prev}% {periodCompare[period]}
        </div>
      )}
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div>
      <h2 className="text-sm font-semibold tracking-widest uppercase mb-6">API Usage</h2>

      {/* Period selector */}
      <div className="space-y-2 mb-6">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {presetPeriods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPeriod(p);
                setCustomFrom(null);
                setCustomTo(null);
              }}
              className={`px-3 md:px-4 py-1.5 md:py-2 text-xs tracking-widest rounded transition-colors ${
                period === p ? "bg-foreground text-white" : "bg-muted text-foreground hover:bg-border"
              }`}
            >
              {periodLabels[p]}
            </button>
          ))}

          {/* Custom button */}
          <button
            type="button"
            onClick={() => {
              if (period === "custom") {
                setPeriod("today");
                setCustomFrom(null);
                setCustomTo(null);
              } else {
                setPeriod("custom");
              }
            }}
            className={`px-3 md:px-4 py-1.5 md:py-2 text-xs tracking-widest rounded transition-colors flex items-center gap-1.5 ${
              period === "custom" ? "bg-foreground text-white" : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            <Calendar size={13} />
            {periodLabels.custom}
          </button>
        </div>

        {/* Two separate date pickers — one calendar at a time */}
        {period === "custom" && (
          <ConfigProvider locale={viVN}>
            <div className="flex items-center gap-2">
              <DatePicker
                value={customFrom}
                onChange={handleFromChange}
                disabledDate={(current: Dayjs) => {
                  if (current > dayjs().endOf("day")) return true;
                  if (customTo && current > customTo) return true;
                  return false;
                }}
                format="DD/MM/YYYY"
                placeholder="Từ ngày"
                allowClear
                size="middle"
                className="w-32"
                getPopupContainer={() => document.body}
                classNames={{ popup: { root: "api-usage-picker" } }}
              />
              <span className="text-xs text-muted-foreground">→</span>
              <DatePicker
                value={customTo}
                onChange={handleToChange}
                disabledDate={(current: Dayjs) => {
                  if (current > dayjs().endOf("day")) return true;
                  if (customFrom && current < customFrom) return true;
                  return false;
                }}
                format="DD/MM/YYYY"
                placeholder="Đến ngày"
                allowClear
                size="middle"
                className="w-32"
                getPopupContainer={() => document.body}
                classNames={{ popup: { root: "api-usage-picker" } }}
              />
            </div>
          </ConfigProvider>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loadingStats ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-muted/60 rounded-lg p-4 space-y-2">
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-7 w-24 bg-muted rounded animate-pulse" />
              <div className="h-3 w-28 bg-muted rounded animate-pulse mt-1" />
            </div>
          ))
        ) : stats ? (
          <>
            <StatCard
              label="Tổng lượt gọi"
              value={stats.totalRequests.toLocaleString("vi-VN")}
              prev={prevStats ? pctChange(stats.totalRequests, prevStats.totalRequests) : null}
            />
            <StatCard
              label="Input tokens"
              value={formatTokenCount(stats.totalInputTokens)}
              prev={prevStats ? pctChange(stats.totalInputTokens, prevStats.totalInputTokens) : null}
            />
            <StatCard
              label="Output tokens"
              value={formatTokenCount(stats.totalOutputTokens)}
              prev={prevStats ? pctChange(stats.totalOutputTokens, prevStats.totalOutputTokens) : null}
            />
            <StatCard
              label="Tổng token"
              value={formatTokenCount(stats.totalTokens)}
              prev={prevStats ? pctChange(stats.totalTokens, prevStats.totalTokens) : null}
            />
          </>
        ) : (
          <p className="col-span-full text-sm text-muted-foreground text-center py-4">
            {period === "custom" && (!customFrom || !customTo) ? "Chọn khoảng thời gian để xem thống kê" : "Không thể tải thống kê"}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white border border-border rounded-lg p-3 md:p-5 mb-8">
        <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">
          {chartTitleByPeriod[period]}
        </h3>

        {loadingChart ? (
          <div className="h-80 flex items-center justify-center text-sm text-muted-foreground gap-2">
            <Loader2 size={16} className="animate-spin" /> Đang tải biểu đồ...
          </div>
        ) : dailyData.length === 0 ? (
          <div className="h-80 flex items-center justify-center text-sm text-muted-foreground">
            Chưa có dữ liệu trong khoảng thời gian này
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => {
                  const d = new Date(v);
                  if (period === "today") return `${d.getHours()}:00`;
                  if (period === "year") return `T${d.getMonth() + 1}/${d.getFullYear()}`;
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelFormatter={(v) => {
                  const d = new Date(v);
                  if (period === "today") return `${d.getHours()}:00 - ${d.toLocaleDateString("vi-VN")}`;
                  if (period === "year") return `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
                  return d.toLocaleDateString("vi-VN");
                }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stackId="1"
                stroke="#6b8fb5"
                fill="#6b8fb5"
                fillOpacity={0.3}
                name="Lượt gọi"
              />
              <Area
                type="monotone"
                dataKey="tokens"
                stackId="2"
                stroke="#e8594a"
                fill="#e8594a"
                fillOpacity={0.3}
                name="Token"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* History table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="px-3 md:px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-widest uppercase">Lịch sử chi tiết</h3>
          {historyTotal > 0 && (
            <span className="text-xs text-muted-foreground">{historyTotal} bản ghi</span>
          )}
        </div>

        {loadingHistory ? (
          <div className="divide-y divide-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-3 md:px-5 py-3.5 space-y-2 md:space-y-0 md:flex md:items-center md:gap-4">
                <div className="h-5 w-14 bg-muted rounded animate-pulse" />
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-4 w-36 bg-muted rounded animate-pulse md:flex-1" />
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-foreground">
            Chưa có lịch sử sử dụng API
          </div>
        ) : (
          <>
            {/* Header — desktop only */}
            <div className="hidden md:grid grid-cols-[70px_90px_1fr_70px_80px_70px_140px] gap-2 px-5 py-2.5 bg-muted/50 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              <span>Loại</span>
              <span>Model</span>
              <span>Nội dung</span>
              <span>Input</span>
              <span>Output</span>
              <span>Tổng</span>
              <span>Thời gian</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {paginatedHistory.map((h) => (
                <div key={h.id}>
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-[70px_90px_1fr_70px_80px_70px_140px] gap-2 px-5 py-3 items-center text-sm">
                    <span className="text-[11px] font-bold tracking-wider w-fit px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">
                      {h.requestType}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {shortModel(h.model)}
                    </span>
                    <span className="text-xs text-foreground/80 truncate" title={h.messagePreview}>
                      {h.messagePreview || "—"}
                    </span>
                    <span className="text-xs tabular-nums">{h.inputTokens.toLocaleString("vi-VN")}</span>
                    <span className="text-xs tabular-nums">{h.outputTokens.toLocaleString("vi-VN")}</span>
                    <span className="text-xs font-medium tabular-nums">{h.totalTokens.toLocaleString("vi-VN")}</span>
                    <span className="text-xs text-muted-foreground">
                      {h.createdAt ? new Date(h.createdAt).toLocaleString("vi-VN") : "—"}
                    </span>
                  </div>

                  {/* Mobile card row */}
                  <div className="md:hidden px-3 py-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">
                          {h.requestType}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          {shortModel(h.model)}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {h.createdAt ? new Date(h.createdAt).toLocaleString("vi-VN") : "—"}
                      </span>
                    </div>
                    {h.messagePreview && (
                      <p className="text-xs text-foreground/80 line-clamp-2">{h.messagePreview}</p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>In: <strong className="text-foreground">{h.inputTokens.toLocaleString("vi-VN")}</strong></span>
                      <span>Out: <strong className="text-foreground">{h.outputTokens.toLocaleString("vi-VN")}</strong></span>
                      <span>Tổng: <strong className="text-foreground">{h.totalTokens.toLocaleString("vi-VN")}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalHistoryPages > 1 && (
              <div className="flex flex-col-reverse gap-2 md:flex-row items-center justify-between px-3 md:px-5 py-3 border-t border-border">
                <p className="text-[11px] md:text-xs text-muted-foreground">
                  Trang {historyPage}/{totalHistoryPages}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Trang trước"
                    onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                    disabled={historyPage === 1}
                    className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  {(() => {
                    const pages: (number | "ellipsis")[] = [];
                    if (totalHistoryPages <= 5) {
                      for (let i = 1; i <= totalHistoryPages; i++) pages.push(i);
                    } else {
                      pages.push(1);
                      if (historyPage > 3) pages.push("ellipsis");
                      const start = Math.max(2, historyPage - 1);
                      const end = Math.min(totalHistoryPages - 1, historyPage + 1);
                      for (let i = start; i <= end; i++) pages.push(i);
                      if (historyPage < totalHistoryPages - 2) pages.push("ellipsis");
                      pages.push(totalHistoryPages);
                    }
                    return pages.map((p, idx) =>
                      p === "ellipsis" ? (
                        <span key={`e${idx}`} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs text-muted-foreground">…</span>
                      ) : (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setHistoryPage(p)}
                          className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md text-xs transition-colors ${
                            p === historyPage
                              ? "bg-foreground text-white"
                              : "border border-border hover:bg-muted"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    );
                  })()}
                  <button
                    type="button"
                    aria-label="Trang sau"
                    onClick={() => setHistoryPage((p) => Math.min(totalHistoryPages, p + 1))}
                    disabled={historyPage === totalHistoryPages}
                    className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
