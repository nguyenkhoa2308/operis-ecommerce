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
  type ProductSpec,
  type ProductFullSpec,
  formatPrice,
} from "@/data/products";
import { productsApi } from "@/lib/api";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";
import { ProductCard } from "@/components/ui/product-card";
import { ProductReviews } from "@/components/product/product-reviews";
import { SubscribeSection } from "@/components/home/subscribe-section";

type Tab = "description" | "specs" | "reviews";

/** Detect spec type from value string and return matching icon + label */
function getSpecMeta(spec: ProductSpec): {
  icon: React.ReactNode;
  label: string;
} {
  const s = spec.value.toLowerCase();
  if (
    s.includes("intel") ||
    s.includes("amd") ||
    s.includes("apple") ||
    s.includes("ryzen") ||
    s.includes("celeron")
  )
    return { icon: <Cpu size={18} />, label: "Bộ xử lý" };
  if (s.includes("ram"))
    return { icon: <MemoryStick size={18} />, label: "Bộ nhớ" };
  if (
    s.includes("ssd") ||
    s.includes("hdd") ||
    s.includes("tb") ||
    s.includes("gb storage")
  )
    return { icon: <HardDrive size={18} />, label: "Lưu trữ" };
  return { icon: <Box size={18} />, label: "Thông số" };
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image skeleton */}
          <div className="flex-1">
            <div className="aspect-square skeleton-shimmer rounded-lg" />
          </div>
          {/* Info skeleton */}
          <div className="flex-1 space-y-4">
            <div className="h-7 w-3/4 skeleton-shimmer rounded" />
            <div className="h-4 w-20 skeleton-shimmer rounded" />
            <div className="h-8 w-1/3 skeleton-shimmer rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full skeleton-shimmer rounded" />
              <div className="h-3 w-5/6 skeleton-shimmer rounded" />
              <div className="h-3 w-4/6 skeleton-shimmer rounded" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 skeleton-shimmer rounded-lg" />
              ))}
            </div>
            <div className="h-4 w-32 skeleton-shimmer rounded" />
            <div className="flex gap-4 pt-2">
              <div className="h-11 w-28 skeleton-shimmer rounded" />
              <div className="h-11 w-32 skeleton-shimmer rounded" />
              <div className="h-11 w-36 skeleton-shimmer rounded" />
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

  const tabs: { key: Tab; label: string }[] = [
    { key: "description", label: "MÔ TẢ" },
    { key: "specs", label: "THÔNG SỐ KỸ THUẬT" },
    { key: "reviews", label: "ĐÁNH GIÁ & HỎI ĐÁP" },
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Ảnh */}
          <div className="flex-1">
            <div className="relative aspect-square bg-muted overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Thông tin */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {product.rating}
              </span>
            </div>
            <p className="text-3xl text-primary font-medium mb-4">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Thông số nổi bật */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-3">
                {product.specs.map((spec) => {
                  const { icon, label } = getSpecMeta(spec);
                  return (
                    <div
                      key={spec.id}
                      className="bg-muted/60 border border-border/50 rounded-lg px-3 py-3 text-center"
                    >
                      <div className="text-primary mb-1.5 flex justify-center">
                        {icon}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      <p className="text-xs font-semibold">{spec.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 align-middle" />
              Còn {product.stock} sản phẩm
            </p>

            {/* Số lượng + Nút */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {""}
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 text-sm min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {""}
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-primary text-white text-xs tracking-widest px-8 py-3 hover:bg-primary-dark transition-colors"
              >
                MUA NGAY
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-foreground text-white text-xs tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors"
              >
                THÊM GIỎ HÀNG
              </button>
            </div>

            <div className="border-t border-border pt-4 text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Box size={14} className="shrink-0" />
                <span>
                  SKU:{" "}
                  <span className="text-foreground font-medium">
                    {product.sku}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={14} className="shrink-0" />
                <span>
                  Danh mục:{" "}
                  <span className="text-foreground font-medium">
                    {product.category}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={14} className="shrink-0" />
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary text-[11px] font-medium px-2 py-0.5 rounded-full"
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
        <div className="mt-16">
          <div className="flex gap-8 border-b border-border mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-sm tracking-widest pb-3 transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {tab.label}
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
                {product.specs.map((spec) => {
                  const { icon, label } = getSpecMeta(spec);
                  return (
                    <div
                      key={spec.id}
                      className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3"
                    >
                      <div className="text-primary shrink-0">{icon}</div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {label}
                        </p>
                        <p className="text-sm font-medium">{spec.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "specs" &&
            (() => {
              const groups = groupFullSpecs(
                product.fullSpecs,
                product.brand,
                product.category,
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
                          <span className="text-xs font-semibold tracking-widest text-white uppercase">
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
                                <td className="text-[13px] font-medium text-muted-foreground px-5 py-3 w-[200px] md:w-[240px] align-top whitespace-nowrap">
                                  {spec.label}
                                </td>
                                <td className="text-[13px] text-foreground px-5 py-3">
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
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold tracking-widest">
                SẢN PHẨM LIÊN QUAN
              </h2>
              <Link
                href="/shop"
                className="text-xs tracking-widest text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                XEM TẤT CẢ
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SubscribeSection />
    </>
  );
}
