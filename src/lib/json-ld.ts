import type { Product } from "@/lib/api/product-mappers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: "VND",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        bestRating: 5,
      },
    }),
  };
}

export function collectionPageJsonLd(title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${SITE_URL}/shop`,
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Giới thiệu Operisbot",
    description:
      "Operisbot là thiết bị tự động hóa và tối ưu hóa quy trình xử lý công việc cho cá nhân và doanh nghiệp, vận hành hoàn toàn bởi AI.",
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "Operis",
      url: SITE_URL,
      description:
        "Hệ thống phát triển từ nền tảng OpenClaw, nâng cấp hoàn toàn về bảo mật, tối thiểu chi phí. Giúp doanh nghiệp giảm 80% chi phí, tăng tốc phát triển.",
      founder: {
        "@type": "Person",
        name: "Lê Tiến Hùng",
        jobTitle: "CEO & Founder",
      },
      knowsAbout: [
        "Tự động hóa quy trình",
        "AI workflow",
        "Mini PC",
        "Tuyển dụng tự động",
        "Báo cáo thuế tự động",
        "Marketing SEO tự động",
      ],
    },
  };
}

export function enterprisePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Operisbot Enterprise — Giải pháp tự động hóa cho Doanh nghiệp",
    description:
      "Tùy biến phần cứng, Token, Workflow theo nhu cầu doanh nghiệp. Giảm 80% chi phí vận hành, tăng năng suất gấp 10 lần.",
    url: `${SITE_URL}/enterprise`,
    mainEntity: {
      "@type": "Service",
      name: "Operisbot Enterprise",
      provider: { "@type": "Organization", name: "Operis", url: SITE_URL },
      serviceType: "Tự động hóa quy trình doanh nghiệp",
      areaServed: { "@type": "Country", name: "VN" },
      description:
        "Giải pháp Mini PC AI chạy 24/7 trên phần cứng riêng — tự động hóa tuyển dụng, thuế, CSKH, marketing, thiết kế, quản lý kho cho doanh nghiệp.",
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
