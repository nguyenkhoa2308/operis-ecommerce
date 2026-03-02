"use client";

import Image from "next/image";
import { DotGrid, ConcentricCircles } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const steps = [
  {
    number: "01",
    title: "Cắm điện & Kết nối mạng",
    desc: "Mở hộp, cắm nguồn, kết nối WiFi hoặc cáp mạng. Thiết bị tự khởi động và sẵn sàng trong 30 giây.",
    color: "from-sky to-primary",
  },
  {
    number: "02",
    title: "Đăng nhập tài khoản",
    desc: "Truy cập giao diện quản lý qua trình duyệt. Đăng nhập bằng tài khoản Operis được cấp kèm thiết bị.",
    color: "from-violet to-primary",
  },
  {
    number: "03",
    title: "Đọc hướng dẫn sử dụng",
    desc: "Xem tài liệu hướng dẫn chi tiết, video tutorial và FAQ để nắm cách vận hành thiết bị hiệu quả.",
    color: "from-amber to-orange",
  },
  {
    number: "04",
    title: "Chọn Workflow phù hợp",
    desc: "Duyệt kho Workflow có sẵn: quản lý MXH, scraping dữ liệu, theo dõi đối thủ, gửi email tự động và hàng trăm tác vụ khác.",
    color: "from-rose to-violet",
  },
  {
    number: "05",
    title: "Cấu hình & Kích hoạt",
    desc: "Tùy chỉnh thông số Workflow theo nhu cầu, kết nối các tài khoản cần thiết, rồi nhấn Kích hoạt.",
    color: "from-emerald to-teal",
  },
  {
    number: "06",
    title: "Để Bot làm việc 24/7",
    desc: "Operisbot chạy liên tục trên thiết bị riêng. Tắt máy tính, đi ngủ — bot vẫn hoàn thành công việc cho bạn.",
    color: "from-primary to-sky",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-[#f8fafc] relative overflow-hidden">
      <DotGrid
        className="right-0 bottom-0"
        color="#8b5cf6"
        opacity={0.05}
        cols={10}
        rows={6}
        gap={30}
      />
      <ConcentricCircles
        className="left-[-150px] top-[-100px]"
        size={350}
        color="#6b8fb5"
        opacity={0.04}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-12">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            BẮT ĐẦU TRONG 5 PHÚT
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            CÁCH HOẠT ĐỘNG
          </h2>
        </FadeIn>

        {/* Two-column: steps left, image right */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Steps grid */}
          <StaggerContainer
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8"
            staggerDelay={0.08}
          >
            {steps.map((step, i) => (
              <StaggerItem key={step.number} className="relative flex gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shrink-0`}
                >
                  <span className="text-sm font-semibold text-white">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1">
                    {step.title}
                  </h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Image column */}
          <FadeIn direction="right" className="flex-shrink-0 hidden lg:block">
            <div className="relative w-[360px] h-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/home-how-it-works.webp"
                alt="Operisbot Mini PC thiết bị"
                fill
                sizes="360px"
                className="object-cover"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">
                  Thiết bị nhỏ gọn, mạnh mẽ
                </p>
                <p className="text-white/70 text-xs mt-1">
                  Cắm điện → Kết nối → Chạy 24/7
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
