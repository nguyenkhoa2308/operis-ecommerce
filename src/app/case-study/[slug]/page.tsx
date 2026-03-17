import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Users, Clock } from "lucide-react";
import {
  SineWaves,
  CornerArcs,
  DiamondScatter,
} from "@/components/ui/case-study-patterns";
import { FadeIn, CountUp } from "@/components/ui/motion";
import { WorkflowLoop } from "@/components/ui/workflow-loop";
import { cases } from "../data";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();

  const Icon = c.icon;
  const idx = cases.indexOf(c);
  const prev = cases[idx - 1];
  const next = cases[idx + 1];

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — split layout: left content + right photo, wave bottom
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[640px]">
        {/* Full-bleed background image — right half visible */}
        <Image
          src={c.heroImage}
          alt={c.company}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Strong accent overlay — heavier on left, fading right */}
        <div className={`absolute inset-0 ${c.accentBg} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        {/* Right edge: let image breathe a bit */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-black/0 md:[background:linear-gradient(to_right,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0)_100%)]" />

        {/* Breadcrumb */}
        <div className="absolute top-5 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12">
          <nav className="flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              href="/case-study"
              className="hover:text-white transition-colors"
            >
              Case Study
            </Link>
            <span>/</span>
            <span className="text-white/80">{c.company}</span>
          </nav>
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 md:pb-24 w-full flex items-center min-h-[560px] md:min-h-[640px]">
          <FadeIn direction="up" className="w-full max-w-3xl">
            {/* Industry badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-white text-xs font-semibold tracking-widest uppercase mb-6">
              <Icon className="w-3.5 h-3.5" />
              {c.industry}
            </div>

            {/* Company name */}
            <h1 className="font-black text-white leading-none tracking-tight mb-1 text-[clamp(2.8rem,7vw,5.5rem)]">
              {c.company}
            </h1>

            {/* Divider */}
            <div className="w-14 h-[3px] bg-white/60 rounded-full mb-5" />

            {/* Summary */}
            <p className="text-white/75 text-sm md:text-base leading-relaxed mb-0 max-w-xl">
              {c.summary}
            </p>
          </FadeIn>
        </div>

        {/* ── Decorative: dot grid — bottom-left ── */}
        <div
          className="absolute bottom-10 left-8 z-10 pointer-events-none select-none"
          aria-hidden
        >
          <svg width="80" height="64">
            {Array.from({ length: 5 }, (_, xi) =>
              Array.from({ length: 4 }, (_, yi) => (
                <circle
                  key={`${xi}-${yi}`}
                  cx={xi * 16 + 8}
                  cy={yi * 16 + 8}
                  r="2.5"
                  fill="white"
                  opacity="0.4"
                />
              )),
            )}
          </svg>
        </div>

        {/* ── Decorative: X mark — bottom center-left ── */}
        <div
          className="absolute bottom-10 left-1/3 z-10 pointer-events-none select-none"
          aria-hidden
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <line
              x1="4"
              y1="4"
              x2="24"
              y2="24"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.55"
            />
            <line
              x1="24"
              y1="4"
              x2="4"
              y2="24"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
        </div>

        {/* ── Decorative: circle outline — bottom right ── */}
        <div
          className="absolute bottom-6 right-16 z-10 pointer-events-none select-none"
          aria-hidden
        >
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle
              cx="26"
              cy="26"
              r="22"
              fill="none"
              stroke="white"
              strokeWidth="3"
              opacity="0.45"
            />
            <circle cx="26" cy="26" r="10" fill="white" opacity="0.18" />
          </svg>
        </div>

        {/* ── Decorative: triangle arrows — right edge ── */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none flex flex-col gap-2"
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 14 14">
              <polygon
                points="2,2 12,7 2,12"
                fill="white"
                opacity={0.5 - i * 0.12}
              />
            </svg>
          ))}
        </div>

        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 120"
            className="w-full block"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VERTICAL TIMELINE — Trước → Đang → Kết quả
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white relative -mt-px overflow-hidden">
        <CornerArcs
          className="top-0 right-0"
          origin="top-right"
          color="#000"
          opacity={0.03}
          count={6}
          step={90}
        />
        <DiamondScatter
          className="right-0 top-1/3"
          color="#000"
          opacity={0.02}
          cols={6}
          rows={12}
          gap={48}
          size={2}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-16 pt-12 md:pt-24 pb-14 md:pb-28">
          {/* Company intro */}
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-5 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-muted/60 flex items-center justify-center">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-bold text-foreground">
                  {c.company}
                </h2>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {c.size}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {c.location}
                  </span>
                  <span>·</span>
                  <span>{c.industry}</span>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed md:leading-[1.85] max-w-4xl mb-10 md:mb-16">
              {c.challenge}
            </p>
          </FadeIn>

          {/* ── TIMELINE ── */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-4 md:left-7 top-0 bottom-0 w-px bg-border"
              aria-hidden
            />

            {/* ─── MILESTONE 1: Trước ─── */}
            <div className="relative mb-10 md:mb-20">
              <FadeIn>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                  <div className="relative z-10 w-8 h-8 md:w-14 md:h-14 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-sm md:text-base">
                      1
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-3xl font-black text-red-500 uppercase tracking-wide">
                      Trước
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Vấn đề đang gặp phải
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="pl-10 md:pl-20 space-y-6 md:space-y-14">
                {c.before.points.map((p, i) => (
                  <FadeIn key={`before-${i}`}>
                    <div className="flex gap-3 md:gap-5">
                      <div className="shrink-0 pt-0.5">
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-xs md:text-lg font-black text-red-400">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-sm md:text-xl leading-snug mb-1 md:mb-2">
                          {p.title}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-lg leading-relaxed md:leading-[1.85]">
                          {p.desc}
                        </p>
                        {p.image && (
                          <div className="relative w-full aspect-[16/9] md:aspect-[16/8] rounded-lg md:rounded-xl overflow-hidden mt-3 md:mt-5">
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* ─── MILESTONE 2: Giải pháp — Operis xuất hiện ─── */}
            <div className="relative mb-10 md:mb-20">
              <FadeIn>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                  <div
                    className={`relative z-10 w-8 h-8 md:w-14 md:h-14 rounded-full ${c.accentBg} border-4 border-white shadow-lg flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white font-black text-sm md:text-base">
                      2
                    </span>
                  </div>
                  <div>
                    <h2
                      className={`text-xl md:text-3xl font-black ${c.accentColor} uppercase tracking-wide`}
                    >
                      Giải pháp
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Operis xuất hiện
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="pl-10 md:pl-20">
                <FadeIn>
                  <p className="text-xs md:text-lg text-muted-foreground leading-relaxed md:leading-[1.85] mb-6 md:mb-10">
                    {c.solutionStory.intro}
                  </p>
                </FadeIn>

                <div className="space-y-6 md:space-y-14">
                  {c.solutionStory.points.map((p, i) => (
                    <FadeIn key={`solution-${i}`}>
                      <div className="flex gap-3 md:gap-5">
                        <div className="shrink-0 pt-0.5">
                          <div
                            className={`w-7 h-7 md:w-10 md:h-10 rounded-full bg-muted/50 border-2 ${c.borderColor} flex items-center justify-center text-xs md:text-lg font-black ${c.accentColor}`}
                          >
                            {i + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground text-sm md:text-xl leading-snug mb-1 md:mb-2">
                            {p.title}
                          </h3>
                          <p className="text-muted-foreground text-xs md:text-lg leading-relaxed md:leading-[1.85]">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── MILESTONE 3: Cài đặt ─── */}
            <div className="relative mb-10 md:mb-20">
              <FadeIn>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                  <div
                    className={`relative z-10 w-8 h-8 md:w-14 md:h-14 rounded-full ${c.accentBg} border-4 border-white shadow-lg flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white font-black text-sm md:text-base">
                      3
                    </span>
                  </div>
                  <div>
                    <h2
                      className={`text-xl md:text-3xl font-black ${c.accentColor} uppercase tracking-wide`}
                    >
                      Cài đặt & Triển khai
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Hoàn thành trong {c.deployment.duration}
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="pl-10 md:pl-20 space-y-6 md:space-y-14">
                {c.deployment.steps.map((s, i) => (
                  <FadeIn key={`deploy-${i}`}>
                    <div className="flex gap-3 md:gap-5">
                      <div className="shrink-0 pt-0.5">
                        <div
                          className={`w-7 h-7 md:w-10 md:h-10 rounded-full ${c.accentBg}/10 border-2 ${c.borderColor} flex items-center justify-center text-xs md:text-lg font-black ${c.accentColor}`}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-sm md:text-xl leading-snug mb-1 md:mb-2">
                          {s.title}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-lg leading-relaxed md:leading-[1.85]">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* ─── MILESTONE 4: Thử nghiệm ─── */}
            <div className="relative mb-10 md:mb-20">
              <FadeIn>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                  <div className="relative z-10 w-8 h-8 md:w-14 md:h-14 rounded-full bg-amber-500 border-4 border-white shadow-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-sm md:text-base">
                      4
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-3xl font-black text-amber-500 uppercase tracking-wide">
                      Thử nghiệm
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Chạy thử trong {c.pilot.duration}
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="pl-10 md:pl-20 space-y-5 md:space-y-8">
                <FadeIn>
                  <div>
                    <h3 className="font-bold text-foreground text-sm md:text-xl leading-snug mb-1 md:mb-2">
                      Phản hồi ban đầu
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-lg leading-relaxed md:leading-[1.85]">
                      {c.pilot.feedback}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn>
                  <div>
                    <h3 className="font-bold text-foreground text-sm md:text-xl leading-snug mb-1 md:mb-2">
                      Điều chỉnh & tinh chỉnh
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-lg leading-relaxed md:leading-[1.85]">
                      {c.pilot.adjustments}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* ─── MILESTONE 5: Kết quả ─── */}
            <div className="relative">
              <FadeIn>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                  <div className="relative z-10 w-8 h-8 md:w-14 md:h-14 rounded-full bg-emerald-500 border-4 border-white shadow-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-sm md:text-base">
                      5
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-3xl font-black text-emerald-500 uppercase tracking-wide">
                      Kết quả
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Sau khi đưa vào thực tế
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Results summary */}
              <div className="pl-10 md:pl-20 mb-6 md:mb-14">
                <FadeIn>
                  <p className="text-xs md:text-lg text-foreground leading-relaxed md:leading-[1.85] font-medium max-w-4xl">
                    {c.results}
                  </p>
                </FadeIn>
              </div>

              {/* Metrics */}
              <div className="pl-10 md:pl-20 mb-8 md:mb-16">
                <FadeIn>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-8">
                    {c.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="bg-emerald-50/60 border border-emerald-200/50 rounded-xl md:rounded-2xl p-4 md:p-6 text-center"
                      >
                        <div className="text-2xl md:text-4xl font-black tracking-tight leading-none text-emerald-600 mb-1 md:mb-2">
                          <CountUp value={m.value} />
                        </div>
                        <div className="font-bold text-sm text-foreground mb-0.5">
                          {m.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {m.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* After points — numbered entries */}
              <div className="pl-10 md:pl-20 space-y-6 md:space-y-14">
                {c.after.points.map((p, i) => (
                  <FadeIn key={`after-${i}`}>
                    <div className="flex gap-3 md:gap-5">
                      <div className="shrink-0 pt-0.5">
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-xs md:text-lg font-black text-emerald-500">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-sm md:text-xl leading-snug mb-1 md:mb-2">
                          {p.title}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-lg leading-relaxed md:leading-[1.85]">
                          {p.desc}
                        </p>
                        {p.image && (
                          <div className="relative w-full aspect-[16/9] md:aspect-[16/8] rounded-lg md:rounded-xl overflow-hidden mt-3 md:mt-5">
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CÁCH HOẠT ĐỘNG — horizontal workflow steps
      ══════════════════════════════════════════════════════ */}
      <section className="bg-muted/30 relative overflow-hidden">
        <SineWaves
          className="left-0 top-0"
          color="#000"
          opacity={0.02}
          width={800}
          height={400}
          count={10}
          frequency={1.2}
          baseAmplitude={20}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <FadeIn>
            <div className="text-center mb-14 md:mb-18">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Workflow
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Cách Operis hoạt động
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl mx-auto">
                Quy trình tự động hóa được thiết kế riêng cho {c.company}
              </p>
            </div>
          </FadeIn>

          <WorkflowLoop
            steps={c.workflow.steps}
            accentBg={c.accentBg}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          QUOTE + image — dark footer like reference
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-foreground">
        {/* Gradient overlay for depth */}
        <div className={`absolute inset-0 ${c.accentBg} opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />

        {/* Wave at top */}
        <div className="relative z-10 -mt-px">
          <svg
            viewBox="0 0 1440 72"
            className="w-full block rotate-180"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Decorative patterns */}
        <SineWaves
          className="right-0 top-0"
          color="#ffffff"
          opacity={0.08}
          width={900}
          height={500}
          count={14}
          frequency={1.6}
          baseAmplitude={30}
        />
        <CornerArcs
          className="bottom-0 right-0"
          origin="bottom-right"
          color="#ffffff"
          opacity={0.06}
          count={6}
          step={70}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <FadeIn className="flex justify-center items-center">
            <div>
              <div className="text-[80px] font-serif leading-[0.6] select-none text-white/20 mb-3">
                &ldquo;
              </div>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-white/90 italic mb-10 -mt-2 max-w-3xl text-justify">
                {c.quote}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center font-bold text-white shrink-0 text-sm backdrop-blur-sm">
                  {c.avatarInitials}
                </div>
                <div>
                  <div className="font-semibold text-white text-base">
                    {c.author}
                  </div>
                  <div className="text-sm text-white/55">
                    {c.role} · {c.company}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Company info bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">{c.company}</div>
                <div className="text-white/40 text-xs">{c.industry}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                {c.size}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {c.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {c.timeline}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PREV / NEXT + CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-6 justify-between border-b border-border pb-10">
              {prev ? (
                <Link
                  href={`/case-study/${prev.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest uppercase mb-0.5">
                      Trước
                    </div>
                    <div className="font-semibold text-foreground">
                      {prev.company}
                    </div>
                  </div>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/case-study/${next.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors sm:flex-row-reverse"
                >
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="sm:text-right">
                    <div className="text-xs tracking-widest uppercase mb-0.5">
                      Tiếp theo
                    </div>
                    <div className="font-semibold text-foreground">
                      {next.company}
                    </div>
                  </div>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
