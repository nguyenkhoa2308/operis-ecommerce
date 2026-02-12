"use client";

import { useState } from "react";
import Image from "next/image";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { useToastStore } from "@/store/toast-store";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const addToast = useToastStore((s) => s.addToast);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <PageBanner
        title="LIÊN HỆ"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Thông tin liên hệ */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">THÔNG TIN LIÊN HỆ</h2>
            <p className="text-sm text-muted-foreground mb-8">Liên hệ với chúng tôi để được tư vấn và hỗ trợ.</p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold underline underline-offset-4 mb-3">VĂN PHÒNG</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>CT1A, Chung cư VOV Mễ Trì</p>
                  <p>Nam Từ Liêm, Hà Nội</p>
                  <p>+84 779 886 666</p>
                  <p>hungle@hagency.vn</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold underline underline-offset-4 mb-3">HỖ TRỢ KỸ THUẬT</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Hỗ trợ 24/7</p>
                  <p>+84 779 886 666</p>
                  <p>hungle@hagency.vn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">BẠN CÓ CÂU HỎI?</h2>
            <p className="text-sm text-muted-foreground mb-8">Điền form bên dưới, chúng tôi sẽ phản hồi sớm nhất.</p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                addToast("Gửi câu hỏi thành công! Chúng tôi sẽ phản hồi sớm nhất.");
                setForm({ name: "", email: "", phone: "", subject: "", message: "" });
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Họ và tên *" value={form.name} onChange={handleChange} className="border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors" required />
                <input type="email" name="email" placeholder="Email *" value={form.email} onChange={handleChange} className="border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors" required />
              </div>
              <input type="tel" name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
              <input type="text" name="subject" placeholder="Tiêu đề" value={form.subject} onChange={handleChange} className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
              <textarea name="message" placeholder="Nội dung tin nhắn *" value={form.message} onChange={handleChange} rows={4} className="w-full border border-border px-4 py-3 text-sm outline-none resize-none focus:border-primary transition-colors" required />
              <button type="submit" className="bg-foreground text-white text-xs tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors">GỬI</button>
            </form>
          </div>
        </div>

        {/* Cửa hàng */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Store image */}
          <div className="relative w-full h-[350px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop"
              alt="Operis Office"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">CỬA HÀNG CỦA CHÚNG TÔI</h2>
            <p className="text-sm text-muted-foreground mb-6">Bạn có thể đến trực tiếp tại văn phòng.</p>
            <div>
              <h4 className="text-sm font-semibold underline underline-offset-4 mb-3">HÀ NỘI</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>CT1A, Chung cư VOV Mễ Trì</p>
                <p>Quận Nam Từ Liêm, Hà Nội</p>
                <p>+84 779 886 666</p>
                <p>hungle@hagency.vn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-10 rounded-lg overflow-hidden border border-border h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.899255391922!2d105.78257067608789!3d20.996675130644643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb49b94ab1b%3A0x58570ca03e970d9a!2zQ2h1bmcgY8awIFZPViBN4buFIFRyw6w!5e0!3m2!1sen!2s!4v1739454201386!5m2!1sen!2s"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Operis Office - VOV Mễ Trì, Hà Nội"
          />
        </div>
      </div>

      <SubscribeSection />
    </>
  );
}
