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

      <div className="max-w-7xl mx-auto px-4 py-12 lg:pt-20 lg:pb-24 flex flex-col-reverse lg:flex-row items-center min-h-0 lg:min-h-[540px]">
        <div className="flex-1 z-10 text-center lg:text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 lg:px-4 py-1.5 mb-4 lg:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-[10px] lg:text-xs tracking-widest text-primary font-medium">
              OPERISBOT — HỆ SINH THÁI AI TỰ ĐỘNG HÓA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            <TypeWriter
              lines={[
                { text: "NỀN TẢNG AI" },
                {
                  text: "TỰ ĐỘNG HÓA.",
                  className:
                    "bg-gradient-to-r from-primary via-violet to-sky bg-clip-text text-transparent",
                },
                { text: "ĐĂNG KÝ LÀ DÙNG." },
              ]}
              charDelay={0.045}
            />
          </h1>
          <p className="text-muted-foreground mt-4 text-lg lg:text-xl max-w-lg leading-relaxed">
            Tự động hóa tuyển dụng, kế toán, marketing, CSKH — không cần cài
            đặt, không cần phần cứng. Đăng ký tài khoản, chọn gói Token, để AI
            làm việc 24/7 thay bạn. Giúp doanh nghiệp giảm 80% chi phí vận
            hành và tăng tốc phát triển.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6 lg:mt-8">
            <Link
              href="/register"
              className="bg-primary text-white text-xs tracking-widest px-6 lg:px-8 py-3 hover:bg-primary-dark transition-colors rounded-full shadow-lg shadow-primary/20 uppercase"
            >
              Dùng thử miễn phí
            </Link>
            <Link
              href="/contact"
              className="border border-foreground text-foreground text-xs tracking-widest px-6 lg:px-8 py-3 hover:bg-foreground hover:text-white transition-colors rounded-full uppercase"
            >
              Tư vấn ngay
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex justify-center lg:justify-start gap-6 lg:gap-8 mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-border/50">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground tracking-wide mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative mb-4 lg:mb-0 flex justify-center animate-fade-in">
          {/* Glowing ring behind 3D */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full border border-primary/10 bg-primary/[0.03]" />
          </div>

          {/* Mobile: static image (no Three.js) */}
          <div className="relative z-10 w-full lg:hidden">
            <div className="relative w-[240px] h-[240px] md:w-[340px] md:h-[340px] mx-auto">
              <Image
                src="/images/hero.png"
                alt="Operisbot Mini PC"
                fill
                sizes="(min-width: 768px) 340px, 240px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop: Three.js 3D Mini PC */}
          <div className="relative z-10 w-full hidden lg:block">
            <HeroProduct3D />
          </div>

          {/* Reflection glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-8 lg:h-12 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}
