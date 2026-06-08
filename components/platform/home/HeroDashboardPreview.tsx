const stats = [
  { value: "۸۵۴", label: "سند فعال", icon: "file" },
  { value: "۲۳", label: "در انتظار امضا", icon: "pen" },
  { value: "۵۰", label: "درخواست‌های CRM", icon: "users" },
];

const docs = [
  { name: "قرارداد اجاره ملک تجاری", date: "۱۴۰۳/۰۸/۲۰", status: "پیش‌نویس" },
  { name: "قرارداد استخدام", date: "۱۴۰۳/۰۸/۱۸", status: "در حال بررسی" },
  { name: "اظهارنامه رسمی مالیاتی", date: "۱۴۰۳/۰۸/۱۵", status: "امضا شده" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    file: "M7 3h7l5 5v13H7V3Zm7 0v6h6",
    pen: "M16.8 3.6 20.4 7.2 9.6 18H6v-3.6L16.8 3.6Z",
    users: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  };
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
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

export function HeroDashboardPreview() {
  return (
    <div className="hidden lg:block">
      <div className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
        <div className="relative space-y-5 rounded-2xl border border-border/50 bg-card p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">داشبورد اسناد و امضا</h3>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              فعلی
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                className="rounded-xl bg-muted/50 p-4 text-center"
                key={stat.label}
              >
                <span className="mx-auto mb-2 flex size-5 items-center justify-center text-accent">
                  <Icon name={stat.icon} />
                </span>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">اسناد اخیر</p>
            {docs.map((doc) => (
              <div
                className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                key={doc.name}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name="file" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">
                      {doc.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {doc.date}
                    </span>
                  </span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${doc.status === "امضا شده" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
