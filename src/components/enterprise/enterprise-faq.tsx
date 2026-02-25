"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqItems = [
  {
    q: "Operisbot Enterprise khác gì gói Cá nhân?",
    a: "Gói Enterprise cho phép tùy biến hoàn toàn: chọn cấu hình phần cứng mạnh hơn, Token không giới hạn, cài đặt Workflow theo quy trình riêng của doanh nghiệp. Kèm theo hỗ trợ triển khai tận nơi, training nhân viên và SLA bảo hành riêng.",
  },
  {
    q: "Chi phí triển khai Enterprise như thế nào?",
    a: "Chi phí phụ thuộc vào cấu hình phần cứng, số lượng Token và Workflow cần thiết. Chúng tôi sẽ tư vấn và báo giá riêng sau khi khảo sát nhu cầu cụ thể. Điền form tư vấn bên dưới để nhận báo giá trong 24h.",
  },
  {
    q: "Thời gian triển khai bao lâu?",
    a: "Thông thường từ 3-7 ngày làm việc kể từ khi xác nhận đơn hàng. Bao gồm: cấu hình phần cứng (1-2 ngày), cài đặt Workflow (1-3 ngày), testing & bàn giao (1-2 ngày). Với đơn hàng lớn có thể lên đến 2 tuần.",
  },
  {
    q: "Dữ liệu doanh nghiệp có an toàn không?",
    a: "Tuyệt đối. Operisbot chạy trên phần cứng riêng đặt tại văn phòng bạn — dữ liệu không rời khỏi thiết bị, không lên cloud, không qua server trung gian. Hardware Sandbox đảm bảo AI hoàn toàn \"vô hình\" trước dữ liệu nhạy cảm trên máy chính.",
  },
  {
    q: "Có hỗ trợ tích hợp với phần mềm hiện tại không?",
    a: "Có. Operisbot Enterprise hỗ trợ tích hợp với hầu hết phần mềm phổ biến: ERP (SAP, Odoo), CRM (HubSpot, Salesforce), kế toán (MISA, Fast), sàn TMĐT (Shopee, Lazada, TikTok Shop), Zalo OA, Google Workspace và nhiều hơn nữa.",
  },
  {
    q: "Chính sách bảo hành và hỗ trợ kỹ thuật?",
    a: "Enterprise được bảo hành phần cứng 24 tháng, hỗ trợ kỹ thuật 24/7 qua hotline và Zalo OA riêng. Có đội ngũ kỹ thuật chuyên trách, cam kết phản hồi trong 30 phút và xử lý sự cố trong 4 giờ.",
  },
];

export function EnterpriseFaq() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqItems.map((item, i) => {
        const isOpen = openItems.has(i);
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 ${
              isOpen
                ? "bg-white border-primary/20 shadow-md shadow-primary/5"
                : "bg-white border-border/50 hover:border-primary/15 hover:shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-4 px-6 py-5 text-left"
            >
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  isOpen ? "bg-primary/10" : "bg-muted/60"
                }`}
              >
                <MessageCircleQuestion
                  size={18}
                  className={`transition-colors duration-300 ${
                    isOpen ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={1.5}
                />
              </span>
              <span
                className={`text-base font-medium flex-1 transition-colors duration-300 ${
                  isOpen ? "text-primary" : "text-foreground"
                }`}
              >
                {item.q}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* CSS grid trick for smooth height animation */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 pl-[4.25rem] text-base text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
