"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Minus,
  Plus,
  Cpu,
  MemoryStick,
  HardDrive,
  Tag,
  Box,
  Layers,
  Cable,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import {
  type Product,
  type ProductFullSpec,
  formatPrice,
  viCategory,
} from "@/data/products";
import { productsApi } from "@/lib/api";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";
import { ProductCard } from "@/components/ui/product-card";
import { ProductReviews } from "@/components/product/product-reviews";
import { SubscribeSection } from "@/components/home/subscribe-section";

type Tab = "description" | "specs" | "reviews";

/** Icon mapping for fullSpec labels */
const labelIcons: Record<string, React.ReactNode> = {
  CPU: <Cpu size={18} />,
  RAM: <MemoryStick size={18} />,
  "Lưu trữ": <HardDrive size={18} />,
};

/** Get highlight specs from fullSpecs — only "Hiệu năng" or "Phần cứng" groups */
function getHighlightSpecs(fullSpecs: ProductFullSpec[]) {
  return fullSpecs
    .filter(
      (s) =>
        s.group_name.toLowerCase() === "Hiệu năng".toLowerCase() ||
        s.group_name.toLowerCase() === "Phần cứng".toLowerCase(),
    )
    .sort((a, b) => a.sort_order - b.sort_order);
}

/** Icon mapping for spec group names */
const groupIcons: Record<string, typeof Cpu> = {
  "Hiệu năng": Cpu,
  "Kết nối & Cổng": Cable,
  "Thiết kế & Vật lý": Ruler,
  "Phần mềm & Bảo hành": ShieldCheck,
};

