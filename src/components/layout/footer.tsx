import Link from "next/link";
import Image from "next/image";
import { FooterNavLinks } from "./footer-nav-links";

const quickLinks = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/about" },
  { label: "CỬA HÀNG", href: "/shop" },
  { label: "LIÊN HỆ", href: "/contact" },
];

const helpLinks = [
  { label: "THEO DÕI ĐƠN HÀNG", href: "/support/order-tracking" },
  { label: "CHÍNH SÁCH ĐỔI TRẢ", href: "/support/return-policy" },
  { label: "VẬN CHUYỂN + GIAO HÀNG", href: "/support/shipping" },
  { label: "CÂU HỎI THƯỜNG GẶP", href: "/support/faq" },
];

const socials = [
  { icon: "/icons/facebook.svg", href: "#", label: "Facebook" },
  // { icon: "/icons/instagram.svg", href: "#", label: "Instagram" },
  // { icon: "/icons/tiktok.svg", href: "#", label: "TikTok" },
  {
    icon: "/icons/zalo_icon.svg",
    href: "https://zalo.me/0853336668",
    label: "Zalo",
  },
  // { icon: "/icons/messenger_icon.svg", href: "#", label: "Messenger" },
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
            đối, hiệu suất 24/7, tiết kiệm 80% chi phí.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="opacity-60 hover:opacity-100 transition-opacity"
                aria-label={s.label}
              >
                <Image
                  src={s.icon}
                  alt={s.label}
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest mb-4">
            LIÊN KẾT NHANH
          </h4>
          <FooterNavLinks links={quickLinks} />
        </div>

        {/* Hỗ trợ */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest mb-4">HỖ TRỢ</h4>
          <FooterNavLinks links={helpLinks} />
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
            href="tel:+84853336668"
            className="text-sm text-foreground underline hover:text-primary transition-colors"
          >
            +84 853 336 668
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
