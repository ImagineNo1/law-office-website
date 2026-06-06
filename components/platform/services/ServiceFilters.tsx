export function ServiceFilters() {
  return (
    <aside className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] lg:sticky lg:top-28 lg:self-start">
      <input className="h-12 w-full rounded-xl border border-[#eadfce] px-4 text-sm font-bold outline-none focus:border-[#C9973F]" placeholder="جستجوی خدمت..." />
      <div className="mt-4 grid gap-2">
        {["همه خدمات", "قرارداد", "دعاوی", "کیفری", "امضا", "پرونده"].map((item, index) => (
          <button className={`rounded-xl px-4 py-3 text-right text-sm font-black ${index === 0 ? "bg-[#0B172A] text-white" : "bg-[#F7F3EA] text-[#0B172A]"}`} key={item}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-[#0B172A] p-4 text-white">
        <p className="text-sm font-black text-[#D4A64A]">مشاوره فوری</p>
        <p className="mt-2 text-xs font-bold leading-6 text-slate-300">برای انتخاب مسیر مناسب با کارشناس حقوقی صحبت کنید.</p>
      </div>
    </aside>
  );
}
