"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/product-card";
import { viCategory } from "@/data/products";
import { productsApi } from "@/lib/api";
import type { Product } from "@/lib/api/product-mappers";

const ITEMS_PER_PAGE = 9;

interface ShopContentProps {
  initialProducts: Product[];
  initialTotal: number;
  initialTotalPages: number;
  categories: string[];
  initialCategory: string;
  initialQuery: string;
}

export function ShopContent({
  initialProducts,
  initialTotal,
  initialTotalPages,
  categories,
  initialCategory,
  initialQuery,
}: ShopContentProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialQuery);
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(initialQuery);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState("");
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  /* Track if user has interacted — skip first fetch since server provided initial data */
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterOpen]);

  /* Debounce search / price — only fires when values actually change */
  const prevSearch = useRef(search);
  const prevMinPrice = useRef(minPrice);
  const prevMaxPrice = useRef(maxPrice);

  useEffect(() => {
    /* Nothing changed — skip (also handles initial mount & strict-mode re-mount) */
    if (search === prevSearch.current && minPrice === prevMinPrice.current && maxPrice === prevMaxPrice.current) {
      return;
    }
    const t = setTimeout(() => {
      prevSearch.current = search;
      prevMinPrice.current = minPrice;
      prevMaxPrice.current = maxPrice;
      setDebouncedSearch(search);
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
      setPage(1);
      setHasInteracted(true);
      setLoading(true);
    }, 500);
    return () => clearTimeout(t);
  }, [search, minPrice, maxPrice]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const filters: Record<string, unknown> = {
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
      };
      if (activeCategory !== "Tất cả") filters.category = activeCategory;
      if (debouncedSearch) filters.search = debouncedSearch;
      if (sort) filters.sort = sort;
      if (debouncedMinPrice) filters.minPrice = Number(debouncedMinPrice);
      if (debouncedMaxPrice) filters.maxPrice = Number(debouncedMaxPrice);

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
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [
    activeCategory,
    debouncedSearch,
    sort,
    debouncedMinPrice,
    debouncedMaxPrice,
    page,
  ]);

  useEffect(() => {
    if (!hasInteracted) return;
    fetchProducts();
  }, [fetchProducts, hasInteracted]);

  const filterContent = (
    <>
      <div className="flex">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
                  if (cat === activeCategory) return;
                  setActiveCategory(cat);
                  setPage(1);
                  setFilterOpen(false);
                  setHasInteracted(true);
                  setLoading(true);
                }}
                className={`text-sm transition-colors ${
                  activeCategory === cat
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {viCategory(cat)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold tracking-widest mb-3 underline underline-offset-4">
          GIÁ
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Từ"
            value={minPrice ? Number(minPrice).toLocaleString("vi-VN") : ""}
            onChange={(e) => {
              setMinPrice(e.target.value.replace(/\D/g, ""));
            }}
            className="w-full border border-border px-3 py-2 text-sm outline-none"
          />
          <span className="text-muted-foreground text-sm">—</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Đến"
            value={maxPrice ? Number(maxPrice).toLocaleString("vi-VN") : ""}
            onChange={(e) => {
              setMaxPrice(e.target.value.replace(/\D/g, ""));
            }}
            className="w-full border border-border px-3 py-2 text-sm outline-none"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 md:mb-8 gap-3">
            <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
              {loading
                ? "Đang tải..."
                : `${products.length} / ${total} sản phẩm`}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs border border-border px-2.5 py-1.5 rounded-lg bg-white hover:bg-muted transition-colors"
                aria-label="Bộ lọc"
              >
                <SlidersHorizontal size={13} />
                Lọc
              </button>
              <select
                aria-label="Sắp xếp"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                  setHasInteracted(true);
                  setLoading(true);
                }}
                className="text-xs md:text-sm text-muted-foreground border border-border px-2.5 md:px-3 py-1.5 rounded-lg bg-white"
              >
                <option value="">Mặc định</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
              {products.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  setHasInteracted(true);
                  setLoading(true);
                }}
                disabled={page === 1}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(i + 1);
                    setHasInteracted(true);
                    setLoading(true);
                  }}
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
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  setHasInteracted(true);
                  setLoading(true);
                }}
                disabled={page === totalPages}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                &gt;
              </button>
            </div>
          )}
        </div>

        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
          {filterContent}
        </aside>
      </div>

      {/* Mobile filter sidebar overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          filterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setFilterOpen(false)}
      />
      <div
        className={`lg:hidden fixed top-0 right-0 z-[70] h-full w-full max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          filterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-border">
          <h3 className="text-sm font-semibold tracking-widest">BỘ LỌC</h3>
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Đóng bộ lọc"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          {filterContent}
        </div>
      </div>
    </div>
  );
}
