import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";
import {
  PublicPageHero,
  PublicShell,
} from "@/components/platform/layout/PublicShell";
import {
  getHomeContent,
  getPageContent,
  getPublishedServices,
} from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/institute");
  return buildMetadata({
    path: "/institute",
    seo: page?.seo,
    title: page?.title ?? "معرفی موسسه",
  });
}

export default async function InstitutePage() {
  const [homeContent, page, services] = await Promise.all([
    getHomeContent(),
    getPageContent("institute"),
    getPublishedServices(6),
  ]);
  const hasCleanContent =
    page?.content && !/تست|test|lorem|placeholder/i.test(page.content);

  return (
    <PublicShell>
      <PublicPageHero
        actions={
          <>
            <Link
              className="inline-flex h-12 items-center rounded-xl bg-[#0B172A] px-6 text-sm font-black text-white"
              href="/contact"
            >
              تماس با موسسه
            </Link>
            <Link
              className="inline-flex h-12 items-center rounded-xl border border-accent px-6 text-sm font-black text-[#0B172A]"
              href="/dashboard/requests?new=1"
            >
              درخواست مشاوره
            </Link>
          </>
        }
        description="عدالت‌گستر با تمرکز بر مشاوره، تنظیم قرارداد، مستندسازی و پیگیری حقوقی، تجربه‌ای منظم و قابل پیگیری برای موکلان فراهم می‌کند."
        eyebrow="معرفی موسسه"
        title={
          page?.title && !/تست|test|lorem|placeholder/i.test(page.title)
            ? page.title
            : "موسسه حقوقی عدالت‌گستر"
        }
      />
      <section className="py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.05)]">
              <h2 className="text-2xl font-black text-[#0B172A]">
                ماموریت موسسه
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm font-bold leading-8 text-slate-600">
                {hasCleanContent
                  ? page.content
                  : "ماموریت موسسه، ارائه راهکار حقوقی قابل اجرا برای افراد و کسب‌وکارهاست؛ از تحلیل اولیه موضوع تا تنظیم سند، مذاکره، ثبت درخواست و پیگیری مرحله به مرحله."}
              </p>
            </article>
            <aside className="rounded-2xl bg-[#0B172A] p-6 text-white">
              <h2 className="text-2xl font-black text-[#D4A64A]">
                {page?.subtitle && !/تست|test/i.test(page.subtitle)
                  ? page.subtitle
                  : "فرآیند همکاری"}
              </h2>
              <div className="mt-5 grid gap-3">
                {[
                  "دریافت شرح موضوع",
                  "بررسی مدارک",
                  "ارائه مسیر حقوقی",
                  "پیگیری و تحویل نتیجه",
                ].map((item, index) => (
                  <div
                    className="flex items-center gap-3 rounded-xl bg-white/10 p-3"
                    key={item}
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-[#D4A64A] text-xs font-black text-[#0B172A]">
                      {new Intl.NumberFormat("fa-IR").format(index + 1)}
                    </span>
                    <span className="text-sm font-black">{item}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeContent.stats.map((stat) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.05)]"
                key={stat.label}
              >
                <strong className="block text-2xl text-accent">
                  {stat.value}
                </strong>
                <span className="mt-2 block text-sm font-bold text-slate-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-black text-[#0B172A]">
              حوزه‌های تخصصی
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.length ? (
                services.map((service) => (
                  <Link
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.05)] transition hover:-translate-y-1 hover:border-accent"
                    href={`/services/${service.slug}`}
                    key={service.slug}
                  >
                    <h3 className="font-black text-[#0B172A]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm font-bold leading-7 text-slate-600">
                      {service.excerpt}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm font-bold text-slate-600 md:col-span-2 lg:col-span-3">
                  حوزه تخصصی منتشرشده‌ای برای نمایش وجود ندارد.
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PublicShell>
  );
}
