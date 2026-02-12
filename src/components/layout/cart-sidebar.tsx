"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/data/products";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-[400px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <h2 className="text-sm font-semibold tracking-widest">GIỎ HÀNG</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
            <ShoppingBag size={40} className="text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground">Giỏ hàng của bạn đang trống</p>
            <button
              onClick={onClose}
              className="text-sm text-primary font-medium hover:underline underline-offset-2 mt-1"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.map((item) => (
                <div key={item.product.slug} className="flex gap-4">
                  {/* Thumbnail */}
                  <Link href={`/shop/${item.product.slug}`} onClick={onClose} className="relative w-[72px] h-[72px] bg-muted shrink-0 rounded block">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover rounded"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/shop/${item.product.slug}`} onClick={onClose} className="text-[13px] font-medium leading-snug line-clamp-2 hover:text-primary transition-colors">{item.product.name}</Link>
                        <button
                          type="button"
                          onClick={() => setConfirmSlug(item.product.slug)}
                          className="shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors"
                          aria-label="Xóa"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-[13px] text-primary font-medium mt-0.5">{formatPrice(item.product.price)}</p>
                    </div>

                    {/* Quantity + Subtotal */}
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center border border-border rounded">
                        <button
                          type="button"
                          onClick={() => item.quantity <= 1 ? setConfirmSlug(item.product.slug) : updateQuantity(item.product.slug, item.quantity - 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-1.5 py-1 text-xs min-w-[24px] text-center font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <p className="text-[13px] font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Tạm tính</span>
                <span className="text-base font-semibold">{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-primary text-white text-xs tracking-widest py-3.5 text-center hover:bg-primary-dark transition-colors rounded"
                >
                  THANH TOÁN NGAY
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="w-full border border-border text-foreground text-xs tracking-widest py-3.5 text-center hover:bg-muted transition-colors rounded"
                >
                  XEM GIỎ HÀNG
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirm remove modal — global overlay */}
      {confirmSlug && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
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
