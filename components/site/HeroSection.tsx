import { Button } from "@/components/ui/Button";
import type { HeroContent, SiteStat, TrustFeature } from "@/types";

function renderHighlightedTitle(title: string) {
  const target = "موفقیت شما";
  const normalizedTitle = title.replace(" برای آرامش", "\nبرای آرامش");

  if (!normalizedTitle.includes(target)) {
    return normalizedTitle;
  }

  const [before, after] = normalizedTitle.split(target);

  return (
    <>
      {before}
      <span className="text-gold">{target}</span>
      {after}
    </>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 12H5m0 0 6-6m-6 6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function HeroSection({
  hero,
}: {
  hero: HeroContent;
  stats: SiteStat[];
  trustFeatures: TrustFeature[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#f8f5ef] text-foreground dark:bg-[#020617]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 lg:py-10">
        <div className="overflow-hidden rounded-[32px] border border-[#e7dec9] bg-[#f8f5ef] shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-[rgba(212,168,79,0.18)] dark:bg-[#020617] dark:shadow-[0_24px_90px_rgba(0,0,0,0.42)]">
          <div className="grid min-h-[700px] lg:grid-cols-[52fr_48fr]" dir="ltr">
            <div className="relative z-10 flex items-center bg-[linear-gradient(90deg,#f8f5ef_0%,#fbf7ef_100%)] px-8 py-16 text-center sm:px-12 lg:px-24 lg:text-right dark:bg-[linear-gradient(90deg,#020617_0%,#050b12_100%)]" dir="rtl">
              <div className="mx-auto w-full max-w-[680px] lg:mx-0">
                <p className="gold-divider mb-7 justify-center text-sm font-extrabold tracking-[-0.01em] text-gold lg:justify-start">
                  {hero.eyebrow}
                </p>

                <h1 className="font-heading max-w-[680px] whitespace-pre-line text-5xl font-extrabold leading-[1.18] tracking-[-0.015em] text-[#0f172a] sm:text-6xl lg:text-[72px] dark:text-white">
                  {renderHighlightedTitle(hero.title)}
                </h1>

                <p className="mx-auto mt-7 max-w-[610px] text-base font-medium leading-9 tracking-[-0.01em] text-[#64748b] sm:text-lg lg:mx-0 dark:text-white/72">
                  {hero.description}
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button className="min-h-[52px] gap-3 rounded-2xl bg-[#d4a84f] px-9 text-[#1b1305] shadow-[0_12px_30px_rgba(212,168,79,0.25)] hover:bg-[#e0b85d]" href={hero.primaryCtaHref}>
                    {hero.primaryCtaLabel}
                    <ArrowIcon />
                  </Button>
                  <Button
                    className="min-h-[52px] gap-3 rounded-2xl border-gold/35 bg-white/72 px-9 dark:bg-transparent dark:text-white"
                    href={hero.secondaryCtaHref}
                    variant="outline"
                  >
                    {hero.secondaryCtaLabel}
                    <ArrowIcon />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative min-h-[360px] border-t border-[rgba(15,23,42,0.08)] lg:min-h-full lg:border-r lg:border-t-0 dark:border-[rgba(212,168,79,0.16)]" aria-hidden="true">
              <div className="hero-visual absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
