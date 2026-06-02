import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-lg border border-gold/20 bg-[linear-gradient(120deg,rgba(199,151,65,0.16),rgba(9,17,27,0.95))] p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold text-gold">مشاوره حقوقی دارید؟</p>
            <h2 className="mt-3 text-3xl font-black leading-10 text-foreground">پرونده را با یک ارزیابی دقیق شروع کنید</h2>
            <p className="mt-4 max-w-2xl leading-8 text-muted">
              اطلاعات اولیه را ارسال کنید تا تیم موسسه مسیر مناسب، مدارک لازم و زمان تقریبی پیگیری را بررسی کند.
            </p>
          </div>
          <Button href="/contact">درخواست مشاوره</Button>
        </div>
      </div>
    </section>
  );
}
