import { Button } from "@/components/ui/Button";
import { siteStats } from "@/lib/mockData";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(199,151,65,0.18),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(31,71,92,0.38),transparent_34%)]" />
      <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="relative z-10">
          <p className="mb-5 text-sm font-bold text-gold">عدالت، تخصص، تعهد</p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.35] text-foreground sm:text-5xl lg:text-6xl">
            ارائه خدمات حقوقی تخصصی و راهکارهای موثر برای پرونده شما
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-9 text-muted sm:text-lg">
            تیم حقوقی موسسه با تمرکز بر تحلیل دقیق، تنظیم راهبرد پرونده و گزارش دهی منظم، مسیر تصمیم گیری حقوقی را شفاف تر می کند.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">دریافت مشاوره</Button>
            <Button href="/institute" variant="outline">
              معرفی موسسه
            </Button>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {siteStats.map((stat) => (
              <div className="rounded-lg border border-gold/15 bg-white/[0.035] p-4" key={stat.label}>
                <strong className="block text-2xl text-gold">{stat.value}</strong>
                <span className="mt-1 block text-sm text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 min-h-[420px] rounded-lg border border-gold/20 bg-[linear-gradient(145deg,rgba(199,151,65,0.2),rgba(8,14,22,0.7)),url('/globe.svg')] bg-[length:auto,260px] bg-[position:center,center] bg-no-repeat p-6 shadow-soft">
          <div className="absolute inset-x-8 top-8 h-40 rounded-full border border-gold/20" />
          <div className="absolute bottom-8 right-8 max-w-sm rounded-lg border border-gold/20 bg-ink/85 p-6 backdrop-blur">
            <p className="text-2xl font-black text-gold">مشاوره محرمانه</p>
            <p className="mt-3 leading-8 text-muted">بررسی اولیه مدارک، تشخیص مسیر حقوقی و اعلام مراحل اجرایی پرونده.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
