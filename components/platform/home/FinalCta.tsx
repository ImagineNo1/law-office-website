import Link from "next/link";

const features = ["گزارش مبتنی", "سفارشی‌سازی", "پشتیبانی حقوقی"];

export function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-24 text-center" dir="rtl">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-5 text-3xl font-extrabold text-primary-foreground sm:text-4xl">
          پرونده حقوقی خود را ساختاریافته شروع کنید
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/70">
          درخواست، مدارک، قراردادها، امضا و پیام‌ها در یک کارتابل امن و قابل پیگیری.
        </p>
        <Link className="inline-flex rounded-full bg-accent px-10 py-3.5 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition hover:bg-accent/90" href="/signup">
          شروع کنید
          <span className="mr-2">←</span>
        </Link>
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {features.map((feature) => (
            <div className="flex items-center gap-2 text-primary-foreground/60" key={feature}>
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
