import { Truck, Clock, MapPin, Shield, CreditCard, Package } from "lucide-react";
import Link from "next/link";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const shippingMethods = [
  {
    icon: Truck,
    title: "Giao hàng tiêu chuẩn",
    time: "3 - 5 ngày",
    price: "30.000đ",
    desc: "Áp dụng toàn quốc, miễn phí cho đơn hàng trên 2.000.000đ",
  },
  {
    icon: Clock,
    title: "Giao hàng nhanh",
    time: "1 - 2 ngày",
    price: "60.000đ",
    desc: "Áp dụng nội thành TP.HCM và Hà Nội",
  },
  {
    icon: MapPin,
    title: "Nhận tại cửa hàng",
    time: "Ngay lập tức",
    price: "Miễn phí",
    desc: "Đến trực tiếp cửa hàng để nhận sản phẩm",
  },
];

const features = [
  { icon: Shield, title: "Đóng gói cẩn thận", desc: "Sản phẩm được đóng gói chống sốc, đảm bảo an toàn trong quá trình vận chuyển." },
  { icon: CreditCard, title: "Thanh toán linh hoạt", desc: "Hỗ trợ COD, chuyển khoản ngân hàng và thanh toán online." },
  { icon: Package, title: "Kiểm tra khi nhận", desc: "Bạn có quyền kiểm tra sản phẩm trước khi thanh toán (COD)." },
];

const faqs = [
  {
    q: "Tôi có thể thay đổi địa chỉ giao hàng sau khi đặt không?",
    a: "Có, bạn có thể thay đổi địa chỉ trong vòng 2 giờ sau khi đặt hàng bằng cách liên hệ hotline hoặc email.",
  },
  {
    q: "Đơn hàng không được giao đúng hẹn thì sao?",
    a: "Nếu đơn hàng chậm hơn thời gian cam kết, vui lòng liên hệ hotline để được hỗ trợ theo dõi và giải quyết.",
  },
  {
    q: "Phí ship có được hoàn lại khi đổi trả?",
    a: "Phí vận chuyển sẽ được hoàn lại nếu lỗi thuộc về phía Operis (sản phẩm lỗi, giao sai).",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShippingPage() {
  return (
    <>
      <PageBanner
        title="VẬN CHUYỂN & GIAO HÀNG"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Hỗ trợ" },
          { label: "Vận chuyển & Giao hàng" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Shipping methods */}
        <h2 className="text-base font-semibold tracking-widest uppercase text-center mb-8">
          PHƯƠNG THỨC VẬN CHUYỂN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {shippingMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.title} className="border border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-base font-semibold mb-1">{method.title}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-sm bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{method.time}</span>
                  <span className="text-sm bg-primary/10 px-2 py-0.5 rounded-full text-primary font-medium">{method.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{method.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Shipping area table */}
        <h2 className="text-base font-semibold tracking-widest uppercase text-center mb-8">
          THỜI GIAN GIAO HÀNG DỰ KIẾN
        </h2>
        <div className="border border-border rounded-lg overflow-hidden mb-16">
          <table className="w-full text-base">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-5 py-3 font-semibold text-sm tracking-wider uppercase">Khu vực</th>
                <th className="text-left px-5 py-3 font-semibold text-sm tracking-wider uppercase">Tiêu chuẩn</th>
                <th className="text-left px-5 py-3 font-semibold text-sm tracking-wider uppercase">Nhanh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 text-muted-foreground">Nội thành TP.HCM / Hà Nội</td>
                <td className="px-5 py-3">1 - 2 ngày</td>
                <td className="px-5 py-3 text-primary font-medium">Trong ngày</td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted-foreground">Ngoại thành TP.HCM / Hà Nội</td>
                <td className="px-5 py-3">2 - 3 ngày</td>
                <td className="px-5 py-3 text-primary font-medium">1 - 2 ngày</td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted-foreground">Các tỉnh miền Nam / Bắc</td>
                <td className="px-5 py-3">3 - 5 ngày</td>
                <td className="px-5 py-3 text-primary font-medium">2 - 3 ngày</td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted-foreground">Vùng sâu, vùng xa, hải đảo</td>
                <td className="px-5 py-3">5 - 7 ngày</td>
                <td className="px-5 py-3 text-muted-foreground">Không hỗ trợ</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="text-center p-6 bg-muted/50 rounded-lg">
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-base font-semibold mb-1">{f.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <h2 className="text-base font-semibold tracking-widest uppercase text-center mb-8">
          CÂU HỎI VỀ VẬN CHUYỂN
        </h2>
        <div className="space-y-4 mb-12">
          {faqs.map((faq) => (
            <div key={faq.q} className="border border-border rounded-lg p-5">
              <p className="text-base font-semibold mb-2">{faq.q}</p>
              <p className="text-base text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/support/order-tracking"
            className="bg-foreground text-white text-sm tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors rounded inline-block"
          >
            THEO DÕI ĐƠN HÀNG
          </Link>
        </div>
      </div>

      <SubscribeSection />
    </>
  );
}
