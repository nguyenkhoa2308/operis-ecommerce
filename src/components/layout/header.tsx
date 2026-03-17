"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
  MessageSquare,
  Coins,
  BookOpen,
} from "lucide-react";
import UserIcon from "@/components/icons/user-icon";
import { useAuthStore } from "@/store/auth-store";
import { usePathname } from "next/navigation";

const simpleLinks = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/about" },
  { label: "CASE STUDY", href: "/case-study" },
  { label: "TIN TỨC", href: "/blog" },
  { label: "HỖ TRỢ", href: "/support" },
  { label: "LIÊN HỆ", href: "/contact" },
];

const guideLinks = [
  { label: "Hướng dẫn sử dụng", href: "/guide", icon: BookOpen },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const pathname = usePathname();

  const userMenuRef = useRef<HTMLDivElement>(null);

  /* Close user menu on outside click */
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-[900] tracking-tight">
          Operis<span className="text-primary">bot.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {simpleLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm tracking-widest transition-colors ${
                (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Hướng dẫn dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGuideOpen(true)}
            onMouseLeave={() => setGuideOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1 text-sm tracking-widest transition-colors ${
                pathname.startsWith("/download") || pathname.startsWith("/guide")
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              TIỆN ÍCH
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${guideOpen ? "rotate-180" : ""}`}
              />
            </button>

            {guideOpen && (
              <div className="absolute top-full right-0 pt-2">
                <div className="bg-white border border-border rounded-xl shadow-2xl w-52 overflow-hidden py-1.5">
                  {guideLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setGuideOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        pathname === item.href
                          ? "text-primary font-medium bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 lg:gap-5">
          {isLoggedIn ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="relative flex items-center justify-center w-7 h-7 rounded-full bg-foreground text-white text-[11px] font-semibold hover:bg-primary transition-colors"
                aria-label={`Tài khoản: ${user?.name}`}
              >
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </button>

              {userMenuOpen && (
                <div className="absolute top-full right-0 pt-2">
                  <div className="bg-white border border-border rounded-xl shadow-2xl w-56 overflow-hidden">
                    <div className="px-4 py-3.5 border-b border-border">
                      <p className="text-sm font-semibold truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1.5">
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <User size={16} /> Tài khoản
                      </Link>
                      <Link
                        href="/account/chat"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <MessageSquare size={16} /> Chat AI
                      </Link>
                      <Link
                        href="/account/token"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Coins size={16} /> Token
                      </Link>
                    </div>
                    <div className="border-t border-border py-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden lg:inline-flex text-xs tracking-widest bg-foreground text-white px-5 py-2 rounded-full hover:bg-primary transition-colors"
              >
                ĐĂNG NHẬP
              </Link>
              <Link
                href="/login"
                className="lg:hidden flex items-center justify-center w-6 h-6 text-foreground hover:text-primary transition-colors"
                aria-label="Đăng nhập"
              >
                <UserIcon size={20} color="currentColor" />
              </Link>
            </>
          )}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav — full-screen slide-in overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <nav
        className={`lg:hidden fixed top-0 left-0 z-[70] h-full w-full max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-xl font-[900] tracking-tight"
          >
            Operis<span className="text-primary">bot.</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Đóng menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu links */}
        <div className="flex-1 overflow-y-auto py-4 px-5">
          <div className="flex flex-col gap-1">
            {simpleLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm tracking-widest py-3 border-b border-border/50 ${
                  (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tiện ích section */}
          <p className="text-[10px] tracking-widest text-muted-foreground mt-5 mb-1">
            TIỆN ÍCH
          </p>
          <div className="flex flex-col gap-1">
            {guideLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 text-sm py-3 border-b border-border/50 ${
                  pathname === item.href
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={14} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Menu footer */}
        <div className="border-t border-border px-5 py-4">
          {isLoggedIn && user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground text-white text-xs font-semibold flex items-center justify-center">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-xs tracking-wider border border-border py-2.5 rounded hover:bg-muted transition-colors"
                >
                  TÀI KHOẢN
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs tracking-wider text-red-500 border border-red-200 px-4 py-2.5 rounded hover:bg-red-50 transition-colors"
                >
                  ĐĂNG XUẤT
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center text-xs tracking-widest bg-foreground text-white py-3 rounded hover:bg-primary transition-colors"
            >
              ĐĂNG NHẬP
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
