export function AdminDashboardCharts({
  data,
}: {
  data: Record<string, number>;
}) {
  const labels: Record<string, string> = {
    requests: "درخواست‌ها",
    services: "خدمات",
    contracts: "قراردادها",
    forms: "فرم‌ها",
    faqs: "سوالات",
    posts: "وبلاگ",
    news: "اخبار",
    messages: "پیام‌ها",
    users: "کاربران",
  };
  const entries = Object.entries(data).filter(([key]) => key in labels);
  const max = Math.max(1, ...entries.map(([, value]) => value));
  const total = entries.reduce((sum, [, value]) => sum + value, 0) || 1;

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
      <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
        <h2 className="text-lg font-black text-navy">
          نمودار مقایسه‌ای بخش‌ها
        </h2>
        <div className="mt-5 grid gap-3">
          {entries.map(([key, value]) => (
            <div className="grid gap-2" key={key}>
              <div className="flex items-center justify-between text-xs font-black text-muted">
                <span>{labels[key]}</span>
                <span>{new Intl.NumberFormat("fa-IR").format(value)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-700"
                  style={{ width: `${Math.max(6, (value / max) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
        <h2 className="text-lg font-black text-navy">سهم داده‌ها</h2>
        <div className="mx-auto mt-6 grid size-52 place-items-center rounded-full bg-[conic-gradient(#0F766E_0_65%,#0B172A_65%_82%,#E9EEF5_82%_100%)]">
          <div className="grid size-32 place-items-center rounded-full bg-white text-center shadow-inner">
            <strong className="text-3xl font-black text-navy">
              {new Intl.NumberFormat("fa-IR").format(total)}
            </strong>
            <span className="text-xs font-bold text-muted">کل رکوردها</span>
          </div>
        </div>
      </section>
    </div>
  );
}
