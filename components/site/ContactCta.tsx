import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <section className="container-shell py-16">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-admin-nav p-8 text-white shadow-soft sm:p-10 lg:p-12">
        <div className="absolute -left-16 -top-16 size-56 rounded-full bg-gold/24 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-60 rounded-full bg-white/8 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black text-gold">
              مشاوره تخصصی همین حالا
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-[1.35] sm:text-4xl">
              برای دریافت مشاوره حقوقی، مسیر پرونده خود را شفاف شروع کنید
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              تیم ما آماده بررسی اولیه درخواست، پاسخگویی محرمانه و ارائه برنامه
              اقدام حقوقی برای شماست.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">تماس با ما</Button>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              href="tel:02112345678"
            >
              ۰۲۱-۱۲۳۴۵۶۷۸
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
