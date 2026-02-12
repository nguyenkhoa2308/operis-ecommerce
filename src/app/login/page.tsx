"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageBanner } from "@/components/ui/page-banner";
import { useAuthStore } from "@/store/auth-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push(redirectTo || "/account");
    } else {
      setError(result.error || "Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-4 py-2">{error}</p>
        )}
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu *"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-white text-xs tracking-widest py-3 hover:bg-foreground/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
        </button>
        <p className="text-sm text-center text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href={redirectTo ? `/register?redirect=${redirectTo}` : "/register"} className="text-primary hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <PageBanner
        title="ĐĂNG NHẬP"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Đăng nhập" },
        ]}
      />
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
}
