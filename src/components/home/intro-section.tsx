"use client";
import {
  ShoppingCart,
  Megaphone,
  TrendingUp,
  Building2,
  Sparkles,
  Bot,
} from "lucide-react";
import { DotGrid } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const stats = [
  { value: "24/7", label: "Hoạt động liên tục" },
  { value: "6+", label: "Lĩnh vực tự động" },
  { value: "90%", label: "Giảm thời gian xử lý" },
  { value: "0", label: "Ngày nghỉ" },
];

const useCaseGroups = [
  {
    icon: Building2,
    title: "Quản lý Nhân sự & Tuyển dụng",
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-l-amber",
    arrow: "text-amber",
    scenarios: [
      "Tự động lên TopCV đọc danh sách ứng viên, thu thập thông tin, đánh giá phù hợp với JD trên thang điểm.",
      "Check lịch trống và tự gửi email mời phỏng vấn — chỉ cần xây 1 lần là tự động chạy mãi mãi.",
      "Phân tích nhân sự, tổng hợp báo cáo hiệu suất làm việc tự động hàng tuần/tháng.",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Hóa đơn & Báo cáo thuế",
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-l-emerald",
    arrow: "text-emerald",
    scenarios: [
      "Đọc mail nhận hóa đơn, tổng hợp và theo dõi ghi nhận hóa đơn đến tự động.",
      "Tự đăng nhập thuedientu, thực hiện báo cáo thuế theo tháng/quý — xuất hóa đơn điện tử.",
      "Tính toán thuế TNCN/TNDN từ lịch sử giao dịch, cảnh báo hạn nộp và sai lệch số liệu.",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & SEO tự động",
    color: "text-violet",
    bg: "bg-violet/10",
    border: "border-l-violet",
    arrow: "text-violet",
    scenarios: [
      "Tự động lên Semrush, Google Trending, Ahrefs thu thập từ khóa, tổng hợp báo cáo rồi viết bài SEO.",
      "Viết nội dung và tự động đăng lên website của bạn, lên kế hoạch đăng bài đa nền tảng.",
      "Tạo profile MXH để xây backlink tự nhiên như người dùng thực sự thực hiện.",
    ],
  },
  {
    icon: TrendingUp,
    title: "Quảng cáo & Phân tích dữ liệu",
    color: "text-sky",
    bg: "bg-sky/10",
    border: "border-l-sky",
    arrow: "text-sky",
    scenarios: [
      "Đọc báo cáo dữ liệu quảng cáo Facebook/Google Ads, lên kế hoạch quảng cáo chi tiết.",
      "Theo dõi hiệu quả chiến dịch, đề xuất thay đổi để tối ưu ngân sách quảng cáo.",
      "Bot quét giá 10 đối thủ mỗi giờ trên Shopee, TikTok Shop — cảnh báo qua Zalo nếu đối thủ giảm giá.",
    ],
  },
  {
    icon: Sparkles,
    title: "Tư vấn & Chăm sóc khách hàng",
    color: "text-rose",
    bg: "bg-rose/10",
    border: "border-l-rose",
    arrow: "text-rose",
    scenarios: [
      "Tư vấn tự động, trả lời khách hàng qua Zalo (cá nhân) và các kênh truyền thông 24/7.",
      "AI đọc đánh giá 1-2 sao, tự nhắn xin lỗi + tặng mã giảm giá nếu lỗi vận chuyển.",
      "Suy luận, tổng hợp báo cáo tài chính — giúp doanh nghiệp có cái nhìn toàn diện nhất.",
    ],
  },
  {
    icon: Bot,
    title: "Tổng quan — Nhân viên AI 24/7",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-l-primary",
    arrow: "text-primary",
    scenarios: [
      "Thực hiện bất kì công việc nào — chỉ cần workflow hoàn chỉnh và nguyên liệu đầu vào.",
      "Hoạt động 24/7 không mệt mỏi, không kêu ca, không đòi tăng lương, không ngày nghỉ.",
      "Báo cáo công việc chi tiết — gọi bất kì lúc nào để nhận báo cáo tiến độ.",
    ],
  },
];

export function IntroSection() {
  return (
    <section className="bg-muted relative overflow-hidden">
      <DotGrid
        className="left-0 top-0"
        color="#6b8fb5"
        opacity={0.08}
        cols={14}
        rows={10}
        gap={28}
      />
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header centered + stats */}
        <FadeIn className="text-center mb-12">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            KỊCH BẢN THỰC TẾ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            OPERISBOT LÀM GÌ CHO BẠN?
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Không chỉ &quot;tự động hóa&quot; — đây là những hành động cụ thể
            mà Operisbot thực hiện thay bạn, 24/7, hoàn toàn tự động.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCaseGroups.map((group) => (
            <StaggerItem
              key={group.title}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full ${group.bg} flex items-center justify-center shrink-0`}
                >
                  <group.icon
                    size={20}
                    className={group.color}
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="text-base font-semibold">{group.title}</h4>
              </div>
              <ul className="space-y-3 flex-1">
                {group.scenarios.map((s, i) => (
                  <li key={i} className="flex gap-2 text-base leading-relaxed">
                    <span className={`${group.arrow} font-bold shrink-0`}>
                      →
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
