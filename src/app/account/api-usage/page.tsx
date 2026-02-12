"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Calendar, X } from "lucide-react";
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
const { RangePicker } = DatePicker;

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
  const [customRange, setCustomRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

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

  /* When both dates are selected → fetch */
  const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setCustomRange([dates[0], dates[1]]);
      fetchCustomRange(dates[0], dates[1]);
      setPickerOpen(false);
    } else {
      setCustomRange(null);
      setPeriod("today");
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
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {presetPeriods.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setPeriod(p);
              setCustomRange(null);
              setPickerOpen(false);
            }}
            className={`px-4 py-2 text-xs tracking-widest rounded transition-colors ${
              period === p ? "bg-foreground text-white" : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}

        {/* Custom button + inline range picker */}
        <button
          type="button"
          onClick={() => {
            if (period === "custom") {
              setPeriod("today");
              setCustomRange(null);
              setPickerOpen(false);
            } else {
              setPeriod("custom");
              setPickerOpen(true);
            }
          }}
          className={`px-4 py-2 text-xs tracking-widest rounded transition-colors flex items-center gap-1.5 ${
            period === "custom" ? "bg-foreground text-white" : "bg-muted text-foreground hover:bg-border"
          }`}
        >
          <Calendar size={13} />
          {periodLabels.custom}
        </button>

        {/* Animated inline range picker */}
        <div
          className={`transition-all duration-300 ease-out ${
            period === "custom"
              ? "w-64 opacity-100"
              : "w-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <ConfigProvider locale={viVN}>
            <RangePicker
              open={pickerOpen}
              onOpenChange={setPickerOpen}
              value={customRange}
              onChange={handleRangeChange}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
              format="DD/MM/YYYY"
              placeholder={["Từ ngày", "Đến ngày"]}
              allowClear
              size="middle"
            />
          </ConfigProvider>
        </div>
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
            {period === "custom" && !customRange ? "Chọn khoảng thời gian để xem thống kê" : "Không thể tải thống kê"}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white border border-border rounded-lg p-5 mb-8">
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
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-widest uppercase">Lịch sử chi tiết</h3>
          {historyTotal > 0 && (
            <span className="text-xs text-muted-foreground">{historyTotal} bản ghi</span>
          )}
        </div>

        {loadingHistory ? (
          <div className="divide-y divide-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                <div className="h-5 w-14 bg-muted rounded animate-pulse" />
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-4 w-36 bg-muted rounded animate-pulse flex-1" />
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
            {/* Header */}
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
                <div
                  key={h.id}
                  className="px-5 py-3 md:grid md:grid-cols-[70px_90px_1fr_70px_80px_70px_140px] md:gap-2 md:items-center flex flex-col gap-1.5 text-sm"
                >
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
              ))}
            </div>

            {/* Pagination */}
            {totalHistoryPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Trang {historyPage}/{totalHistoryPages}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Trang trước"
                    onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                    disabled={historyPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  {Array.from({ length: totalHistoryPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setHistoryPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-xs transition-colors ${
                        p === historyPage
                          ? "bg-foreground text-white"
                          : "border border-border hover:bg-muted"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Trang sau"
                    onClick={() => setHistoryPage((p) => Math.min(totalHistoryPages, p + 1))}
                    disabled={historyPage === totalHistoryPages}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
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
