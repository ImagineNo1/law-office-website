import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <section className="container-shell py-16">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-admin-nav p-8 text-white shadow-soft sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold text-gold">مشاوره حقوقی دارید؟</p>
            <h2 className="mt-3 text-3xl font-black leading-10">پرونده را با یک ارزیابی دقیق شروع کنید</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              اطلاعات اولیه را ارسال کنید تا تیم موسسه مسیر مناسب، مدارک لازم و زمان تقریبی پیگیری را بررسی کند.
            </p>
          </div>
          <Button href="/contact">درخواست مشاوره</Button>
        </div>
      </div>
    </section>
  );
}
