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
    label: "Operisbot Cá Nhân 1",
    href: "/shop/operisbot-ca-nhan-1",
    icon: Monitor,
    desc: "Dành cho người mới — Tặng sẵn 2.000.000 Token",
    image:
      "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&h=260&fit=crop",
    tags: ["Người mới", "3.000.000₫"],
  },
  {
    label: "Operisbot Cá Nhân 2",
    href: "/shop/operisbot-ca-nhan-2",
    icon: Zap,
    desc: "Dành cho cường độ cao — Tặng sẵn 5.000.000 Token",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=260&fit=crop",
    tags: ["Cường độ cao", "5.500.000₫"],
  },
];

const simpleLinks = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/about" },
  { label: "HỖ TRỢ", href: "/support" },
  { label: "LIÊN HỆ", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          Operis<span className="text-primary">bot.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          {/* Expanding search */}
          <form onSubmit={handleSearch} className="relative flex items-center">
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
            <div
              className="relative"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => router.push("/account")}
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
            <Link
              href="/login"
              className="flex items-center justify-center w-6 h-6 text-foreground hover:text-primary transition-colors"
              aria-label="Đăng nhập"
            >
              <UserIcon size={20} color="currentColor" />
            </Link>
          )}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-white animate-slide-in">
          <div className="flex flex-col py-4 px-4 gap-1">
            {simpleLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm tracking-widest py-2 ${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-[10px] tracking-widest text-muted-foreground mt-3 mb-1 font-semibold">
              SẢN PHẨM
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <cat.icon size={16} />
                {cat.label}
              </Link>
            ))}
            <Link
              href={isLoggedIn ? "/account" : "/login"}
              className="text-sm tracking-widest py-2 text-muted-foreground mt-2 border-t border-border pt-3"
              onClick={() => setMobileOpen(false)}
            >
              {isLoggedIn ? "TÀI KHOẢN" : "ĐĂNG NHẬP"}
            </Link>
          </div>
        </nav>
      )}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
