"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowDownRight, Filter, Loader2, ChevronLeft, ChevronRight, X, Coins, ShoppingBag } from "lucide-react";
import { useToastStore } from "@/store/toast-store";
import { formatPrice } from "@/data/products";
import { formatTokenCount } from "@/data/token-plans";
import { depositsApi } from "@/lib/api";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import type { Transaction, DepositDetail, TransactionType } from "@/lib/api/deposits";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type StatusFilter = "all" | "pending" | "completed" | "expired" | "cancelled";
type TypeFilter = "all" | TransactionType;

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "token", label: "Nạp token" },
  { value: "order", label: "Đơn hàng" },
];

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ TT" },
  { value: "completed", label: "Thành công" },
  { value: "expired", label: "Hết hạn" },
  { value: "cancelled", label: "Đã huỷ" },
];

const badgeStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  expired: "bg-gray-100 text-gray-500",
  cancelled: "bg-red-100 text-red-600",
};

const badgeLabels: Record<string, string> = {
  pending: "Chờ thanh toán",
  completed: "Thành công",
  expired: "Hết hạn",
  cancelled: "Đã huỷ",
};

const typeBadgeStyles: Record<TransactionType, string> = {
  token: "bg-blue-100 text-blue-700",
  order: "bg-purple-100 text-purple-700",
};

const typeLabels: Record<TransactionType, string> = {
  token: "Nạp token",
  order: "Đơn hàng",
};

/* Màu icon tròn cho từng trạng thái */
const iconBg: Record<string, string> = {
  completed: "bg-green-100",
  pending: "bg-yellow-100",
  expired: "bg-gray-100",
  cancelled: "bg-red-50",
};

