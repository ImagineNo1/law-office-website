"use client";

import { useMemo, useState } from "react";
import { ServiceCard } from "@/components/platform/services/ServiceCard";
import type { PlatformService } from "@/lib/platform-db";

export function ServicesExplorer({
  services,
}: {
  services: PlatformService[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("همه خدمات");
  const categories = useMemo(
    () => [
      "همه خدمات",
      ...Array.from(
        new Set(
          services.map((item) => item.category || item.tag).filter(Boolean),
        ),
      ),
    ],
    [services],
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = services.filter((service) => {
    const matchesCategory =
      category === "همه خدمات" ||
      service.category === category ||
      service.tag === category;
    const searchable =
      `${service.title} ${service.description} ${service.category} ${service.tag}`.toLowerCase();
    return (
      matchesCategory &&
      (!normalizedQuery || searchable.includes(normalizedQuery))
    );
  });

  return (
    <>
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] lg:sticky lg:top-28 lg:self-start">
        <input
          className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-[#0F766E]"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجوی خدمت..."
          value={query}
        />
        <div className="mt-4 grid gap-2">
          {categories.map((item) => (
            <button
              className={`rounded-xl px-4 py-3 text-right text-sm font-black ${category === item ? "bg-[#0B172A] text-white" : "bg-slate-50 text-[#0B172A]"}`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-[#0B172A] p-4 text-white">
          <p className="text-sm font-black text-[#D4A64A]">مشاوره فوری</p>
          <p className="mt-2 text-xs font-bold leading-6 text-slate-300">
            برای انتخاب مسیر مناسب با کارشناس حقوقی صحبت کنید.
          </p>
        </div>
      </aside>
      <div>
        {filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <ServiceCard
                desc={item.description}
                key={item.slug}
                sla={item.sla}
                slug={item.slug}
                tag={item.tag}
                title={item.title}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.04)]">
            <h2 className="text-2xl font-black text-[#0B172A]">
              خدمتی پیدا نشد
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-500">
              عبارت جستجو یا دسته‌بندی را تغییر دهید، یا درخواست حقوقی جدید ثبت
              کنید.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
