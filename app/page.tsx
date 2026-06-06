import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/site/HeroSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Badge,
  Container,
  IconBadge,
  Section,
  SectionHeading,
  TextLink,
} from "@/components/ui/Foundation";
import {
  getHomeContent,
  getPublishedServices,
  getSiteSettings,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "صفحه اصلی",
};

const fallbackServices = [
  ["مشاوره حقوقی", "مشاوره تخصصی در زمینه‌های مختلف حقوقی"],
  ["تنظیم قرارداد", "تنظیم انواع قراردادهای حقوقی و تجاری"],
  ["تنظیم دادخواست", "تنظیم انواع دادخواست‌های حقوقی"],
  ["تنظیم شکواییه", "تنظیم شکواییه در زمینه امور کیفری"],
  ["تنظیم اظهارنامه", "تنظیم انواع اظهارنامه‌های حقوقی"],
  ["پیگیری پرونده", "پیگیری و اطلاع‌رسانی از وضعیت پرونده‌های شما"],
];

const contracts = [
  "قرارداد مشارکت در ساخت",
  "قرارداد اجاره ملک",
  "قرارداد استخدام کارمند",
  "قرارداد خرید و فروش خودرو",
  "قرارداد شراکت",
  "قرارداد پیمانکاری",
];

const contractCategories = [
  "همه قراردادها",
  "قراردادهای ملکی",
  "قراردادهای استخدام",
  "قراردادهای شراکت",
  "قراردادهای خرید و فروش",
  "قراردادهای پیمانکاری",
];

const benefits = [
  ["پشتیبانی ۲۴ ساعته", "پاسخگویی هماهنگ"],
  ["مشاوره تلفنی رایگان", "پیش از ثبت درخواست"],
  ["وکلای متخصص", "تجربه در پرونده‌های حساس"],
  ["قیمت شفاف", "بدون هزینه پنهان"],
  ["امنیت اطلاعات", "حفظ محرمانگی شما"],
];

const knowledge = [
  ["مقالات حقوقی", "مقالات آموزشی و تحلیلی", "/blog"],
  ["آموزش تصویری", "راهنماهای ویدیویی", "/guides"],
  ["سوالات متداول", "پاسخ به پرسش‌های شما", "/faq"],
  ["اخبار حقوقی", "آخرین اخبار و قوانین", "/news"],
];

function LegalIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3v18M6 7h12M7 7l-4 8h8L7 7Zm10 0-4 8h8l-4-8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 3h7l4 4v14H7V3Zm7 0v5h4M9.5 12h5M9.5 16h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3 20 6v6.8c0 4.4-3.2 7.1-8 8.2-4.8-1.1-8-3.8-8-8.2V6l8-3Zm-3 9 2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default async function Home() {
  const [settings, homeContent, cmsServices] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
    getPublishedServices(6),
  ]);

  const services =
    cmsServices.length > 0
      ? cmsServices.map((service) => [service.title, service.excerpt])
      : fallbackServices;

  return (
    <main className="bg-background">
      <SiteHeader settings={settings} />
      <HeroSection
        hero={homeContent.hero}
        stats={homeContent.stats}
        trustFeatures={homeContent.trustFeatures}
      />

      <Section className="bg-soft-gray">
        <Container>
          <SectionHeading
            eyebrow="خدمات حقوقی"
            title="مسیرهای اصلی برای حل دقیق مسائل حقوقی"
            description="خدمات پرتقاضا با ساختار روشن، پیگیری منظم و خروجی قابل استفاده برای افراد و کسب‌وکارها."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, description]) => (
              <Card
                className="group min-h-64 rounded-[8px] bg-white p-7 transition hover:-translate-y-1 hover:border-gold/45 hover:shadow-soft"
                key={title}
              >
                <IconBadge>
                  <LegalIcon />
                </IconBadge>
                <h3 className="mt-6 text-xl font-black text-foreground">{title}</h3>
                <p className="mt-3 min-h-16 leading-8 text-muted">{description}</p>
                <TextLink className="mt-5" href="/services">
                  بیشتر بدانید
                </TextLink>
              </Card>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Button href="/services" variant="secondary" className="px-8">
              مشاهده همه خدمات
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="rounded-[8px] bg-navy p-6 text-white shadow-soft">
            <Badge className="border-white/20 bg-white/10 text-gold">مشاوره حقوقی</Badge>
            <h2 className="mt-5 text-2xl font-black leading-9">
              درخواست مشاوره را در چند مرحله ثبت کنید
            </h2>
            <div className="mt-7 grid gap-4">
              {["وکیل متخصص و مجرب", "پیگیری سریع و دقیق", "حفظ محرمانگی اطلاعات", "راهکارهای عملی و کاربردی"].map(
                (item) => (
                  <div className="flex items-center gap-3 text-sm font-bold text-white/82" key={item}>
                    <span className="grid size-8 place-items-center rounded-full border border-gold/35 text-gold">
                      <TrustIcon />
                    </span>
                    {item}
                  </div>
                ),
              )}
            </div>
            <div className="legal-photo mt-7 min-h-48 rounded-[8px] border border-white/10" />
          </aside>

          <Card className="rounded-[8px] bg-white p-6 sm:p-8">
            <SectionHeading align="start" title="درخواست مشاوره حقوقی" />
            <form className="grid gap-5" action="#">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-foreground">
                  نام و نام خانوادگی
                  <input className="h-11 rounded-xl border border-border bg-white px-3 outline-none focus:border-gold" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-foreground">
                  شماره تماس
                  <input className="h-11 rounded-xl border border-border bg-white px-3 outline-none focus:border-gold" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-foreground">
                  خدمت مورد نظر
                  <select className="h-11 rounded-xl border border-border bg-white px-3 outline-none focus:border-gold">
                    <option>انتخاب کنید</option>
                    <option>مشاوره حقوقی</option>
                    <option>تنظیم قرارداد</option>
                    <option>پیگیری پرونده</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-foreground">
                  موضوع درخواست
                  <input className="h-11 rounded-xl border border-border bg-white px-3 outline-none focus:border-gold" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold text-foreground">
                توضیحات
                <textarea className="min-h-28 rounded-xl border border-border bg-white p-3 outline-none focus:border-gold" />
              </label>
              <Button type="submit" className="w-full sm:w-44">
                ارسال درخواست
              </Button>
            </form>
          </Card>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="بانک قراردادها"
            title="نمونه قراردادهای پرکاربرد برای شروع مطمئن"
            description="پیش‌نمایشی از بانک قراردادها، با دسته‌بندی روشن و مسیر planned برای توسعه فازهای بعدی."
          />
          <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
            <aside className="rounded-[8px] border border-border bg-soft-gray p-4">
              <input
                aria-label="جستجوی قرارداد"
                className="mb-4 h-11 w-full rounded-xl border border-border bg-white px-3 outline-none focus:border-gold"
                placeholder="جستجوی قرارداد..."
              />
              <div className="grid gap-2">
                {contractCategories.map((category, index) => (
                  <Link
                    className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                      index === 0
                        ? "bg-white text-gold shadow-card"
                        : "text-muted hover:bg-white hover:text-gold"
                    }`}
                    href="/contracts"
                    key={category}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </aside>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {contracts.map((contract) => (
                <Card className="rounded-[8px] bg-white p-6 transition hover:-translate-y-1 hover:border-gold/45" key={contract}>
                  <IconBadge>
                    <FileIcon />
                  </IconBadge>
                  <h3 className="mt-5 text-lg font-black text-foreground">{contract}</h3>
                  <p className="mt-3 leading-7 text-muted">
                    نسخه قابل بررسی برای تنظیم دقیق با شرایط هر پرونده.
                  </p>
                  <TextLink className="mt-5" href="/contracts">
                    مشاهده جزئیات
                  </TextLink>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Container>
        <div className="-mb-8 grid overflow-hidden rounded-[8px] border border-border bg-white shadow-card md:grid-cols-5">
          {benefits.map(([title, description]) => (
            <div className="flex min-h-32 items-center gap-4 border-border p-5 md:border-l last:md:border-l-0" key={title}>
              <IconBadge className="size-12 rounded-full shadow-none">
                <TrustIcon />
              </IconBadge>
              <div>
                <h3 className="font-black text-foreground">{title}</h3>
                <p className="mt-1 text-sm font-bold text-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Section className="bg-navy pt-24 text-white">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {knowledge.map(([title, description, href]) => (
              <a
                className="group rounded-[8px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-gold/40 hover:bg-white/8"
                href={href}
                key={title}
              >
                <IconBadge className="bg-gold/10">
                  <FileIcon />
                </IconBadge>
                <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                <p className="mt-2 text-sm font-bold text-white/70">{description}</p>
              </a>
            ))}
          </div>

          <div className="mt-16 rounded-[8px] border border-gold/25 bg-[#0f1d35] p-8 text-center shadow-soft sm:p-12">
            <h2 className="text-balance text-3xl font-black leading-[1.35] text-white sm:text-4xl">
              برای شروع، درخواست مشاوره خود را ثبت کنید
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/72">
              اطلاعات اولیه شما بررسی می‌شود و مسیر مناسب برای قرارداد، دعوا یا پیگیری پرونده پیشنهاد خواهد شد.
            </p>
            <Button href="/contact" className="mt-7 px-9">
              درخواست مشاوره
            </Button>
          </div>
        </Container>
      </Section>

      <SiteFooter settings={settings} />
    </main>
  );
}
