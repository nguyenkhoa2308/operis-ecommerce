"use client";

import { Truck, Award, Tag, ShieldCheck } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

const benefits = [
  {
    icon: Truck,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    desc: "Miễn phí giao hàng toàn quốc cho đơn từ 2 triệu.",
    color: "text-sky",
    bg: "bg-sky/8",
    border: "border-sky/15",
  },
  {
    icon: Award,
    title: "BẢO HÀNH CHÍNH HÃNG",
    desc: "Bảo hành 24 tháng, hỗ trợ kỹ thuật trọn đời.",
    color: "text-amber",
    bg: "bg-amber/8",
    border: "border-amber/15",
  },
  {
    icon: Tag,
    title: "ƯU ĐÃI MỖI NGÀY",
    desc: "Khuyến mãi hấp dẫn, giá tốt nhất thị trường.",
    color: "text-rose",
    bg: "bg-rose/8",
    border: "border-rose/15",
  },
  {
    icon: ShieldCheck,
    title: "THANH TOÁN AN TOÀN",
    desc: "Hỗ trợ COD, chuyển khoản, ví điện tử.",
    color: "text-emerald",
    bg: "bg-emerald/8",
    border: "border-emerald/15",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-white border-b border-border/50">
      <StaggerContainer className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {benefits.map((b) => (
          <StaggerItem key={b.title}>
            <div
              className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 rounded-xl p-3 sm:p-4 text-center sm:text-left h-full ${b.bg} border ${b.border} transition-shadow hover:shadow-sm`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                <b.icon size={18} className={b.color} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <h3 className="text-[10px] sm:text-xs font-semibold tracking-widest mb-0.5 sm:mb-1">
                  {b.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed hidden sm:block">
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
