import {
  Shield,
  Clock,
  Zap,
  Users,
  Coins,
  HeadphonesIcon,
  Check,
  X,
  Gift,
  Sparkles,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";

const rows = [
  {
    label: "Token sử dụng",
    icon: Coins,
    free: { text: "10M Token/tháng", good: true },
    paid: { text: "50M – 200M Token/tháng", good: true },
  },
  {
    label: "Số người dùng",
    icon: Users,
    free: { text: "1 tài khoản", good: true },
    paid: { text: "Tối đa 5 – 20+ người", good: true },
  },
  {
    label: "Hoạt động 24/7",
    icon: Clock,
    free: { text: "Có", good: true },
    paid: { text: "Có", good: true },
  },
  {
    label: "API rate limit",
    icon: Zap,
    free: { text: "Giới hạn cơ bản", good: false },
    paid: { text: "Nâng cao / không giới hạn", good: true },
  },
  {
    label: "Bảo mật dữ liệu",
    icon: Shield,
    free: { text: "Tiêu chuẩn", good: true },
    paid: { text: "Nâng cao + SLA", good: true },
  },
  {
    label: "Hỗ trợ kỹ thuật",
    icon: HeadphonesIcon,
    free: { text: "Email", good: true },
    paid: { text: "Ưu tiên 24/7 + Onboarding", good: true },
  },
];

function StatusIcon({ good }: { good: boolean }) {
  return good ? (
    <Check size={14} className="text-emerald shrink-0" strokeWidth={2.5} />
  ) : (
    <X size={14} className="text-rose shrink-0" strokeWidth={2.5} />
  );
}

export function FreeTokenSection() {
  return (
    <section className="py-16 md:py-20 bg-muted relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-1.5 mb-4">
            <Gift size={14} className="text-amber" />
            <span className="text-xs tracking-widest text-amber font-medium">
              DÙNG THỬ MIỄN PHÍ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Bắt đầu miễn phí — không cần thẻ tín dụng
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Đăng ký tài khoản và nhận Token dùng thử ngay lập tức. Khi cần mở
            rộng quy mô, nâng cấp gói bất kỳ lúc nào — không ràng buộc.
          </p>
        </FadeIn>

        {/* Desktop table */}
        <FadeIn delay={0.2} className="hidden md:block">
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] text-sm font-semibold">
              <div className="px-6 py-4 bg-muted/50 border-b border-border">
                Tính năng
              </div>
              <div className="px-6 py-4 border-b border-border text-center">
                <div className="inline-flex items-center gap-2">
                  <Sparkles size={16} className="text-muted-foreground" />
                  Tài khoản miễn phí
                </div>
              </div>
              <div className="px-6 py-4 border-b-2 border-primary bg-primary/5 text-center">
                <div className="inline-flex items-center gap-2">
                  <Crown size={16} className="text-primary" />
                  <span className="text-primary">Gói trả phí</span>
                  <span className="text-[10px] tracking-wider bg-primary text-white rounded-full px-2 py-0.5 font-medium">
                    KHUYẾN NGHỊ
                  </span>
                </div>
              </div>
            </div>

            {/* Table body */}
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] text-sm ${
                  i < rows.length - 1 ? "border-b border-border/50" : ""
                } hover:bg-muted/30 transition-colors`}
              >
                <div className="px-6 py-4 flex items-center gap-3 font-medium">
                  <row.icon
                    size={16}
                    className="text-muted-foreground shrink-0"
                    strokeWidth={1.5}
                  />
                  {row.label}
                </div>
                <div className="px-6 py-4 flex items-center justify-center gap-2 text-muted-foreground">
                  <StatusIcon good={row.free.good} />
                  {row.free.text}
                </div>
                <div className="px-6 py-4 flex items-center justify-center gap-2 bg-primary/[0.02]">
                  <StatusIcon good={row.paid.good} />
                  <span className="font-medium">{row.paid.text}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Mobile: 2 cards */}
        <div className="md:hidden space-y-4">
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-muted-foreground" />
                <h3 className="font-semibold text-sm">Tài khoản miễn phí</h3>
              </div>
              <ul className="space-y-3">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-2.5">
                    <StatusIcon good={row.free.good} />
                    <div>
                      <span className="text-xs font-medium text-foreground">
                        {row.label}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {row.free.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="bg-white rounded-xl border-2 border-primary p-5 relative">
              <span className="absolute -top-3 left-4 text-[10px] tracking-wider bg-primary text-white rounded-full px-3 py-1 font-medium">
                KHUYẾN NGHỊ
              </span>
              <div className="flex items-center gap-2 mb-4">
                <Crown size={18} className="text-primary" />
                <h3 className="font-semibold text-sm text-primary">
                  Gói trả phí
                </h3>
              </div>
              <ul className="space-y-3">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-2.5">
                    <StatusIcon good={row.paid.good} />
                    <div>
                      <span className="text-xs font-medium text-foreground">
                        {row.label}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {row.paid.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* CTA */}
        <FadeIn delay={0.4} className="text-center mt-10">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Gift size={14} />
            ĐĂNG KÝ NHẬN TOKEN MIỄN PHÍ
          </Link>
          <p className="text-xs text-muted-foreground mt-3">
            Không cần thẻ tín dụng · Không cần phần cứng · Dùng ngay sau khi đăng ký
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
