"use client";

import { useEffect, useCallback } from "react";
import { X, RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import { formatPrice } from "@/data/products";

export interface DepositInfo {
  id: string;
  amount: number;
  tokens?: number;
  status: string;
  qrUrl?: string;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  transferContent?: string;
}

interface DepositQrModalProps {
  open: boolean;
  deposit: DepositInfo | null;
  checking: boolean;
  onCheck: () => void;
  onClose: () => void;
}

export function DepositQrModal({ open, deposit, checking, onCheck, onClose }: DepositQrModalProps) {
  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open || !deposit) return null;

  const isCompleted = deposit.status === "completed" || deposit.status === "success";

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-sm font-semibold tracking-widest uppercase">Thanh toán QR</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {isCompleted ? (
            /* Success state */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <p className="text-lg font-semibold mb-1">Nạp tiền thành công!</p>
              <p className="text-sm text-muted-foreground mb-4">
                Số dư token đã được cập nhật.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-primary text-white text-xs tracking-widest px-8 py-3 hover:bg-primary/90 transition-colors rounded"
              >
                ĐÓNG
              </button>
            </div>
          ) : (
            <>
              {/* Amount */}
              <div className="text-center mb-5">
                <p className="text-sm text-muted-foreground mb-1">Số tiền cần thanh toán</p>
                <p className="text-3xl font-bold text-primary">{formatPrice(deposit.amount)}</p>
              </div>

              {/* QR Code */}
              {deposit.qrUrl && (
                <div className="flex justify-center mb-5">
                  <div className="border-2 border-border rounded-xl p-3 bg-white">
                    <img
                      src={deposit.qrUrl}
                      alt="QR thanh toán"
                      width={220}
                      height={220}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Bank info */}
              {deposit.bankName && (
                <div className="bg-muted/50 rounded-lg p-4 mb-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ngân hàng</span>
                    <span className="font-medium">{deposit.bankName}</span>
                  </div>
                  {deposit.bankAccount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Số tài khoản</span>
                      <span className="font-medium font-mono">{deposit.bankAccount}</span>
                    </div>
                  )}
                  {deposit.bankAccountName && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Chủ tài khoản</span>
                      <span className="font-medium">{deposit.bankAccountName}</span>
                    </div>
                  )}
                  {deposit.transferContent && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nội dung CK</span>
                      <span className="font-semibold text-primary font-mono">{deposit.transferContent}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Check button */}
              <button
                type="button"
                onClick={onCheck}
                disabled={checking}
                className="w-full flex items-center justify-center gap-2 bg-foreground text-white text-xs tracking-widest py-3.5 hover:bg-foreground/90 transition-colors rounded disabled:opacity-60"
              >
                {checking ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={14} />
                )}
                {checking ? "ĐANG KIỂM TRA..." : "KIỂM TRA GIAO DỊCH"}
              </button>

              <p className="text-[11px] text-muted-foreground text-center mt-3">
                Quét mã QR hoặc chuyển khoản theo thông tin trên, sau đó nhấn kiểm tra.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
