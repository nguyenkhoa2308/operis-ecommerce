import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ToastContainer } from "@/components/ui/toast";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import { Chatbot } from "@/components/ui/chatbot";
import StoreHydrationGuard from "@/components/store-hydration-guard";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Operis - Mini PC Thông Minh",
  description:
    "Operis cung cấp Mini PC cài đặt sẵn ứng dụng tự động hóa. Thực hiện tác vụ, luồng công việc tự động.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${jost.variable} font-sans antialiased`}>
        <StoreHydrationGuard>
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
          <ToastContainer />
          <ScrollToTopButton />
          <Chatbot />
        </StoreHydrationGuard>
      </body>
    </html>
  );
}
