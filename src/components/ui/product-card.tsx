"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, Phone } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";
import { formatPrice } from "@/data/products";
import type { Product } from "@/data/products";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
      <div className="aspect-square skeleton-shimmer" />
      <div className="p-3 md:p-5 space-y-2">
        <div className="h-3 w-16 skeleton-shimmer rounded" />
        <div className="h-4 md:h-5 w-3/4 skeleton-shimmer rounded" />
        <div className="h-3 w-full skeleton-shimmer rounded hidden md:block" />
        <div className="h-5 md:h-7 w-1/3 skeleton-shimmer rounded mt-1" />
      </div>
    </div>
  );
}

export function ProductCard({
  product,
  highlight = false,
}: {
  product: Product;
  highlight?: boolean;
  index?: number;
}) {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const isFree = product.price === 0;
  const specsText = product.specs.map((s) => s.value).join(" · ");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFree || added) return;
    addItem(product);
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link href={`/shop/${product.slug}`} className="block h-full group">
      <div
        className={`flex flex-col h-full rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 ${
          highlight
            ? "ring-2 ring-primary/20 shadow-lg shadow-primary/10"
            : "border border-border hover:shadow-xl hover:shadow-black/6 hover:border-transparent"
        }`}
      >
        {/* ── Image ── */}
        <div className="relative aspect-square bg-[#f7f7f8] overflow-hidden">
          {product.image && !imgError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
          )}

          {/* Highlight badge */}
          {highlight && (
            <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-primary text-white text-[9px] md:text-[10px] tracking-widest font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full">
              PHỔ BIẾN
            </span>
          )}

          {/* Quick add button — desktop hover only */}
          <div className="absolute inset-x-3 bottom-3 hidden md:block md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-2.5 rounded-xl text-xs tracking-wider font-semibold flex items-center justify-center gap-2 backdrop-blur-md transition-colors cursor-pointer ${
                isFree
                  ? "bg-white/90 text-foreground hover:bg-white"
                  : added
                    ? "bg-emerald text-white"
                    : "bg-white/90 text-foreground hover:bg-white"
              }`}
            >
              {isFree ? (
                <>LIÊN HỆ <Phone size={13} /></>
              ) : added ? (
                <>ĐÃ THÊM <Check size={13} className="animate-bounce-in" /></>
              ) : (
                <>THÊM GIỎ HÀNG <ShoppingCart size={13} /></>
              )}
            </button>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col flex-1 p-3 md:p-5">
          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex items-center gap-1.5 mb-1 md:mb-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[9px] md:text-[10px] tracking-wider font-medium text-primary/70">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Name */}
          <h4 className="text-sm md:text-base font-bold tracking-tight mb-1 md:mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h4>

          {/* Specs inline — hidden on mobile */}
          <p className="hidden md:block text-xs text-muted-foreground mb-2 line-clamp-1">{specsText}</p>

          {/* Short description */}
          {product.description && (
            <p className="text-xs md:text-sm text-muted-foreground/70 mb-2 md:mb-3 line-clamp-2 md:line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="mt-auto pt-1 md:pt-2">
            {isFree ? (
              <span className="text-sm md:text-lg font-bold text-primary">Liên hệ</span>
            ) : (
              <span className="text-base md:text-xl font-extrabold text-foreground">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Mobile add-to-cart button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`md:hidden mt-2 w-full py-2 rounded-lg text-[11px] tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              isFree
                ? "bg-muted text-foreground"
                : added
                  ? "bg-emerald text-white"
                  : "border border-foreground text-foreground active:bg-foreground active:text-white"
            }`}
          >
            {isFree ? (
              <>LIÊN HỆ <Phone size={12} /></>
            ) : added ? (
              <>ĐÃ THÊM <Check size={12} className="animate-bounce-in" /></>
            ) : (
              <>THÊM GIỎ HÀNG <ShoppingCart size={12} /></>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
