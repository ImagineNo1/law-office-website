const items = [
  ["راهنمای قرارداد", "محتوای آموزشی برای تصمیم گیری حقوقی دقیق تر.", "bg-blue-500/10 text-blue-600"],
  ["آموزش امضای دیجیتال", "راهنمای کامل ارسال، پیگیری و بایگانی امضا.", "bg-emerald-500/10 text-emerald-600"],
  ["سوالات متداول", "پاسخ های کوتاه و کاربردی برای کاربران و موکلین.", "bg-purple-500/10 text-purple-600"],
  ["اخبار حقوقی", "به روزرسانی های مهم و اطلاعیه های حقوقی.", "bg-amber-500/10 text-amber-600"],
];

export function KnowledgePreview() {
  return (
    <section id="knowledge" className="bg-white py-20 text-slate-950">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="mb-12 text-center">
          <span className="rounded-full border border-[#C9973F]/20 bg-[#C9973F]/10 px-4 py-1.5 text-xs font-black text-[#A87522]">مرکز دانش</span>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">یاد بگیرید و تصمیم بهتر بگیرید</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, description, color]) => (
            <article className="group rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#C9973F]/40 hover:shadow-[0_20px_55px_rgba(15,23,42,.08)]" key={title}>
              <span className={`mx-auto grid size-14 place-items-center rounded-2xl ${color}`}>؟</span>
              <h3 className="mt-5 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-500">{description}</p>
              <span className="mt-4 inline-flex text-xs font-black text-[#C9973F] opacity-0 transition group-hover:opacity-100">مطالعه بیشتر ←</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
