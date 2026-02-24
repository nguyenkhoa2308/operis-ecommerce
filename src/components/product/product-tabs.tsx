"use client";

import { useState } from "react";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Box,
  Cable,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import type { Product, ProductFullSpec } from "@/lib/api/product-mappers";
import { viCategory } from "@/data/products";
import { ProductReviews } from "@/components/product/product-reviews";

type Tab = "description" | "specs" | "reviews";

const tabs: { key: Tab; label: string; shortLabel: string }[] = [
  { key: "description", label: "MÔ TẢ", shortLabel: "MÔ TẢ" },
  { key: "specs", label: "THÔNG SỐ KỸ THUẬT", shortLabel: "THÔNG SỐ" },
  { key: "reviews", label: "ĐÁNH GIÁ & HỎI ĐÁP", shortLabel: "ĐÁNH GIÁ" },
];

const labelIcons: Record<string, React.ReactNode> = {
  CPU: <Cpu size={18} />,
  RAM: <MemoryStick size={18} />,
  "Lưu trữ": <HardDrive size={18} />,
};

const groupIcons: Record<string, typeof Cpu> = {
  "Hiệu năng": Cpu,
  "Kết nối & Cổng": Cable,
  "Thiết kế & Vật lý": Ruler,
  "Phần mềm & Bảo hành": ShieldCheck,
};

function getHighlightSpecs(fullSpecs: ProductFullSpec[]) {
  return fullSpecs
    .filter(
      (s) =>
        s.group_name.toLowerCase() === "hiệu năng" ||
        s.group_name.toLowerCase() === "phần cứng",
    )
    .sort((a, b) => a.sort_order - b.sort_order);
}

function groupFullSpecs(
  specs: ProductFullSpec[],
  brand: string,
  category: string,
) {
  const extraSpecs: ProductFullSpec[] = [
    {
      id: "extra-brand",
      group_name: "Thông tin khác",
      label: "Thương hiệu",
      value: brand,
      sort_order: 90,
    },
    {
      id: "extra-cat",
      group_name: "Thông tin khác",
      label: "Danh mục",
      value: category,
      sort_order: 91,
    },
  ];
  const allSpecs = [...specs, ...extraSpecs];

  const groupMap = new Map<string, ProductFullSpec[]>();
  for (const spec of allSpecs) {
    const group = spec.group_name || "Thông tin khác";
    if (!groupMap.has(group)) groupMap.set(group, []);
    groupMap.get(group)!.push(spec);
  }

  return Array.from(groupMap.entries()).map(([title, items]) => ({
    title,
    icon: groupIcons[title] ?? Box,
    items: items.sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  return (
    <div id="product-tabs" className="mt-10 md:mt-16 scroll-mt-20">
      <div className="flex gap-4 md:gap-8 border-b border-border mb-6 md:mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`text-xs md:text-sm tracking-widest pb-3 transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <span className="md:hidden">{tab.shortLabel}</span>
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "description" && (
        <div>
          <p className="text-sm text-muted-foreground leading-[1.8]">
            {product.description}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getHighlightSpecs(product.fullSpecs).map((spec) => (
              <div
                key={spec.id}
                className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3"
              >
                <div className="text-primary shrink-0">
                  {labelIcons[spec.label] ?? <Box size={18} />}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {spec.label}
                  </p>
                  <p className="text-sm font-medium">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "specs" &&
        (() => {
          const groups = groupFullSpecs(
            product.fullSpecs,
            product.brand,
            viCategory(product.category),
          );
          return (
            <div className="space-y-6">
              {groups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className="rounded-xl border border-border overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5 px-5 py-3 bg-foreground">
                      <Icon size={16} className="text-white/70" />
                      <span className="text-sm font-semibold tracking-widest text-white uppercase">
                        {group.title}
                      </span>
                    </div>
                    <table className="w-full">
                      <tbody>
                        {group.items.map((spec, i) => (
                          <tr
                            key={spec.id}
                            className={`${i % 2 === 0 ? "bg-white" : "bg-muted/30"} hover:bg-primary/5 transition-colors`}
                          >
                            <td className="text-xs md:text-sm font-medium text-muted-foreground px-3 md:px-5 py-2.5 md:py-3 w-[120px] md:w-[240px] align-top">
                              {spec.label}
                            </td>
                            <td className="text-xs md:text-sm text-foreground px-3 md:px-5 py-2.5 md:py-3">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          );
        })()}

      {activeTab === "reviews" && (
        <ProductReviews productSlug={product.slug} />
      )}
    </div>
  );
}
