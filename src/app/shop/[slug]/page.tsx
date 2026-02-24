import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Box, Layers, Tag, Cpu, MemoryStick, HardDrive } from "lucide-react";

import {
  getProductServer,
  getRelatedProductsServer,
  getAllProductSlugs,
} from "@/lib/api/products.server";
import type { ProductFullSpec } from "@/lib/api/product-mappers";
import { formatPrice, viCategory } from "@/data/products";
import { productJsonLd } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/json-ld-script";
import { ProductActions } from "@/components/product/product-actions";
import { ProductTabs } from "@/components/product/product-tabs";
import { ProductCard } from "@/components/ui/product-card";
import { SubscribeSection } from "@/components/home/subscribe-section";

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata (OG tags)                                         */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductServer(slug);
    return {
      title: `${product.name} | Operis`,
      description: product.description.slice(0, 160),
      openGraph: {
        title: product.name,
        description: product.description.slice(0, 160),
        images: product.image ? [{ url: product.image }] : [],
        type: "website",
        url: `https://operis.vn/shop/${slug}`,
      },
    };
  } catch {
    return { title: "Sản phẩm | Operis" };
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const labelIcons: Record<string, React.ReactNode> = {
  CPU: <Cpu size={18} />,
  RAM: <MemoryStick size={18} />,
  "Lưu trữ": <HardDrive size={18} />,
};

function getHighlightSpecs(fullSpecs: ProductFullSpec[]) {
  return fullSpecs
    .filter(
      (s) =>
        s.group_name.toLowerCase() === "hiệu năng" ||
        s.group_name.toLowerCase() === "phần cứng",
    )
    .sort((a, b) => a.sort_order - b.sort_order);
}

/* ------------------------------------------------------------------ */
/*  Page (Server Component)                                            */
/* ------------------------------------------------------------------ */

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product, related;
  try {
    [product, related] = await Promise.all([
      getProductServer(slug),
      getRelatedProductsServer(slug),
    ]);
  } catch {
    notFound();
  }

  return (
    <>
      <JsonLdScript data={productJsonLd(product)} />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Ảnh */}
          <div className="flex-1">
            <div className="relative aspect-square bg-muted overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Thông tin */}
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {product.rating}
              </span>
            </div>
            <p className="text-xl md:text-2xl text-primary font-bold mb-3 md:mb-4">
              {product.price === 0 ? "Liên hệ" : formatPrice(product.price)}
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
              {product.description}
            </p>
            <a
              href="#product-tabs"
              className="text-sm text-primary hover:underline underline-offset-2 mt-1 mb-4 md:mb-6 inline-block"
            >
              Xem thêm
            </a>

            {/* Thông số nổi bật */}
            <div className="mb-4 md:mb-6">
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {getHighlightSpecs(product.fullSpecs).map((spec) => (
                  <div
                    key={spec.id}
                    className="bg-muted/60 border border-border/50 rounded-lg px-2 md:px-3 py-2.5 md:py-3 text-center"
                  >
                    <div className="text-primary mb-1 md:mb-1.5 flex justify-center">
                      {labelIcons[spec.label] ?? <Box size={16} />}
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                      {spec.label}
                    </p>
                    <p className="text-xs md:text-[13px] font-semibold">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 md:mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 align-middle" />
              Còn {product.stock} sản phẩm
            </p>

            {/* Interactive: Quantity + Cart + Buy */}
            <ProductActions product={product} />

            <div className="border-t border-border pt-4 text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Box size={14} className="shrink-0" />
                <span>
                  SKU:{" "}
                  <span className="text-sm text-foreground font-medium">
                    {product.sku}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={14} className="shrink-0" />
                <span>
                  Danh mục:{" "}
                  <span className="text-foreground font-medium">
                    {viCategory(product.category)}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={14} className="shrink-0" />
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive: Tabs */}
        <ProductTabs product={product} />

        {/* Sản phẩm liên quan */}
        {related.length > 0 && (
          <div className="mt-10 md:mt-16">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-sm md:text-lg font-semibold tracking-widest">
                SẢN PHẨM LIÊN QUAN
              </h2>
              <Link
                href="/shop"
                className="text-xs tracking-widest text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                XEM TẤT CẢ
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SubscribeSection />
    </>
  );
}
