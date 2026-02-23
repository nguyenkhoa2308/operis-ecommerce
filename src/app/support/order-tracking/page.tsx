"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Loader2 } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { ordersApi } from "@/lib/api";
import type { Order } from "@/lib/api/orders";

const statusSteps = [
  { key: "pending", label: "Chờ xác nhận", icon: Package },
  { key: "processing", label: "Đang xử lý", icon: Package },
  { key: "shipping", label: "Đang giao hàng", icon: Truck },
  { key: "delivered", label: "Đã giao hàng", icon: CheckCircle },
];

function getStepIndex(status: string): number {
  const idx = statusSteps.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const result = await ordersApi.trackOrder(orderId.trim());
      setOrder(result);
    } catch {
      setError("Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn.");
    } finally {
      setLoading(false);
    }
  };

  const stepIndex = order ? getStepIndex(order.status) : -1;

  return (
    <>
      <PageBanner
        title="THEO DÕI ĐƠN HÀNG"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Hỗ trợ" },
          { label: "Theo dõi đơn hàng" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
        {/* Search form */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-lg md:text-2xl font-semibold mb-2">Nhập mã đơn hàng</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Tra cứu trạng thái đơn hàng của bạn bằng mã đơn hàng.
          </p>
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Ví dụ: ORD-20260210-00"
                className="flex-1 min-w-0 border border-border px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base outline-none focus:border-primary transition-colors rounded"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-foreground text-white text-xs md:text-sm tracking-widest px-4 md:px-6 py-2.5 md:py-3 hover:bg-foreground/90 transition-colors rounded flex items-center gap-1.5 md:gap-2 shrink-0 disabled:opacity-50"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                <span className="hidden sm:inline">TRA CỨU</span>
              </button>
            </div>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-sm md:text-base text-red-500 mb-6 md:mb-8 animate-fade-in">{error}</div>
        )}

        {/* Result */}
        {order && (
          <div className="animate-fade-in">
            {/* Progress steps */}
            <div className="flex items-center justify-between mb-8 md:mb-10">
              {statusSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i <= stepIndex;
                const isCurrent = i === stepIndex;
                return (
                  <div key={step.key} className="flex-1 flex flex-col items-center relative">
                    {i > 0 && (
                      <div
                        className={`absolute top-4 md:top-5 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                          i <= stepIndex ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                    <div
                      className={`relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCurrent
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : isActive
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon size={16} className="md:hidden" />
                      <Icon size={18} className="hidden md:block" />
                    </div>
                    <p
                      className={`text-[10px] md:text-xs mt-1.5 md:mt-2 text-center leading-tight ${
                        isActive ? "font-semibold text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Order info */}
            <div className="border border-border rounded-lg p-4 md:p-6 space-y-2.5 md:space-y-3">
              <div className="flex justify-between gap-2 text-sm md:text-base">
                <span className="text-muted-foreground shrink-0">Mã đơn hàng</span>
                <span className="font-semibold font-mono text-xs md:text-base truncate">{order.id}</span>
              </div>
              <div className="flex justify-between gap-2 text-sm md:text-base">
                <span className="text-muted-foreground shrink-0">Trạng thái</span>
                <span className="font-semibold text-primary">
                  {statusSteps[stepIndex]?.label ?? order.status}
                </span>
              </div>
              {order.createdAt && (
                <div className="flex justify-between gap-2 text-sm md:text-base">
                  <span className="text-muted-foreground shrink-0">Ngày đặt</span>
                  <span>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>
              )}
              {order.updatedAt && (
                <div className="flex justify-between gap-2 text-sm md:text-base">
                  <span className="text-muted-foreground shrink-0">Cập nhật</span>
                  <span>{new Date(order.updatedAt).toLocaleString("vi-VN")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Guide */}
        {!order && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4">
            {[
              { title: "Bước 1", desc: "Tìm mã đơn hàng trong email xác nhận hoặc trang Đơn hàng trong tài khoản." },
              { title: "Bước 2", desc: "Nhập mã đơn hàng vào ô tìm kiếm phía trên và nhấn Tra cứu." },
              { title: "Bước 3", desc: "Xem trạng thái đơn hàng và thông tin giao hàng chi tiết." },
            ].map((item) => (
              <div key={item.title} className="text-center p-4 md:p-6 bg-muted/50 rounded-lg">
                <p className="text-sm md:text-base font-semibold mb-1.5 md:mb-2">{item.title}</p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <SubscribeSection />
    </>
  );
}
