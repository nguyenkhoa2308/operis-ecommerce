import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ — Hỗ trợ & Tư vấn Operisbot",
  description:
    "Liên hệ đội ngũ Operis để được tư vấn giải pháp tự động hóa, hỗ trợ kỹ thuật và báo giá doanh nghiệp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Liên hệ — Hỗ trợ & Tư vấn Operisbot",
    description:
      "Liên hệ đội ngũ Operis để được tư vấn giải pháp tự động hóa, hỗ trợ kỹ thuật và báo giá doanh nghiệp.",
    url: "https://operis.vn/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liên hệ — Hỗ trợ & Tư vấn Operisbot",
    description:
      "Liên hệ đội ngũ Operis để được tư vấn giải pháp tự động hóa, hỗ trợ kỹ thuật và báo giá doanh nghiệp.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