const iconColor: Record<string, string> = {
  completed: "text-green-600",
  pending: "text-yellow-600",
  expired: "text-gray-400",
  cancelled: "text-red-500",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TransactionsPage() {
  const { addToast } = useToastStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState<DepositDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const [list] = await Promise.all([
        depositsApi.getHistory(),
        new Promise((r) => setTimeout(r, 500)),
      ]);
      setTransactions(list);
    } catch {
      addToast("Không thể tải lịch sử giao dịch", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  /* Lock body scroll khi modal mở */
  useEffect(() => {
    if (modalOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [modalOpen]);

  /* Apply both filters */
  const filtered = transactions.filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  /* Reset page khi đổi filter */
  const handleTypeFilter = (f: TypeFilter) => {
    setTypeFilter(f);
    setPage(1);
  };

  const handleStatusFilter = (f: StatusFilter) => {
    setStatusFilter(f);
    setPage(1);
  };

  const openDetail = async (tx: Transaction) => {
    setModalOpen(true);
    setDetail(null);
    setDetailLoading(true);
    try {
      const d = await depositsApi.getDepositDetail(tx.id, tx);
      setDetail(d);
    } catch {
      addToast("Không thể tải chi tiết giao dịch", "error");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setModalOpen(false);
    setDetail(null);
  };

  const handleCancelDeposit = async () => {
    if (!detail) return;
    setCancelling(true);
    try {
      await depositsApi.cancelDeposit(detail.id);
      addToast("Đã huỷ đơn nạp", "success");
      setTransactions((prev) =>
        prev.map((t) => t.id === detail.id ? { ...t, status: "cancelled" } : t),
      );
      setDetail((prev) => prev ? { ...prev, status: "cancelled" } : prev);
    } catch {
      addToast("Không thể huỷ đơn nạp", "error");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-sm font-semibold tracking-widest uppercase">Lịch sử giao dịch</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type filter */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => handleTypeFilter(f.value)}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                typeFilter === f.value
                  ? "bg-white text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => handleStatusFilter(f.value)}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  statusFilter === f.value
                    ? "bg-white text-foreground shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-full skeleton-shimmer shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-28 skeleton-shimmer rounded" />
                  <div className="h-4 w-16 skeleton-shimmer rounded-full" />
                  <div className="h-4 w-20 skeleton-shimmer rounded-full" />
                </div>
                <div className="h-3 w-36 skeleton-shimmer rounded" />
              </div>
              <div className="text-right space-y-2 shrink-0">
                <div className="h-4 w-20 skeleton-shimmer rounded ml-auto" />
                <div className="h-3 w-16 skeleton-shimmer rounded ml-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">Không có giao dịch nào</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
          {paginated.map((tx) => (
            <div
              key={tx.id}
              role="button"
              tabIndex={0}
              onClick={() => openDetail(tx)}
              onKeyDown={(e) => { if (e.key === "Enter") openDetail(tx); }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              {/* Icon — different per type */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg[tx.status] ?? "bg-gray-100"}`}
              >
                {tx.type === "order" ? (
                  <ShoppingBag className={`w-4 h-4 ${iconColor[tx.status] ?? "text-gray-400"}`} />
                ) : tx.status === "completed" ? (
                  <ArrowDownRight className={`w-4 h-4 ${iconColor[tx.status]}`} />
                ) : (
                  <Coins className={`w-4 h-4 ${iconColor[tx.status] ?? "text-gray-400"}`} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium truncate">{tx.orderCode}</p>
                  {/* Type badge */}
                  <span className={`text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${typeBadgeStyles[tx.type]}`}>
                    {typeLabels[tx.type]}
                  </span>
                  {/* Status badge */}
                  <span className={`text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${badgeStyles[tx.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {badgeLabels[tx.status] ?? tx.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {tx.type === "order"
                    ? formatPrice(tx.amountVnd)
                    : `${formatTokenCount(tx.tokenAmount)} token · ${formatPrice(tx.amountVnd)}`
                  }
                </p>
              </div>

              {/* Amount + Date */}
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-semibold ${
                  tx.status === "completed" ? "text-green-600" :
                  tx.status === "cancelled" ? "text-red-500 line-through" :
                  tx.status === "expired" ? "text-gray-400" : "text-yellow-700"
                }`}>
                  {tx.type === "order"
                    ? formatPrice(tx.amountVnd)
                    : `${tx.status === "completed" ? "+" : ""}${formatTokenCount(tx.tokenAmount)} token`
                  }
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {new Date(tx.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            {filtered.length} giao dịch · Trang {page}/{totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Trang trước"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-xs transition-colors ${
                  p === page
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
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
      {/* Detail modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-modal-overlay"
          onClick={closeDetail}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-modal-content max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {detailLoading ? (
              /* ---- Skeleton ---- */
              <div className="p-6 space-y-5">
                {/* Header skeleton */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2.5">
                    <div className="h-5 w-24 bg-muted rounded-full animate-pulse" />
                    <div className="h-3.5 w-36 bg-muted rounded animate-pulse" />
                  </div>
                  <button
                    type="button"
                    aria-label="Đóng"
                    onClick={closeDetail}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                {/* Big amount skeleton */}
                <div className="h-9 w-48 bg-muted rounded-lg animate-pulse" />
                {/* Info grid skeleton */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                {/* Payment info skeleton */}
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-3.5 w-16 bg-muted rounded animate-pulse" />
                        <div className="h-3.5 w-24 bg-muted rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : detail && (
              /* ---- Actual content ---- */
              <>
                {/* Colored header */}
                <div className={`px-6 pt-5 pb-4 rounded-t-2xl ${
                  detail.status === "completed" ? "bg-green-50" :
                  detail.status === "pending" ? "bg-yellow-50" :
                  detail.status === "cancelled" ? "bg-red-50" : "bg-gray-50"
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-block text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full ${typeBadgeStyles[detail.type]}`}>
                          {typeLabels[detail.type]}
                        </span>
                        <span className={`inline-block text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full ${badgeStyles[detail.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {badgeLabels[detail.status] ?? detail.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">{detail.orderCode}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Đóng"
                      onClick={closeDetail}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors -mt-1 -mr-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className={`text-3xl font-bold mt-3 ${
                    detail.status === "completed" ? "text-green-700" :
                    detail.status === "pending" ? "text-yellow-700" :
                    detail.status === "cancelled" ? "text-red-600" : "text-muted-foreground"
                  }`}>
                    {detail.type === "order" ? (
                      formatPrice(detail.amountVnd)
                    ) : (
                      <>
                        {detail.status === "completed" ? "+" : ""}{detail.tokenAmount.toLocaleString("vi-VN")}
                        <span className="text-sm font-medium ml-1.5">token</span>
                      </>
                    )}
                  </p>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div>
                      <p className="text-[11px] text-muted-foreground mb-0.5">Số tiền</p>
                      <p className="font-semibold">{formatPrice(detail.amountVnd)}</p>
                    </div>
                    {detail.type === "token" && detail.tokenAmount > 0 && (
                      <div>
                        <p className="text-[11px] text-muted-foreground mb-0.5">Token</p>
                        <p className="font-semibold">{formatTokenCount(detail.tokenAmount)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[11px] text-muted-foreground mb-0.5">Ngày tạo</p>
                      <p className="font-medium">{new Date(detail.createdAt).toLocaleString("vi-VN")}</p>
                    </div>
                    {detail.expiresAt && (
                      <div>
                        <p className="text-[11px] text-muted-foreground mb-0.5">Hết hạn</p>
                        <p className="font-medium">{new Date(detail.expiresAt).toLocaleString("vi-VN")}</p>
                      </div>
                    )}
                  </div>

                  {detail.paymentInfo && (
                    <div className="border-t border-border pt-4 space-y-3">
                      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">Thông tin thanh toán</p>
                      <div className="bg-muted/50 rounded-xl p-4 space-y-2.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ngân hàng</span>
                          <span className="font-medium">{detail.paymentInfo.bankName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Số TK</span>
                          <span className="font-medium font-mono">{detail.paymentInfo.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Chủ TK</span>
                          <span className="font-medium">{detail.paymentInfo.accountName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nội dung CK</span>
                          <span className="font-semibold text-primary font-mono">{detail.paymentInfo.transferContent}</span>
                        </div>
                      </div>
                      {detail.paymentInfo.qrCodeUrl && detail.status === "pending" && (
                        <div className="flex justify-center pt-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={detail.paymentInfo.qrCodeUrl}
                            alt="QR thanh toán"
                            className="w-44 h-44 rounded-xl border border-border shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cancel button — only for pending */}
                  {detail.status === "pending" && (
                    <div className="border-t border-border pt-4">
                      <button
                        type="button"
                        onClick={() => setShowCancelConfirm(true)}
                        disabled={cancelling}
                        className="w-full border border-red-300 text-red-600 text-xs tracking-widest py-3 hover:bg-red-50 transition-colors rounded flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {cancelling && <Loader2 size={14} className="animate-spin" />}
                        HUỶ ĐƠN
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        open={showCancelConfirm}
        title="Huỷ giao dịch?"
        message="Giao dịch sẽ bị huỷ và không thể khôi phục. Bạn có chắc chắn?"
        confirmLabel="Huỷ giao dịch"
        cancelLabel="Quay lại"
        loading={cancelling}
        onConfirm={async () => { await handleCancelDeposit(); setShowCancelConfirm(false); }}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
}
