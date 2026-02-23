"use client";

import { Zap, Crown, Building2, Check } from "lucide-react";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import Link from "next/link";

const packages = [
  {
    name: "Gói Thuê bao",
    price: "200.000₫",
    tokens: "1.000.000 Token",
    per: "lần nạp",
    desc: "Phù hợp dùng thử, bổ sung khi cần.",
    features: ["Dùng mọi Workflow", "Hỗ trợ email"],
    icon: Zap,
    accent: "sky",
  },
  {
    name: "Gói Tháng 1",
    price: "2.500.000₫",
    tokens: "200 triệu Token",
    per: "tháng",
    desc: "Sử dụng hàng ngày, tiết kiệm hơn 80%.",
    features: ["Dùng mọi Workflow", "Hỗ trợ ưu tiên", "Tiết kiệm 80%"],
    icon: Zap,
    accent: "violet",
  },
  {
    name: "Gói Tháng 2",
    badge: "VIP",
    price: "6.000.000₫",
    tokens: "KHÔNG GIỚI HẠN",
    per: "tháng",
    desc: "Dùng thoải mái, không lo hết Token.",
    features: [
      "Dùng mọi Workflow",
      "Hỗ trợ 24/7 ưu tiên",
      "Không giới hạn Token",
      "Cố vấn riêng",
    ],
    icon: Crown,
    highlight: true,
    accent: "amber",
  },
  {
    name: "Gói Doanh nghiệp",
    price: "Liên hệ",
    tokens: "Theo quy mô",
    per: "",
    desc: "Tùy chỉnh theo quy mô doanh nghiệp.",
    features: [
      "Mọi tính năng VIP",
      "SLA cam kết",
      "Đào tạo & onboarding",
      "Hóa đơn VAT",
    ],
    icon: Building2,
    contact: true,
    accent: "emerald",
  },
];

export function TokenPackages() {
  return (
    <section className="py-20 bg-gradient-cta text-white relative overflow-hidden">
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
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-violet/8 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-12">
          <p className="text-sm tracking-widest text-sky/80 font-medium mb-3">
            NẠP THÊM TOKEN
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            GÓI TOKEN
          </h2>
          <p className="text-base text-white/50 mt-3 max-w-md mx-auto">
            Chọn gói Token phù hợp với nhu cầu sử dụng Workflow của bạn.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg) => (
            <StaggerItem
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                pkg.highlight
                  ? "bg-white text-foreground shadow-2xl shadow-white/10 scale-[1.03] ring-2 ring-white/20"
                  : "bg-white/[0.07] backdrop-blur-sm border border-white/10 hover:bg-white/[0.12] hover:border-white/20"
              }`}
            >
              {/* VIP badge */}
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber to-orange text-white text-[10px] tracking-widest font-bold px-4 py-1 rounded-full shadow-lg">
                  {pkg.badge}
                </span>
              )}

              {/* Name + icon */}
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    pkg.highlight ? "bg-amber/10" : "bg-white/10"
                  }`}
                >
                  <pkg.icon
                    size={17}
                    className={pkg.highlight ? "text-amber" : "text-white/80"}
                    strokeWidth={1.5}
                  />
                </div>
                <h4
                  className={`text-sm font-bold tracking-tight ${pkg.highlight ? "text-foreground" : "text-white"}`}
                >
                  {pkg.name}
                </h4>
              </div>

              {/* Token amount — hero number */}
              <p
                className={`text-lg font-extrabold mb-1 ${pkg.highlight ? "text-primary" : "text-white"}`}
              >
                {pkg.tokens}
              </p>

              {/* Description */}
              <p
                className={`text-sm mb-5 leading-relaxed ${pkg.highlight ? "text-muted-foreground" : "text-white/50"}`}
              >
                {pkg.desc}
              </p>

              {/* Price */}
              <div className="mb-5">
                <span
                  className={`text-3xl font-extrabold ${pkg.highlight ? "text-foreground" : "text-white"}`}
                >
                  {pkg.price}
                </span>
                {pkg.per && (
                  <span
                    className={`text-sm ml-1 ${pkg.highlight ? "text-muted-foreground" : "text-white/40"}`}
                  >
                    /{pkg.per}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 mt-auto">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2 text-xs ${pkg.highlight ? "text-muted-foreground" : "text-white/60"}`}
                  >
                    <Check
                      size={13}
                      className={`shrink-0 ${pkg.highlight ? "text-emerald" : "text-emerald/80"}`}
                    />
                    {f}
                  </li>
                ))}

                {/* CTA */}
                <Link
                  href={pkg.contact ? "/contact" : "/account/token"}
                  className={`block text-center py-2.5 rounded-lg text-xs tracking-widest font-semibold transition-all mb-5 ${
                    pkg.highlight
                      ? "bg-foreground text-white hover:bg-foreground/90"
                      : "bg-white/10 text-white border border-white/15 hover:bg-white/20"
                  }`}
                >
                  {pkg.contact ? "LIÊN HỆ" : "NẠP NGAY"}
                </Link>
              </ul>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
