"use client";

import { useMemo, useState } from "react";
import { ContractCard } from "@/components/platform/contracts/ContractCard";
import type { PlatformContract } from "@/lib/platform-db";

function priceNumber(value: string) {
  const normalized = value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[^\d]/g, "");
  return Number(normalized || 0);
}

export function ContractsExplorer({ contracts }: { contracts: PlatformContract[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("همه قراردادها");
  const [sort, setSort] = useState("newest");
  const categories = useMemo(() => ["همه قراردادها", ...Array.from(new Set(contracts.map((item) => item.category).filter(Boolean)))], [contracts]);
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = contracts
    .filter((contract) => {
      const matchesCategory = category === "همه قراردادها" || contract.category === category;
      const searchable = `${contract.title} ${contract.category} ${contract.description}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    })
    .sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title, "fa");
      if (sort === "price") return priceNumber(a.price) - priceNumber(b.price);
      return 0;
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] lg:sticky lg:top-28 lg:self-start">
        <input
          className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-[#C9973F]"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجوی قرارداد..."
          value={query}
        />
        <div className="mt-4 grid gap-2">
          {categories.map((item) => (
            <button
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black ${category === item ? "bg-[#0B172A] text-white" : "bg-slate-50 text-[#0B172A]"}`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              <span>{item}</span>
              <span>{item === "همه قراردادها" ? contracts.length : contracts.filter((contract) => contract.category === item).length}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-[#0B172A] p-4 text-white">
          <p className="font-black text-[#D4A64A]">قرارداد اختصاصی</p>
          <p className="mt-2 text-xs font-bold leading-6 text-slate-300">اگر قالب آماده کافی نیست، تنظیم اختصاصی را ثبت کنید.</p>
        </div>
      </aside>
      <div>
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(11,23,42,.05)] md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-black">قراردادهای آماده</h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" onChange={(event) => setSort(event.target.value)} value={sort}>
              <option value="newest">مرتب‌سازی جدیدترین</option>
              <option value="title">مرتب‌سازی عنوان</option>
              <option value="price">مرتب‌سازی قیمت</option>
            </select>
          </div>
        </div>
        {filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((contract) => (
              <ContractCard contract={contract} key={contract.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.04)]">
            <h2 className="text-2xl font-black text-[#0B172A]">قراردادی پیدا نشد</h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-500">جستجو یا دسته‌بندی را تغییر دهید، یا درخواست قرارداد اختصاصی ثبت کنید.</p>
          </div>
        )}
      </div>
    </div>
  );
}

