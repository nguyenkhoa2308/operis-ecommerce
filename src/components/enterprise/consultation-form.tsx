"use client";

import { useState } from "react";
import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useToastStore } from "@/store/toast-store";

const contactInfo = [
  {
    icon: Phone,
    label: "Hotline",
    value: "+84 853 336 668",
    sub: "Hỗ trợ 24/7",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hungle@hagency.vn",
    sub: "Phản hồi trong 24h",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: MessageCircle,
    label: "Zalo OA",
    value: "Operisbot Official",
    sub: "Chat trực tiếp",
    color: "text-sky",
    bg: "bg-sky/10",
  },
  {
    icon: Clock,
    label: "Giờ tư vấn",
    value: "Thứ 2 — Thứ 6: 8:00 — 18:00",
    sub: "Hỗ trợ kỹ thuật: 24/7",
    color: "text-amber",
    bg: "bg-amber/10",
  },
];

const companySizes = [
  "1-10 nhân viên",
  "11-50 nhân viên",
  "51-200 nhân viên",
  "201-500 nhân viên",
  "500+ nhân viên",
];

export function ConsultationForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    size: "",
    needs: "",
  });
  const addToast = useToastStore((s) => s.addToast);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ trong 24h.");
    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      size: "",
      needs: "",
    });
  };

  const inputClass =
    "w-full border border-white/20 bg-white/5 text-white placeholder:text-white/40 px-4 py-3 text-sm outline-none focus:border-primary transition-colors rounded-lg";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
      {/* Left — contact sidebar */}
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold text-white mb-2">
          LIÊN HỆ TRỰC TIẾP
        </h3>
        <p className="text-white/60 text-sm mb-8">
          Đội ngũ tư vấn Enterprise luôn sẵn sàng hỗ trợ bạn.
        </p>
        <div className="space-y-5">
          {contactInfo.map((info) => (
            <div key={info.label} className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full ${info.bg} flex items-center justify-center shrink-0`}
              >
                <info.icon size={18} className={info.color} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {info.label}
                </h4>
                <p className="text-sm text-white/70">{info.value}</p>
                <p className="text-xs text-white/40">{info.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="lg:col-span-3">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-white mb-1">
            YÊU CẦU TƯ VẤN
          </h3>
          <p className="text-white/60 text-sm mb-6">
            Điền thông tin, chúng tôi sẽ liên hệ báo giá trong 24h.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên *"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Tên công ty *"
                value={form.company}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại *"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email công ty *"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              className={`${inputClass} ${!form.size ? "text-white/40" : ""}`}
              required
            >
              <option value="" disabled>
                Quy mô công ty *
              </option>
              {companySizes.map((s) => (
                <option key={s} value={s} className="text-foreground">
                  {s}
                </option>
              ))}
            </select>
            <textarea
              name="needs"
              placeholder="Mô tả nhu cầu của bạn (VD: cần tự động hóa tuyển dụng, CSKH Zalo, báo cáo thuế...)"
              value={form.needs}
              onChange={handleChange}
              rows={4}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-accent text-white text-xs tracking-widest px-8 py-3 hover:bg-accent/90 transition-colors rounded-full font-medium"
            >
              GỬI YÊU CẦU TƯ VẤN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
