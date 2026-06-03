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
    <section className="relative overflow-hidden bg-[#f6f2ea] text-foreground dark:bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,168,79,0.12),transparent_28rem),radial-gradient(circle_at_72%_8%,rgba(255,255,255,0.82),transparent_34rem)] dark:bg-[radial-gradient(circle_at_22%_18%,rgba(212,168,79,0.12),transparent_28rem)]" />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 py-8 lg:py-12">
        <div className="overflow-hidden rounded-[34px] border border-[#e4dac7] bg-[#fbf8f1] shadow-[0_26px_90px_rgba(22,32,51,0.08)] dark:border-[rgba(212,168,79,0.18)] dark:bg-[#020617] dark:shadow-[0_24px_90px_rgba(0,0,0,0.42)]">
          <div
            className="grid min-h-[660px] lg:grid-cols-[52fr_48fr]"
            dir="ltr"
          >
            <div
              className="relative z-10 flex items-center bg-[#fbf8f1] px-8 py-16 text-center sm:px-12 lg:px-24 lg:text-right dark:bg-[linear-gradient(90deg,#020617_0%,#050b12_100%)]"
              dir="rtl"
            >
              <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_18%_18%,rgba(212,168,79,0.10),transparent_24rem)] dark:block" />

              <div className="relative mx-auto w-full max-w-[680px] lg:mx-0">
                <p className="gold-divider mb-7 justify-center text-sm font-extrabold tracking-[-0.01em] text-gold lg:justify-start">
                  {hero.eyebrow}
                </p>

                <h1 className="font-heading max-w-[680px] whitespace-pre-line text-5xl font-extrabold leading-[1.18] tracking-[-0.015em] text-[#162033] sm:text-6xl lg:text-[72px] dark:text-white">
                  {renderHighlightedTitle(hero.title)}
                </h1>

                <p className="mx-auto mt-7 max-w-[610px] text-base font-medium leading-9 tracking-[-0.01em] text-[#5b6474] sm:text-lg lg:mx-0 dark:text-white/72">
                  {hero.description}
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button
                    className="min-h-[52px] gap-3 rounded-2xl bg-[#d4a84f] px-9 text-[#1b1305] shadow-[0_12px_30px_rgba(212,168,79,0.25)] hover:bg-[#e0b85d]"
                    href={hero.primaryCtaHref}
                  >
                    {hero.primaryCtaLabel}
                    <ArrowIcon />
                  </Button>

                  <Button
                    className="min-h-[52px] gap-3 rounded-2xl border-[#d9cfbc] bg-[#fffdf8] px-9 text-[#162033] shadow-[0_10px_28px_rgba(22,32,51,0.04)] dark:border-gold/35 dark:bg-transparent dark:text-white"
                    href={hero.secondaryCtaHref}
                    variant="outline"
                  >
                    {hero.secondaryCtaLabel}
                    <ArrowIcon />
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="relative min-h-[360px] border-t border-[#e4dac7] bg-[#fbf8f1] lg:min-h-full lg:border-r lg:border-t-0 dark:border-[rgba(212,168,79,0.16)] dark:bg-[#020617]"
              aria-hidden="true"
            >
              <div className="hero-visual absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
