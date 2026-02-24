"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calculator,
  Megaphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface WorkflowItem {
  icon: LucideIcon;
  label: string;
  color: string;
  bg: string;
  border: string;
  title: string;
  desc: string;
  steps: string[];
}

const workflows: WorkflowItem[] = [
  {
    icon: Building2,
    label: "Nhân sự",
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    title: "Tự động quản lý Nhân sự & Tuyển dụng",
    desc: "Hệ thống tự động lên TopCV, đọc danh sách ứng viên nộp CV, thu thập thông tin, đánh giá ứng viên với công việc trên thang điểm rồi tự động check lịch và gửi mail mời phỏng vấn.",
    steps: [
      "Truy cập TopCV, đọc danh sách ứng viên mới",
      "Thu thập & tổng hợp thông tin từng ứng viên",
      "AI đánh giá phù hợp với JD, chấm điểm thang 100",
      "Check lịch trống & tự gửi email mời phỏng vấn",
    ],
  },
  {
    icon: Calculator,
    label: "Thuế",
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/30",
    title: "Tự động Hóa đơn & Báo cáo thuế",
    desc: "Đọc mail hoặc nhận yêu cầu để báo cáo thuế và xuất hóa đơn, theo dõi ghi nhận hóa đơn đến, tự động lên thuedientu để đăng nhập rồi thực hiện báo cáo theo tháng, quý.",
    steps: [
      "Đọc email, nhận hóa đơn & tổng hợp tự động",
      "Theo dõi & ghi nhận hóa đơn đến/đi",
      "Tự đăng nhập thuedientu, thực hiện báo cáo",
      "Xuất báo cáo thuế theo tháng/quý",
    ],
  },
  {
    icon: Megaphone,
    label: "Marketing",
    color: "text-violet",
    bg: "bg-violet/10",
    border: "border-violet/30",
    title: "Tự động Marketing & SEO Content",
    desc: "Tự động lên Semrush, Google Trending, Ahrefs thu thập thông tin từ khóa, tổng hợp báo cáo, viết bài nội dung SEO rồi đăng lên web của bạn.",
    steps: [
      "Thu thập từ khóa từ Semrush, Ahrefs, Google Trending",
      "Tổng hợp báo cáo & viết nội dung SEO",
      "Tự động đăng bài lên website của bạn",
      "Lên lịch đăng bài đa nền tảng",
    ],
  },
  {
    icon: TrendingUp,
    label: "Quảng cáo",
    color: "text-sky",
    bg: "bg-sky/10",
    border: "border-sky/30",
    title: "Tự động MXH & Quảng cáo",
    desc: "Tạo profile mạng xã hội để xây backlink tự nhiên, đọc báo cáo dữ liệu quảng cáo và lên kế hoạch quảng cáo chi tiết, theo dõi để đề xuất thay đổi hiệu quả.",
    steps: [
      "Tạo profile MXH, xây backlink tự nhiên",
      "Đọc báo cáo quảng cáo Facebook/Google Ads",
      "Lên kế hoạch quảng cáo chi tiết",
      "Theo dõi hiệu quả & đề xuất tối ưu",
    ],
  },
];

export function WorkflowTabs() {
  const [active, setActive] = useState(0);
  const current = workflows[active];

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {workflows.map((w, i) => (
          <button
            key={w.label}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-base font-medium transition-all ${
              i === active
                ? `${w.bg} ${w.color} ${w.border} border shadow-sm`
                : "bg-white text-muted-foreground border border-border hover:border-primary/20 hover:bg-muted/50"
            }`}
          >
            <w.icon size={18} strokeWidth={1.5} />
            {w.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden"
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                {current.desc}
              </p>
              <p className="text-base text-primary font-medium mt-4">
                Chỉ cần xây 1 lần — tự động chạy mãi mãi.
              </p>
            </div>

            {/* Right — workflow steps */}
            <div className="flex-1 bg-muted/40 p-6 md:p-8 border-t md:border-t-0 md:border-l border-border/50">
              <p className="text-xs text-primary font-medium tracking-wider mb-4">
                WORKFLOW MẪU
              </p>
              <div className="space-y-3">
                {current.steps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className={`w-7 h-7 rounded-full ${current.bg} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      <span
                        className={`text-xs font-bold ${current.color}`}
                      >
                        {i + 1}
                      </span>
                    </span>
                    <span className="text-sm leading-relaxed">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
