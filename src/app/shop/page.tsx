import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { ShopContent } from "@/components/shop/shop-content";
import {
  getProductsServer,
  getCategoriesServer,
} from "@/lib/api/products.server";
import { collectionPageJsonLd } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/json-ld-script";

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const cat = sp.cat;
  const q = sp.q;
  const title =
    cat && cat !== "Tất cả"
      ? `${cat} | Cửa hàng Operis`
      : "Cửa hàng Operis";
  const description = q
    ? `Kết quả tìm kiếm "${q}" tại cửa hàng Operis`
    : "Khám phá các sản phẩm Mini PC thông minh và gói token AI tại Operis.";

  return {
    title,
    description,
    alternates: { canonical: "/shop" },
    openGraph: { title, description, url: "https://operis.vn/shop" },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ------------------------------------------------------------------ */
/*  Page (Server Component)                                            */
/* ------------------------------------------------------------------ */

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  const initialCategory = sp.cat ?? "Tất cả";
  const initialQuery = sp.q ?? "";

  const [initialData, categories] = await Promise.all([
    getProductsServer({
      limit: 9,
      offset: 0,
      ...(initialCategory !== "Tất cả" && { category: initialCategory }),
      ...(initialQuery && { search: initialQuery }),
    }),
    getCategoriesServer(),
  ]);

  return (
    <>
      <JsonLdScript
        data={collectionPageJsonLd(
          "Cửa hàng Operis",
          "Khám phá các sản phẩm Mini PC thông minh và gói token AI tại Operis.",
        )}
      />
      <PageBanner
        title="CỬA HÀNG"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Cửa hàng" }]}
      />
      <ShopContent
        key={`${initialCategory}|${initialQuery}`}
        initialProducts={initialData.products}
        initialTotal={initialData.total}
        initialTotalPages={initialData.totalPages}
        categories={["Tất cả", ...categories]}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
      />
      <SubscribeSection />
    </>
  );
}
