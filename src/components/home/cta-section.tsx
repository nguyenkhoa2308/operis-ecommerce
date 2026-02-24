"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative h-[420px] md:h-[480px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/home-cta.webp"
        alt="Operisbot thiết bị AI"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] text-sky/80 mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-sky/60" />
            THIẾT BỊ RIÊNG — DỮ LIỆU RIÊNG
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
            BẠN NGỦ.<br />
            <span className="text-sky">BOT VẪN LÀM VIỆC.</span>
          </h2>
          <p className="text-white/60 mt-4 text-lg max-w-md leading-relaxed">
            Operisbot chạy 24/7 trên thiết bị chuyên dụng — không chiếm tài nguyên máy chính,
            không lo lộ dữ liệu. Sáng dậy đã có báo cáo sẵn.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-accent text-white text-xs tracking-widest px-6 py-3 hover:bg-accent/90 transition-colors rounded-full"
            >
              MUA NGAY <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-xs tracking-widest px-6 py-3 hover:bg-white/10 transition-colors rounded-full"
            >
              TÌM HIỂU THÊM
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
