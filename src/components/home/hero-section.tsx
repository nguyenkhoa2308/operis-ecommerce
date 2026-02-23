"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";
import { TypeWriter } from "@/components/ui/motion";
import { Bot, Cpu, Zap } from "lucide-react";

const stats = [
  { value: "24/7", label: "Hoạt động liên tục" },
  { value: "70%", label: "Tiết kiệm chi phí" },
  { value: "100+", label: "Workflow có sẵn" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-50px] w-[500px] h-[500px] rounded-full bg-primary/6 blur-3xl" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-violet/6 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-sky/5 blur-3xl" />
      <ConcentricCircles className="right-[-100px] bottom-[-150px]" size={600} color="#6b8fb5" opacity={0.06} />

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

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center min-h-0 md:min-h-[540px]">
        <motion.div
          className="flex-1 z-10 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 md:px-4 py-1.5 mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-[10px] md:text-xs tracking-widest text-primary font-medium">OPERISBOT — HỆ SINH THÁI AI TỰ ĐỘNG HÓA</span>
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
              startDelay={0.3}
              charDelay={0.045}
              lineDelay={0.35}
            />
          </h1>
          <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-md leading-relaxed">
            Bảo mật tuyệt đối — Hiệu suất vô hạn — Chi phí tối ưu. Operisbot tách rời bộ não AI ra khỏi máy tính cá nhân, chạy 24/7 trên Mini PC riêng biệt.
          </p>
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/shop"
              className="bg-primary text-white text-xs tracking-widest px-6 md:px-8 py-3 hover:bg-primary-dark transition-colors rounded-full shadow-lg shadow-primary/20"
            >
              XEM SẢN PHẨM
            </Link>
            <Link
              href="/about"
              className="border border-foreground text-foreground text-xs tracking-widest px-6 md:px-8 py-3 hover:bg-foreground hover:text-white transition-colors rounded-full"
            >
              TÌM HIỂU THÊM
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex justify-center md:justify-start gap-6 md:gap-8 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              >
                <p className="text-2xl md:text-3xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground tracking-wide mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 relative mt-10 md:mt-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {/* Glowing ring behind image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-primary/10 bg-primary/[0.03]" />
          </div>
          <div className="relative w-[220px] h-[260px] sm:w-[300px] sm:h-[350px] md:w-[400px] md:h-[480px] z-10">
            <Image
              src="https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=600&h=700&fit=crop"
              alt="Mini PC Operis"
              fill
              sizes="50vw"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
