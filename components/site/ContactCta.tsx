import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <section className="container-shell py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-admin-nav p-8 text-white shadow-soft sm:p-10">
        <div className="absolute -left-10 -top-10 size-48 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold text-gold">مشاوره تخصصی همین حالا</p>
            <h2 className="mt-3 text-3xl font-black leading-10">برای دریافت مشاوره حقوقی همین حالا با ما تماس بگیرید</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              تیم ما آماده پاسخگویی و پیگیری درخواست شماست.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">تماس با ما</Button>
            <a className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10" href="tel:02112345678">
              ۰۲۱-۱۲۳۴۵۶۷۸
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
