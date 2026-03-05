"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Coins, BarChart3, Key, Package, History } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  { label: "Hồ sơ", shortLabel: "Hồ sơ", href: "/account", icon: User },
  { label: "Token & Gói dịch vụ", shortLabel: "Token", href: "/account/token", icon: Coins },
  { label: "API Usage", shortLabel: "API", href: "/account/api-usage", icon: BarChart3 },
  { label: "API Keys", shortLabel: "Keys", href: "/account/api-keys", icon: Key },
  { label: "Đơn hàng", shortLabel: "Đơn hàng", href: "/account/orders", icon: Package },
  { label: "Lịch sử giao dịch", shortLabel: "Lịch sử", href: "/account/transactions", icon: History },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[220px] border-r border-border pr-6 flex-shrink-0">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2 ${
                  isActive
                    ? "text-primary font-medium border-primary bg-primary/5"
                    : "text-foreground border-transparent hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        {user && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="px-4 mb-3">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around h-14 pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/account"
                ? pathname === "/account"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                <span
                  className={`text-[10px] leading-none ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
