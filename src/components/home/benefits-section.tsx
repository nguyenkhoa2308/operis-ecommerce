"use client";

import { Zap, ShieldCheck, RefreshCw, HeadphonesIcon } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

const benefits = [
  {
    icon: Zap,
    title: "DÙNG NGAY SAU ĐĂNG KÝ",
    desc: "Không cần cài đặt, không cần phần cứng — tạo tài khoản là bắt đầu được.",
    color: "text-sky",
    bg: "bg-sky/8",
    border: "border-sky/15",
  },
  {
    icon: RefreshCw,
    title: "TOKEN KHÔNG HẾT HẠN",
    desc: "Token mua thêm không bao giờ hết hạn, dùng thoải mái theo tiến độ.",
    color: "text-amber",
    bg: "bg-amber/8",
    border: "border-amber/15",
  },
  {
    icon: ShieldCheck,
    title: "NÂNG / HẠ GÓI TỰ DO",
    desc: "Thay đổi gói bất kỳ lúc nào, không ràng buộc, không phí ẩn.",
    color: "text-violet",
    bg: "bg-violet/8",
    border: "border-violet/15",
  },
  {
    icon: HeadphonesIcon,
    title: "HỖ TRỢ KỸ THUẬT 24/7",
    desc: "Đội ngũ hỗ trợ sẵn sàng qua chat, email và hotline mọi lúc.",
    color: "text-emerald",
    bg: "bg-emerald/8",
    border: "border-emerald/15",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-white border-b border-border/50">
      <StaggerContainer className="max-w-7xl mx-auto py-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {benefits.map((b) => (
          <StaggerItem key={b.title}>
            <div
              className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 rounded-xl p-3 sm:p-4 text-center sm:text-left h-full ${b.bg} border ${b.border} transition-shadow hover:shadow-sm`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                <b.icon size={28} className={b.color} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold tracking-widest mb-0.5 sm:mb-1">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">
                  {b.desc}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
