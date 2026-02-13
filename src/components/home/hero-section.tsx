import Image from "next/image";
import Link from "next/link";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-50px] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-violet/5 blur-3xl" />
      <ConcentricCircles className="right-[-100px] bottom-[-150px]" size={600} color="#6b8fb5" opacity={0.06} />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center min-h-[500px]">
        <div className="flex-1 z-10">
          <p className="text-xs tracking-widest text-primary font-medium mb-4">OPERISBOT — HỆ SINH THÁI AI TỰ ĐỘNG HÓA</p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            THIẾT BỊ TRỢ LÝ<br />AI VẬT LÝ.<br />CẮM LÀ CHẠY.
          </h1>
          <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-md leading-relaxed">
            Bảo mật tuyệt đối — Hiệu suất vô hạn — Chi phí tối ưu. Operisbot tách rời bộ não AI ra khỏi máy tính cá nhân, chạy 24/7 trên Mini PC riêng biệt.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/shop"
              className="bg-primary text-white text-xs tracking-widest px-8 py-3 hover:bg-primary-dark transition-colors rounded-full"
            >
              XEM SẢN PHẨM
            </Link>
            <Link
              href="/about"
              className="border border-foreground text-foreground text-xs tracking-widest px-8 py-3 hover:bg-foreground hover:text-white transition-colors rounded-full"
            >
              TÌM HIỂU THÊM
            </Link>
          </div>
        </div>

        <div className="flex-1 relative mt-10 md:mt-0 flex justify-center">
          <div className="relative w-[300px] h-[350px] md:w-[400px] md:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=600&h=700&fit=crop"
              alt="Mini PC Operis"
              fill
              sizes="50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
