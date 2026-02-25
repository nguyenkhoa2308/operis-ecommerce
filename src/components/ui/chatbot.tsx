"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const quickReplies = [
  "Sản phẩm nào bán chạy nhất?",
  "Chính sách đổi trả như thế nào?",
  "Tôi muốn theo dõi đơn hàng",
  "Liên hệ hỗ trợ kỹ thuật",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content:
        "Chào bạn! Tôi là Operisbot Assistant. Bạn muốn tiết kiệm 8 giờ làm việc mỗi ngày hay muốn bảo mật tuyệt đối dữ liệu khi dùng AI?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);

  /* Lock body scroll when sidebar is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || sending) return;

    const userId = `user-${++msgIdRef.current}`;
    const userMsg: Message = {
      id: userId,
      role: "user",
      content: msg,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    /* Simulate bot response — replace with real API later */
    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${++msgIdRef.current}`,
        role: "bot",
        content:
          "Cảm ơn bạn đã liên hệ! Hiện tại tính năng chatbot đang được phát triển. Vui lòng liên hệ hotline +84 853 336 668 hoặc gửi email đến hungle@hagency.vn để được hỗ trợ nhanh nhất.",
      };
      setMessages((prev) => [...prev, botMsg]);
      setSending(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Mở trợ lý chat"
        className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:scale-105 transition-all duration-300 ${
          open
            ? "opacity-0 scale-75 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        <Image
          src="/images/assistance.png"
          alt="Trợ lý"
          width={36}
          height={36}
          className="w-8 h-8 md:w-9 md:h-9"
        />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[80] bg-black/20 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 z-[90] h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-foreground text-white">
          <Image
            src="/images/assistance.png"
            alt="Trợ lý"
            width={28}
            height={28}
            className="brightness-0 invert"
          />
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold">Trợ lý Operis</p>
            <p className="text-xs opacity-70">Luôn sẵn sàng hỗ trợ bạn</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 md:px-4 py-2 md:py-2.5 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.role === "user"
                    ? "bg-foreground text-white rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground px-3 md:px-4 py-2 md:py-2.5 rounded-2xl rounded-bl-md text-sm md:text-base flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Đang trả lời...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick replies — only show when few messages */}
        {messages.length <= 2 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                className="text-sm border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border px-4 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm md:text-base outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:bg-primary transition-colors"
            >
              {""}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
