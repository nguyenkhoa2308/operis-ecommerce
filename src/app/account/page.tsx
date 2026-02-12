"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const { addToast } = useToastStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    updateProfile(form);
    addToast("Cập nhật thông tin thành công", "success");
  };

  return (
    <div>
      <h2 className="text-sm font-semibold tracking-widest uppercase mb-6">Thông tin cá nhân</h2>

      <div className="bg-white border border-border rounded-lg p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold tracking-widest block mb-2">EMAIL</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="text-[11px] text-muted-foreground mt-1.5">Email không thể thay đổi</p>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest block mb-2">HỌ VÀ TÊN</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest block mb-2">SỐ ĐIỆN THOẠI</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest block mb-2">ĐỊA CHỈ</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white text-xs tracking-widest px-6 py-3 hover:bg-primary/90 transition-colors"
          >
            CẬP NHẬT
          </button>
        </form>
      </div>
    </div>
  );
}
