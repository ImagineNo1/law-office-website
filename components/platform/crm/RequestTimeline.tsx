export function RequestTimeline() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-xl font-black">تایم‌لاین</h2>
      <div className="mt-4 grid gap-3">
        {["ثبت", "بررسی", "ارجاع", "پیگیری"].map((item, index) => (
          <div className="grid grid-cols-[34px_1fr] gap-3" key={item}>
            <span className="grid size-8 place-items-center rounded-full bg-[#0F766E] text-xs font-black text-white">
              {index + 1}
            </span>
            <span className="rounded-xl border border-slate-200 p-3 text-sm font-black">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
