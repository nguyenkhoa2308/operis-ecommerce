"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";

const testimonials = [
  {
    quote:
      "Operisbot giúp tôi tự động hóa hoàn toàn quy trình mà không lo lộ dữ liệu. Bộ não AI chạy riêng trên Mini PC, máy chính tắt bot vẫn làm. Năng suất tăng gấp đôi mà không cần thuê thêm nhân sự.",
    author: "NGUYỄN VĂN ANH",
    rating: 5,
  },
  {
    quote:
      "Cắm điện là chạy, không cần cài đặt gì phức tạp. Tôi tiết kiệm được gần 70% chi phí so với thuê tài khoản AI lẻ. Thiết bị nhỏ gọn, chạy 24/7 cực kỳ bền bỉ.",
    author: "TRẦN THỊ MAI",
    rating: 5,
  },
];

export function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <section className="py-16 bg-gradient-testimonial relative overflow-hidden">
      <ConcentricCircles className="right-[-180px] top-[-180px]" size={450} color="#8b5cf6" opacity={0.04} />
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <div className="text-6xl text-violet/20 font-serif leading-none mb-4">&ldquo;&rdquo;</div>
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
        <div className="flex justify-center gap-1 mb-2">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-xs font-semibold tracking-widest">{t.author}</p>
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors" aria-label="Trước">
          <ChevronLeft size={36} strokeWidth={1} />
        </button>
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors" aria-label="Tiếp">
          <ChevronRight size={36} strokeWidth={1} />
        </button>
      </div>
    </section>
  );
}
