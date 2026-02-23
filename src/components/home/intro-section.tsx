"use client";
import {
  ShoppingCart,
  Megaphone,
  TrendingUp,
  Building2,
  Sparkles,
} from "lucide-react";
import { DotGrid } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const useCaseGroups = [
  {
    icon: ShoppingCart,
    title: "Kinh doanh Online & E-Commerce",
    color: "text-sky",
    bg: "bg-sky/10",
    border: "border-l-sky",
    arrow: "text-sky",
    scenarios: [
      "Bot quét giá 10 đối thủ mỗi giờ trên Shopee, TikTok Shop — cảnh báo qua Zalo nếu đối thủ giảm giá quá 5%.",
      "AI đọc đánh giá 1-2 sao, tự nhắn tin xin lỗi + tặng mã giảm giá nếu lỗi vận chuyển.",
      "Nạp 1 ảnh + mô tả, Bot đăng lên Facebook, Instagram, TikTok, Shopee Feed tuần tự như người thật.",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Xây dựng cộng đồng",
    color: "text-violet",
    bg: "bg-violet/10",
    border: "border-l-violet",
    arrow: "text-violet",
    scenarios: [
      'Bot vào hội nhóm, đọc bài đăng có từ khóa "Cần tư vấn", bình luận chia sẻ rồi khéo léo nhắc đến sản phẩm.',
      'Chạy 50-100 tài khoản Social cùng lúc, mỗi tài khoản một "vân tay trình duyệt" riêng, tự Like/Share tạo hiệu ứng đám đông.',
      "Quét Group đối thủ, lấy thông tin người hay tương tác — lưu danh sách tiềm năng cho Sale chăm sóc.",
    ],
  },
  {
    icon: TrendingUp,
    title: "Đầu tư & Tài chính",
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-l-emerald",
    arrow: "text-emerald",
    scenarios: [
      "Bot quét Bloomberg, Reuters, hội nhóm kín — sáng 7h gửi bản tin tóm tắt qua Telegram.",
      "Canh nhà đất giá tốt trên Batdongsan, Chotot — thông báo ngay giây thứ 10 khi xuất hiện.",
    ],
  },
  {
    icon: Building2,
    title: "Quản trị Doanh nghiệp & Nhân sự",
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-l-amber",
    arrow: "text-amber",
    scenarios: [
      'Bot tải CV hàng loạt, AI so sánh với JD — xuất "Ứng viên A - 90% phù hợp", tự gửi email hẹn phỏng vấn.',
      "Mở PDF hóa đơn từ email, tự nhập liệu vào phần mềm kế toán hoặc Google Sheet — không sai sót.",
    ],
  },
  {
    icon: Sparkles,
    title: "Cá nhân & Power User",
    color: "text-rose",
    bg: "bg-rose/10",
    border: "border-l-rose",
    arrow: "text-rose",
    scenarios: [
      "Săn vé máy bay giá rẻ, đặt chỗ nhà hàng hot, săn giày Limited — Bot canh giờ, tự điền và thanh toán.",
      "Gửi Bot 1 video YouTube 2 tiếng hoặc PDF 100 trang — nhận bản ghi chú tóm tắt ý chính.",
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
        <FadeIn className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            KỊCH BẢN THỰC TẾ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            OPERISBOT LÀM GÌ CHO BẠN?
          </h2>
          <p className="text-base text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Không chỉ &quot;tự động hóa&quot; — đây là những hành động cụ thể mà
            Operisbot thực hiện thay bạn, 24/7, trên thiết bị riêng.
          </p>
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
                  <li key={i} className="flex gap-2 text-sm leading-relaxed">
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
