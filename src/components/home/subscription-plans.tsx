"use client";

import { Users, Crown, Building2, Phone, ArrowRight, Check } from "lucide-react";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                        */
/* ------------------------------------------------------------------ */

interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  users: string;
  price: number | null; // null = contact
  tokens: number | null; // null = contact
  popular: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
}

const plans: SubscriptionPlan[] = [
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
    ctaHref: "/account/token",
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
    ctaHref: "/account/token",
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
    ctaHref: "/account/token",
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function SubscriptionPlans() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <ConcentricCircles
        className="left-[-120px] top-[-80px]"
        size={380}
        color="#6b8fb5"
        opacity={0.04}
      />
      <ConcentricCircles
        className="right-[-100px] bottom-[-80px]"
        size={320}
        color="#8b5cf6"
        opacity={0.04}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Heading */}
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] text-primary font-semibold mb-4 uppercase">
            Bảng giá dịch vụ
          </p>
          <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight">
            Gói phù hợp mọi quy mô
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            Trả theo tháng, không ràng buộc — nâng cấp hoặc hủy bất kỳ lúc nào.
          </p>
        </FadeIn>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan, i) => {
            const Icon = planIcons[i];
            const isContact = plan.price === null;

            return (
              <StaggerItem
                key={plan.id}
                className={`group relative flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1.5 ${
                  plan.popular
                    ? "bg-foreground text-white shadow-2xl shadow-foreground/15 scale-[1.03]"
                    : "bg-muted/30 border border-border/60 hover:border-primary/30 hover:shadow-xl hover:bg-white"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] tracking-[0.2em] font-bold px-5 py-1 rounded-full shadow-lg shadow-amber-500/25 whitespace-nowrap">
                    PHỔ BIẾN NHẤT
                  </span>
                )}

                <div className="flex flex-col flex-1 p-6">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      plan.popular ? "bg-white/15" : "bg-primary/10"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={plan.popular ? "text-white" : "text-primary"}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Name + tagline */}
                  <h4
                    className={`text-base font-bold tracking-tight mb-1 ${
                      plan.popular ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h4>
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      plan.popular ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  {/* Users badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-5 w-fit ${
                      plan.popular
                        ? "bg-white/15 text-white"
                        : "bg-primary/8 text-primary"
                    }`}
                  >
                    <Users size={11} />
                    {plan.users}
                  </span>

                  {/* Price */}
                  <div className="mt-auto mb-1">
                    {isContact ? (
                      <span
                        className={`text-2xl font-extrabold tracking-tight ${
                          plan.popular ? "text-white" : "text-foreground"
                        }`}
                      >
                        Liên hệ
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-2xl font-extrabold tracking-tight ${
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
                      </div>
                    )}
                  </div>

                  {/* Token amount */}
                  <p
                    className={`text-xs font-medium mb-5 ${
                      plan.popular ? "text-amber-300" : "text-primary"
                    }`}
                  >
                    {isContact
                      ? "Token theo nhu cầu"
                      : `${formatTokens(plan.tokens!)} Token/tháng`}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          size={13}
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

                  {/* CTA */}
                  <Link
                    href={plan.ctaHref}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] tracking-widest font-semibold transition-all mt-auto ${
                      plan.popular
                        ? "bg-white text-foreground hover:bg-white/90 shadow-lg"
                        : isContact
                          ? "bg-foreground text-white hover:bg-primary"
                          : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom note */}
        <FadeIn className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Cần thêm Token trong tháng?{" "}
            <Link
              href="/account/token"
              className="text-primary font-semibold hover:underline"
            >
              Nạp thêm bất kỳ lúc nào
            </Link>{" "}
            với giá ưu đãi.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
