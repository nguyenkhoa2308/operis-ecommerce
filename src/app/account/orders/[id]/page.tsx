"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Copy,
  Check,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Package,
  Truck,
  CreditCard,
  MapPin,
} from "lucide-react";
import { useToastStore } from "@/store/toast-store";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { formatPrice } from "@/data/products";
import { ordersApi } from "@/lib/api";
import type { Order, OrderPaymentInfo } from "@/lib/api/orders";

const PAID_STATUSES = new Set(["processing", "shipping", "delivered"]);

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

const badgeBg: Record<string, string> = {
  pending: "bg-yellow-50 border-yellow-200",
  processing: "bg-blue-50 border-blue-200",
  shipping: "bg-purple-50 border-purple-200",
  delivered: "bg-green-50 border-green-200",
  cancelled: "bg-red-50 border-red-200",
};

const statusIcon: Record<string, React.ReactNode> = {
  pending: <CreditCard size={16} />,
  processing: <Package size={16} />,
  shipping: <Truck size={16} />,
  delivered: <CheckCircle2 size={16} />,
  cancelled: <XCircle size={16} />,
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const addToast = useToastStore((s) => s.addToast);
  const addToastRef = useRef(addToast);
  addToastRef.current = addToast;

  const [order, setOrder] = useState<Order | null>(null);
  const [payment, setPayment] = useState<OrderPaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [paySuccess, setPaySuccess] = useState(false);
  const [checking, setChecking] = useState(false);

  /* Cancel */
  const [showCancel, setShowCancel] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  /* Fetch order + payment — only depends on `id` */
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const [res] = await Promise.all([
          ordersApi.getOrderWithPayment(id),
          new Promise((r) => setTimeout(r, 400)),
        ]);
        setOrder(res.order);
        setPayment(res.payment);
      } catch {
        addToastRef.current("Không thể tải đơn hàng.", "error");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /* Manual check payment status */
  const handleCheckPayment = async () => {
    if (!order) return;
    setChecking(true);
    try {
      const updated = await ordersApi.getOrder(order.id);
      setOrder(updated);
      if (PAID_STATUSES.has(updated.status)) {
        setPaySuccess(true);
        addToast("Thanh toán thành công!", "success");
      } else if (updated.status === "cancelled") {
        addToast("Đơn hàng đã bị hủy.", "error");
      } else {
        addToast("Chưa nhận được thanh toán. Vui lòng thử lại sau.", "error");
      }
    } catch {
      addToast("Không thể kiểm tra. Vui lòng thử lại.", "error");
    } finally {
      setChecking(false);
    }
  };

  /* Auto-check when payment expires */
  const handleExpired = async () => {
    if (!order) return;
    try {
      const updated = await ordersApi.getOrder(order.id);
      setOrder(updated);
      if (PAID_STATUSES.has(updated.status)) {
        setPaySuccess(true);
        addToast("Thanh toán thành công!", "success");
      }
    } catch {
      /* ignore */
    }
  };

  /* Cancel */
  const handleCancel = async () => {
    if (!order) return;
    setCancelling(true);
    try {
      await ordersApi.cancelOrder(order.id);
      setOrder((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
      addToast("Đã hủy đơn hàng.");
    } catch {
      addToast("Không thể hủy đơn hàng.", "error");
    } finally {
      setCancelling(false);
      setShowCancel(false);
    }
  };

  /* Loading skeleton */
  if (loading) {
    return (
      <div>
        <div className="h-4 w-24 skeleton-shimmer rounded mb-6" />
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white border border-border rounded-lg p-4 md:p-6">
            <div className="h-5 w-40 md:w-48 skeleton-shimmer rounded mb-3" />
            <div className="h-4 w-28 md:w-32 skeleton-shimmer rounded" />
          </div>
          <div className="bg-white border border-border rounded-lg p-3 md:p-6 space-y-3 md:space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3 md:gap-4">
                <div className="w-14 h-14 md:w-20 md:h-20 skeleton-shimmer rounded shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 md:h-4 w-3/4 skeleton-shimmer rounded" />
                  <div className="h-3 w-1/4 skeleton-shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-border rounded-lg p-3 md:p-6 space-y-3">
            <div className="h-4 w-32 md:w-40 skeleton-shimmer rounded" />
            <div className="h-44 md:h-52 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Không tìm thấy đơn hàng.</p>
        <Link
          href="/account/orders"
          className="text-sm text-primary hover:underline"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const isPending = order.status === "pending" && !paySuccess;

  return (
    <div className="animate-fade-in">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/account/orders")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Quay lại
      </button>

      {/* Status banner */}
      <div
        className={`border rounded-lg p-4 md:p-5 mb-6 ${badgeBg[order.status] ?? "bg-gray-50 border-gray-200"}`}
      >
        <div className="flex items-center gap-3">
          <div className={`${statusColors[order.status] ?? "text-gray-500"}`}>
            {statusIcon[order.status] ?? <Package size={16} />}
          </div>
          <div className="min-w-0">
            <p
              className={`text-sm font-semibold ${statusColors[order.status] ?? "text-gray-500"}`}
            >
              {paySuccess
                ? "Thanh toán thành công"
                : (statusLabels[order.status] ?? order.status)}
            </p>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5 truncate">
              Đơn hàng #{order.orderCode || order.id.slice(0, 8)}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] md:text-xs text-muted-foreground mt-1">
              {order.createdAt && (
                <span>
                  Ngày đặt:{" "}
                  {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
              {order.status === "cancelled" &&
                order.updatedAt &&
                order.updatedAt !== order.createdAt && (
                  <span>
                    Ngày hủy:{" "}
                    {new Date(order.updatedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Products */}
        <section className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-3 md:px-5 py-3 border-b border-border bg-muted/30">
            <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              Sản phẩm ({order.items.length})
            </p>
          </div>
          <div className="divide-y divide-border">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 md:gap-4 px-3 md:px-5 py-3 md:py-4">
                {item.image ? (
                  <Link href={`/shop/${item.productSlug}`} className="shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 relative bg-muted rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 56px, 80px"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-muted rounded shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium line-clamp-2">{item.name}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="text-xs md:text-sm font-semibold shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-3 md:px-5 py-3 md:py-4 flex items-center justify-between">
            <span className="text-xs md:text-sm text-muted-foreground">Tổng cộng</span>
            <span className="text-lg md:text-xl font-bold text-primary">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </section>

        {/* Shipping */}
        {order.shippingAddress && (
          <section className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-3 md:px-5 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-muted-foreground" />
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Thông tin giao hàng
                </p>
              </div>
            </div>
            <div className="px-3 md:px-5 py-3 md:py-4 space-y-1.5 md:space-y-2">
              <p className="text-xs md:text-sm font-medium">{order.shippingName}</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {order.shippingPhone}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {order.shippingAddress}
              </p>
              {order.shippingNote && (
                <p className="text-xs md:text-sm text-muted-foreground italic">
                  &quot;{order.shippingNote}&quot;
                </p>
              )}
            </div>
          </section>
        )}

        {/* Payment — pending only */}
        {order.status === "pending" && (
          <section className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-3 md:px-5 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <CreditCard size={13} className="text-muted-foreground" />
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Thanh toán chuyển khoản
                </p>
              </div>
            </div>
            <div className="px-3 md:px-5 py-4 md:py-5">
              {paySuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <p className="text-lg font-semibold text-green-700">
                    Thanh toán thành công!
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Đơn hàng đã được xác nhận.
                  </p>
                </div>
              ) : payment ? (
                <PaymentSection
                  payment={payment}
                  checking={checking}
                  onCheck={handleCheckPayment}
                  onExpired={handleExpired}
                />
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    Không có thông tin thanh toán.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex gap-2 md:gap-3">
          {isPending && (
            <button
              type="button"
              onClick={() => setShowCancel(true)}
              className="flex items-center justify-center gap-1.5 md:gap-2 border border-red-200 text-red-500 text-[11px] md:text-xs tracking-widest px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <XCircle size={13} />
              HỦY ĐƠN
            </button>
          )}
          {order.status === "delivered" && (
            <Link
              href="/shop"
              className="flex items-center justify-center gap-1.5 md:gap-2 bg-primary text-white text-[11px] md:text-xs tracking-widest px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              MUA LẠI
            </Link>
          )}
        </div>
      </div>

      {/* Cancel confirm */}
      <ConfirmModal
        open={showCancel}
        title="Hủy đơn hàng?"
        message="Đơn hàng sẽ bị hủy và không thể khôi phục. Bạn có chắc chắn?"
        confirmLabel="Hủy đơn hàng"
        cancelLabel="Quay lại"
        loading={cancelling}
        onConfirm={handleCancel}
        onCancel={() => setShowCancel(false)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Payment section with QR, bank info, countdown, polling indicator   */
/* ------------------------------------------------------------------ */

function PaymentSection({
  payment,
  checking,
  onCheck,
  onExpired,
}: {
  payment: OrderPaymentInfo;
  checking: boolean;
  onCheck: () => void;
  onExpired: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const expiredCalled = useRef(false);

  const expired = timeLeft === "Hết hạn";

  useEffect(() => {
    if (!payment.expiresAt) return;
    const update = () => {
      const diff = new Date(payment.expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Hết hạn");
        if (!expiredCalled.current) {
          expiredCalled.current = true;
          onExpired();
        }
        return;
      }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${m}:${s.toString().padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment.expiresAt]);

  const pi = payment.paymentInfo;

  return (
    <div className="space-y-5">
      {/* Countdown */}
      {timeLeft && (
        <div className="flex items-center gap-2">
          <Clock
            size={14}
            className={
              timeLeft === "Hết hạn" ? "text-red-500" : "text-muted-foreground"
            }
          />
          <span
            className={`text-sm font-mono ${timeLeft === "Hết hạn" ? "text-red-500 font-semibold" : "text-muted-foreground"}`}
          >
            {timeLeft === "Hết hạn"
              ? "Mã QR đã hết hạn"
              : `Hết hạn sau ${timeLeft}`}
          </span>
        </div>
      )}

      {/* Amount */}
      <div className="text-center">
        <p className="text-xs md:text-sm text-muted-foreground mb-1">
          Số tiền cần thanh toán
        </p>
        <p className="text-2xl md:text-3xl font-bold text-primary">
          {formatPrice(payment.amountVnd)}
        </p>
      </div>

      {/* QR */}
      {pi.qrCodeUrl && (
        <div className="flex justify-center">
          <div className="border-2 border-primary/20 rounded-2xl p-2 md:p-3 bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pi.qrCodeUrl}
              alt="QR thanh toán"
              width={220}
              height={220}
              className="rounded-xl w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
            />
          </div>
        </div>
      )}

      {/* Bank info */}
      <div className="bg-muted/50 rounded-lg p-3 md:p-4 space-y-2 md:space-y-2.5">
        <CopyableRow label="Ngân hàng" value={pi.bankName} />
        <CopyableRow label="Số TK" value={pi.accountNumber} />
        <CopyableRow label="Chủ TK" value={pi.accountName} />
        <div className="border-t border-border pt-2 md:pt-2.5">
          <CopyableRow
            label="Nội dung CK"
            value={pi.transferContent}
            highlight
          />
        </div>
      </div>

      {/* Manual check button */}
      <button
        type="button"
        onClick={onCheck}
        disabled={checking || expired}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white text-xs md:text-sm font-medium px-4 py-2.5 md:py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <RefreshCw size={14} className={checking ? "animate-spin" : ""} />
        {checking
          ? "Đang kiểm tra..."
          : expired
            ? "Đã hết hạn thanh toán"
            : "Kiểm tra thanh toán"}
      </button>

      {!expired && (
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Quét mã QR hoặc chuyển khoản theo thông tin trên. Sau đó bấm nút kiểm
          tra để xác nhận.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Copyable bank info row                                             */
/* ------------------------------------------------------------------ */

function CopyableRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="flex items-center justify-between gap-2 text-xs md:text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`truncate font-mono text-[11px] md:text-sm ${highlight ? "font-bold text-primary" : "font-medium"}`}
        >
          {value}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5"
          aria-label={`Sao chép ${label}`}
        >
          {copied ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <Copy size={12} />
          )}
        </button>
      </div>
    </div>
  );
}
