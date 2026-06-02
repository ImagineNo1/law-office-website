import { Button } from "@/components/ui/Button";
import { siteStats, trustFeatures } from "@/lib/mockData";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="container-shell grid min-h-[720px] items-center gap-10 py-14 lg:grid-cols-[1fr_0.95fr]">
        <div className="relative z-10">
          <p className="mb-5 text-sm font-black text-gold">تخصص، تجربه، تعهد</p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.28] tracking-[-0.01em] text-foreground sm:text-5xl lg:text-6xl">
            راهکارهای حقوقی هوشمند برای آرامش و موفقیت شما
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-9 text-muted sm:text-lg">
            ما در موسسه عدالت گستر با تکیه بر تجربه و دانش تخصصی، بهترین راهکارهای حقوقی را برای افراد و کسب و کارها ارائه می دهیم.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">درخواست مشاوره</Button>
            <Button href="/institute" variant="outline">
              درباره موسسه
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="legal-photo min-h-[430px] overflow-hidden rounded-[2rem] border border-border shadow-soft" />
          <div className="absolute -bottom-8 right-6 left-6 grid gap-3 rounded-3xl border border-border bg-surface-strong/92 p-4 shadow-soft backdrop-blur md:grid-cols-4">
            {trustFeatures.map((item) => (
              <div className="border-border p-3 md:border-l last:md:border-l-0" key={item.title}>
                <p className="font-black text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-admin-nav text-white">
        <div className="container-shell grid gap-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {siteStats.map((stat) => (
            <div className="flex items-center justify-between border-white/10 py-2 lg:border-l lg:pl-8 last:lg:border-l-0" key={stat.label}>
              <span className="text-sm text-slate-300">{stat.label}</span>
              <strong className="text-3xl text-gold">{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
