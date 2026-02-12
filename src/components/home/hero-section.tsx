import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-muted overflow-hidden">
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
              className="bg-foreground text-white text-xs tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors"
            >
              XEM SẢN PHẨM
            </Link>
            <Link
              href="/about"
              className="border border-foreground text-foreground text-xs tracking-widest px-8 py-3 hover:bg-foreground hover:text-white transition-colors"
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
