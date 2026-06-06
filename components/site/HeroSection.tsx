import { Button } from "@/components/ui/Button";
import { Container, StatCard } from "@/components/ui/Foundation";
import type { HeroContent, SiteStat, TrustFeature } from "@/types";

const defaultStats = [
  { value: "۱۵+", label: "سال تجربه" },
  { value: "۹۸٪", label: "موفقیت در پرونده‌ها" },
  { value: "۲۴ ساعته", label: "پشتیبانی و پاسخگویی" },
  { value: "۱۰۰۰+", label: "مشتریان رضایت‌مند" },
];

function ScaleIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 4v16M7 8h10M8 8l-3 7h6L8 8Zm8 0-3 7h6l-3-7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

const statIcons = [<ScaleIcon key="a" />, <ScaleIcon key="b" />, <ClockIcon key="c" />, <ScaleIcon key="d" />];

export function HeroSection({
  hero,
}: {
  hero: HeroContent;
  stats: SiteStat[];
  trustFeatures: TrustFeature[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy pb-20 pt-6 text-white sm:pb-24 lg:pb-28">
      <div className="legal-hero-ornament absolute inset-0 opacity-70" aria-hidden="true" />
      <Container className="relative">
        <div className="legal-hero-visual relative min-h-[620px] overflow-hidden rounded-[8px] border border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,42,0.12),rgba(11,23,42,0.72)_40%,rgba(11,23,42,0.96)_72%)]" />
          <div className="relative grid min-h-[620px] items-center px-6 py-16 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-16">
            <div className="hidden lg:block" />
            <div className="max-w-2xl text-right">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-14 bg-gold" />
                <span className="text-sm font-black text-gold">
                  خدمات حقوقی، قراردادها و پیگیری پرونده
                </span>
              </div>
              <h1 className="text-balance text-4xl font-black leading-[1.35] text-white sm:text-5xl lg:text-6xl">
                راهکارهای حقوقی هوشمند برای مسائل پیچیده شما
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base font-bold leading-9 text-white/78 sm:text-lg">
                ارائه خدمات تخصصی حقوقی در زمینه قراردادها، دعاوی، مشاوره و پیگیری
                پرونده‌ها با تیمی از وکلای مجرب
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={hero.primaryCtaHref || "/contact"} className="min-h-12 px-7">
                  درخواست مشاوره
                </Button>
                <Button
                  href={hero.secondaryCtaHref || "/services"}
                  variant="outline"
                  className="min-h-12 border-white/35 bg-transparent px-7 text-white hover:border-gold hover:text-gold"
                >
                  مشاهده خدمات
                </Button>
              </div>
              <div className="mt-9 flex gap-2">
                {[0, 1, 2, 3, 4].map((item) => (
                  <span
                    className={`size-2.5 rounded-full ${item === 0 ? "bg-white" : "bg-white/25"}`}
                    key={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-12 grid max-w-6xl overflow-hidden rounded-[8px] border border-border bg-white shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {defaultStats.map((stat, index) => (
            <StatCard
              icon={statIcons[index] ?? statIcons[0]}
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
