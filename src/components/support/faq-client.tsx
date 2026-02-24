"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import type { FaqCategory } from "@/data/faq";

export function FaqClient({ categories }: { categories: FaqCategory[] }) {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filtered = search.trim()
    ? categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.q.toLowerCase().includes(search.toLowerCase()) ||
              item.a.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : categories;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Search */}
      <div className="relative max-w-md mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm câu hỏi..."
          className="w-full border border-border pl-11 pr-4 py-3 text-base outline-none focus:border-primary transition-colors rounded-lg"
        />
      </div>

      {/* FAQ list */}
      {filtered.length === 0 ? (
        <p className="text-center text-base text-muted-foreground py-12">
          Không tìm thấy câu hỏi phù hợp. Vui lòng thử từ khóa khác hoặc{" "}
          <Link href="/contact" className="text-primary hover:underline">
            liên hệ
          </Link>{" "}
          với chúng tôi.
        </p>
      ) : (
        <div className="space-y-10">
          {filtered.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-base font-semibold tracking-widest uppercase mb-4">
                {cat.title}
              </h3>
              <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
                {cat.items.map((item) => {
                  const key = `${cat.title}-${item.q}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-base font-medium pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isOpen
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="px-5 pb-4 text-base text-muted-foreground leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-16 border border-border rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-2">
          Không tìm thấy câu trả lời?
        </h3>
        <p className="text-base text-muted-foreground mb-4">
          Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn.
        </p>
        <Link
          href="/contact"
          className="bg-foreground text-white text-sm tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors rounded inline-block"
        >
          LIÊN HỆ HỖ TRỢ
        </Link>
      </div>
    </div>
  );
}
