import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ToastContainer } from "@/components/ui/toast";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FloatingActions } from "@/components/ui/floating-actions";
import StoreHydrationGuard from "@/components/store-hydration-guard";
import { JsonLdScript } from "@/components/json-ld-script";
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/json-ld";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://operis.vn"),
  title: {
    default: "Operisbot — Mini PC Tự Động Hóa AI Chạy 24/7 | Operis",
    template: "%s | Operis",
  },
  description:
    "Operisbot là thiết bị Mini PC chạy AI 24/7 trên phần cứng riêng — tự động hóa tuyển dụng, marketing, kế toán, CSKH. Cắm điện là chạy, không lo lộ dữ liệu.",
  keywords: [
    "Operisbot",
    "Mini PC",
    "tự động hóa",
    "AI",
    "workflow",
    "automation",
    "thiết bị AI",
  ],
  authors: [{ name: "Operis" }],
  creator: "Operis",
  publisher: "Operis",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Operis",
    title: "Operisbot — Mini PC Tự Động Hóa AI Chạy 24/7",
    description:
      "Thiết bị Mini PC chạy AI 24/7 trên phần cứng riêng — tự động hóa công việc, bảo mật tuyệt đối.",
    url: "https://operis.vn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Operisbot — Mini PC Tự Động Hóa AI Chạy 24/7",
    description:
      "Thiết bị Mini PC chạy AI 24/7 trên phần cứng riêng — tự động hóa công việc, bảo mật tuyệt đối.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <JsonLdScript data={organizationJsonLd()} />
        <JsonLdScript data={localBusinessJsonLd()} />
      </head>
      <body className={`${nunito.variable} font-sans antialiased`}>
        <StoreHydrationGuard>
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
          <ToastContainer />
          <FloatingActions />
        </StoreHydrationGuard>
      </body>
    </html>
  );
}
