import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theo dõi Đơn hàng",
  description:
    "Kiểm tra trạng thái đơn hàng và theo dõi vận chuyển sản phẩm Operisbot của bạn.",
  alternates: { canonical: "/support/order-tracking" },
  openGraph: {
    title: "Theo dõi Đơn hàng | Operis",
    description:
      "Kiểm tra trạng thái đơn hàng và theo dõi vận chuyển sản phẩm Operisbot của bạn.",
    url: "https://operis.vn/support/order-tracking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theo dõi Đơn hàng | Operis",
    description:
      "Kiểm tra trạng thái đơn hàng và theo dõi vận chuyển sản phẩm Operisbot của bạn.",
  },
};

export default function OrderTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
