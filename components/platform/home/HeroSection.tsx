import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/platform/layout/PageShell";
import type { SiteSettings } from "@/types";

function ArrowLeft() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 12H5m6 7-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function HeroSection({ settings }: { settings: SiteSettings }) {
  const titleLines = (settings.siteDescription || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const [firstLine, secondLine, ...remainingLines] = titleLines.length
    ? titleLines
    : ["پلتفرم هوشمند", "خدمات حقوقی", "از مشاوره تا قرارداد", "و پیگیری پرونده"];

  return (
    <section
      className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(15,118,110,0.10),transparent_30%),linear-gradient(180deg,#ffffff_0%,#F8FAFC_100%)]"
      dir="rtl"
    >
      <Container className="max-w-[1540px] py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16 lg:[direction:ltr]">
          <div className="order-2 lg:order-none">
            <div className="relative mx-auto max-w-[700px]">
              <div className="absolute inset-5 rounded-[2.2rem] bg-emerald-700/10 blur-3xl" />
              <Image
                alt={`دفتر حقوقی مدرن و قرارداد روی میز برای خدمات ${settings.logoText}`}
                className="relative aspect-[1.28/1] w-full rounded-[2rem] border border-[#E2E8F0] object-cover shadow-[0_30px_90px_rgba(7,21,39,0.16)]"
                height={992}
                priority
                sizes="(min-width: 1024px) 48vw, 92vw"
                src="/home-legal-desk-hero.png"
                width={1586}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-l from-white/5 via-transparent to-white/35" />
            </div>
          </div>

          <div className="order-1 text-center lg:order-none lg:[direction:rtl] lg:text-right">
            <h1 className="text-4xl font-black leading-[1.45] tracking-[-0.03em] text-[#071527] sm:text-5xl lg:text-[58px] xl:text-[64px]">
              {firstLine}
              {secondLine ? (
                <>
                  <br />
                  <span className="text-[#0F766E]">{secondLine}</span>
                </>
              ) : null}
              {remainingLines.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-bold leading-9 text-[#64748B] sm:text-lg lg:mx-0">
              {settings.detailedDescription}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-[#0F766E] px-7 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,118,110,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0b625c]"
                href="/dashboard/requests?new=1"
              >
                ثبت درخواست حقوقی
                <ArrowLeft />
              </Link>
              <Link
                className="inline-flex min-h-14 items-center gap-3 rounded-2xl border border-[#0F766E]/25 bg-white px-7 text-sm font-black text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F766E]"
                href="/services"
              >
                مشاهده خدمات
                <ArrowLeft />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
