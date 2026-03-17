import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { cases } from "./data";

const overallStats = [
  { value: "80%+", label: "Thời gian tác vụ lặp lại tiết kiệm được" },
  { value: "3×", label: "Năng suất tăng trung bình sau 30 ngày" },
  { value: "< 1 tuần", label: "Thời gian để thấy kết quả đầu tiên" },
  { value: "0 kỹ thuật", label: "Yêu cầu để triển khai" },
];

export default function CaseStudyPage() {
  return (
    <main>
      {/* ══════════════════════════════════════════════════════
          HERO — full-bleed image + blue overlay + decorative shapes
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[340px] md:min-h-[400px] flex items-center">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&auto=format&fit=crop&q=80"
          alt="Case Study hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-sky/80" />
        {/* Extra dark gradient on left for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* ── Decorative shapes — z-20 so they sit above overlays ── */}

        {/* dots grid bottom-left */}
        <svg
          className="absolute z-20 bottom-16 left-8 pointer-events-none select-none"
          width="88"
          height="64"
          aria-hidden
        >
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 18 + 9}
                cy={row * 18 + 9}
                r="3"
                fill="white"
                opacity="0.55"
              />
            )),
          )}
        </svg>

        {/* X mark centre */}
        <svg
          className="absolute z-20 left-[46%] top-[55%] pointer-events-none select-none"
          width="26"
          height="26"
          aria-hidden
        >
          <line
            x1="3"
            y1="3"
            x2="23"
            y2="23"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="23"
            y1="3"
            x2="3"
            y2="23"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        {/* hollow ring + filled centre — bottom-right area */}
        <svg
          className="absolute z-20 right-[13%] bottom-[22%] pointer-events-none select-none"
          width="52"
          height="52"
          aria-hidden
        >
          <circle
            cx="26"
            cy="26"
            r="22"
            fill="none"
            stroke="white"
            strokeWidth="4"
            opacity="0.55"
          />
          <circle cx="26" cy="26" r="11" fill="white" opacity="0.22" />
        </svg>

        {/* small solid dot top-right */}
        <svg
          className="absolute z-20 right-[30%] top-[16%] pointer-events-none select-none"
          width="12"
          height="12"
          aria-hidden
        >
          <circle cx="6" cy="6" r="6" fill="white" opacity="0.5" />
        </svg>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
          <FadeIn direction="up">
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-3">
              Operis · Thực tế
            </p>
            <h1 className="font-black text-white leading-none tracking-tight text-[clamp(3rem,10vw,7rem)] mb-4">
              CASE STUDY
            </h1>
            <div className="w-14 h-1 bg-white/60 rounded-full mb-5" />
            <p className="text-white/75 text-sm md:text-base max-w-md leading-relaxed">
              Câu chuyện thực tế từ những doanh nghiệp đã dùng Operis —
              <br className="hidden md:block" />
              không phải con số marketing. Trước khi dùng, và sau khi dùng.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Overall Stats */}
      <section className="bg-muted/50 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {overallStats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-violet to-sky bg-clip-text text-transparent mb-2">
                  {s.value}
                </div>
                <p className="text-sm text-muted-foreground leading-snug">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Case cards */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/case-study/${c.slug}`}
                  className={`group flex flex-col h-full rounded-2xl border ${c.borderColor} bg-gradient-to-br ${c.gradientFrom} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  {/* Top */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-background/60 border ${c.borderColor}`}
                    >
                      <Icon className={`w-5 h-5 ${c.accentColor}`} />
                    </div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest ${c.accentColor}`}
                    >
                      {c.industry}
                    </span>
                  </div>

                  {/* Company */}
                  <h2 className="font-semibold text-base mb-1">{c.company}</h2>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {c.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {c.location}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm font-medium mb-4 leading-snug">
                    {c.tagline}
                  </p>

                  {/* Metrics preview */}
                  <div className="mt-auto space-y-2 mb-5">
                    {c.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{m.label}</span>
                        <span className={`font-bold ${c.accentColor}`}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className={`flex items-center gap-1.5 text-sm font-medium ${c.accentColor} group-hover:gap-2.5 transition-all`}
                  >
                    Xem chi tiết <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Bottom CTA */}
      <section className="bg-muted/50 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Doanh nghiệp của bạn sẽ là case study tiếp theo?
            </h2>
            <p className="text-muted-foreground mb-8">
              Đội ngũ hỗ trợ sẽ giúp bạn thiết lập trong vòng 24 giờ.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Liên hệ tư vấn <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
