"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/product-card";
import { productsApi } from "@/lib/api";
import type { Product } from "@/data/products";

export default function AllProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [res] = await Promise.all([
          productsApi.getProducts({ limit: 8 }),
          new Promise((r) => setTimeout(r, 500)),
        ]);
        setProducts(res.products);
      } catch {
        /* keep fallback */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold tracking-widest">
            TẤT CẢ SẢN PHẨM
          </h2>
          <Link
            href="/shop"
            className="text-xs tracking-widest text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            XEM TẤT CẢ
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
