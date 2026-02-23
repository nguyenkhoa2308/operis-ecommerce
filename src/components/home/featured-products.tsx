"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/product-card";
import { productsApi } from "@/lib/api";
import type { Product } from "@/data/products";
import { ConcentricCircles } from "@/components/ui/decorative-pattern";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [res] = await Promise.all([
          productsApi.getProducts({ limit: 4 }),
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
    <section className="py-16 relative overflow-hidden">
      <ConcentricCircles
        className="left-[-200px] top-[-100px]"
        size={500}
        color="#8b5cf6"
        opacity={0.04}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            CHỌN GÓI PHÙ HỢP
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            GÓI THIẾT BỊ OPERISBOT
          </h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.slug} product={p} highlight={i === 1} index={i} />
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="inline-block border border-foreground text-foreground text-xs tracking-widest px-8 py-3 hover:bg-foreground hover:text-white transition-colors"
          >
            XEM CHI TIẾT SẢN PHẨM
          </Link>
        </div>
      </div>
    </section>
  );
}
