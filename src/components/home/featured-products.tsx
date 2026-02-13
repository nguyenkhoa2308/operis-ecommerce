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
      <ConcentricCircles className="left-[-200px] top-[-100px]" size={500} color="#8b5cf6" opacity={0.04} />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            CHỌN GÓI PHÙ HỢP
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            THIẾT BỊ OPERISBOT
          </h2>
        </div>
        {loading ? (
          <div className="flex flex-wrap justify-center gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 animate-fade-in">
            {products.slice(0, 4).map((p) => (
              <div key={p.slug} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                <ProductCard product={p} />
              </div>
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
