import type { Metadata } from "next";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getHomeContent, getPageContent, getPublishedServices, getSiteSettings } from "@/lib/cms";
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
  const [settings, homeContent, page, services] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
    getPageContent("institute"),
    getPublishedServices(6),
  ]);

  return (
    <main>
      <SiteHeader settings={settings} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-surface-strong p-8 shadow-soft lg:p-10">
          <p className="text-sm font-bold text-gold">معرفی موسسه</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.35] text-foreground">
            {page?.title ?? "تجربه حقوقی در کنار رویکرد مدیریتی مدرن"}
          </h1>
          <p className="mt-6 max-w-4xl whitespace-pre-line leading-9 text-muted">
            {page?.content ??
              "عدالت گستر برای پرونده هایی طراحی شده که به تحلیل دقیق، مستندسازی منظم و تصمیم گیری مرحله ای نیاز دارند."}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {homeContent.stats.map((stat) => (
              <div className="rounded-2xl border border-border bg-surface p-4" key={stat.label}>
                <strong className="block text-2xl text-gold">{stat.value}</strong>
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}
