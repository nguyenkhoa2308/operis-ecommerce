"use client";

import { useState } from "react";
import { useToastStore } from "@/store/toast-store";

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const addToast = useToastStore((s) => s.addToast);

  return (
    <section className="bg-gradient-subscribe text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-base md:text-lg font-semibold tracking-widest mb-1">ĐĂNG KÝ NHẬN TIN</h2>
          <p className="text-xs md:text-sm text-white/60">Nhận tin tức mới nhất, ưu đãi và khuyến mãi trực tiếp qua email.</p>
        </div>
        <form className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-0" onSubmit={(e) => { e.preventDefault(); addToast("Đăng ký nhận tin thành công!"); setEmail(""); }}>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 md:w-80 px-4 py-3 text-sm bg-white text-foreground placeholder:text-muted-foreground outline-none rounded-lg sm:rounded-none sm:rounded-l-lg"
            required
          />
          <button type="submit" className="bg-accent text-white text-xs tracking-widest px-8 py-3 hover:bg-accent/90 transition-colors shrink-0 rounded-lg sm:rounded-none sm:rounded-r-lg">
            ĐĂNG KÝ
          </button>
        </form>
      </div>
    </section>
  );
}
