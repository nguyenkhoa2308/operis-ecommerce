import {
  Share2,
  Search,
  BarChart3,
  Blocks,
  Users,
  Calculator,
} from "lucide-react";

const capabilities = [
  {
    icon: Users,
    title: "Tuyển dụng & Nhân sự",
    color: "text-amber",
    bg: "bg-amber/10",
    bullet: "text-amber",
    desc: "Tự động lên TopCV đọc CV ứng viên, đánh giá phù hợp với JD, chấm điểm và gửi mail phỏng vấn.",
    details: [
      "Lên TopCV, đọc danh sách ứng viên nộp CV, thu thập thông tin tự động.",
      "AI đánh giá ứng viên với công việc trên thang điểm, xếp hạng phù hợp.",
      "Check lịch trống, tự gửi email mời phỏng vấn — xây 1 lần, chạy mãi mãi.",
    ],
  },
  {
    icon: Calculator,
    title: "Hóa đơn & Báo cáo thuế",
    color: "text-emerald",
    bg: "bg-emerald/10",
    bullet: "text-emerald",
    desc: "Đọc mail nhận hóa đơn, tổng hợp, tự đăng nhập thuedientu báo cáo thuế theo tháng/quý.",
    details: [
      "Đọc mail hoặc nhận yêu cầu để báo cáo thuế và xuất hóa đơn thuế.",
      "Theo dõi ghi nhận hóa đơn đến, tự lên thuedientu đăng nhập và thực hiện.",
      "Báo cáo thuế tự động theo tháng/quý, cảnh báo hạn nộp và sai lệch.",
    ],
  },
  {
    icon: Search,
    title: "Marketing & SEO",
    color: "text-violet",
    bg: "bg-violet/10",
    bullet: "text-violet",
    desc: "Lên Semrush, Google Trending, Ahrefs thu thập từ khóa, viết bài SEO và đăng lên web.",
    details: [
      "Thu thập thông tin từ khóa từ Semrush, Ahrefs, Google Trending.",
      "Tổng hợp báo cáo, viết nội dung SEO rồi tự đăng lên website của bạn.",
      "Lên kế hoạch đăng bài, tạo profile MXH để xây backlink tự nhiên.",
    ],
  },
  {
    icon: BarChart3,
    title: "Quảng cáo & Đối thủ",
    color: "text-rose",
    bg: "bg-rose/10",
    bullet: "text-rose",
    desc: "Đọc báo cáo quảng cáo, lên kế hoạch chi tiết, theo dõi đối thủ 24/7 và đề xuất tối ưu.",
    details: [
      "Đọc báo cáo dữ liệu quảng cáo, lên kế hoạch quảng cáo chi tiết.",
      "Theo dõi để đề xuất thay đổi hiệu quả, tối ưu ngân sách.",
      "Giám sát giá, khuyến mãi đối thủ — cảnh báo qua Zalo/Telegram.",
    ],
  },
  {
    icon: Share2,
    title: "Quản lý MXH & Chăm sóc KH",
    color: "text-sky",
    bg: "bg-sky/10",
    bullet: "text-sky",
    desc: "Tư vấn tự động, trả lời khách qua Zalo và các kênh truyền thông, đăng bài đa nền tảng.",
    details: [
      "Tự động trả lời khách hàng qua Zalo (cá nhân) và các kênh truyền thông.",
      "Lên lịch đăng bài đa nền tảng — 1 nội dung xuất hiện trên 5 kênh cùng lúc.",
      "AI đọc comment & inbox, phân loại khách tiềm năng, tự trả lời theo kịch bản.",
    ],
  },
  {
    icon: Blocks,
    title: "Và bất kỳ tác vụ nào khác",
    color: "text-orange",
    bg: "bg-orange/10",
    bullet: "text-orange",
    desc: "Hệ thống có thể làm bất kỳ việc gì miễn là bạn có workflow chi tiết để hệ thống hiểu và chạy.",
    details: [
      "Suy luận, tổng hợp báo cáo, phân tích tài chính cho doanh nghiệp.",
      "Đồng bộ đơn hàng Shopee/Lazada/TikTok Shop về 1 bảng quản lý.",
      "Chỉ cần xây workflow 1 lần — tự động chạy mãi mãi, 24/7.",
    ],
  },
];

export function CapabilitiesSection() {
  return (
    <section className="bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            OPERISBOT LÀM ĐƯỢC GÌ?
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            TỰ ĐỘNG HÓA MỌI TÁC VỤ, 24/7
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Chọn Workflow có sẵn hoặc tùy chỉnh theo nhu cầu — Operisbot chạy
            liên tục trên thiết bị riêng, không tốn tài nguyên máy chính.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${cap.bg} flex items-center justify-center shrink-0`}>
                  <cap.icon
                    size={20}
                    className={cap.color}
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="text-base font-semibold">{cap.title}</h4>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {cap.desc}
              </p>
              <ul className="space-y-2 flex-1">
                {cap.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-base leading-relaxed"
                  >
                    <span className={`${cap.bullet} font-bold shrink-0 mt-0.5`}>
                      &bull;
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
