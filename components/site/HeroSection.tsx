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
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <section className="relative overflow-hidden bg-[#f7f3ea] px-2 pb-8 pt-3 text-foreground dark:bg-[#030609]">
      <div
        className="hero-reference-visual relative mx-auto grid min-h-[620px] w-full max-w-[1768px] overflow-hidden rounded-[26px] border border-[#e7dec9] shadow-[0_18px_70px_rgba(15,23,42,0.08)] dark:border-[rgba(212,168,79,0.22)] dark:shadow-[0_18px_80px_rgba(0,0,0,0.35)] lg:grid-cols-[0.52fr_0.48fr]"
        dir="ltr"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7f3ea_0%,rgba(247,243,234,0.96)_28%,rgba(247,243,234,0.54)_47%,rgba(247,243,234,0.08)_69%,rgba(247,243,234,0)_100%)] dark:bg-[linear-gradient(90deg,#030609_0%,rgba(5,11,18,0.96)_31%,rgba(5,11,18,0.58)_50%,rgba(5,11,18,0.12)_73%,rgba(5,11,18,0)_100%)]" />

        <div className="relative z-10 flex items-center px-6 py-14 text-center sm:px-10 lg:px-24 lg:text-right" dir="rtl">
          <div className="mx-auto w-full max-w-[650px] lg:mx-0">
            <p className="gold-divider mb-7 justify-center text-sm font-black text-gold lg:justify-start">
              {hero.eyebrow}
            </p>

            <h1 className="font-heading whitespace-pre-line text-5xl font-black leading-[1.17] text-[#0f172a] sm:text-6xl lg:text-[70px] dark:text-white">
              {renderHighlightedTitle(hero.title)}
            </h1>

            <p className="mx-auto mt-7 max-w-[610px] text-base leading-9 text-[#64748b] sm:text-lg lg:mx-0 dark:text-white/72">
              {hero.description}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button className="min-h-14 gap-3 px-9" href={hero.primaryCtaHref}>
                {hero.primaryCtaLabel}
                <ArrowIcon />
              </Button>
              <Button
                className="min-h-14 gap-3 border-gold/35 bg-white/72 px-9 dark:bg-transparent dark:text-white"
                href={hero.secondaryCtaHref}
                variant="outline"
              >
                {hero.secondaryCtaLabel}
                <ArrowIcon />
              </Button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-full" aria-hidden="true" />
      </div>
    </section>
  );
}
