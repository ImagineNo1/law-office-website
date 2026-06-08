const items = [
  [
    "راهنمای قرارداد",
    "محتوای آموزشی برای تصمیم‌گیری حقوقی دقیق‌تر و استفاده بهتر از سامانه.",
    "bg-blue-500/10 text-blue-600",
    "book",
  ],
  [
    "آموزش امضای دیجیتال",
    "راهنمای کامل ارسال، پیگیری و بایگانی امضا در کارتابل اختصاصی.",
    "bg-emerald-500/10 text-emerald-600",
    "pen",
  ],
  [
    "سوالات متداول",
    "پاسخ‌های کوتاه و کاربردی برای کاربران، موکلین و مدیران حقوقی.",
    "bg-purple-500/10 text-purple-600",
    "help",
  ],
  [
    "اخبار حقوقی",
    "به‌روزرسانی‌های مهم و اطلاعیه‌های حقوقی برای تصمیم‌گیری بهتر.",
    "bg-emerald-600/10 text-emerald-600",
    "news",
  ],
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z",
    pen: "M16.8 3.6 20.4 7.2 9.6 18H6v-3.6L16.8 3.6Z",
    help: "M12 18h.01M9.2 9a3 3 0 1 1 5.6 1.5c-.9 1.4-2.8 1.6-2.8 3.5",
    news: "M4 5h16v14H4V5Zm4 4h8M8 13h8M8 17h5",
  };
  return (
    <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
      <path
        d={paths[name]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function KnowledgePreview() {
  return (
    <section id="knowledge" className="bg-background py-24" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            مرکز دانش
          </span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            یاد بگیرید و تصمیم بهتری بگیرید
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, description, color, icon]) => (
            <article
              className="group rounded-2xl border border-border/50 bg-card p-6 text-center transition-all duration-300 hover:border-accent/20 hover:shadow-lg"
              key={title}
            >
              <span
                className={`mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl ${color} transition-transform group-hover:scale-110`}
              >
                <Icon name={icon} />
              </span>
              <h3 className="mb-2 text-base font-bold">{title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                مطالعه بیشتر ←
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
