"use client";

export function ServiceSearchBar({
  query,
  sort,
  onQueryChange,
  onSortChange,
}: {
  query: string;
  sort: string;
  onQueryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <label className="relative block w-full md:max-w-[360px]">
        <span className="sr-only">جستجوی خدمات</span>
        <input
          className="h-12 w-full rounded-xl border border-border bg-white pr-11 pl-4 text-sm font-bold text-foreground shadow-[0_10px_26px_rgba(11,23,42,0.04)] outline-none transition placeholder:text-muted focus:border-emerald-500 focus:ring-4 focus:ring-[var(--ring)]"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="جستجو در خدمات..."
          value={query}
        />
        <svg
          aria-hidden="true"
          className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-navy"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="m20 20-4.5-4.5m2.5-5.2a7.7 7.7 0 1 1-15.4 0 7.7 7.7 0 0 1 15.4 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
      </label>

      <label className="flex items-center gap-3 text-sm font-black text-navy">
        مرتب‌سازی:
        <select
          className="h-12 min-w-40 rounded-xl border border-border bg-white px-4 text-sm font-bold text-muted outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-[var(--ring)]"
          onChange={(event) => onSortChange(event.target.value)}
          value={sort}
        >
          <option value="newest">جدیدترین</option>
          <option value="title">عنوان خدمت</option>
          <option value="category">دسته‌بندی</option>
        </select>
      </label>
    </div>
  );
}
