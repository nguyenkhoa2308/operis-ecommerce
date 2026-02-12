"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";
import { formatPrice } from "@/data/products";
import type { Product } from "@/data/products";

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-[4/5] skeleton-shimmer rounded mb-3" />
      <div className="flex items-center justify-between">
        <div className="h-3 w-2/5 skeleton-shimmer rounded" />
        <div className="h-3.5 w-1/4 skeleton-shimmer rounded" />
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    addItem(product);
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-[4/5] bg-muted overflow-hidden mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            onClick={handleAdd}
          >
            <button
              className={`w-full text-white text-xs tracking-widest py-3 flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? "bg-green-600 scale-[1.02]"
                  : "bg-foreground hover:bg-foreground/90 cursor-pointer"
              }`}
            >
              {added ? (
                <>
                  ADDED <Check size={14} className="animate-bounce-in" />
                </>
              ) : (
                <>
                  THÊM GIỎ HÀNG <ShoppingCart size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold tracking-widest">
          {product.name}
        </h4>
        <span className="text-sm text-primary font-medium">
          {formatPrice(product.price)}
        </span>
      </div>
    </div>
  );
}
