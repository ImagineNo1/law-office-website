"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryIcon, ContractIcon } from "@/components/contracts/ContractIcons";
import type { ContractTemplate } from "@/types";

type SortKey = "newest" | "popular" | "cheap" | "expensive";

function priceNumber(price?: string) {
  return Number((price ?? "").replace(/[^0-9۰-۹]/g, "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))) || 0;
}

function categoryLabel(category: string) {
  return category === "همه قراردادها" ? category : `قراردادهای ${category}`;
}

export function ContractBankClient({ contracts, categories }: { contracts: ContractTemplate[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("همه قراردادها");
  const [sort, setSort] = useState<SortKey>("newest");

  const counts = useMemo(() => {
    const result = new Map<string, number>();
    categories.forEach((category) => result.set(category, contracts.filter((contract) => contract.category === category).length));
    return result;
  }, [categories, contracts]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const items = contracts.filter((contract) => {
      const categoryMatch = activeCategory === "همه قراردادها" || contract.category === activeCategory;
      const searchMatch = !normalized || `${contract.title} ${contract.category} ${contract.excerpt}`.toLowerCase().includes(normalized);
      return categoryMatch && searchMatch;
    });

    return [...items].sort((a, b) => {
      if (sort === "cheap") return priceNumber(a.priceLabel) - priceNumber(b.priceLabel);
      if (sort === "expensive") return priceNumber(b.priceLabel) - priceNumber(a.priceLabel);
      if (sort === "popular") return (b.order ?? 0) % 7 - ((a.order ?? 0) % 7);
      return (a.order ?? 0) - (b.order ?? 0);
    });
  }, [activeCategory, contracts, query, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-[310px_1fr]" dir="rtl">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-[28px] border border-[#e5dac7] bg-white shadow-[0_22px_70px_rgba(11,23,42,0.09)]">
          <div className="bg-navy px-6 py-5 text-white">
            <p className="text-xs font-black text-gold-light">Contract Categories</p>
            <h2 className="mt-1 text-xl font-black">دسته‌بندی قراردادها</h2>
          </div>
          <div className="grid gap-2 p-4">
            {["همه قراردادها", ...categories.slice(0, 6)].map((category) => {
              const active = activeCategory === category;
              const count = category === "همه قراردادها" ? contracts.length : counts.get(category) ?? 0;
              return (
                <button
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-right text-sm font-black transition ${active ? "bg-gold text-[#1f1608] shadow-[0_12px_26px_rgba(201,151,63,0.24)]" : "bg-[#F8F5EF] text-navy hover:bg-gold/12 hover:text-gold"}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  <span>{categoryLabel(category)}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${active ? "bg-white/45" : "bg-white text-muted"}`}>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="m-4 rounded-[24px] bg-[linear-gradient(145deg,#0B172A,#17213A)] p-5 text-white shadow-[0_18px_45px_rgba(11,23,42,0.22)]">
            <div className="grid size-12 place-items-center rounded-2xl bg-gold text-navy"><ContractIcon name="shield" /></div>
            <h3 className="mt-4 text-lg font-black">نیاز به قرارداد اختصاصی دارید؟</h3>
            <p className="mt-2 text-sm font-bold leading-7 text-slate-300">تیم حقوقی ما قرارداد شما را مطابق شرایط معامله تنظیم می‌کند.</p>
            <Link className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gold px-4 py-3 text-sm font-black text-[#1f1608] transition hover:bg-gold-light" href="/contact">درخواست تنظیم اختصاصی</Link>
          </div>
        </div>
      </aside>

      <section className="min-w-0">
        <div className="rounded-[30px] border border-[#e5dac7] bg-white/90 p-4 shadow-[0_22px_70px_rgba(11,23,42,0.08)] backdrop-blur sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <ContractIcon className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gold" name="document" />
              <input
                aria-label="جستجوی قرارداد"
                className="h-14 w-full rounded-2xl border border-[#e5dac7] bg-[#F8F5EF] pr-12 pl-4 text-sm font-bold text-navy outline-none transition focus:border-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,151,63,0.16)]"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجو در بانک قراردادها..."
                value={query}
              />
            </label>
            <select aria-label="مرتب‌سازی" className="h-14 rounded-2xl border border-[#e5dac7] bg-[#F8F5EF] px-4 text-sm font-black text-navy outline-none focus:border-gold" onChange={(event) => setSort(event.target.value as SortKey)} value={sort}>
              <option value="newest">جدیدترین</option>
              <option value="popular">پربازدیدترین</option>
              <option value="cheap">ارزان‌ترین</option>
              <option value="expensive">گران‌ترین</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((contract) => (
            <article className="group relative overflow-hidden rounded-[28px] border border-[#e7dfd0] bg-white p-5 shadow-[0_18px_50px_rgba(11,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_28px_70px_rgba(11,23,42,0.13)]" key={contract.slug}>
              <div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gold opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-3">
                <div className="grid size-14 place-items-center rounded-2xl bg-[#FCF4E4] text-gold shadow-[0_14px_34px_rgba(201,151,63,0.16)]"><ContractIcon name={categoryIcon(contract.category)} /></div>
                <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-black text-gold">{contract.category}</span>
              </div>
              <h3 className="mt-5 text-xl font-black leading-8 text-navy">{contract.title}</h3>
              <p className="mt-3 min-h-20 text-sm font-bold leading-7 text-muted">{contract.excerpt}</p>
              <div className="mt-5 flex items-center justify-between border-t border-[#efe7d8] pt-4">
                <div><p className="text-xs font-black text-muted">قیمت</p><p className="mt-1 text-lg font-black text-navy">{contract.priceLabel}</p></div>
                <Link className="rounded-2xl bg-navy px-4 py-3 text-sm font-black text-white transition hover:bg-gold hover:text-[#1f1608]" href={`/contracts/${contract.category}/${contract.slug}`}>مشاهده جزئیات</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
