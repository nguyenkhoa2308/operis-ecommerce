import {
  Share2,
  Search,
  Mail,
  BarChart3,
  FileSpreadsheet,
  Globe,
} from "lucide-react";

const useCases = [
  {
    icon: Share2,
    title: "Quản lý MXH",
    desc: "Tự động đăng bài, trả lời comment, theo dõi lượt tương tác trên Facebook, Zalo, TikTok.",
  },
  {
    icon: Search,
    title: "Scraping dữ liệu",
    desc: "Thu thập data từ website, marketplace, bảng giá đối thủ — chạy liên tục không cần giám sát.",
  },
  {
    icon: Mail,
    title: "Email tự động",
    desc: "Gửi email cá nhân hóa hàng loạt, follow-up tự động, nuôi lead không bỏ sót.",
  },
  {
    icon: BarChart3,
    title: "Theo dõi đối thủ",
    desc: "Giám sát giá, khuyến mãi, sản phẩm mới của đối thủ 24/7 và báo cáo tức thì.",
  },
  {
    icon: FileSpreadsheet,
    title: "Xử lý báo cáo",
    desc: "Tổng hợp dữ liệu từ nhiều nguồn, tạo báo cáo Excel/PDF tự động theo lịch.",
  },
  {
    icon: Globe,
    title: "Và hàng trăm tác vụ khác",
    desc: "Tuyển dụng, chăm sóc khách hàng, quản lý đơn hàng — mọi thứ chạy theo Workflow.",
  },
];

export function IntroSection() {
  return (
    <section className="bg-muted">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            OPERISBOT LÀM ĐƯỢC GÌ?
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            TỰ ĐỘNG HÓA MỌI TÁC VỤ, 24/7
          </h2>
          <p className="text-base text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
            Chọn Workflow có sẵn hoặc tùy chỉnh theo nhu cầu — Operisbot chạy
            liên tục trên thiết bị riêng, không tốn tài nguyên máy chính.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="bg-white p-6 rounded-lg flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <uc.icon size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">{uc.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
