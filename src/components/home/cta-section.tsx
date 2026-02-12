import Image from "next/image";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative bg-foreground text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
        <div className="flex-1 z-10">
          <p className="text-sm tracking-[0.3em] text-white/60 mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-white/40" />
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
            className="mt-8 inline-block bg-white text-foreground text-xs tracking-widest px-8 py-3 hover:bg-white/90 transition-colors"
          >
            MUA NGAY
          </Link>
        </div>
        <div className="flex-1 relative mt-10 md:mt-0 flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=600&h=500&fit=crop"
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
