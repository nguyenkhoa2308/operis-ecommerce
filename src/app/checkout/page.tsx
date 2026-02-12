"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, ChevronLeft, LogIn, Loader2, CheckCircle2, X, XCircle, Clock, Copy, Check } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { LocationSelect } from "@/components/ui/location-select";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";
import { useProvinces, useWards } from "@/hooks/use-provinces";
import { formatPrice } from "@/data/products";
import { ordersApi } from "@/lib/api";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import type { OrderPaymentInfo } from "@/lib/api/orders";

const SHIPPING_FEE = 0; // Miễn phí vận chuyển

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const addToast = useToastStore((s) => s.addToast);
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* QR payment state */
  const [paymentInfo, setPaymentInfo] = useState<OrderPaymentInfo | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [checking, setChecking] = useState(false);

  /* Location state */
  const [provinceCode, setProvinceCode] = useState<number | null>(null);
  const [provinceName, setProvinceName] = useState("");
  const [wardCode, setWardCode] = useState<number | null>(null);
  const [wardName, setWardName] = useState("");

  const { provinces, loading: loadingProvinces } = useProvinces();
  const { wards, loading: loadingWards } = useWards(provinceCode);

  const subtotal = totalPrice();
  const total = subtotal + SHIPPING_FEE;


  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) errs.phone = "Vui lòng nhập số điện thoại";
    else if (!/^(0|\+84)\d{9,10}$/.test(form.phone.trim())) errs.phone = "Số điện thoại không hợp lệ";
    if (!form.email.trim()) errs.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email.trim())) errs.email = "Email không hợp lệ";
    if (!form.address.trim()) errs.address = "Vui lòng nhập địa chỉ";
    if (!provinceCode) errs.city = "Vui lòng chọn tỉnh/thành phố";
    if (!wardCode) errs.ward = "Vui lòng chọn phường/xã";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirm(true);
  };

  /* Manual check payment status */
  const onCheckPayment = async () => {
    if (!orderId) return;
    setChecking(true);
    try {
      const order = await ordersApi.getOrder(orderId);
      if (order.status !== "pending") {
        setPaymentSuccess(true);
        addToast("Thanh toán thành công! Đơn hàng đã được xác nhận.", "success");
      } else {
        addToast("Chưa nhận được thanh toán. Vui lòng thử lại sau.", "error");
      }
    } catch {
      addToast("Không thể kiểm tra. Vui lòng thử lại.", "error");
    } finally {
      setChecking(false);
    }
  };

  const handleConfirmOrder = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    try {
      const fullAddress = `${form.address}, ${wardName}, ${provinceName}`;
      const res = await ordersApi.createOrder({
        items: items.map((i) => ({ product_slug: i.product.slug, quantity: i.quantity })),
        shipping_name: form.name.trim(),
        shipping_phone: form.phone.trim(),
        shipping_address: fullAddress,
        shipping_note: form.note.trim() || undefined,
      });
      setOrderId(res.order.id);
      setPaymentInfo(res.payment);
      setQrOpen(true);
      clearCart();
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Đặt hàng thất bại. Vui lòng thử lại.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseQr = () => {
    setQrOpen(false);
    if (paymentSuccess) {
      router.push("/account/orders");
    }
  };

  const handleCancelOrder = async () => {
    if (!orderId) return;
    try {
      await ordersApi.cancelOrder(orderId);
      addToast("Đơn hàng đã được hủy.");
    } catch {
      addToast("Không thể hủy đơn hàng.", "error");
    }
    setQrOpen(false);
    setPaymentInfo(null);
    setOrderId(null);
  };

  if (items.length === 0 && !qrOpen) {
    return (
      <>
        <PageBanner
          title="THANH TOÁN"
          breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng", href: "/cart" }, { label: "Thanh toán" }]}
        />
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground mb-4">Giỏ hàng trống, không có gì để thanh toán.</p>
          <Link href="/shop" className="bg-foreground text-white text-xs tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors inline-block">
            ĐẾN CỬA HÀNG
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner
        title="THANH TOÁN"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng", href: "/cart" }, { label: "Thanh toán" }]}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Login gate overlay */}
        {!isLoggedIn && (
          <div className="absolute inset-0 z-20 flex items-start justify-center pt-32 bg-white/60 backdrop-blur-[2px]">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <LogIn size={28} className="text-primary" />
              </div>
              <p className="text-lg font-semibold mb-2">Đăng nhập để thanh toán</p>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục đặt hàng.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/login?redirect=/checkout"
                  className="w-full bg-primary text-white text-sm tracking-wider py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
                  ĐĂNG NHẬP
                </Link>
                <Link
                  href="/register?redirect=/checkout"
                  className="w-full border border-border text-sm tracking-wider py-3 rounded-lg hover:bg-muted transition-colors font-medium text-center"
                >
                  ĐĂNG KÝ TÀI KHOẢN
                </Link>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={!isLoggedIn ? "pointer-events-none select-none" : ""}>
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Cột trái — Form thông tin */}
          <div className="flex-1 space-y-8">

            {/* Thông tin giao hàng */}
            <div>
              <h2 className="text-sm font-semibold tracking-widest mb-5 flex items-center gap-2">
                <Truck size={18} className="text-primary" />
                THÔNG TIN GIAO HÀNG
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Họ và tên *" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                <Field label="Số điện thoại *" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
                <Field label="Email *" name="email" value={form.email} onChange={handleChange} error={errors.email} />
                <LocationSelect
                  label="Tỉnh / Thành phố *"
                  placeholder="Chọn tỉnh/thành phố"
                  options={provinces}
                  value={provinceCode}
                  loading={loadingProvinces}
                  error={errors.city}
                  onChange={(code, name) => {
                    setProvinceCode(code);
                    setProvinceName(name);
                    setWardCode(null);
                    setWardName("");
                    if (errors.city) setErrors((prev) => { const next = { ...prev }; delete next.city; return next; });
                  }}
                />
                <LocationSelect
                  label="Phường / Xã *"
                  placeholder="Chọn phường/xã"
                  options={wards}
                  value={wardCode}
                  loading={loadingWards}
                  disabled={!provinceCode}
                  error={errors.ward}
                  onChange={(code, name) => {
                    setWardCode(code);
                    setWardName(name);
                    if (errors.ward) setErrors((prev) => { const next = { ...prev }; delete next.ward; return next; });
                  }}
                />
                <div className="md:col-span-2">
                  <Field label="Địa chỉ cụ thể *" name="address" value={form.address} onChange={handleChange} error={errors.address} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground/80 mb-1.5 block">Ghi chú đơn hàng</label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Ví dụ: Giao trong giờ hành chính..."
                    className="w-full border border-border px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment method info (read-only) */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
              <ShieldCheck size={20} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Thanh toán chuyển khoản ngân hàng</p>
                <p className="text-xs text-muted-foreground">Quét mã QR sau khi đặt hàng để hoàn tất thanh toán</p>
              </div>
            </div>
          </div>

          {/* Cột phải — Tóm tắt đơn hàng */}
          <div className="lg:w-[400px] shrink-0">
            <div className="bg-muted p-6 sticky top-24">
              <h2 className="text-sm font-semibold tracking-widest mb-5">ĐƠN HÀNG CỦA BẠN</h2>

              {/* Danh sách sản phẩm */}
              <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pt-2 pr-2">
                {items.map((item) => (
                  <div key={item.product.slug} className="flex items-center gap-3">
                    <Link href={`/shop/${item.product.slug}`} className="relative w-14 h-14 bg-white shrink-0 block">
                      <Image src={item.product.image} alt={item.product.name} fill sizes="56px" className="object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/${item.product.slug}`} className="text-xs font-medium truncate block hover:text-primary transition-colors">{item.product.name}</Link>
                      <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)}</p>
                    </div>
                    <p className="text-sm font-medium shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Tổng */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>Tổng cộng</span>
                  <span className="text-primary text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Nút đặt hàng */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 bg-primary text-white text-sm tracking-widest py-3.5 hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ShieldCheck size={18} />
                )}
                {submitting ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
              </button>

              <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng và chính sách bảo mật của Operis.
              </p>

              <Link href="/cart" className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-4">
                <ChevronLeft size={14} /> Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </form>
      </div>

      {/* Confirm order modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-primary/5 px-6 py-5 text-center border-b border-border">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={28} className="text-primary" />
              </div>
              <p className="text-lg font-semibold">Xác nhận đặt hàng</p>
              <p className="text-sm text-muted-foreground mt-1">Vui lòng kiểm tra lại thông tin</p>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Thông tin giao hàng */}
              <div>
                <p className="text-xs font-semibold tracking-wider text-muted-foreground mb-2">GIAO HÀNG</p>
                <div className="bg-muted rounded-lg p-3 space-y-1 text-sm">
                  <p className="font-medium">{form.name}</p>
                  <p className="text-muted-foreground">{form.phone}</p>
                  <p className="text-muted-foreground">{form.email}</p>
                  <p className="text-muted-foreground">{form.address}, {wardName}, {provinceName}</p>
                  {form.note && <p className="text-muted-foreground italic">&quot;{form.note}&quot;</p>}
                </div>
              </div>

              {/* Thanh toán */}
              <div>
                <p className="text-xs font-semibold tracking-wider text-muted-foreground mb-2">THANH TOÁN</p>
                <div className="bg-muted rounded-lg p-3 text-sm font-medium">Chuyển khoản ngân hàng (QR)</div>
              </div>

              {/* Sản phẩm */}
              <div>
                <p className="text-xs font-semibold tracking-wider text-muted-foreground mb-2">SẢN PHẨM ({items.length})</p>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.slug} className="flex items-center gap-3">
                      <div className="relative w-11 h-11 bg-muted shrink-0 rounded">
                        <Image src={item.product.image} alt={item.product.name} fill sizes="44px" className="object-cover rounded" />
                        <span className="absolute -top-1 -right-1 text-[8px] bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center font-medium">
                          {item.quantity}
                        </span>
                      </div>
                      <p className="text-sm flex-1 min-w-0 truncate">{item.product.name}</p>
                      <p className="text-sm font-medium shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tổng */}
              <div className="border-t border-border pt-3 flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Tổng cộng</span>
                <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-border flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
                className="flex-1 border border-border text-sm tracking-wider py-3 rounded-lg hover:bg-muted transition-colors font-medium disabled:opacity-50"
              >
                QUAY LẠI
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={submitting}
                className="flex-1 bg-primary text-white text-sm tracking-wider py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ShieldCheck size={16} />
                )}
                {submitting ? "ĐANG XỬ LÝ..." : "XÁC NHẬN"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Payment modal */}
      {qrOpen && paymentInfo && (
        <QrPaymentModal
          paymentInfo={paymentInfo}
          paymentSuccess={paymentSuccess}
          checking={checking}
          onCheckPayment={onCheckPayment}
          onClose={handleCloseQr}
          onCancel={handleCancelOrder}
          onViewOrders={() => router.push("/account/orders")}
        />
      )}
    </>
  );
}

