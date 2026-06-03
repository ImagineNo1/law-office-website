import type { Metadata } from "next";
import { ContactCta } from "@/components/site/ContactCta";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getHomeContent, getPublishedServices, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "خدمات حقوقی",
};

export default async function ServicesPage() {
  const [settings, homeContent, services] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
    getPublishedServices(),
  ]);

  return (
    <main>
      <SiteHeader settings={settings} />
      <section className="container-shell py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold text-gold">خدمات حقوقی</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.35] text-foreground sm:text-5xl">
            راهکارهای تخصصی برای هر مرحله از پرونده
          </h1>
          <p className="mt-5 leading-9 text-muted">
            خدمات موسسه برای افراد، خانواده ها، مدیران و شرکت ها طراحی شده و
            از مشاوره اولیه تا پیگیری اجرایی پرونده را پوشش می دهد.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <ContactCta cta={homeContent.contactCta} />
      <SiteFooter settings={settings} />
    </main>
  );
}
