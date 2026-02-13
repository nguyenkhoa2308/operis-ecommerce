import Link from "next/link";
import { HelpCircle, Truck, RotateCcw, PackageSearch, MessageCircle } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { ConcentricCircles, DotGrid } from "@/components/ui/decorative-pattern";

const supportItems = [
  {
    icon: HelpCircle,
    title: "Câu hỏi thường gặp",
    desc: "Tìm câu trả lời nhanh về Operisbot, thanh toán, token và vận chuyển.",
    href: "/support/faq",
    cta: "XEM FAQ",
    color: "text-violet",
    bg: "bg-violet/10",
    hoverBorder: "hover:border-violet/40",
    hoverShadow: "hover:shadow-violet/10",
  },
  {
    icon: PackageSearch,
    title: "Theo dõi đơn hàng",
    desc: "Kiểm tra trạng thái đơn hàng và thời gian giao hàng dự kiến.",
    href: "/support/order-tracking",
    cta: "THEO DÕI",
    color: "text-sky",
    bg: "bg-sky/10",
    hoverBorder: "hover:border-sky/40",
    hoverShadow: "hover:shadow-sky/10",
  },
  {
    icon: Truck,
    title: "Vận chuyển & Giao hàng",
    desc: "Thông tin về phí vận chuyển, thời gian giao hàng và khu vực hỗ trợ.",
    href: "/support/shipping",
    cta: "XEM CHI TIẾT",
    color: "text-emerald",
    bg: "bg-emerald/10",
    hoverBorder: "hover:border-emerald/40",
    hoverShadow: "hover:shadow-emerald/10",
  },
  {
    icon: RotateCcw,
    title: "Chính sách đổi trả",
    desc: "Hướng dẫn đổi trả sản phẩm, hoàn tiền và điều kiện áp dụng.",
    href: "/support/return-policy",
    cta: "XEM CHÍNH SÁCH",
    color: "text-amber",
    bg: "bg-amber/10",
    hoverBorder: "hover:border-amber/40",
    hoverShadow: "hover:shadow-amber/10",
  },
  {
    icon: MessageCircle,
    title: "Liên hệ hỗ trợ",
    desc: "Không tìm thấy câu trả lời? Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn.",
    href: "/contact",
    cta: "LIÊN HỆ NGAY",
    color: "text-rose",
    bg: "bg-rose/10",
    hoverBorder: "hover:border-rose/40",
    hoverShadow: "hover:shadow-rose/10",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageBanner
        title="HỖ TRỢ"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Hỗ trợ" }]}
      />

      <section className="bg-gradient-testimonial relative overflow-hidden py-16">
        <DotGrid className="left-0 top-0" color="#8b5cf6" opacity={0.05} cols={12} rows={8} gap={28} />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
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
                className={`group bg-white border border-border rounded-lg p-6 ${item.hoverBorder} hover:shadow-lg transition-all`}
              >
                <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon size={22} className={item.color} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                <span className={`text-xs tracking-widest ${item.color} font-medium group-hover:underline underline-offset-2`}>
                  {item.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hotline */}
      <section className="bg-gradient-cta text-white relative overflow-hidden">
        <ConcentricCircles className="right-[-180px] top-[-100px]" size={400} color="#ffffff" opacity={0.04} />
        <div className="absolute top-1/2 left-[-80px] w-[250px] h-[250px] rounded-full bg-primary/10 blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 py-14 text-center relative z-10">
          <p className="text-sm tracking-widest text-sky/80 font-medium mb-3">HOTLINE</p>
          <h3 className="text-2xl font-semibold tracking-tight mb-2">Cần hỗ trợ gấp?</h3>
          <p className="text-base text-white/60 mb-4">Gọi cho chúng tôi — phục vụ 24/7</p>
          <a
            href="tel:+84779886666"
            className="inline-block bg-white text-foreground text-sm tracking-widest px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            +84 779 886 666
          </a>
        </div>
      </section>

      <SubscribeSection />
    </>
  );
}
