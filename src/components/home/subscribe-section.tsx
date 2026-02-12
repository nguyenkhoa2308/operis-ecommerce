"use client";

import { useState } from "react";
import { useToastStore } from "@/store/toast-store";

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const addToast = useToastStore((s) => s.addToast);

  return (
    <section className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-lg font-semibold tracking-widest mb-1">ĐĂNG KÝ NHẬN TIN</h2>
          <p className="text-sm text-white/60">Nhận tin tức mới nhất, ưu đãi và khuyến mãi trực tiếp qua email.</p>
        </div>
        <form className="flex w-full md:w-auto" onSubmit={(e) => { e.preventDefault(); addToast("Đăng ký nhận tin thành công!"); setEmail(""); }}>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 md:w-80 px-4 py-3 text-sm bg-white text-foreground placeholder:text-muted-foreground outline-none"
            required
          />
          <button type="submit" className="bg-primary text-white text-xs tracking-widest px-8 py-3 hover:bg-primary-dark transition-colors shrink-0">
            ĐĂNG KÝ
          </button>
        </form>
      </div>
    </section>
  );
}
