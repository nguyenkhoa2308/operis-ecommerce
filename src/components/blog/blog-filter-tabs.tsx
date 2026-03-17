"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface BlogFilterTabsProps {
  categories: string[];
}

export function BlogFilterTabs({ categories }: BlogFilterTabsProps) {
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "";

  const tabs = [
    { label: "Tất cả", value: "" },
    ...categories.map((c) => ({ label: c, value: c })),
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#f8fafc] to-transparent z-10" />
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none scroll-smooth pb-0.5">
        {tabs.map(({ label, value }) => {
          const isActive = current === value;
          const href = value
            ? `/blog?category=${encodeURIComponent(value)}`
            : "/blog";

          return (
            <Link
              key={value || "all"}
              href={href}
              className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${!isActive ? "border border-border hover:bg-black/5 hover:border-foreground hover:text-foreground" : ""}`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${isActive ? "text-background" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
