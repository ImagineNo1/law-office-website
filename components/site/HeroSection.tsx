import { Button } from "@/components/ui/Button";
import type { HeroContent, SiteStat, TrustFeature } from "@/types";

function StatIcon({ index }: { index: number }) {
  const paths = [
    "M12 3v18M6 8h12M7.5 8 5 15h5L7.5 8Zm9 0L14 15h5l-2.5-7Z",
    "M12 6v6l4 2M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "M6 20V7a2 2 0 0 1 2-2h8l4 4v11H6Zm8-15v5h5",
    "M7 11l3 3 7-7M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  ];

  return (
    <svg
      aria-hidden="true"
      className="size-7 text-white/24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d={paths[index] ?? paths[0]}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3 20 7v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V7l8-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 12 2.4 2.4L15.8 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function renderHighlightedTitle(title: string) {
  const target = "موفقیت شما";

  if (!title.includes(target)) {
    return title;
  }

  const [before, after] = title.split(target);

  return (
    <>
      {before}
      <span className="text-gold">{target}</span>
      {after}
    </>
  );
}

export function HeroSection({
  hero,
  stats,
  trustFeatures,
}: {
  hero: HeroContent;
  stats: SiteStat[];
  trustFeatures: TrustFeature[];
}) {
  return (
    <section className="soft-page-bg relative overflow-hidden text-foreground">
      <div className="hero-dot-pattern absolute inset-x-0 top-0 h-[560px] opacity-25 [mask-image:linear-gradient(180deg,black,transparent)]" />
      <div className="absolute right-[5%] top-20 size-80 rounded-full bg-gold/14 blur-3xl" />
      <div className="absolute left-[10%] top-24 size-96 rounded-full bg-white/70 blur-3xl dark:bg-white/5" />

      <div className="container-shell relative grid items-center gap-12 pb-24 pt-24 lg:grid-cols-[0.95fr_1.05fr] lg:pb-[120px] lg:pt-[120px]">
        <div className="relative order-2 fade-up lg:order-1">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gold/14 blur-3xl" />
          <div className="legal-photo min-h-[330px] rounded-[32px] border border-white/80 shadow-soft ring-1 ring-gold/10 sm:min-h-[440px] lg:min-h-[560px] dark:border-white/10" />

          <div className="premium-panel absolute bottom-5 right-5 max-w-[325px] rounded-[24px] p-5">
            <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold">
              <ShieldIcon />
            </div>
            <p className="font-heading text-base font-black text-foreground">
              {hero.consultationTitle}
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {hero.consultationText}
            </p>
          </div>
        </div>

        <div className="relative z-10 order-1 text-center fade-up lg:order-2 lg:text-right">
          <p className="gold-divider mb-5 justify-center text-sm font-black text-gold lg:justify-start">
            {hero.eyebrow}
          </p>

          <h1 className="font-heading mx-auto max-w-4xl whitespace-pre-line text-5xl font-black leading-[1.18] text-[#0f172a] sm:text-6xl lg:mx-0 lg:text-[72px] dark:text-foreground">
            {renderHighlightedTitle(hero.title)}
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-lg leading-9 text-[#475569] lg:mx-0 dark:text-muted">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button className="min-h-14 gap-2 px-8" href={hero.primaryCtaHref}>
              <ShieldIcon />
              {hero.primaryCtaLabel}
            </Button>
            <Button className="min-h-14 px-8" href={hero.secondaryCtaHref} variant="outline">
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </div>

      <div className="container-shell relative z-10">
        <div className="premium-panel -mt-12 grid overflow-hidden rounded-[24px] md:grid-cols-4">
          {trustFeatures.map((item, index) => (
            <div
              className="flex gap-4 border-b border-border p-6 text-right md:border-b-0 md:border-l last:md:border-l-0"
              key={item.title}
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold">
                <StatIcon index={index} />
              </div>

              <div>
                <p className="font-heading font-black text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {item.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-shell relative z-10 mt-4 pb-14">
        <div className="grid gap-4 rounded-[24px] bg-[#071225] px-6 py-7 text-white shadow-soft ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, index) => (
            <div
              className="flex items-center justify-between gap-4 border-white/10 py-3 lg:border-l lg:pl-8 last:lg:border-l-0"
              key={stat.label}
            >
              <div>
                <strong className="font-heading block text-4xl text-gold">
                  {stat.value}
                </strong>
                <span className="mt-1 block text-sm text-slate-300">
                  {stat.label}
                </span>
              </div>
              <div className="grid size-12 place-items-center rounded-2xl bg-white/7">
                <StatIcon index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
