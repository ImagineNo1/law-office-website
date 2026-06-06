export function ContractTabs() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <div className="grid gap-3 md:grid-cols-3">
        {["پیش‌نمایش", "مدارک لازم", "سوالات متداول"].map((tab) => (
          <button className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black" key={tab}>
            {tab}
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold leading-8 text-[#66758A]">
        متن قرارداد شامل تعاریف، موضوع، تعهدات، ضمانت اجرا، محرمانگی، حل اختلاف و پیوست‌های قابل تکمیل است.
      </p>
    </div>
  );
}
