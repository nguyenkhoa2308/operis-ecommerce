"use client";

import { useState, useRef, useEffect } from "react";
import {
  Building2,
  Calculator,
  MessageCircle,
  TrendingUp,
  Palette,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

interface Workflow {
  icon: LucideIcon;
  label: string;
  color: string;
  bg: string;
  border: string;
  title: string;
  desc: string;
  steps: string[];
  roi: string;
}

const workflows: Workflow[] = [
  {
    icon: Building2,
    label: "Tuyển dụng",
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    title: "Tự động Tuyển dụng & Nhân sự",
    desc: "Hệ thống lên TopCV, đọc danh sách ứng viên, đánh giá với JD trên thang 100 điểm, tự check lịch & gửi mail mời phỏng vấn. Giảm 90% thời gian sàng lọc hồ sơ.",
    steps: [
      "Truy cập TopCV, đọc danh sách ứng viên mới",
      "Thu thập & tổng hợp thông tin từng ứng viên",
      "AI đánh giá phù hợp JD, chấm điểm thang 100",
      "Check lịch trống & tự gửi email mời phỏng vấn",
    ],
    roi: "1 HR xử lý 200 CV/ngày → Operisbot xử lý 2.000 CV/ngày",
  },
  {
    icon: Calculator,
    label: "Thuế",
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/30",
    title: "Tự động Hóa đơn & Báo cáo thuế",
    desc: "Đọc email nhận hóa đơn, ghi nhận tự động, đăng nhập thuedientu.vn thực hiện báo cáo thuế tháng/quý. Không sai sót, không bỏ lọt hóa đơn.",
    steps: [
      "Đọc email, nhận hóa đơn & tổng hợp tự động",
      "Theo dõi & ghi nhận hóa đơn đến/đi",
      "Tự đăng nhập thuedientu, thực hiện báo cáo",
      "Xuất báo cáo thuế theo tháng/quý",
    ],
    roi: "Giảm 95% lỗi sai sót — báo cáo đúng hạn 100%",
  },
  {
    icon: MessageCircle,
    label: "CSKH Zalo",
    color: "text-sky",
    bg: "bg-sky/10",
    border: "border-sky/30",
    title: "Tự động CSKH Zalo OA",
    desc: "Bot đọc tin nhắn Zalo OA, phân loại yêu cầu, trả lời tự động hoặc chuyển nhân viên. Xử lý hàng trăm tin nhắn cùng lúc, 24/7.",
    steps: [
      "Đọc & phân loại tin nhắn Zalo OA",
      "Trả lời tự động theo kịch bản thông minh",
      "Gắn tag, phân loại khách hàng",
      "Chuyển nhân viên khi cần — kèm context đầy đủ",
    ],
    roi: "1 nhân viên CSKH → Bot thay thế 5 nhân viên, phản hồi < 3 giây",
  },
  {
    icon: TrendingUp,
    label: "Marketing SEO",
    color: "text-violet",
    bg: "bg-violet/10",
    border: "border-violet/30",
    title: "Tự động Marketing & SEO Content",
    desc: "Thu thập từ khóa từ Semrush, Ahrefs, Google Trends → tổng hợp báo cáo → viết bài SEO → tự đăng lên website. Lên lịch đa nền tảng.",
    steps: [
      "Thu thập từ khóa từ Semrush, Ahrefs, Google Trends",
      "Tổng hợp báo cáo & phân tích cơ hội",
      "Viết bài nội dung SEO chuẩn E-E-A-T",
      "Tự động đăng bài lên website & MXH",
    ],
    roi: "30 bài SEO/tháng tự động — tăng organic traffic 300%",
  },
  {
    icon: Palette,
    label: "Canva",
    color: "text-rose",
    bg: "bg-rose/10",
    border: "border-rose/30",
    title: "Tự động Thiết kế Canva",
    desc: "Bot tự mở Canva, chọn template, thay text/ảnh theo brief, xuất file. Tạo hàng trăm banner, poster, bài MXH mỗi ngày mà không cần designer.",
    steps: [
      "Đọc brief thiết kế từ sheet hoặc email",
      "Mở Canva, chọn template phù hợp",
      "Thay text, ảnh, màu theo brand guideline",
      "Xuất file & upload lên thư mục hoặc đăng MXH",
    ],
    roi: "Designer làm 10 mẫu/ngày → Bot tạo 100+ mẫu/ngày",
  },
  {
    icon: Warehouse,
    label: "Kho",
    color: "text-teal",
    bg: "bg-teal/10",
    border: "border-teal/30",
    title: "Tự động Quản lý kho & Đơn hàng",
    desc: "Đồng bộ tồn kho đa kênh (Shopee, Lazada, TikTok Shop), cảnh báo hết hàng, tự tạo phiếu nhập/xuất. Không bao giờ bán quá số lượng tồn.",
    steps: [
      "Đồng bộ tồn kho realtime từ đa sàn TMĐT",
      "Cảnh báo tồn kho thấp, đề xuất nhập hàng",
      "Tự tạo phiếu nhập/xuất theo đơn hàng",
      "Báo cáo tồn kho & doanh số theo ngày/tuần/tháng",
    ],
    roi: "Giảm 99% lỗi bán quá tồn — tiết kiệm 2 nhân sự kho",
  },
];

export function EnterpriseWorkflowTabs() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const current = workflows[active];

  const handleTabChange = (i: number) => {
    if (i === active) return;
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  /* Reset step animations on tab change */
  useEffect(() => {
    if (!stepsRef.current) return;
    const items = stepsRef.current.querySelectorAll("[data-step]");
    items.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.animation = "none";
      // Force reflow
      void htmlEl.offsetHeight;
      htmlEl.style.animation = "";
    });
  }, [animKey]);

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {workflows.map((w, i) => (
          <button
            type="button"
            key={w.label}
            onClick={() => handleTabChange(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              i === active
                ? `${w.bg} ${w.color} ${w.border} border shadow-sm`
                : "bg-white text-muted-foreground border border-border hover:border-primary/20 hover:bg-muted/50"
            }`}
          >
            <w.icon size={16} strokeWidth={1.5} />
            {w.label}
          </button>
        ))}
      </div>

      {/* Tab content — CSS fade animation */}
      <div
        key={animKey}
        className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden animate-fade-in-up"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left — description */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full ${current.bg} flex items-center justify-center`}
              >
                <current.icon
                  size={20}
                  className={current.color}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-semibold">{current.title}</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {current.desc}
            </p>
            {/* ROI line */}
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald/5 border border-emerald/20 rounded-full px-4 py-2">
              <TrendingUp size={14} className="text-emerald" />
              <span className="text-sm font-medium text-emerald">
                {current.roi}
              </span>
            </div>
          </div>

          {/* Right — workflow steps */}
          <div
            ref={stepsRef}
            className="flex-1 bg-muted/40 p-6 md:p-8 border-t md:border-t-0 md:border-l border-border/50"
          >
            <p className="text-xs text-primary font-medium tracking-wider mb-4">
              QUY TRÌNH TỰ ĐỘNG
            </p>
            <div className="space-y-3">
              {current.steps.map((step, i) => (
                <div
                  key={`${animKey}-${i}`}
                  data-step
                  className="flex items-start gap-3 animate-fade-in-right"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span
                    className={`w-7 h-7 rounded-full ${current.bg} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <span className={`text-xs font-bold ${current.color}`}>
                      {i + 1}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
