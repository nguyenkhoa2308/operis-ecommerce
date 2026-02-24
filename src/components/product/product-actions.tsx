"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/api/product-mappers";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";

export function ProductActions({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    addToast(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    router.push("/checkout");
  };

  if (product.price === 0) {
    return (
      <div className="mb-4 md:mb-6">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white text-xs md:text-sm tracking-widest px-6 md:px-8 py-3 hover:bg-primary/90 transition-colors rounded-lg"
        >
          LIÊN HỆ TƯ VẤN
        </Link>
      </div>
    );
  }

  return (
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
  );
}