/** Group fullSpecs by group_name from BE */
function groupFullSpecs(
  specs: ProductFullSpec[],
  brand: string,
  category: string,
) {
  const extraSpecs: ProductFullSpec[] = [
    {
      id: "extra-brand",
      group_name: "Thông tin khác",
      label: "Thương hiệu",
      value: brand,
      sort_order: 90,
    },
    {
      id: "extra-cat",
      group_name: "Thông tin khác",
      label: "Danh mục",
      value: category,
      sort_order: 91,
    },
  ];
  const allSpecs = [...specs, ...extraSpecs];

  const groupMap = new Map<string, ProductFullSpec[]>();
  for (const spec of allSpecs) {
    const group = spec.group_name || "Thông tin khác";
    if (!groupMap.has(group)) groupMap.set(group, []);
    groupMap.get(group)!.push(spec);
  }

  return Array.from(groupMap.entries()).map(([title, items]) => ({
    title,
    icon: groupIcons[title] ?? Box,
    items: items.sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [p, rel] = await Promise.all([
          productsApi.getProduct(slug),
          productsApi.getRelatedProducts(slug),
          new Promise((r) => setTimeout(r, 500)),
        ]);
        if (!cancelled) {
          setProduct(p);
          setRelated(rel);
        }
      } catch (err) {
        // Fallback to hardcoded data
        // const fb = fallbackProducts.find((p) => p.slug === slug) ?? null;
        // if (!cancelled) {
        //   setProduct(fb);
        //   setRelated(
        //     fallbackProducts
        //       .filter((p) => p.slug !== slug && p.category === fb?.category)
        //       .slice(0, 4),
        //   );
        // }
        console.error("Failed to load product data:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="flex-1">
            <div className="aspect-square skeleton-shimmer rounded-lg" />
          </div>
          <div className="flex-1 space-y-3 md:space-y-4">
            <div className="h-6 md:h-7 w-3/4 skeleton-shimmer rounded" />
            <div className="h-4 w-20 skeleton-shimmer rounded" />
            <div className="h-7 md:h-8 w-1/3 skeleton-shimmer rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full skeleton-shimmer rounded" />
              <div className="h-3 w-5/6 skeleton-shimmer rounded" />
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 md:h-20 skeleton-shimmer rounded-lg" />
              ))}
            </div>
            <div className="h-4 w-32 skeleton-shimmer rounded" />
            <div className="space-y-2 pt-2">
              <div className="h-11 w-full md:w-48 skeleton-shimmer rounded-lg" />
              <div className="h-11 w-full md:w-40 skeleton-shimmer rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Không tìm thấy sản phẩm</h1>
        <Link href="/shop" className="text-primary mt-4 inline-block">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; shortLabel: string }[] = [
    { key: "description", label: "MÔ TẢ", shortLabel: "MÔ TẢ" },
    { key: "specs", label: "THÔNG SỐ KỸ THUẬT", shortLabel: "THÔNG SỐ" },
    { key: "reviews", label: "ĐÁNH GIÁ & HỎI ĐÁP", shortLabel: "ĐÁNH GIÁ" },
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    addToast(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    router.push("/checkout");
  };

  return (
    <>
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
            <button
              type="button"
              onClick={() => {
                setActiveTab("description");
                setTimeout(() => {
                  document
                    .getElementById("product-tabs")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
              className="text-sm text-primary hover:underline underline-offset-2 mt-1 mb-4 md:mb-6"
            >
              Xem thêm
            </button>

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
                    <p className="text-xs md:text-[13px] font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 md:mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 align-middle" />
              Còn {product.stock} sản phẩm
            </p>

            {/* Số lượng + Nút */}
            {product.price === 0 ? (
              <div className="mb-4 md:mb-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white text-xs md:text-sm tracking-widest px-6 md:px-8 py-3 hover:bg-primary/90 transition-colors rounded-lg"
                >
                  LIÊN HỆ TƯ VẤN
                </Link>
              </div>
            ) : (
              <div className="mb-4 md:mb-6 space-y-3">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Giảm số lượng"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 md:px-4 py-2.5 text-sm min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Tăng số lượng"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 md:flex-none bg-primary text-white text-xs md:text-sm tracking-widest px-6 md:px-8 py-3 hover:bg-primary-dark transition-colors rounded-lg"
                  >
                    MUA NGAY
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full md:w-auto bg-foreground text-white text-xs md:text-sm tracking-widest px-6 md:px-8 py-3 hover:bg-foreground/90 transition-colors rounded-lg"
                >
                  THÊM GIỎ HÀNG
                </button>
              </div>
            )}

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

        {/* Tabs */}
        <div id="product-tabs" className="mt-10 md:mt-16 scroll-mt-20">
          <div className="flex gap-4 md:gap-8 border-b border-border mb-6 md:mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`text-xs md:text-sm tracking-widest pb-3 transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                <span className="md:hidden">{tab.shortLabel}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-3xl">
              <p className="text-sm text-muted-foreground leading-[1.8]">
                {product.description}
              </p>

              {/* Điểm nổi bật */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {getHighlightSpecs(product.fullSpecs).map((spec) => (
                  <div
                    key={spec.id}
                    className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3"
                  >
                    <div className="text-primary shrink-0">
                      {labelIcons[spec.label] ?? <Box size={18} />}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {spec.label}
                      </p>
                      <p className="text-sm font-medium">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" &&
            (() => {
              const groups = groupFullSpecs(
                product.fullSpecs,
                product.brand,
                viCategory(product.category),
              );
              return (
                <div className="max-w-3xl mx-auto space-y-6">
                  {groups.map((group) => {
                    const Icon = group.icon;
                    return (
                      <div
                        key={group.title}
                        className="rounded-xl border border-border overflow-hidden"
                      >
                        {/* Section header */}
                        <div className="flex items-center gap-2.5 px-5 py-3 bg-foreground">
                          <Icon size={16} className="text-white/70" />
                          <span className="text-sm font-semibold tracking-widest text-white uppercase">
                            {group.title}
                          </span>
                        </div>
                        {/* Rows */}
                        <table className="w-full">
                          <tbody>
                            {group.items.map((spec, i) => (
                              <tr
                                key={spec.id}
                                className={`${i % 2 === 0 ? "bg-white" : "bg-muted/30"} hover:bg-primary/5 transition-colors`}
                              >
                                <td className="text-xs md:text-sm font-medium text-muted-foreground px-3 md:px-5 py-2.5 md:py-3 w-[120px] md:w-[240px] align-top">
                                  {spec.label}
                                </td>
                                <td className="text-xs md:text-sm text-foreground px-3 md:px-5 py-2.5 md:py-3">
                                  {spec.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

          {activeTab === "reviews" && (
            <ProductReviews productSlug={product.slug} />
          )}
        </div>

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
