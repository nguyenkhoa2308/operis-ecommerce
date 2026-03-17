import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

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
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <FadeIn direction="left" className="max-w-xl">
          <p className="text-sm tracking-[0.3em] text-sky/80 mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-sky/60" />
            THIẾT BỊ RIÊNG — DỮ LIỆU RIÊNG
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
            BẠN NGỦ.<br />
            <span className="text-sky">BOT VẪN LÀM VIỆC.</span>
          </h2>
          <p className="text-white/60 mt-4 text-lg max-w-md leading-relaxed">
            Operisbot chạy 24/7 trên nền tảng đám mây — không chiếm tài nguyên
            máy tính, không lo lộ dữ liệu. Sáng dậy đã có báo cáo sẵn.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white text-xs tracking-widest px-6 py-3 hover:bg-accent/90 transition-colors rounded-full"
            >
              LIÊN HỆ NGAY <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-xs tracking-widest px-6 py-3 hover:bg-white/10 transition-colors rounded-full"
            >
              TÌM HIỂU THÊM
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
