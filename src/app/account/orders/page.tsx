"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { useToastStore } from "@/store/toast-store";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { formatPrice } from "@/data/products";
import { ordersApi } from "@/lib/api";
import type { Order } from "@/lib/api/orders";

const PAGE_SIZE = 20;

type StatusTab = "all" | "pending" | "processing" | "shipping" | "delivered" | "cancelled";

const statusTabs: { key: StatusTab; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ thanh toán" },
  { key: "processing", label: "Đang xử lý" },
  { key: "shipping", label: "Đang giao" },
  { key: "delivered", label: "Hoàn thành" },
  { key: "cancelled", label: "Đã hủy" },
];

const statusLabels: Record<string, string> = {
  pending: "Chờ thanh toán",
  processing: "Đang xử lý",
  shipping: "Đang giao",
  delivered: "Hoàn thành",
  cancelled: "Đã hủy",
};

const statusColors: Record<string, string> = {
  pending: "text-yellow-600",
  processing: "text-blue-600",
  shipping: "text-purple-600",
  delivered: "text-green-600",
  cancelled: "text-red-500",
};

export default function OrdersPage() {
  const router = useRouter();
  const addToast = useToastStore((s) => s.addToast);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<StatusTab>("all");
  const [search, setSearch] = useState("");

  /* Cancel */
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  /* Infinite scroll sentinel */
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Fetch orders with pagination */
  const fetchOrders = useCallback(
    async (offset: number, append: boolean) => {
      const filters: { limit: number; offset: number; status?: string } = {
        limit: PAGE_SIZE,
        offset,
      };
      if (activeTab !== "all") filters.status = activeTab;

      try {
        const res = await ordersApi.getOrders(filters);
        const newOrders = res.orders;
        setOrders((prev) => (append ? [...prev, ...newOrders] : newOrders));
        setHasMore(newOrders.length >= PAGE_SIZE);
      } catch {
        if (!append) setOrders([]);
      }
    },
    [activeTab],
  );

  /* Initial load + reset when tab changes */
  useEffect(() => {
    setLoading(true);
    setHasMore(true);
    Promise.all([fetchOrders(0, false), new Promise((r) => setTimeout(r, 400))])
      .finally(() => setLoading(false));
  }, [fetchOrders]);

  /* Load more */
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    await fetchOrders(orders.length, true);
    setLoadingMore(false);
  }, [loadingMore, hasMore, orders.length, fetchOrders]);

  /* IntersectionObserver for infinite scroll */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMore]);

  /* Client-side search filter (on loaded data) */
  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const matchCode = (o.orderCode || o.id).toLowerCase().includes(q);
    const matchItem = o.items.some((i) => i.name.toLowerCase().includes(q));
    return matchCode || matchItem;
  });

  /* Cancel */
  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await ordersApi.cancelOrder(cancelTarget);
      setOrders((prev) =>
        prev.map((o) => (o.id === cancelTarget ? { ...o, status: "cancelled" } : o)),
      );
      addToast("Đã hủy đơn hàng.");
    } catch {
      addToast("Không thể hủy đơn hàng.", "error");
    } finally {
      setCancelling(false);
      setCancelTarget(null);
    }
  };

  /* Reset and reload when changing tab */
  const handleTabChange = (tab: StatusTab) => {
    setActiveTab(tab);
    setSearch("");
  };

  return (
    <div>
      <h2 className="text-sm font-semibold tracking-widest uppercase mb-6">Đơn hàng</h2>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabChange(tab.key)}
            className={`text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Tìm theo mã đơn, tên sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-border pl-9 pr-3 py-2.5 text-sm outline-none focus:border-primary transition-colors rounded-lg"
        />
      </div>

      {/* Order list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 md:px-5 py-3 border-b border-border">
                <div className="h-4 w-28 md:w-32 skeleton-shimmer rounded" />
                <div className="h-4 w-20 md:w-24 skeleton-shimmer rounded" />
              </div>
              <div className="p-3 md:p-5 space-y-3">
                <div className="flex gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 skeleton-shimmer rounded shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 md:h-4 w-3/4 skeleton-shimmer rounded" />
                    <div className="h-3 w-1/4 skeleton-shimmer rounded" />
                  </div>
                  <div className="h-3.5 md:h-4 w-16 md:w-20 skeleton-shimmer rounded shrink-0" />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 md:px-5 py-3 border-t border-border">
                <div className="h-3 w-16 md:w-20 skeleton-shimmer rounded" />
                <div className="h-5 w-24 md:w-28 skeleton-shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">
            {orders.length === 0 ? "Chưa có đơn hàng nào" : "Không tìm thấy đơn hàng phù hợp"}
          </p>
          {orders.length === 0 && !search && (
            <Link
              href="/shop"
              className="inline-block bg-primary text-white text-xs tracking-widest px-6 py-3 hover:bg-primary/90 transition-colors rounded"
            >
              MUA SẮM NGAY
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {filtered.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/account/orders/${order.id}`)}
              className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-3 md:px-5 py-3 border-b border-border bg-muted/30">
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-medium truncate">
                    Đơn hàng #{order.orderCode || order.id.slice(0, 8)}
                  </p>
                  <p className="text-[10px] md:text-[11px] text-muted-foreground mt-0.5">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                </div>
                <span
                  className={`text-[10px] md:text-xs font-semibold tracking-wider uppercase shrink-0 ml-2 ${statusColors[order.status] ?? "text-gray-500"}`}
                >
                  {statusLabels[order.status] ?? order.status}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-border">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 md:gap-4 px-3 md:px-5 py-3">
                    {item.image ? (
                      <div className="w-12 h-12 md:w-16 md:h-16 relative bg-muted rounded shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 48px, 64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium truncate">{item.name}</p>
                      <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5">x{item.quantity}</p>
                    </div>
                    <p className="text-xs md:text-sm font-semibold shrink-0">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-3 md:px-5 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] md:text-xs text-muted-foreground">{order.items.length} sản phẩm</p>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-[11px] md:text-xs text-muted-foreground">Thành tiền:</span>
                    <span className="text-base md:text-lg font-bold text-primary">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                {(order.status === "pending" || order.status === "delivered") && (
                  <div className="flex items-center justify-end gap-2 mt-3">
                    {order.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCancelTarget(order.id);
                          }}
                          className="text-xs border border-border px-4 py-2 rounded hover:bg-muted transition-colors"
                        >
                          Hủy đơn
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/account/orders/${order.id}`);
                          }}
                          className="text-xs bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                        >
                          Thanh toán
                        </button>
                      </>
                    )}
                    {order.status === "delivered" && (
                      <Link
                        href="/shop"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                      >
                        Mua lại
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="py-4 text-center">
            {loadingMore && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs">Đang tải thêm...</span>
              </div>
            )}
            {!hasMore && orders.length > 0 && (
              <p className="text-xs text-muted-foreground">Đã hiển thị tất cả đơn hàng</p>
            )}
          </div>
        </div>
      )}

      {/* Cancel confirm modal */}
      <ConfirmModal
        open={!!cancelTarget}
        title="Hủy đơn hàng?"
        message="Đơn hàng sẽ bị hủy và không thể khôi phục. Bạn có chắc chắn?"
        confirmLabel="Hủy đơn hàng"
        cancelLabel="Quay lại"
        loading={cancelling}
        onConfirm={handleCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  );
}
