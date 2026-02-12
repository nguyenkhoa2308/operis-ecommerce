import Link from "next/link";
import { HelpCircle, Truck, RotateCcw, PackageSearch, MessageCircle } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";

const supportItems = [
  {
    icon: HelpCircle,
    title: "Câu hỏi thường gặp",
    desc: "Tìm câu trả lời nhanh về Operisbot, thanh toán, token và vận chuyển.",
    href: "/support/faq",
    cta: "XEM FAQ",
  },
  {
    icon: PackageSearch,
    title: "Theo dõi đơn hàng",
    desc: "Kiểm tra trạng thái đơn hàng và thời gian giao hàng dự kiến.",
    href: "/support/order-tracking",
    cta: "THEO DÕI",
  },
  {
    icon: Truck,
    title: "Vận chuyển & Giao hàng",
    desc: "Thông tin về phí vận chuyển, thời gian giao hàng và khu vực hỗ trợ.",
    href: "/support/shipping",
    cta: "XEM CHI TIẾT",
  },
  {
    icon: RotateCcw,
    title: "Chính sách đổi trả",
    desc: "Hướng dẫn đổi trả sản phẩm, hoàn tiền và điều kiện áp dụng.",
    href: "/support/return-policy",
    cta: "XEM CHÍNH SÁCH",
  },
  {
    icon: MessageCircle,
    title: "Liên hệ hỗ trợ",
    desc: "Không tìm thấy câu trả lời? Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn.",
    href: "/contact",
    cta: "LIÊN HỆ NGAY",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageBanner
        title="HỖ TRỢ"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Hỗ trợ" }]}
      />

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Chúng tôi có thể giúp gì cho bạn?</h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Tìm thông tin hỗ trợ về sản phẩm Operisbot, đơn hàng, thanh toán và các chính sách.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group border border-border rounded-lg p-6 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon size={22} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
              <span className="text-xs tracking-widest text-primary font-medium group-hover:underline underline-offset-2">
                {item.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hotline */}
      <section className="bg-muted">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">HOTLINE</p>
          <h3 className="text-2xl font-semibold tracking-tight mb-2">Cần hỗ trợ gấp?</h3>
          <p className="text-base text-muted-foreground mb-4">Gọi cho chúng tôi — phục vụ 24/7</p>
          <a
            href="tel:+84779886666"
            className="inline-block bg-foreground text-white text-sm tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors"
          >
            +84 779 886 666
          </a>
        </div>
      </section>

      <SubscribeSection />
    </>
  );
}
