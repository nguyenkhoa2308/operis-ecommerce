"use client";
import {
  MessageSquare,
  Palette,
  Calculator,
  Home,
  ShoppingBag,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { ConcentricCircles, DotGrid } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const tools = [
  {
    icon: MessageSquare,
    name: "Operis-Zalo",
    tagline: "Chăm sóc khách hàng tự động",
    desc: "Bot gửi tin nhắn cá nhân hóa theo danh sách, tự trả lời câu hỏi thường gặp, nhắc lịch hẹn và theo dõi đơn hàng qua Zalo.",
    color: "text-violet",
    bg: "bg-violet/10",
    status: "Sắp ra mắt",
  },
  {
    icon: Palette,
    name: "Operis-Canva",
    tagline: "Thiết kế hàng loạt bằng AI",
    desc: "Nạp tên sản phẩm + giá → Bot tự tạo hàng trăm ảnh quảng cáo theo template, xuất file sẵn sàng đăng lên mọi nền tảng.",
    color: "text-rose",
    bg: "bg-rose/10",
    status: "Sắp ra mắt",
  },
  {
    icon: Calculator,
    name: "Operis-Tax",
    tagline: "Kế toán & thuế thông minh",
    desc: "Tự động tính thuế TNCN/TNDN từ lịch sử giao dịch, xuất báo cáo theo chuẩn, cảnh báo hạn nộp và sai lệch số liệu.",
    color: "text-emerald",
    bg: "bg-emerald/10",
    status: "Sắp ra mắt",
  },
  {
    icon: Home,
    name: "Operis-BĐS",
    tagline: "Săn tin bất động sản 24/7",
    desc: "Bot quét Batdongsan, Chotot, hội nhóm kín — lọc theo tiêu chí giá, diện tích, vị trí. Thông báo ngay khi có tin mới phù hợp.",
    color: "text-sky",
    bg: "bg-sky/10",
    status: "Q2/2026",
  },
  {
    icon: ShoppingBag,
    name: "Operis-Shop",
    tagline: "Quản lý đa sàn TMĐT",
    desc: "Đồng bộ tồn kho, giá bán, đơn hàng trên Shopee, Lazada, TikTok Shop. Tự điều chỉnh giá theo biến động đối thủ.",
    color: "text-amber",
    bg: "bg-amber/10",
    status: "Q2/2026",
  },
  {
    icon: Users,
    name: "Operis-HR",
    tagline: "Tuyển dụng & sàng lọc CV",
    desc: "Tải CV hàng loạt từ TopCV, LinkedIn — AI so sánh với JD, xếp hạng ứng viên và tự gửi email mời phỏng vấn.",
    color: "text-teal",
    bg: "bg-teal/10",
    status: "Q3/2026",
  },
];

export function EcosystemSection() {
  return (
    <section className="bg-muted relative overflow-hidden">
      <DotGrid
        className="right-0 top-0"
        color="#8b5cf6"
        opacity={0.05}
        cols={12}
        rows={8}
        gap={28}
      />
      <ConcentricCircles
        className="left-[-180px] bottom-[-120px]"
        size={400}
        color="#10b981"
        opacity={0.04}
      />
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <FadeIn className="text-center mb-12">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            HỆ SINH THÁI ĐANG MỞ RỘNG
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            MINI-TOOLS CHUYÊN BIỆT TỪNG NGÀNH
          </h2>
          <p className="text-base text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Không chỉ dừng lại ở Workflow tổng quát — Operisbot đang phát triển
            kho công cụ chuyên sâu cho từng lĩnh vực, giúp bạn tự động hóa chính
            xác hơn, tiết kiệm hơn.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <StaggerItem
              key={tool.name}
              className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-full ${tool.bg} flex items-center justify-center shrink-0`}
                >
                  <tool.icon
                    size={20}
                    className={tool.color}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{tool.name}</h4>
                  <p className={`text-xs ${tool.color} font-medium`}>
                    {tool.tagline}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {tool.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="text-xs tracking-widest text-muted-foreground font-medium">
                  {tool.status}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground italic mb-4">
            Mua thiết bị hôm nay — tất cả Mini-tools sẽ được cập nhật miễn phí
            khi ra mắt.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            XEM THIẾT BỊ <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
