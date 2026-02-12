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

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Search form */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-2">Nhập mã đơn hàng</h2>
          <p className="text-base text-muted-foreground mb-6">
            Tra cứu trạng thái đơn hàng của bạn bằng mã đơn hàng.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Ví dụ: ORD-20260210-001"
              className="flex-1 border border-border px-4 py-3 text-base outline-none focus:border-primary transition-colors rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-foreground text-white text-sm tracking-widest px-6 py-3 hover:bg-foreground/90 transition-colors rounded flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
              TRA CỨU
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-base text-red-500 mb-8 animate-fade-in">{error}</div>
        )}

        {/* Result */}
        {order && (
          <div className="animate-fade-in">
            {/* Progress steps */}
            <div className="flex items-center justify-between mb-10">
              {statusSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i <= stepIndex;
                const isCurrent = i === stepIndex;
                return (
                  <div key={step.key} className="flex-1 flex flex-col items-center relative">
                    {i > 0 && (
                      <div
                        className={`absolute top-5 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                          i <= stepIndex ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCurrent
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : isActive
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <p
                      className={`text-xs mt-2 text-center ${
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
            <div className="border border-border rounded-lg p-6 space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Mã đơn hàng</span>
                <span className="font-semibold font-mono">{order.id}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Trạng thái</span>
                <span className="font-semibold text-primary">
                  {statusSteps[stepIndex]?.label ?? order.status}
                </span>
              </div>
              {order.createdAt && (
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Ngày đặt</span>
                  <span>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>
              )}
              {order.updatedAt && (
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Cập nhật lần cuối</span>
                  <span>{new Date(order.updatedAt).toLocaleString("vi-VN")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Guide */}
        {!order && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              { title: "Bước 1", desc: "Tìm mã đơn hàng trong email xác nhận hoặc trang Đơn hàng trong tài khoản." },
              { title: "Bước 2", desc: "Nhập mã đơn hàng vào ô tìm kiếm phía trên và nhấn Tra cứu." },
              { title: "Bước 3", desc: "Xem trạng thái đơn hàng và thông tin giao hàng chi tiết." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-base font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <SubscribeSection />
    </>
  );
}
