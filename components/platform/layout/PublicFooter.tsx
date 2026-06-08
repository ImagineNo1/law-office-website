import Link from "next/link";

function ScaleIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function PublicFooter() {
  return (
    <footer id="footer" className="bg-primary py-16 text-primary-foreground" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <ScaleIcon />
              </span>
              <span className="text-lg font-bold">وکیل‌یار</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              پلتفرم فارسی خدمات حقوقی، بانک قرارداد، CRM، پورتال موکل و امضای دیجیتال.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold">خدمت حقوقی</h4>
            <ul className="space-y-2.5">
              {["مشاوره حقوقی", "تنظیم قرارداد", "تنظیم دادخواست", "امضای دیجیتال"].map((item) => (
                <li key={item}>
                  <Link className="text-sm text-primary-foreground/50 transition-colors hover:text-accent" href="/services">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold">بانک قرارداد</h4>
            <ul className="space-y-2.5">
              {["قراردادهای ملکی", "قراردادهای استخدامی", "قراردادهای تجاری", "قراردادهای مشارکتی"].map((item) => (
                <li key={item}>
                  <Link className="text-sm text-primary-foreground/50 transition-colors hover:text-accent" href="/contracts">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold">پشتیبانی سریع</h4>
            <div className="rounded-xl border border-accent/20 bg-accent/10 p-4">
              <div className="mb-2 flex items-center gap-3">
                <span className="size-5 rounded-full border border-accent text-accent" />
                <span className="text-sm font-semibold">پشتیبانی ۲۴/۷</span>
              </div>
              <p className="text-xs text-primary-foreground/50">ثبت و پیگیری درخواست در داشبورد اختصاصی.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-primary-foreground/40">© ۱۴۰۳ وکیل‌یار — تمامی حقوق محفوظ است.</p>
          <div className="flex gap-6 text-xs text-primary-foreground/40">
            <Link className="transition-colors hover:text-accent" href="/about">درباره وکیل‌یار</Link>
            <Link className="transition-colors hover:text-accent" href="/contact">تماس با ما</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