/* ── Sub-components ── */

function Field({ label, name, value, onChange, error }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-foreground/80 mb-1.5 block">{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border px-4 py-2.5 text-sm outline-none transition-colors ${
          error ? "border-red-400 focus:border-red-500" : "border-border focus:border-primary"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

/* ── Copyable bank info row ── */

function CopyableRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <div className="flex items-center gap-1.5 min-w-0">
        <span className={`truncate font-mono ${highlight ? "font-bold text-primary" : "font-medium"}`}>{value}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5"
          aria-label={`Sao chép ${label}`}
        >
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
        </button>
      </div>
    </div>
  );
}

/* ── QR Payment modal ── */

function QrPaymentModal({
  paymentInfo,
  paymentSuccess,
  checking,
  onCheckPayment,
  onClose,
  onCancel,
  onViewOrders,
}: {
  paymentInfo: OrderPaymentInfo;
  paymentSuccess: boolean;
  checking: boolean;
  onCheckPayment: () => void;
  onClose: () => void;
  onCancel: () => void;
  onViewOrders: () => void;
}) {
  const pi = paymentInfo.paymentInfo;

  /* Confirm cancel state */
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  /* Countdown timer */
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!paymentInfo.expiresAt || paymentSuccess) return;
    const update = () => {
      const diff = new Date(paymentInfo.expiresAt).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Hết hạn"); return; }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${m}:${s.toString().padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [paymentInfo.expiresAt, paymentSuccess]);

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {paymentSuccess ? (
          /* ── Success state ── */
          <div className="px-8 py-10 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <p className="text-xl font-semibold mb-2">Thanh toán thành công!</p>
            <p className="text-sm text-muted-foreground mb-6">
              Đơn hàng của bạn đã được xác nhận và đang được xử lý.
            </p>
            <button
              type="button"
              onClick={onViewOrders}
              className="bg-primary text-white text-sm tracking-widest px-10 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              XEM ĐƠN HÀNG
            </button>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="relative bg-gradient-to-b from-primary/5 to-transparent px-6 pt-5 pb-4">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
              <p className="text-xs tracking-widest text-primary font-medium mb-1">THANH TOÁN ĐƠN HÀNG</p>
              <p className="text-3xl font-bold text-foreground">{formatPrice(paymentInfo.amountVnd)}</p>
              {timeLeft && (
                <div className="flex items-center gap-1.5 mt-2">
                  <Clock size={12} className={timeLeft === "Hết hạn" ? "text-red-500" : "text-muted-foreground"} />
                  <span className={`text-xs font-mono ${timeLeft === "Hết hạn" ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
                    {timeLeft === "Hết hạn" ? "Mã QR đã hết hạn" : `Còn lại ${timeLeft}`}
                  </span>
                </div>
              )}
            </div>

            {/* ── QR Code ── */}
            {pi.qrCodeUrl && (
              <div className="flex justify-center px-6 py-4">
                <div className="border-2 border-primary/20 rounded-2xl p-3 bg-white shadow-sm">
                  <img
                    src={pi.qrCodeUrl}
                    alt="QR thanh toán"
                    width={240}
                    height={240}
                    className="rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* ── Bank info ── */}
            <div className="mx-6 mb-4 bg-muted/60 rounded-xl p-4 space-y-2.5">
              <CopyableRow label="Ngân hàng" value={pi.bankName} />
              <CopyableRow label="Số tài khoản" value={pi.accountNumber} />
              <CopyableRow label="Chủ TK" value={pi.accountName} />
              <div className="border-t border-border pt-2.5">
                <CopyableRow label="Nội dung CK" value={pi.transferContent} highlight />
              </div>
            </div>

            {/* ── Check payment button ── */}
            <div className="mx-6 mb-4">
              <button
                type="button"
                onClick={onCheckPayment}
                disabled={checking}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Loader2 size={14} className={checking ? "animate-spin" : "hidden"} />
                {!checking && <CheckCircle2 size={14} />}
                {checking ? "Đang kiểm tra..." : "Kiểm tra thanh toán"}
              </button>
            </div>

            {/* ── Instructions ── */}
            <p className="text-[11px] text-muted-foreground text-center mx-6 mb-5 leading-relaxed">
              Quét mã QR hoặc chuyển khoản theo thông tin trên.<br />
              Sau đó bấm nút <span className="font-medium text-foreground">kiểm tra thanh toán</span> để xác nhận.
            </p>

            {/* ── Cancel button ── */}
            <div className="border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => setShowCancelConfirm(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-sm font-medium rounded-lg py-2.5 hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                <XCircle size={16} />
                HỦY ĐƠN HÀNG
              </button>
            </div>

            {/* Confirm cancel modal */}
            <ConfirmModal
              open={showCancelConfirm}
              title="Hủy đơn hàng?"
              message="Đơn hàng sẽ bị hủy và bạn sẽ cần đặt lại từ đầu. Bạn có chắc chắn?"
              confirmLabel="Hủy đơn hàng"
              cancelLabel="Quay lại"
              onConfirm={() => { setShowCancelConfirm(false); onCancel(); }}
              onCancel={() => setShowCancelConfirm(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}
