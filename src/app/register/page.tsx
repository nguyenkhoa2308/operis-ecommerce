"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageBanner } from "@/components/ui/page-banner";
import { useAuthStore } from "@/store/auth-store";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const register = useAuthStore((s) => s.register);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Vui lòng nhập họ tên");
      return;
    }
    if (!form.email.trim()) {
      setError("Vui lòng nhập email");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (result.success) {
      router.push(redirectTo || "/account");
    } else {
      setError(result.error || "Đăng ký thất bại");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-4 py-2">{error}</p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Họ và tên *"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu *"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu *"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-white text-xs tracking-widest py-3 hover:bg-foreground/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}
        </button>
        <p className="text-sm text-center text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link href={redirectTo ? `/login?redirect=${redirectTo}` : "/login"} className="text-primary hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <>
      <PageBanner
        title="ĐĂNG KÝ"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Đăng ký" },
        ]}
      />
      <Suspense>
        <RegisterForm />
      </Suspense>
    </>
  );
}
