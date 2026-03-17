"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function BlogToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -60% 0px", threshold: 0 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 xl:w-72 shrink-0 self-start sticky top-24">
      <div className="rounded-2xl border border-border/60 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
          <span className="font-bold text-base text-foreground">Nội dung</span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
            aria-label={open ? "Thu gọn" : "Mở rộng"}
          >
            <ChevronUp
              className="w-4 h-4 text-white transition-transform duration-300"
              style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)" }}
            />
          </button>
        </div>

        {/* Items */}
        {open && (
          <nav className="py-3 max-h-[65vh] overflow-y-auto">
            <ul>
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) {
                          const top =
                            el.getBoundingClientRect().top + window.scrollY - 90;
                          window.scrollTo({ top, behavior: "smooth" });
                          setActiveId(item.id);
                        }
                      }}
                      className={[
                        "flex items-start gap-2 text-[13.5px] leading-snug py-2 px-5 transition-colors duration-150",
                        item.level === 3 ? "pl-8" : "",
                        isActive
                          ? "text-primary font-semibold border-l-[3px] border-primary bg-primary/4 pl-[17px]"
                          : "text-muted-foreground hover:text-foreground border-l-[3px] border-transparent",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </aside>
  );
}
