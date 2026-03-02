"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";
import { TypeWriter } from "@/components/ui/motion";
import { Bot, Cpu, Zap } from "lucide-react";

const HeroProduct3D = dynamic(() => import("./hero-product-3d"), {
  ssr: false,
});

const stats = [
  { value: "24/7", label: "Hoạt động liên tục" },
  { value: "80%", label: "Tiết kiệm chi phí" },
  { value: "100+", label: "Workflow có sẵn" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-50px] w-[500px] h-[500px] rounded-full bg-primary/6 blur-3xl" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-violet/6 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-sky/5 blur-3xl" />
      <ConcentricCircles
        className="right-[-100px] bottom-[-150px]"
        size={600}
        color="#6b8fb5"
        opacity={0.06}
      />

      {/* Floating icons (decorative) */}
      <div className="absolute top-20 right-[15%] w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center animate-pulse opacity-60">
        <Bot size={18} className="text-violet" />
      </div>
      <div className="absolute bottom-32 left-[10%] w-9 h-9 rounded-lg bg-emerald/10 flex items-center justify-center animate-pulse opacity-50">
        <Cpu size={16} className="text-emerald" />
      </div>
      <div className="absolute top-1/3 right-[8%] w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center animate-pulse opacity-40">
        <Zap size={14} className="text-amber" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:pt-20 md:pb-24 flex flex-col-reverse md:flex-row items-center min-h-0 md:min-h-[540px]">
        <div className="flex-1 z-10 text-center md:text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 md:px-4 py-1.5 mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-[10px] md:text-xs tracking-widest text-primary font-medium">
              OPERISBOT — HỆ SINH THÁI AI TỰ ĐỘNG HÓA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            <TypeWriter
              lines={[
                { text: "THIẾT BỊ TRỢ LÝ" },
                {
                  text: "AI VẬT LÝ.",
                  className:
                    "bg-gradient-to-r from-primary via-violet to-sky bg-clip-text text-transparent",
                },
                { text: "CẮM LÀ CHẠY." },
              ]}
              charDelay={0.045}
            />
          </h1>
          <p className="text-muted-foreground mt-4 text-lg md:text-xl max-w-lg leading-relaxed">
            Thiết bị tự động hóa & tối ưu hóa quy trình xử lý công việc cho cá
            nhân và doanh nghiệp — vận hành hoàn toàn bởi AI. Phát triển từ nền
            tảng OpenClaw, nâng cấp toàn diện về bảo mật, tối thiểu chi phí.
            Giúp doanh nghiệp giảm 80% chi phí, tăng tốc phát triển và có cái
            nhìn toàn diện nhất để đưa ra quyết định chính xác.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6 md:mt-8">
            <Link
              href="tel:84853336668"
              className="bg-primary text-white text-xs tracking-widest px-6 md:px-8 py-3 hover:bg-primary-dark transition-colors rounded-full shadow-lg shadow-primary/20 uppercase"
            >
              Tư vẫn ngay
            </Link>
            <Link
              href="/guide"
              className="border border-foreground text-foreground text-xs tracking-widest px-6 md:px-8 py-3 hover:bg-foreground hover:text-white transition-colors rounded-full uppercase"
            >
              Xem hướng dẫn
            </Link>
            <Link
              href="/about"
              className="border border-foreground text-foreground text-xs tracking-widest px-6 md:px-8 py-3 hover:bg-foreground hover:text-white transition-colors rounded-full"
            >
              TÌM HIỂU THÊM
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex justify-center md:justify-start gap-6 md:gap-8 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-border/50">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-extrabold text-foreground">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground tracking-wide mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative mb-4 md:mb-0 flex justify-center animate-fade-in">
          {/* Glowing ring behind 3D */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[460px] md:h-[460px] rounded-full border border-primary/10 bg-primary/[0.03]" />
          </div>

          {/* Mobile: static image (no Three.js) */}
          <div className="relative z-10 w-full md:hidden">
            <div className="relative w-[240px] h-[240px] mx-auto">
              <Image
                src="/images/hero.png"
                alt="Operisbot Mini PC"
                fill
                sizes="240px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop: Three.js 3D Mini PC */}
          <div className="relative z-10 w-full hidden md:block">
            <HeroProduct3D />
          </div>

          {/* Reflection glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-8 md:h-12 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}
