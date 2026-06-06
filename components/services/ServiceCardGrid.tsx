"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ServiceIcon } from "@/components/services/ServiceIcons";
import { ServiceSearchBar } from "@/components/services/ServiceSearchBar";
import { ServiceSidebar } from "@/components/services/ServiceSidebar";
import type { Service } from "@/types";

export function ServiceCardGrid({
  services,
  categories,
}: {
  services: Service[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("همه خدمات");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = services.filter((service) => {
      const categoryMatch =
        activeCategory === "همه خدمات" || service.category === activeCategory;
      const queryMatch =
        !normalizedQuery ||
        [service.title, service.excerpt, service.category]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedQuery));

      return categoryMatch && queryMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title, "fa");
      }
      if (sort === "category") {
        return String(a.category ?? "").localeCompare(String(b.category ?? ""), "fa");
      }
      return (a.order ?? 0) - (b.order ?? 0);
    });
  }, [activeCategory, query, services, sort]);

  return (
    <div className="grid gap-7 lg:grid-cols-[270px_1fr]">
      <ServiceSidebar
        activeCategory={activeCategory}
        categories={categories}
        onCategoryChange={setActiveCategory}
      />

      <div className="min-w-0">
        <ServiceSearchBar
          onQueryChange={setQuery}
          onSortChange={setSort}
          query={query}
          sort={sort}
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <Link
              className="group flex min-h-[245px] flex-col items-center rounded-[8px] border border-border bg-white p-7 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft"
              href={`/services/${service.slug}`}
              key={service.slug}
              prefetch={false}
            >
              <span className="grid size-20 place-items-center rounded-full bg-[#FBF4E8] text-gold transition group-hover:bg-gold group-hover:text-[#1b1305]">
                <ServiceIcon className="size-9" name={service.icon} />
              </span>
              <h3 className="mt-6 text-xl font-black text-navy">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm font-bold leading-7 text-muted">
                {service.excerpt}
              </p>
              <span className="mt-5 text-sm font-black text-navy transition group-hover:text-gold">
                بیشتر بدانید
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-center gap-3">
          <button className="grid size-10 place-items-center rounded-full border border-border bg-white text-navy" type="button">
            ‹
          </button>
          <span className="grid size-10 place-items-center rounded-full bg-gold text-sm font-black text-white">
            ۱
          </span>
          <button className="grid size-10 place-items-center rounded-full border border-border bg-white text-navy" type="button">
            ۲
          </button>
          <span className="text-muted">...</span>
          <button className="grid size-10 place-items-center rounded-full border border-border bg-white text-navy" type="button">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
