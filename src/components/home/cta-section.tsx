import Image from "next/image";
import Link from "next/link";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";

export function CtaSection() {
  return (
    <section className="relative bg-gradient-cta text-white overflow-hidden">
      {/* Decorative accent glow */}
      <div className="absolute top-1/2 right-[-100px] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-violet/10 blur-3xl" />
      <ConcentricCircles className="left-[-150px] bottom-[-200px]" size={600} color="#ffffff" opacity={0.04} />

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
        <div className="flex-1 z-10">
          <p className="text-sm tracking-[0.3em] text-sky/80 mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-sky/60" />
            TIẾT KIỆM 70% CHI PHÍ
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            TẮT MÁY TÍNH.<br />BOT VẪN LÀM.
          </h2>
          <p className="text-white/60 mt-4 text-base max-w-md leading-relaxed">
            Operisbot chạy 24/7 trên thiết bị riêng — bạn ngủ, bot vẫn hoàn thành công việc.
            Không lo lộ dữ liệu, không tốn tài nguyên máy chính.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-accent text-white text-xs tracking-widest px-8 py-3 hover:bg-accent/90 transition-colors rounded-full"
          >
            MUA NGAY
          </Link>
        </div>
        <div className="flex-1 relative mt-10 md:mt-0 flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[400px]">
            <Image
              src="/images/cta.png"
              alt="Operisbot thiết bị AI"
              fill
              sizes="50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
