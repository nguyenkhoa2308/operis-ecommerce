"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/product-card";
import { SubscribeSection } from "@/components/home/subscribe-section";
import {
  categories as fallbackCategories,
  tags,
  brands,
} from "@/data/products";
import { productsApi } from "@/lib/api";
import type { Product } from "@/data/products";

const ITEMS_PER_PAGE = 9;

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialCat = searchParams.get("cat") ?? "Tất cả";

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [search, setSearch] = useState(initialQuery);
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  /* Sync state when URL searchParams change */
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const cat = searchParams.get("cat") ?? "Tất cả";
    setSearch(q);
    setActiveCategory(cat);
    setPage(1);
  }, [searchParams]);

  /* Fetch categories once */
  useEffect(() => {
    (async () => {
      try {
        const cats = await productsApi.getCategories();
        setCategories(["Tất cả", ...cats]);
      } catch {
        /* keep fallback */
      }
    })();
  }, []);

  /* Fetch products when filters change */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const filters: Record<string, unknown> = {
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
      };
      if (activeCategory !== "Tất cả") filters.category = activeCategory;
      if (search) filters.search = search;

      const [res] = await Promise.all([
        productsApi.getProducts(
          filters as Parameters<typeof productsApi.getProducts>[0],
        ),
        new Promise((r) => setTimeout(r, 500)),
      ]);
      setProducts(res.products);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch {
      // Fallback: client-side filter on hardcoded data
      // const filtered = fallbackProducts.filter((p) => {
      //   if (activeCategory !== "Tất cả" && p.category !== activeCategory)
      //     return false;
      //   if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      //     return false;
      //   return true;
      // });
      // setProducts(
      //   filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
      // );
      // setTotal(filtered.length);
      // setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Nội dung chính */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              {loading
                ? "Đang tải..."
                : `Hiển thị ${products.length} trên ${total} sản phẩm`}
            </p>
            <select
              aria-label="Sắp xếp"
              className="text-sm text-muted-foreground border border-border px-3 py-1.5 bg-white"
            >
              <option>Mặc định</option>
              <option>Giá: Thấp đến Cao</option>
              <option>Giá: Cao đến Thấp</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 text-sm rounded ${
                    page === i + 1
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-colors`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                &gt;
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="flex-1 border border-border px-3 py-2 text-sm outline-none"
            />
            <button
              className="bg-primary text-white px-3 py-2"
              aria-label="Tìm kiếm"
            >
              <Search size={16} />
            </button>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest mb-3 underline underline-offset-4">
              DANH MỤC
            </h4>
            <ul className="space-y-1.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat);
                      setPage(1);
                    }}
                    className={`text-sm transition-colors ${
                      activeCategory === cat
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest mb-3 underline underline-offset-4">
              NHÃN
            </h4>
            <ul className="space-y-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest mb-3 underline underline-offset-4">
              THƯƠNG HIỆU
            </h4>
            <ul className="space-y-1.5">
              {brands.map((brand) => (
                <li
                  key={brand}
                  className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <PageBanner
        title="CỬA HÀNG"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Cửa hàng" }]}
      />

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-12 text-center text-muted-foreground">
            Đang tải...
          </div>
        }
      >
        <ShopContent />
      </Suspense>

      <SubscribeSection />
    </>
  );
}
