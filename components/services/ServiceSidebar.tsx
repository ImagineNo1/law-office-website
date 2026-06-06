"use client";

import { ServiceIcon } from "@/components/services/ServiceIcons";

const iconByCategory: Record<string, string> = {
  "همه خدمات": "scale",
  "مشاوره حقوقی": "scale",
  "تنظیم قرارداد": "gavel",
  "تنظیم دادخواست": "document",
  "تنظیم شکواییه": "gavel",
  "تنظیم اظهارنامه": "mail",
  "تنظیم لایحه": "brief",
  "پیگیری پرونده": "case",
};

export function ServiceSidebar({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <aside className="sticky top-24 rounded-[8px] border border-border bg-white p-4 shadow-card">
      <h2 className="mb-4 text-center text-lg font-black text-navy">دسته‌بندی خدمات</h2>
      <div className="grid gap-2">
        {categories.map((category) => {
          const active = category === activeCategory;

          return (
            <button
              className={`flex min-h-11 items-center justify-between rounded-[6px] px-4 text-sm font-black transition ${
                active
                  ? "bg-navy text-white shadow-[0_12px_26px_rgba(11,23,42,0.18)]"
                  : "bg-transparent text-muted hover:bg-soft-gray hover:text-gold"
              }`}
              key={category}
              onClick={() => onCategoryChange(category)}
              type="button"
            >
              <span>{category}</span>
              <ServiceIcon className="size-4" name={iconByCategory[category] ?? "scale"} />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
