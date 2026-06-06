export function KnowledgePreview() {
  return (
    <section className="bg-[#F7F3EA] py-10 text-[#0B172A]">
      <div className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-4 md:grid-cols-4">
        {["راهنمای قرارداد", "آموزش امضای دیجیتال", "سوالات متداول", "اخبار حقوقی"].map((item) => (
          <article className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.05)]" key={item}>
            <span className="text-sm font-black text-[#C9973F]">مرکز دانش</span>
            <h3 className="mt-3 text-xl font-black">{item}</h3>
            <p className="mt-2 text-sm font-bold leading-7 text-[#66758A]">محتوای آموزشی برای تصمیم‌گیری حقوقی دقیق‌تر و استفاده بهتر از سامانه.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
