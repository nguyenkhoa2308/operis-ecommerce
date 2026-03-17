"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, MessageSquare, Check, Users, Crown, Building2, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";
import { formatTokenCount } from "@/data/token-plans";
import { formatPrice } from "@/data/products";
import {
  DepositQrModal,
  type DepositInfo,
} from "@/components/account/deposit-qr-modal";
import { depositsApi } from "@/lib/api";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import type { PricingTier } from "@/lib/api/deposits";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TokenPage() {
  const tierParam = useSearchParams().get("tier");
  const { user, setTokenBalance } = useAuthStore();
  const { addToast } = useToastStore();

  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loadingTiers, setLoadingTiers] = useState(true);

  /* Deposit form state */
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /* QR modal */
  const [qrDeposit, setQrDeposit] = useState<DepositInfo | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [checking, setChecking] = useState(false);

  /* Pending deposit */
  const [pendingDeposit, setPendingDeposit] = useState<DepositInfo | null>(
    null,
  );
  const [loadingPending, setLoadingPending] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  /* Tab */
  const [activeTab, setActiveTab] = useState<"token" | "plans">("token");

  /* ---------------------------------------------------------------- */
  /*  Load pricing tiers + check pending deposit                       */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    (async () => {
      try {
        const [list] = await Promise.all([
          depositsApi.getPricing(),
          new Promise((r) => setTimeout(r, 500)),
        ]);
        setTiers(list);
        if (list.length > 0) {
          const match = tierParam && list.find((t) => t.id === tierParam);
          setSelectedTier(match ? match.id : (list.find((t) => t.popular)?.id ?? list[0].id));
        }
      } catch {
        /* If API fails, keep empty — only custom mode available */
      } finally {
        setLoadingTiers(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [pending] = await Promise.all([
          depositsApi.getPending(),
          new Promise((r) => setTimeout(r, 500)),
        ]);
        if (pending && pending.type === "token") setPendingDeposit(pending);
      } catch {
        /* No pending deposit or API error — allow new deposit */
      } finally {
        setLoadingPending(false);
      }
    })();
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Create deposit → get QR from API                                 */
  /* ---------------------------------------------------------------- */

  const handleDeposit = async () => {
    if (!selectedTier) return;
    const body = { tierId: selectedTier };

    setSubmitting(true);
    try {
      const deposit = await depositsApi.createDeposit(body);
      setQrDeposit(deposit);
      setPendingDeposit(deposit);
      setQrOpen(true);
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : "Tạo đơn nạp thất bại",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Check deposit status via API                                     */
  /* ---------------------------------------------------------------- */

  const handleCheckDeposit = async () => {
    if (!qrDeposit) return;
    setChecking(true);
    try {
      const result = await depositsApi.getDeposit(qrDeposit.id);
      setQrDeposit((prev) =>
        prev ? { ...prev, status: result.status } : prev,
      );

      if (result.status === "completed" || result.status === "success") {
        addToast("Nạp tiền thành công!", "success");
        if (result.tokenBalance != null) setTokenBalance(result.tokenBalance);
        setPendingDeposit(null);
      } else {
        addToast("Chưa nhận được thanh toán. Vui lòng thử lại.", "error");
      }
    } catch {
      addToast("Không thể kiểm tra giao dịch", "error");
    } finally {
      setChecking(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Cancel pending deposit                                           */
  /* ---------------------------------------------------------------- */

  const handleCancelDeposit = async () => {
    if (!pendingDeposit) return;
    setCancelling(true);
    try {
      await depositsApi.cancelDeposit(pendingDeposit.id);
      addToast("Đã huỷ đơn nạp", "success");
      setPendingDeposit(null);
      setQrOpen(false);
      setQrDeposit(null);
    } catch {
      addToast("Không thể huỷ đơn nạp", "error");
    } finally {
      setCancelling(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div>
      <h2 className="text-sm font-semibold tracking-widest uppercase mb-6">
        Token & Gói dịch vụ
      </h2>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl p-8 mb-8">
        <p className="text-sm opacity-90 mb-2">Số dư token</p>
        <div className="relative group w-fit">
          <p className="text-5xl font-bold tracking-tight cursor-default">
            {formatTokenCount(user?.tokenBalance || 0)}
          </p>
          {/* Custom tooltip */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full
            opacity-0 group-hover:opacity-100 pointer-events-none
            transition-all duration-200 scale-95 group-hover:scale-100"
          >
            <div className="bg-white text-foreground text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              {(user?.tokenBalance || 0).toLocaleString("vi-VN")} token
            </div>
            <div className="w-2 h-2 bg-white rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1 shadow-sm" />
          </div>
        </div>
        <p className="text-sm opacity-90 mt-1">token còn lại</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("token")}
          className={`flex-1 text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "token"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Nạp Token
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("plans")}
          className={`flex-1 text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "plans"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Gói dịch vụ
        </button>
      </div>

      {/* ---- Tab: Nạp Token ---- */}
      {activeTab === "token" && <>
      {/* Pending deposit banner */}
      {loadingPending ? (
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="h-10 w-28 skeleton-shimmer rounded" />
            <div className="h-10 w-32 skeleton-shimmer rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border-2 border-border rounded-xl p-5 space-y-3"
              >
                <div className="flex justify-between">
                  <div className="h-5 w-24 skeleton-shimmer rounded" />
                  <div className="w-5 h-5 rounded-full skeleton-shimmer" />
                </div>
                <div className="h-7 w-32 skeleton-shimmer rounded" />
                <div className="h-3.5 w-20 skeleton-shimmer rounded" />
              </div>
            ))}
          </div>
          <div className="h-12 w-44 skeleton-shimmer rounded" />
        </div>
      ) : pendingDeposit ? (
        <div className="border-2 border-amber-300 bg-amber-50 rounded-xl p-6 mb-8 animate-fade-in">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Bạn có giao dịch đang chờ thanh toán
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Vui lòng hoàn tất giao dịch hiện tại trước khi tạo đơn nạp mới.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Số tiền</span>
              <span className="font-semibold text-primary">
                {formatPrice(pendingDeposit.amount)}
              </span>
            </div>
            {pendingDeposit.tokens != null && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Token nhận được</span>
                <span className="font-medium">
                  {formatTokenCount(pendingDeposit.tokens)}
                </span>
              </div>
            )}
            {pendingDeposit.bankName && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ngân hàng</span>
                <span className="font-medium">{pendingDeposit.bankName}</span>
              </div>
            )}
            {pendingDeposit.transferContent && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nội dung CK</span>
                <span className="font-semibold text-primary font-mono">
                  {pendingDeposit.transferContent}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setQrDeposit(pendingDeposit);
                setQrOpen(true);
              }}
              className="flex-1 bg-amber-600 text-white text-xs tracking-widest py-3.5 hover:bg-amber-700 transition-colors rounded flex items-center justify-center gap-2"
            >
              XEM MÃ QR & THANH TOÁN
            </button>
            <button
              type="button"
              onClick={() => setShowCancelConfirm(true)}
              disabled={cancelling}
              className="bg-white border border-red-300 text-red-600 text-xs tracking-widest px-5 py-3.5 hover:bg-red-50 transition-colors rounded flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {cancelling && <Loader2 size={14} className="animate-spin" />}
              HUỶ ĐƠN
            </button>
          </div>
        </div>
      ) : (
        /* Deposit section — only shown when no pending deposit */
        <div className="space-y-6 animate-fade-in">
          {/* Tier selection */}
          {loadingTiers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-border rounded-xl p-5 space-y-3"
                >
                  <div className="flex justify-between">
                    <div className="h-5 w-24 skeleton-shimmer rounded" />
                    <div className="w-5 h-5 rounded-full skeleton-shimmer" />
                  </div>
                  <div className="h-7 w-32 skeleton-shimmer rounded" />
                  <div className="h-3.5 w-20 skeleton-shimmer rounded" />
                </div>
              ))}
            </div>
          ) : tiers.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Chưa có gói nạp. Vui lòng sử dụng chức năng nhập số tiền.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {tiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative text-left bg-white border-2 rounded-xl p-5 transition-all hover:shadow-md cursor-pointer ${
                      isSelected ? "border-primary shadow-md" : "border-border"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-4 bg-primary text-white text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full">
                        PHỔ BIẾN
                      </span>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-base font-semibold">{tier.name}</h3>
                      {/* Radio indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? "border-primary" : "border-border"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>

                    <p className="text-2xl font-bold text-primary mb-0.5">
                      {tier.price === 0 ? "Liên hệ" : formatPrice(tier.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTokenCount(tier.tokens)} token
                    </p>
                    {tier.bonus > 0 && (
                      <p className="text-xs text-green-600 font-medium mt-1">
                        + {formatTokenCount(tier.bonus)} token bonus
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Submit button */}
          {(() => {
            const sel = tiers.find((t) => t.id === selectedTier);
            const isContact = sel?.price === 0 && sel?.tokens === 0;
            return isContact ? (
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest px-8 py-3.5 hover:bg-primary/90 transition-colors rounded cursor-pointer"
              >
                <MessageSquare size={14} />
                LIÊN HỆ TƯ VẤN
              </a>
            ) : (
              <button
                type="button"
                onClick={handleDeposit}
                disabled={submitting || !selectedTier}
                className="bg-primary text-white text-xs tracking-widest px-8 py-3.5 hover:bg-primary/90 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                THANH TOÁN QR
              </button>
            );
          })()}
        </div>
      )}

      </>}

      {/* ---- Tab: Gói dịch vụ ---- */}
      {activeTab === "plans" && <SubscriptionPlansTab />}

      {/* QR Payment Modal */}
      <DepositQrModal
        open={qrOpen}
        deposit={qrDeposit}
        checking={checking}
        onCheck={handleCheckDeposit}
        onClose={() => setQrOpen(false)}
      />

      <ConfirmModal
        open={showCancelConfirm}
        title="Huỷ đơn nạp?"
        message="Đơn nạp token sẽ bị huỷ và không thể khôi phục. Bạn có chắc chắn?"
        confirmLabel="Huỷ đơn nạp"
        cancelLabel="Quay lại"
        loading={cancelling}
        onConfirm={() => {
          handleCancelDeposit();
          setShowCancelConfirm(false);
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Subscription Plans Tab                                              */
/* ------------------------------------------------------------------ */

interface Plan {
  id: string;
  name: string;
  tagline: string;
  users: string;
  price: number | null;
  tokens: number | null;
  popular: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Nhóm nhỏ & startup",
    users: "Tối đa 5 người",
    price: 1_500_000,
    tokens: 100_000_000,
    popular: false,
    features: [
      "Tối đa 5 tài khoản",
      "100M Token/tháng (dùng chung)",
      "Quản lý thành viên nhóm",
      "Dashboard theo dõi usage",
      "Hỗ trợ ưu tiên",
    ],
    cta: "BẮT ĐẦU NGAY",
    ctaHref: "/contact",
  },
  {
    id: "team",
    name: "Team",
    tagline: "Doanh nghiệp vừa",
    users: "5 – 10 người",
    price: 5_500_000,
    tokens: 100_000_000,
    popular: true,
    features: [
      "5 – 10 tài khoản",
      "100M Token/tháng (dùng chung)",
      "Phân quyền thành viên",
      "Dashboard & báo cáo chi tiết",
      "Hỗ trợ 24/7",
      "Onboarding có hỗ trợ",
    ],
    cta: "ĐĂNG KÝ NGAY",
    ctaHref: "/contact",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Doanh nghiệp lớn",
    users: "10 – 20 người",
    price: 15_000_000,
    tokens: 200_000_000,
    popular: false,
    features: [
      "10 – 20 tài khoản",
      "200M Token/tháng (dùng chung)",
      "Phân quyền nâng cao",
      "API rate limit cao hơn",
      "SLA 99.9% uptime",
      "Dedicated support",
      "Custom workflow theo yêu cầu",
    ],
    cta: "ĐĂNG KÝ NGAY",
    ctaHref: "/contact",
  },
  {
    id: "corporate",
    name: "Corporate",
    tagline: "Tập đoàn & quy mô lớn",
    users: "Trên 20 người",
    price: null,
    tokens: null,
    popular: false,
    features: [
      "Không giới hạn tài khoản",
      "Token theo nhu cầu thực tế",
      "Hạ tầng riêng (on-premise)",
      "Tích hợp hệ thống nội bộ",
      "SLA tùy chỉnh",
      "Dedicated account manager",
      "Training & triển khai tận nơi",
    ],
    cta: "LIÊN HỆ TƯ VẤN",
    ctaHref: "/contact",
  },
];

const planIcons = [Users, Crown, Building2, Phone];

function formatVnd(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}tr`;
  }
  return `${(amount / 1_000).toFixed(0)}k`;
}

function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000_000) return `${(tokens / 1_000_000_000).toFixed(0)}B`;
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(0)}M`;
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`;
  return tokens.toString();
}

function SubscriptionPlansTab() {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Chọn gói phù hợp với quy mô đội nhóm của bạn. Trả theo tháng, không ràng buộc.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan, i) => {
          const Icon = planIcons[i];
          const isContact = plan.price === null;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-xl transition-all ${
                plan.popular
                  ? "bg-foreground text-white shadow-lg border-2 border-foreground"
                  : "bg-white border-2 border-border hover:border-primary/30 hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] tracking-[0.2em] font-bold px-4 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  PHỔ BIẾN NHẤT
                </span>
              )}

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      plan.popular ? "bg-white/15" : "bg-primary/10"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={plan.popular ? "text-white" : "text-primary"}
                    />
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        plan.popular ? "text-white" : "text-foreground"
                      }`}
                    >
                      {plan.name}
                    </h4>
                    <p
                      className={`text-[11px] ${
                        plan.popular ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  {isContact ? (
                    <span
                      className={`text-xl font-extrabold ${
                        plan.popular ? "text-white" : "text-foreground"
                      }`}
                    >
                      Liên hệ
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-xl font-extrabold ${
                          plan.popular ? "text-white" : "text-foreground"
                        }`}
                      >
                        {formatVnd(plan.price!)}đ
                      </span>
                      <span
                        className={`text-xs ${
                          plan.popular ? "text-white/50" : "text-muted-foreground"
                        }`}
                      >
                        /tháng
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[11px] font-medium ${
                      plan.popular ? "text-amber-300" : "text-primary"
                    }`}
                  >
                    {isContact ? "Token theo nhu cầu" : `${formatTokens(plan.tokens!)} Token/tháng`}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      plan.popular ? "bg-white/15 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Users size={10} className="inline -mt-0.5 mr-1" />
                    {plan.users}
                  </span>
                </div>

                <ul className="space-y-1.5 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        size={12}
                        className={`shrink-0 mt-0.5 ${
                          plan.popular ? "text-amber-300" : "text-emerald-500"
                        }`}
                        strokeWidth={2.5}
                      />
                      <span
                        className={`text-xs leading-relaxed ${
                          plan.popular ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] tracking-widest font-semibold transition-all mt-auto ${
                    plan.popular
                      ? "bg-white text-foreground hover:bg-white/90"
                      : isContact
                        ? "bg-foreground text-white hover:bg-primary"
                        : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        Cần thêm Token trong tháng?{" "}
        <button
          type="button"
          className="text-primary font-semibold hover:underline"
        >
          Chuyển sang tab Nạp Token
        </button>{" "}
        để mua thêm bất kỳ lúc nào.
      </p>
    </div>
  );
}
