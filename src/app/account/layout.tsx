"use client";

import Link from "next/link";
import { PageBanner } from "@/components/ui/page-banner";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { useAuthStore } from "@/store/auth-store";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return (
      <>
        <PageBanner
          title="TÀI KHOẢN"
          breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tài khoản" }]}
        />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground mb-4">Bạn chưa đăng nhập.</p>
          <Link
            href="/login"
            className="inline-block bg-foreground text-white text-xs tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors"
          >
            ĐĂNG NHẬP
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner
        title="TÀI KHOẢN"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tài khoản" }]}
      />
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 pb-20 md:pb-8">
        <div className="md:flex md:gap-8">
          <AccountSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
