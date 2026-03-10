"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  Monitor,
  Zap,
  ArrowRight,
  LogOut,
  User,
  Package,
  Coins,
  BookOpen,
} from "lucide-react";
import MagnifierIcon from "@/components/icons/magnifier-icon";
import UserIcon from "@/components/icons/user-icon";
import ShoppingCartIcon from "@/components/icons/shopping-cart-icon";
import CartSidebar from "@/components/layout/cart-sidebar";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { usePathname, useRouter } from "next/navigation";

const categories = [
  {
    label: "Cá Nhân",
    href: "/shop?cat=personal",
    icon: Monitor,
    desc: "Operisbot dành cho cá nhân — Cắm điện là chạy, tặng sẵn Token.",
    image: "/images/hero.png",
    tags: ["Từ 3.000.000₫", "2 gói"],
  },
  {
    label: "Doanh Nghiệp",
    href: "/enterprise",
    icon: Zap,
    desc: "Tùy biến cấu hình, Token, Workflow theo nhu cầu doanh nghiệp.",
    image: "/images/cta.png",
    tags: ["Tùy biến", "Liên hệ"],
  },
];

const simpleLinks = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/about" },
  { label: "HỖ TRỢ", href: "/support" },
  { label: "LIÊN HỆ", href: "/contact" },
];

const guideLinks = [
  { label: "Hướng dẫn sử dụng", href: "/guide", icon: BookOpen },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const pathname = usePathname();
  const router = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

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
          {simpleLinks.slice(0, 1).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm tracking-widest transition-colors ${
                pathname === link.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Sản phẩm mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <Link
              href="/shop"
              className={`flex items-center gap-1 text-sm tracking-widest transition-colors ${
                pathname.startsWith("/shop")
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SẢN PHẨM
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {megaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="bg-white border border-border rounded-xl shadow-2xl w-[560px] overflow-hidden">
                  {/* Header */}
                  <div className="px-6 pt-5 pb-3 border-b border-border flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground">
                      SẢN PHẨM OPERISBOT
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => setMegaOpen(false)}
                      className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1"
                    >
                      Xem tất cả <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Categories grid */}
                  <div className="p-4 grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        onClick={() => setMegaOpen(false)}
                        className="group rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-colors"
                      >
                        {/* Image */}
                        <div className="relative h-28 bg-muted overflow-hidden">
                          <Image
                            src={cat.image}
                            alt={cat.label}
                            fill
                            sizes="200px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <cat.icon size={16} className="text-white" />
                            <span className="text-white text-sm font-semibold">
                              {cat.label}
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                            {cat.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-primary font-medium mt-2 group-hover:gap-2 transition-all">
                            Xem sản phẩm <ChevronRight size={12} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {simpleLinks.slice(1).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm tracking-widest transition-colors ${
                pathname === link.href
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
          {/* Desktop expanding search */}
          <form
            onSubmit={handleSearch}
            className="relative hidden lg:flex items-center"
          >
            <div
              className={`flex items-center overflow-hidden border transition-all duration-300 ease-out ${
                searchOpen
                  ? "w-52 border-border rounded-full bg-muted/50 pl-3 pr-1 py-1"
                  : "w-6 border-transparent"
              }`}
            >
              {searchOpen && (
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery.trim()) setSearchOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              )}
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={() => {
                  if (!searchOpen) setSearchOpen(true);
                }}
                className={`flex items-center justify-center shrink-0 transition-colors ${
                  searchOpen
                    ? "w-6 h-6 text-muted-foreground hover:text-foreground"
                    : "w-6 h-6 text-foreground hover:text-primary"
                }`}
                aria-label="Tìm kiếm"
              >
                {searchOpen ? (
                  <Search size={16} />
                ) : (
                  <MagnifierIcon size={20} color="currentColor" />
                )}
              </button>
            </div>
          </form>
          {/* Mobile search icon */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-6 h-6 text-foreground hover:text-primary transition-colors"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMobileOpen(false);
            }}
            aria-label="Tìm kiếm"
          >
            <MagnifierIcon size={20} color="currentColor" />
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-6 h-6 text-foreground hover:text-primary transition-colors"
            aria-label="Giỏ hàng"
          >
            <ShoppingCartIcon size={20} color="currentColor" strokeWidth={3} />
            <span className="absolute -top-2 -right-3 text-[10px] bg-foreground text-white rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
              {itemCount}
            </span>
          </button>
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
                        href="/account/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Package size={16} /> Đơn hàng
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
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setSearchOpen(false);
              setSearchQuery("");
            }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar — slide down */}
      {searchOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-3 animate-slide-down">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-muted/50 border border-border rounded-full px-3 py-2"
          >
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearchOpen(false);
                  setSearchQuery("");
                }
              }}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="text-muted-foreground hover:text-foreground shrink-0"
              aria-label="Đóng tìm kiếm"
            >
              <X size={16} />
            </button>
          </form>
        </div>
      )}

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
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hướng dẫn section */}
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

          <Link
            href="/shop"
            className={`text-sm tracking-widest py-3 border-b border-border/50 ${
              pathname.startsWith("/shop")
                ? "text-primary font-medium"
                : "text-foreground"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            SẢN PHẨM
          </Link>
          <div className="flex flex-col gap-1 pl-4 mt-1">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex items-center gap-3 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors border-b border-border/50"
                onClick={() => setMobileOpen(false)}
              >
                <cat.icon size={14} />
                {cat.label}
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
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
