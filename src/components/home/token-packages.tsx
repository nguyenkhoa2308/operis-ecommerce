"use client";

import { useState, useEffect } from "react";
import { Zap, Crown, Building2, Infinity, ArrowRight } from "lucide-react";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import Link from "next/link";
import { depositsApi } from "@/lib/api";
import type { PricingTier } from "@/lib/api/deposits";
import { formatPrice } from "@/data/products";
import { formatTokenCount } from "@/data/token-plans";

/* Map tier index to icon/accent for visual variety */
const tierStyles = [
  { icon: Zap, iconBg: "bg-sky-400/15", iconColor: "text-sky-400" },
  { icon: Zap, iconBg: "bg-violet-400/15", iconColor: "text-violet-400" },
  { icon: Crown, iconBg: "bg-amber-400/15", iconColor: "text-amber-400" },
  { icon: Building2, iconBg: "bg-emerald-400/15", iconColor: "text-emerald-400" },
];

export function TokenPackages() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list = await depositsApi.getPricing();
        setTiers(list);
      } catch {
        /* API fail — section stays hidden */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && tiers.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-cta text-white relative overflow-hidden">
      <ConcentricCircles
        className="left-[-150px] top-[-80px]"
        size={400}
        color="#ffffff"
        opacity={0.03}
      />
      <ConcentricCircles
        className="right-[-100px] bottom-[-100px]"
        size={350}
        color="#8b5cf6"
        opacity={0.04}
      />

      {/* Glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-sky-500/6 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-500/6 blur-[100px]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] text-sky-300/70 font-medium mb-4 uppercase">
            Nạp thêm Token
          </p>
          <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight text-white leading-tight">
            Chọn gói phù hợp với bạn
          </h2>
          <p className="text-lg text-white/40 mt-4 max-w-lg mx-auto leading-relaxed">
            Từ cá nhân đến doanh nghiệp — luôn có gói Token tối ưu cho nhu cầu của bạn.
          </p>
        </FadeIn>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-7 bg-white/[0.06] border border-white/8 space-y-5"
              >
                <div className="w-11 h-11 rounded-xl skeleton-shimmer" />
                <div className="h-4 w-24 skeleton-shimmer rounded" />
                <div className="h-8 w-32 skeleton-shimmer rounded" />
                <div className="h-3 w-full skeleton-shimmer rounded" />
                <div className="h-3 w-3/4 skeleton-shimmer rounded" />
                <div className="h-11 w-full skeleton-shimmer rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              tiers.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } gap-5 items-stretch`}
          >
            {tiers.map((tier, i) => {
              const isContact = tier.price === 0 && tier.tokens === 0;
              const isUnlimited = tier.tokens === -1;
              const style = tierStyles[i % tierStyles.length];
              const Icon = tier.popular ? Crown : isUnlimited ? Infinity : style.icon;

              return (
                <StaggerItem
                  key={tier.id}
                  className={`group relative flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1.5 ${
                    tier.popular
                      ? "bg-white text-foreground shadow-2xl shadow-white/10 scale-[1.02] lg:scale-[1.04]"
                      : "bg-white/[0.06] backdrop-blur-sm border border-white/8 hover:bg-white/[0.1] hover:border-white/15"
                  }`}
                >
                  {/* Popular badge */}
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] tracking-[0.2em] font-bold px-5 py-1 rounded-full shadow-lg shadow-amber-500/25 whitespace-nowrap">
                      PHỔ BIẾN NHẤT
                    </span>
                  )}

                  <div className="flex flex-col flex-1 p-7">
                    {/* Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                        tier.popular ? "bg-amber-50" : style.iconBg
                      }`}
                    >
                      <Icon
                        size={20}
                        className={tier.popular ? "text-amber-500" : style.iconColor}
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Name */}
                    <h4
                      className={`text-base font-bold tracking-tight mb-1.5 ${
                        tier.popular ? "text-foreground" : "text-white"
                      }`}
                    >
                      {tier.name}
                    </h4>

                    {/* Description */}
                    {tier.description && (
                      <p
                        className={`text-base leading-relaxed mb-5 ${
                          tier.popular ? "text-muted-foreground" : "text-white/40"
                        }`}
                      >
                        {tier.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mb-1 mt-auto">
                      <span
                        className={`text-3xl font-extrabold tracking-tight ${
                          tier.popular ? "text-foreground" : "text-white"
                        }`}
                      >
                        {isContact ? "Liên hệ" : formatPrice(tier.price)}
                      </span>
                    </div>

                    {/* Token amount */}
                    <p
                      className={`text-base font-medium mb-6 ${
                        tier.popular ? "text-primary" : "text-white/50"
                      }`}
                    >
                      {isContact
                        ? "Giá tùy theo quy mô"
                        : isUnlimited
                          ? "Không giới hạn Token"
                          : `${formatTokenCount(tier.tokens)} Token`}
                    </p>

                    {/* Bonus */}
                    {tier.bonus > 0 && (
                      <p className="text-sm text-emerald-400 font-medium -mt-4 mb-6">
                        + {formatTokenCount(tier.bonus)} Token bonus
                      </p>
                    )}

                    {/* CTA */}
                    <Link
                      href={isContact ? "/contact" : `/account/token?tier=${tier.id}`}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs tracking-widest font-semibold transition-all cursor-pointer ${
                        tier.popular
                          ? "bg-foreground text-white hover:bg-foreground/90 shadow-lg shadow-foreground/20"
                          : "bg-white/8 text-white border border-white/10 hover:bg-white/15 hover:border-white/20"
                      }`}
                    >
                      {isContact ? "LIÊN HỆ TƯ VẤN" : "NẠP NGAY"}
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
