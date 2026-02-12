import { RotateCcw, Clock, AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const policies = [
  {
    icon: Clock,
    title: "Thời gian đổi trả",
    desc: "Trong vòng 7 ngày kể từ ngày nhận hàng. Sau 7 ngày, yêu cầu đổi trả sẽ không được chấp nhận.",
  },
  {
    icon: CheckCircle,
    title: "Điều kiện đổi trả",
    items: [
      "Sản phẩm còn nguyên hộp, phụ kiện đầy đủ",
      "Không bị trầy xước, hư hỏng do người dùng",
      "Có hóa đơn mua hàng hoặc mã đơn hàng",
      "Sản phẩm còn nguyên tem niêm phong (nếu có)",
    ],
  },
  {
    icon: XCircle,
    title: "Không áp dụng đổi trả",
    items: [
      "Sản phẩm đã qua sử dụng, cài đặt phần mềm bên ngoài",
      "Sản phẩm bị hư hỏng do va đập, rơi vỡ",
      "Sản phẩm khuyến mãi, giảm giá đặc biệt",
      "Đã quá 7 ngày kể từ ngày nhận hàng",
    ],
  },
];

const steps = [
  { step: "1", title: "Liên hệ", desc: "Gửi yêu cầu đổi trả qua email hoặc hotline" },
  { step: "2", title: "Xác nhận", desc: "Nhân viên xác nhận và hướng dẫn gửi trả" },
  { step: "3", title: "Gửi hàng", desc: "Đóng gói và gửi sản phẩm về kho" },
  { step: "4", title: "Hoàn tất", desc: "Nhận sản phẩm thay thế hoặc hoàn tiền" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ReturnPolicyPage() {
  return (
    <>
      <PageBanner
        title="CHÍNH SÁCH ĐỔI TRẢ"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Hỗ trợ" },
          { label: "Chính sách đổi trả" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Intro */}
        <div className="text-center mb-14">
          <RotateCcw className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Cam kết đổi trả minh bạch</h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Operis cam kết mang đến trải nghiệm mua sắm an tâm. Nếu sản phẩm không đúng mô tả
            hoặc bị lỗi kỹ thuật, bạn hoàn toàn có thể yêu cầu đổi trả.
          </p>
        </div>

        {/* Policy sections */}
        <div className="space-y-8 mb-16">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div key={policy.title} className="border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-primary shrink-0" />
                  <h3 className="text-base font-semibold tracking-widest uppercase">{policy.title}</h3>
                </div>
                {policy.desc && (
                  <p className="text-base text-muted-foreground leading-relaxed">{policy.desc}</p>
                )}
                {policy.items && (
                  <ul className="space-y-2">
                    {policy.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Process steps */}
        <h3 className="text-base font-semibold tracking-widest uppercase text-center mb-8">
          QUY TRÌNH ĐỔI TRẢ
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {steps.map((s, i) => (
            <div key={s.step} className="relative text-center p-5 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-foreground text-white text-sm font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                {s.step}
              </div>
              <p className="text-base font-semibold mb-1">{s.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-muted-foreground -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center border border-border rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-2">Cần hỗ trợ đổi trả?</h3>
          <p className="text-base text-muted-foreground mb-4">
            Liên hệ đội ngũ hỗ trợ để được giúp đỡ nhanh nhất.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="bg-foreground text-white text-sm tracking-widest px-6 py-3 hover:bg-foreground/90 transition-colors rounded"
            >
              LIÊN HỆ NGAY
            </Link>
            <a
              href="tel:+84123456789"
              className="border border-border text-foreground text-sm tracking-widest px-6 py-3 hover:bg-muted transition-colors rounded"
            >
              GỌI HOTLINE
            </a>
          </div>
        </div>
      </div>

      <SubscribeSection />
    </>
  );
}
