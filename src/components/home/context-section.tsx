import Image from "next/image";
import { Lightbulb, Zap, Users, BarChart3 } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const highlights = [
  {
    icon: Zap,
    text: "Tối ưu tốc độ & chi phí",
    color: "text-amber",
    bg: "bg-amber/10 border-amber/20",
  },
  {
    icon: BarChart3,
    text: "Dashboard & báo cáo chi tiết",
    color: "text-emerald",
    bg: "bg-emerald/10 border-emerald/20",
  },
  {
    icon: Users,
    text: "Cá nhân đến doanh nghiệp",
    color: "text-sky",
    bg: "bg-sky/10 border-sky/20",
  },
  {
    icon: Lightbulb,
    text: "Luôn lắng nghe & tìm giải pháp",
    color: "text-violet",
    bg: "bg-violet/10 border-violet/20",
  },
];

export function ContextSection() {
  return (
    <section className="relative min-h-[480px] md:min-h-[520px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/context-banner.png"
        alt="Operisbot - hệ thống tự động hóa thông minh"
        fill
        sizes="100vw"
        className="object-cover object-right"
        priority={false}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center py-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-xs tracking-widest text-white/80 font-medium">
                BỐI CẢNH
              </span>
            </div>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.15}>
            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight mb-5">
              VÌ SAO{" "}
              <span className="text-sky">OPERISBOT</span>{" "}
              RA ĐỜI?
            </h2>
          </FadeIn>

          {/* Paragraphs — staggered */}
          <div className="space-y-4 text-base text-white/70 leading-relaxed">
            <FadeIn delay={0.3}>
              <p>
                Trong cuộc cách mạng trí tuệ nhân tạo hiện nay, tốc độ phát triển
                và thay đổi diễn ra rất nhanh chóng — có những cập nhật mới vừa ra
                mắt đã sớm trở nên lỗi thời chỉ sau thời gian ngắn. Với mong
                muốn{" "}
                <strong className="text-white">
                  tối ưu tốc độ, tiết kiệm chi phí, tăng hiệu quả và giảm thiểu
                  sai sót
                </strong>
                , Operisbot ra đời để phục vụ từ cá nhân đến doanh nghiệp.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p>
                Chúng tôi không mưu cầu sự hoàn hảo 100%, nhưng tin rằng{" "}
                <strong className="text-white">
                  học hỏi và áp dụng công nghệ mới là xu hướng không thể đảo ngược
                </strong>
                . Với nền tảng dựa trên OpenClaw, đội ngũ đã xây dựng phiên bản
                tối ưu — mô hình chi tiết công việc cho từng doanh nghiệp: quản lý
                dashboard, kiểm tra nhiệm vụ, phân luồng công việc, theo dõi tiến
                độ và đưa ra quyết định chính xác hơn.
              </p>
            </FadeIn>
            <FadeIn delay={0.7}>
              <p>
                Tiêu chí của chúng tôi:{" "}
                <strong className="text-white">
                  luôn lắng nghe, tìm kiếm cơ hội, giải quyết khó khăn
                </strong>{" "}
                — đó là tôn chỉ phát triển. Hi vọng có thể cùng nhau hợp tác và
                phát triển.
              </p>
            </FadeIn>
          </div>

          {/* Highlight chips */}
          <FadeIn delay={0.9}>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {highlights.map((h) => (
                <div
                  key={h.text}
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 backdrop-blur-sm"
                >
                  <h.icon size={14} className={h.color} strokeWidth={1.5} />
                  <span className="text-xs font-medium text-white/80">
                    {h.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
