import {
  Share2,
  Search,
  Mail,
  BarChart3,
  FileSpreadsheet,
  Blocks,
} from "lucide-react";

const capabilities = [
  {
    icon: Share2,
    title: "Quản lý MXH",
    color: "text-violet",
    bg: "bg-violet/10",
    bullet: "text-violet",
    desc: "Tự động đăng bài, trả lời comment, theo dõi lượt tương tác trên Facebook, Zalo, TikTok.",
    details: [
      "Lên lịch đăng bài đa nền tảng — 1 nội dung xuất hiện trên 5 kênh cùng lúc.",
      "AI đọc comment & inbox, phân loại khách tiềm năng, tự trả lời theo kịch bản.",
      "Báo cáo tương tác hàng ngày gửi thẳng Zalo/Telegram.",
    ],
  },
  {
    icon: Search,
    title: "Scraping dữ liệu",
    color: "text-sky",
    bg: "bg-sky/10",
    bullet: "text-sky",
    desc: "Thu thập data từ website, marketplace, bảng giá đối thủ — chạy liên tục không cần giám sát.",
    details: [
      "Quét hàng nghìn trang sản phẩm trên Shopee, Lazada, Tiki mỗi giờ.",
      "Tự động lưu vào Google Sheet / database, so sánh biến động giá.",
      "Hỗ trợ anti-bot, proxy rotation, vượt captcha thông minh.",
    ],
  },
  {
    icon: Mail,
    title: "Email tự động",
    color: "text-amber",
    bg: "bg-amber/10",
    bullet: "text-amber",
    desc: "Gửi email cá nhân hóa hàng loạt, follow-up tự động, nuôi lead không bỏ sót.",
    details: [
      "Cá nhân hóa nội dung theo tên, ngành nghề, hành vi mở mail.",
      "Chuỗi follow-up 5-7 bước tự động dừng khi khách phản hồi.",
      "Tracking open rate, click rate — AI tự tối ưu tiêu đề & nội dung.",
    ],
  },
  {
    icon: BarChart3,
    title: "Theo dõi đối thủ",
    color: "text-rose",
    bg: "bg-rose/10",
    bullet: "text-rose",
    desc: "Giám sát giá, khuyến mãi, sản phẩm mới của đối thủ 24/7 và báo cáo tức thì.",
    details: [
      "Cảnh báo Zalo/Telegram ngay khi đối thủ thay đổi giá hoặc ra sản phẩm mới.",
      "So sánh bảng giá đa đối thủ, xuất báo cáo Excel tự động mỗi tuần.",
      "Theo dõi quảng cáo Facebook/Google Ads đối thủ đang chạy.",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Xử lý báo cáo",
    color: "text-emerald",
    bg: "bg-emerald/10",
    bullet: "text-emerald",
    desc: "Tổng hợp dữ liệu từ nhiều nguồn, tạo báo cáo Excel/PDF tự động theo lịch.",
    details: [
      "Kéo data từ CRM, kế toán, kho hàng — merge vào 1 báo cáo tổng.",
      "Tự động gửi báo cáo doanh thu hàng ngày cho sếp qua email/Zalo.",
      "Template báo cáo tùy chỉnh, pivot table, biểu đồ tự cập nhật.",
    ],
  },
  {
    icon: Blocks,
    title: "Và hàng trăm tác vụ khác",
    color: "text-orange",
    bg: "bg-orange/10",
    bullet: "text-orange",
    desc: "Tuyển dụng, chăm sóc khách hàng, quản lý đơn hàng — mọi thứ chạy theo Workflow.",
    details: [
      "Tải CV hàng loạt, AI chấm điểm phù hợp, tự gửi email hẹn phỏng vấn.",
      "Chatbot chăm sóc khách 24/7 trên Zalo, Messenger, website.",
      "Đồng bộ đơn hàng Shopee/Lazada/TikTok Shop về 1 bảng quản lý.",
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
          <p className="text-base text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
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
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {cap.desc}
              </p>
              <ul className="space-y-2 flex-1">
                {cap.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed"
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
