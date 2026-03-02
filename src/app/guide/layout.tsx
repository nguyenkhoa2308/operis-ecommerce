import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng dẫn sử dụng Operis",
  description:
    "Tài liệu hướng dẫn sử dụng Operis dành cho người dùng. Không cần biết về lập trình.",
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide the main site header, footer and floating actions on guide pages */}
      <style
        dangerouslySetInnerHTML={{
          __html: `#site-header, #site-footer, #floating-actions { display: none !important; }`,
        }}
      />
      {children}
    </>
  );
}
