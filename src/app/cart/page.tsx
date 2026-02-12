"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  return (
    <>
      <PageBanner
        title="GIỎ HÀNG"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng" }]}
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Giỏ hàng của bạn đang trống.</p>
            <Link href="/shop" className="bg-foreground text-white text-xs tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors inline-block">
              TIẾP TỤC MUA SẮM
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-border mb-4">
              <span className="text-xs font-semibold tracking-widest">SẢN PHẨM</span>
              <span className="text-xs font-semibold tracking-widest text-center">SỐ LƯỢNG</span>
              <span className="text-xs font-semibold tracking-widest text-right">THÀNH TIỀN</span>
              <span className="w-8" />
            </div>

            {items.map((item) => (
              <div key={item.product.slug} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center py-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Link href={`/shop/${item.product.slug}`} className="relative w-20 h-20 bg-muted shrink-0 block">
                    <Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div>
                    <Link href={`/shop/${item.product.slug}`} className="text-sm font-semibold hover:text-primary transition-colors">{item.product.name}</Link>
                    <p className="text-sm text-primary">{formatPrice(item.product.price)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center border border-border">
                    <button onClick={() => item.quantity <= 1 ? setConfirmSlug(item.product.slug) : updateQuantity(item.product.slug, item.quantity - 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="px-3 py-2 text-sm min-w-[36px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-xl font-medium text-right">{formatPrice(item.product.price * item.quantity)}</p>
                <button onClick={() => setConfirmSlug(item.product.slug)} className="text-muted-foreground hover:text-foreground transition-colors justify-self-end">
                  <X size={20} />
                </button>
              </div>
            ))}

            <div className="mt-10 max-w-sm">
              <h3 className="text-lg font-semibold tracking-widest mb-4">TỔNG GIỎ HÀNG</h3>
              <div className="border-t border-border py-3 flex justify-between">
                <span className="text-sm font-semibold">TẠM TÍNH</span>
                <span className="text-sm">{formatPrice(totalPrice())}</span>
              </div>
              <div className="border-t border-border py-3 flex justify-between">
                <span className="text-sm font-semibold">TỔNG CỘNG</span>
                <span className="text-sm">{formatPrice(totalPrice())}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/shop" className="bg-foreground text-white text-xs tracking-widest px-6 py-3 hover:bg-foreground/90 transition-colors">
                TIẾP TỤC MUA SẮM
              </Link>
              <Link href="/checkout" className="bg-primary text-white text-xs tracking-widest px-6 py-3 hover:bg-primary-dark transition-colors">
                THANH TOÁN
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Confirm remove modal */}
      {confirmSlug && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <X size={24} className="text-red-500" />
            </div>
            <p className="text-lg font-semibold mb-2">Xóa sản phẩm?</p>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Bạn có chắc muốn xóa sản phẩm này<br />khỏi giỏ hàng?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmSlug(null)}
                className="flex-1 border border-border text-sm tracking-wider py-3 rounded-lg hover:bg-muted transition-colors font-medium"
              >
                HỦY
              </button>
              <button
                type="button"
                onClick={() => {
                  removeItem(confirmSlug);
                  setConfirmSlug(null);
                }}
                className="flex-1 bg-red-500 text-white text-sm tracking-wider py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                XÓA
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
