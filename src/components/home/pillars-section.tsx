"use client";

import { ShieldCheck, Plug, Workflow } from "lucide-react";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Bảo mật dữ liệu",
    subtitle: "Enterprise Security",
    desc: "Dữ liệu được mã hóa end-to-end, lưu trữ riêng biệt theo tài khoản. Tuân thủ tiêu chuẩn bảo mật doanh nghiệp, không bao giờ chia sẻ dữ liệu của bạn.",
    gradient: "from-sky/10 to-primary/5",
    iconBg: "bg-sky/10",
    iconColor: "text-sky",
  },
  {
    icon: Plug,
    title: "Đăng ký là dùng",
    subtitle: "Zero Setup",
    desc: "Không cần cài Python, không cần Proxy, không cần mua tài khoản AI đắt đỏ. Tạo tài khoản — chạy Workflow ngay lập tức.",
    gradient: "from-violet/10 to-rose/5",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
  },
  {
    icon: Workflow,
    title: "Workflow thông minh",
    subtitle: "Chính xác 100%",
    desc: "Thay vì chat vu vơ, Operisbot chạy theo quy trình. Tiết kiệm Token gấp 10 lần, đạt độ chính xác tuyệt đối.",
    gradient: "from-emerald/10 to-teal/5",
    iconBg: "bg-emerald/10",
    iconColor: "text-emerald",
  },
];

export function PillarsSection() {
  return (
    <section className="bg-white relative overflow-hidden">
      <ConcentricCircles
        className="right-[-100px] top-[-80px]"
        size={300}
        color="#6b8fb5"
        opacity={0.04}
      />
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <FadeIn className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            TẠI SAO CHỌN OPERISBOT?
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            BẢO MẬT — TIỆN LỢI — THÔNG MINH
          </h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <StaggerItem
              key={p.title}
              className={`bg-gradient-to-br ${p.gradient} p-8 text-center rounded-2xl border border-border/30 hover:shadow-lg transition-shadow`}
            >
              <div
                className={`w-14 h-14 rounded-full ${p.iconBg} flex items-center justify-center mx-auto mb-5`}
              >
                <p.icon size={28} className={p.iconColor} strokeWidth={1.5} />
              </div>
              <h4 className="text-base font-semibold mb-1">{p.title}</h4>
              <p className="text-sm text-primary tracking-widest mb-3">
                {p.subtitle}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
