"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { useToastStore } from "@/store/toast-store";
import { ConcentricCircles, DotGrid } from "@/components/ui/decorative-pattern";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const addToast = useToastStore((s) => s.addToast);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <PageBanner
        title="LIÊN HỆ"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
      />

      {/* Contact Info + Form Section */}
      <section className="bg-gradient-testimonial relative overflow-hidden">
        <DotGrid
          className="right-0 top-0"
          color="#8b5cf6"
          opacity={0.05}
          cols={10}
          rows={8}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Thông tin liên hệ */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                THÔNG TIN LIÊN HỆ
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Liên hệ với chúng tôi để được tư vấn và hỗ trợ.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-sky/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-sky" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Văn phòng</h4>
                    <p className="text-sm text-muted-foreground">
                      CT1A, Chung cư VOV Mễ Trì
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nam Từ Liêm, Hà Nội
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                    <Phone
                      size={20}
                      className="text-emerald"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Hotline</h4>
                    <p className="text-sm text-muted-foreground">
                      +84 779 886 666
                    </p>
                    <p className="text-sm text-muted-foreground">Hỗ trợ 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-violet/10 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-violet" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      hungle@hagency.vn
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-amber/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-amber" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Giờ làm việc</h4>
                    <p className="text-sm text-muted-foreground">
                      Thứ 2 — Thứ 6: 8:00 — 18:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Hỗ trợ kỹ thuật: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form liên hệ */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                BẠN CÓ CÂU HỎI?
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Điền form bên dưới, chúng tôi sẽ phản hồi sớm nhất.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  addToast(
                    "Gửi câu hỏi thành công! Chúng tôi sẽ phản hồi sớm nhất.",
                  );
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                  });
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Họ và tên *"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors rounded-lg"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors rounded-lg"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors rounded-lg"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Tiêu đề"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors rounded-lg"
                />
                <textarea
                  name="message"
                  placeholder="Nội dung tin nhắn *"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-border px-4 py-3 text-sm outline-none resize-none focus:border-primary transition-colors rounded-lg"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white text-xs tracking-widest px-8 py-3 hover:bg-primary-dark transition-colors rounded-full"
                >
                  GỬI
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Store + Map Section */}
      <section className="relative overflow-hidden">
        <ConcentricCircles
          className="left-[-200px] bottom-[-100px]"
          size={400}
          color="#10b981"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Cửa hàng */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Store image */}
            <div className="relative w-full h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/images/contact.png"
                alt="Operis Office"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                CỬA HÀNG CỦA CHÚNG TÔI
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Bạn có thể đến trực tiếp tại văn phòng.
              </p>
              <div>
                <h4 className="text-sm font-semibold underline underline-offset-4 mb-3">
                  HÀ NỘI
                </h4>
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
          <div className="mt-10 rounded-xl overflow-hidden border-2 border-primary/20 shadow-md h-[400px]">
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
      </section>

      <SubscribeSection />
    </>
  );
}
