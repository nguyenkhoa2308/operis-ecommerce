"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ConcentricCircles, DotGrid } from "@/components/ui/decorative-pattern";
import { FadeIn } from "@/components/ui/motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    quote:
      "Operisbot giúp tôi tự động hóa hoàn toàn quy trình mà không lo lộ dữ liệu. Bộ não AI chạy riêng trên Mini PC, máy chính tắt bot vẫn làm. Năng suất tăng gấp đôi mà không cần thuê thêm nhân sự.",
    author: "Nguyễn Văn Anh",
    role: "Founder, ShopTech",
    rating: 5,
    initials: "NA",
    color: "bg-violet",
  },
  {
    quote:
      "Cắm điện là chạy, không cần cài đặt gì phức tạp. Tôi tiết kiệm được gần 70% chi phí so với thuê tài khoản AI lẻ. Thiết bị nhỏ gọn, chạy 24/7 cực kỳ bền bỉ.",
    author: "Trần Thị Mai",
    role: "CEO, Mai Digital",
    rating: 5,
    initials: "TM",
    color: "bg-sky",
  },
  {
    quote:
      "Trước đây tôi phải thuê 2 nhân viên để quét giá đối thủ. Giờ chỉ cần 1 Operisbot là xong — chạy im lặng, báo cáo mỗi sáng qua Zalo. ROI thu lại chỉ sau 2 tuần.",
    author: "Lê Hoàng Duy",
    role: "Chủ shop Shopee",
    rating: 5,
    initials: "LD",
    color: "bg-emerald",
  },
  {
    quote:
      "Mình dùng Operisbot để auto đăng bài lên 5 kênh MXH cùng lúc. Tiết kiệm 3-4 tiếng mỗi ngày, tập trung vào content chất lượng thay vì thao tác lặp lại.",
    author: "Phạm Quỳnh Trang",
    role: "Content Creator",
    rating: 5,
    initials: "PT",
    color: "bg-amber",
  },
];

export function TestimonialSection() {
  return (
    <section className="py-20 bg-gradient-testimonial relative overflow-hidden">
      <ConcentricCircles
        className="right-[-180px] top-[-120px]"
        size={450}
        color="#8b5cf6"
        opacity={0.04}
      />
      <DotGrid
        className="left-0 bottom-0"
        color="#6b8fb5"
        opacity={0.04}
        cols={10}
        rows={6}
        gap={28}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-12">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            KHÁCH HÀNG NÓI GÌ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            ĐƯỢC TIN DÙNG BỞI HÀNG TRĂM DOANH NGHIỆP
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Những người đã trải nghiệm và chia sẻ về hiệu quả thực tế khi sử
            dụng Operisbot trong công việc hàng ngày.
          </p>
        </FadeIn>

        <div className="relative group">
          {/* Custom nav buttons */}
          <button
            type="button"
            className="testimonial-prev absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary/60 hover:text-primary hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="Trước"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="testimonial-next absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary/60 hover:text-primary hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="Tiếp"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              el: ".testimonial-pagination",
              clickable: true,
              bulletClass: "testimonial-dot",
              bulletActiveClass: "testimonial-dot-active",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="swiper-testimonial"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.author}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative h-full flex flex-col">
                  <Quote
                    size={32}
                    className="text-violet/10 absolute top-6 right-6"
                    strokeWidth={1.5}
                  />

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div
                      className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center shrink-0`}
                    >
                      <span className="text-white text-xs font-bold">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-base font-semibold">{t.author}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots — rendered outside Swiper to avoid overflow clipping */}
          <div className="testimonial-pagination flex justify-center items-center gap-1.5 mt-8" />
        </div>
      </div>
    </section>
  );
}
