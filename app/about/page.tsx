import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";
import { PublicPageHero, PublicShell } from "@/components/platform/layout/PublicShell";
import { getPageContent } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/about");
  return buildMetadata({
    path: "/about",
    seo: page?.seo,
    title: page?.title ?? "درباره ما",
  });
}

export default async function AboutPage() {
  const page = await getPageContent("about");
  const hasCleanContent = page?.content && !/تست|test|lorem|placeholder/i.test(page.content);
  const values = [
    ["شفافیت در روند پیگیری", "هر درخواست مسیر، وضعیت و پیام‌های قابل پیگیری دارد."],
    ["محرمانگی اطلاعات", "اطلاعات هویتی، اسناد و مکاتبات با نگاه حقوقی و محرمانه مدیریت می‌شود."],
    ["دسترسی ساده به خدمات حقوقی", "کاربر بدون درگیری با اصطلاحات پیچیده، خدمت مناسب را انتخاب و ثبت می‌کند."],
    ["تجربه دیجیتال قراردادها", "بانک قرارداد، فرم‌ها و درخواست‌ها در یک جریان منظم کنار هم قرار گرفته‌اند."],
  ];

  return (
    <PublicShell>
      <PublicPageHero
        actions={<><Link className="inline-flex h-12 items-center rounded-xl bg-[#0B172A] px-6 text-sm font-black text-white" href="/requests/new">ثبت درخواست حقوقی</Link><Link className="inline-flex h-12 items-center rounded-xl border border-accent px-6 text-sm font-black text-[#0B172A]" href="/services">مشاهده خدمات</Link></>}
        description="وکیل‌یار برای ساده‌سازی دسترسی به خدمات حقوقی، قراردادها، فرم‌های حقوقی، ثبت درخواست و پیگیری اسناد طراحی شده است."
        eyebrow="درباره وکیل‌یار"
        title={page?.title && !/تست|test|lorem|placeholder/i.test(page.title) ? page.title : "درباره وکیل‌یار"}
      />
      <section className="py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.05)]">
              <h2 className="text-2xl font-black text-[#0B172A]">پلتفرم حقوقی برای کار روزمره موکل و تیم حقوقی</h2>
              <p className="mt-4 whitespace-pre-line text-sm font-bold leading-8 text-slate-600">
                {hasCleanContent
                  ? page.content
                  : "در وکیل‌یار، خدمات حقوقی، بانک قرارداد، فرم‌های حقوقی و مسیر پیگیری درخواست‌ها در یک تجربه منسجم کنار هم قرار گرفته‌اند. هدف این است که کاربر بداند از کجا شروع کند، چه مدارکی لازم دارد و وضعیت درخواست او در هر مرحله چیست."}
              </p>
            </div>
            <div className="rounded-2xl bg-[#0B172A] p-6 text-white shadow-[0_18px_45px_rgba(11,23,42,.12)]">
              <h2 className="text-2xl font-black text-[#D4A64A]">{page?.subtitle && !/تست|test/i.test(page.subtitle) ? page.subtitle : "تمرکز ما"}</h2>
              <p className="mt-4 text-sm font-bold leading-8 text-slate-200">
                تبدیل موضوعات حقوقی پیچیده به مسیرهای قابل فهم، قابل پیگیری و قابل اقدام.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {values.map(([title, text]) => (
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.05)]" key={title}>
                <h3 className="font-black text-[#0B172A]">{title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/10 p-6">
            <h2 className="text-2xl font-black text-[#0B172A]">آماده شروع هستید؟</h2>
            <p className="mt-3 text-sm font-bold leading-8 text-slate-600">برای انتخاب خدمت مناسب، از صفحه خدمات شروع کنید یا درخواست حقوقی خود را ثبت کنید.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="inline-flex h-12 items-center rounded-xl bg-[#0B172A] px-6 text-sm font-black text-white" href="/requests/new">ثبت درخواست حقوقی</Link>
              <Link className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-[#0B172A]" href="/services">مشاهده خدمات</Link>
            </div>
          </div>
        </Container>
      </section>
    </PublicShell>
  );
}
