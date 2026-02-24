import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { FaqClient } from "@/components/support/faq-client";
import { faqCategories } from "@/data/faq";
import { faqPageJsonLd } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/json-ld-script";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp | Operis",
  description:
    "Trả lời những câu hỏi thường gặp về sản phẩm, thanh toán, vận chuyển và bảo hành tại Operis.",
  openGraph: {
    title: "FAQ | Operis",
    description:
      "Trả lời những câu hỏi thường gặp về sản phẩm, thanh toán, vận chuyển và bảo hành tại Operis.",
    url: "https://operis.vn/support/faq",
  },
};

export default function FaqPage() {
  const allFaqItems = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <>
      <JsonLdScript data={faqPageJsonLd(allFaqItems)} />
      <PageBanner
        title="CÂU HỎI THƯỜNG GẶP"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Hỗ trợ" },
          { label: "Câu hỏi thường gặp" },
        ]}
      />
      <FaqClient categories={faqCategories} />
      <SubscribeSection />
    </>
  );
}
