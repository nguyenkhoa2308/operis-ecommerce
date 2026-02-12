import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const quickLinks = [
  { label: "TRANG CHỦ", href: "/", active: true },
  { label: "GIỚI THIỆU", href: "/about" },
  { label: "CỬA HÀNG", href: "/shop" },
  { label: "LIÊN HỆ", href: "/contact" },
];

const helpLinks = [
  { label: "THEO DÕI ĐƠN HÀNG", href: "/support/order-tracking" },
  { label: "CHÍNH SÁCH ĐỔI TRẢ", href: "/support/return-policy" },
  { label: "VẬN CHUYỂN + GIAO HÀNG", href: "/support/shipping" },
  { label: "LIÊN HỆ", href: "/contact" },
  { label: "CÂU HỎI THƯỜNG GẶP", href: "/support/faq" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Thương hiệu */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Operis<span className="text-primary">bot.</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Operisbot — Thiết bị Trợ lý AI Vật lý. Cắm là Chạy. Bảo mật tuyệt
            đối, hiệu suất 24/7, tiết kiệm 70% chi phí.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={s.label}
              >
                <s.icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest mb-4">
            LIÊN KẾT NHANH
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors ${
                    link.active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest mb-4">HỖ TRỢ</h4>
          <ul className="space-y-2">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground tracking-wide transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest mb-4">
            LIÊN HỆ
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Bạn có câu hỏi hoặc góp ý?
          </p>
          <a
            href="mailto:hungle@hagency.vn"
            className="text-sm text-foreground underline hover:text-primary transition-colors"
          >
            hungle@hagency.vn
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-1">
            Cần hỗ trợ? Gọi ngay cho chúng tôi.
          </p>
          <a
            href="tel:+84779886666"
            className="text-sm text-foreground underline hover:text-primary transition-colors"
          >
            +84 779 886 666
          </a>
        </div>
      </div>

      <div className="border-t border-border text-center py-6">
        <p className="text-xs text-muted-foreground tracking-wide">
          &copy; {new Date().getFullYear()} Operis. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
}
