import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { HeroContent, SiteStat, TrustFeature } from "@/types";

function renderHighlightedTitle(title: string, mode: "light" | "dark") {
  const target = "موفقیت شما";
  const normalizedTitle = title.replace(" برای آرامش", "\nبرای آرامش");
  const highlightClass = mode === "dark" ? "text-[#d4a84f]" : "text-[#c9a24a]";

  if (!normalizedTitle.includes(target)) {
    return normalizedTitle;
  }

  const [before, after] = normalizedTitle.split(target);

  return (
    <>
      {before}
      <span className={highlightClass}>{target}</span>
      {after}
    </>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
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

function HeroCopy({ hero, mode }: { hero: HeroContent; mode: "light" | "dark" }) {
  const isDark = mode === "dark";

  return (
    <div className="relative z-10 mx-auto w-full max-w-[640px] text-center lg:mx-0 lg:text-right">
      <p className={`gold-divider mb-5 justify-center text-sm font-extrabold tracking-[-0.01em] lg:justify-start ${isDark ? "text-[#d4a84f]" : "text-[#c9a24a]"}`}>
        {hero.eyebrow}
      </p>

      <h1 className={`font-heading whitespace-pre-line text-[clamp(44px,4.2vw,72px)] font-black leading-[1.18] tracking-[-0.015em] ${isDark ? "text-white" : "text-[#0f172a]"}`}>
        {renderHighlightedTitle(hero.title, mode)}
      </h1>

      <p className={`mx-auto mt-6 max-w-[600px] text-base font-medium leading-8 tracking-[-0.01em] lg:mx-0 ${isDark ? "text-white/72" : "text-[#64748b]"}`}>
        {hero.description}
      </p>

      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
        <Button
          className={`min-h-[52px] gap-3 rounded-2xl px-8 shadow-[0_12px_30px_rgba(201,162,74,0.24)] ${isDark ? "bg-[#d4a84f] text-[#111827] hover:bg-[#e0b85d]" : "bg-[#c9a24a] text-[#111827] hover:bg-[#d8b45c]"}`}
          href={hero.primaryCtaHref}
        >
          {hero.primaryCtaLabel}
          <ArrowIcon />
        </Button>

        <Button
          className={`min-h-[52px] gap-3 rounded-2xl px-8 shadow-none ${isDark ? "border-[#d4a84f]/45 bg-transparent text-white hover:border-[#d4a84f]" : "border-[#d6c8a2] bg-transparent text-[#0f172a] hover:border-[#c9a24a]"}`}
          href={hero.secondaryCtaHref}
          variant="outline"
        >
          {hero.secondaryCtaLabel}
          <ArrowIcon />
        </Button>
      </div>
    </div>
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
    <>
      <section className="block bg-[#f8f5ef] dark:hidden">
        <div className="mx-auto max-w-[1720px] px-4 py-4">
          <div className="grid min-h-[460px] overflow-hidden rounded-[32px] border border-[#ece6d8] bg-[#fbf7ef] shadow-[0_30px_80px_rgba(15,23,42,0.06)] lg:grid-cols-[50fr_50fr]" dir="ltr">
            <div className="relative flex items-center overflow-hidden bg-[#fbf7ef] px-8 py-12 text-center sm:px-10 lg:px-20 lg:text-right" dir="rtl">
              <div className="absolute left-[-80px] top-8 size-64 rounded-full border border-[#c9a24a]/15" aria-hidden="true" />
              <div className="absolute bottom-8 left-8 h-20 w-28 bg-[radial-gradient(#c9a24a_1.3px,transparent_1.3px)] bg-[length:18px_18px] opacity-50" aria-hidden="true" />
              <HeroCopy hero={hero} mode="light" />
            </div>

            <div className="relative min-h-[360px] overflow-hidden border-t border-[#ece6d8] lg:border-r lg:border-t-0" aria-hidden="true">
              <Image
                alt=""
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 860px, 100vw"
                src="/legal-scene-light-final.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hidden bg-[#030609] dark:block">
        <div className="mx-auto max-w-[1720px] px-1 py-1">
          <div className="hero-dark-banner relative min-h-[460px] overflow-hidden rounded-[32px] bg-cover bg-center">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,9,0.96),rgba(3,6,9,0.72),rgba(3,6,9,0.08))]" />
            <div className="relative z-10 flex min-h-[460px] items-center px-8 py-12 text-center sm:px-10 lg:px-24 lg:text-right" dir="rtl">
              <HeroCopy hero={hero} mode="dark" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
