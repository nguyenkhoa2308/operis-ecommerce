"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Coins, BarChart3, Package, History } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  { label: "Hồ sơ", href: "/account", icon: User },
  { label: "Token & Gói dịch vụ", href: "/account/token", icon: Coins },
  { label: "API Usage", href: "/account/api-usage", icon: BarChart3 },
  { label: "Đơn hàng", href: "/account/orders", icon: Package },
  { label: "Lịch sử giao dịch", href: "/account/transactions", icon: History },
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

      {/* Mobile tab bar */}
      <div className="md:hidden overflow-x-auto border-b border-border mb-6">
        <nav className="flex items-center gap-2 pb-2" style={{ minWidth: "max-content" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-primary font-medium bg-primary/10 rounded-full"
                    : "text-foreground hover:bg-muted rounded-full"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
