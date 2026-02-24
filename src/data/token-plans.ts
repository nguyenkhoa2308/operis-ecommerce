export interface TokenPlan {
  slug: string;
  name: string;
  tokens: number;
  price: number;
  pricePerToken: number;
  description: string;
  popular: boolean;
  features: string[];
}

export const tokenPlans: TokenPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    tokens: 1_000,
    price: 99_000,
    pricePerToken: 99,
    description: "Bắt đầu thử nghiệm API automation",
    popular: false,
    features: [
      "1.000 token",
      "Truy cập API cơ bản",
      "Scraping 100 trang/ngày",
      "Hỗ trợ email",
    ],
  },
  {
    slug: "professional",
    name: "Professional",
    tokens: 10_000,
    price: 790_000,
    pricePerToken: 79,
    description: "Dành cho nhu cầu tự động hóa thường xuyên",
    popular: true,
    features: [
      "10.000 token",
      "Truy cập đầy đủ API",
      "Scraping 1.000 trang/ngày",
      "AI Assistant cơ bản",
      "Hỗ trợ ưu tiên",
    ],
  },
  {
    slug: "business",
    name: "Business",
    tokens: 50_000,
    price: 2_990_000,
    pricePerToken: 59.8,
    description: "Giải pháp toàn diện cho doanh nghiệp",
    popular: false,
    features: [
      "50.000 token",
      "Truy cập đầy đủ API + Webhook",
      "Scraping không giới hạn",
      "AI Assistant nâng cao",
      "Workflow automation",
      "Hỗ trợ 24/7",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    tokens: 200_000,
    price: 9_900_000,
    pricePerToken: 49.5,
    description: "Tối ưu chi phí cho quy mô lớn",
    popular: false,
    features: [
      "200.000 token",
      "Tất cả tính năng Business",
      "API rate limit nâng cao",
      "Dedicated support",
      "SLA 99.9%",
      "Custom integration",
    ],
  },
];

export function formatTokenCount(count: number): string {
  if (count === -1) return "Vô hạn";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
}
