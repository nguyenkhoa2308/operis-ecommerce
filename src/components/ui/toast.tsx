"use client";

import { X, ShoppingCart, AlertCircle } from "lucide-react";
import { useToastStore } from "@/store/toast-store";

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-3 md:right-6 z-[100] flex flex-col gap-3 w-[calc(100vw-24px)] sm:w-[380px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-border rounded-xl shadow-2xl animate-slide-down overflow-hidden"
        >
          <div className="flex items-start gap-3 md:gap-4 p-3.5 md:p-5">
            {/* Icon */}
            <div className={`shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center ${
              toast.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
            }`}>
              {toast.type === "success" ? <ShoppingCart size={18} /> : <AlertCircle size={18} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs md:text-sm font-semibold text-foreground mb-0.5 md:mb-1">
                {toast.type === "success" ? "Thành công!" : "Có lỗi xảy ra"}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{toast.message}</p>
            </div>

            {/* Close */}
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
              aria-label="Đóng thông báo"
            >
              <X size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-muted">
            <div className={`h-full animate-toast-progress rounded-full ${
              toast.type === "success" ? "bg-green-500" : "bg-red-400"
            }`} />
          </div>
        </div>
      ))}
    </div>
  );
}
