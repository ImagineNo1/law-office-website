import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCardGrid } from "@/components/services/ServiceCardGrid";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Container } from "@/components/ui/Foundation";
import { getPublishedServices, getSiteSettings } from "@/lib/cms";
import { serviceCategories } from "@/lib/service-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "خدمات حقوقی",
};

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader settings={settings} />
      <div className="bg-[#061122] px-4 pb-5 pt-4 text-center">
        <span className="inline-flex min-w-[280px] justify-center rounded-b-[8px] bg-navy px-8 py-3 text-xl font-black text-white shadow-soft">
          صفحه همه خدمات
        </span>
      </div>

      <section className="py-6 sm:py-8">
        <Container>
          <div className="rounded-[8px] border border-border bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <nav className="mb-4 text-xs font-black text-muted">
                  <Link className="hover:text-gold" href="/">
                    خانه
                  </Link>
                  <span className="px-2 text-gold">‹</span>
                  <span>خدمات حقوقی</span>
                </nav>
                <h1 className="text-3xl font-black text-navy sm:text-4xl">
                  خدمات حقوقی تخصصی
                </h1>
                <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-muted">
                  دسته‌بندی خدمات، جستجو و انتخاب مسیر مناسب برای مشاوره، تنظیم متن حقوقی و پیگیری پرونده.
                </p>
              </div>
            </div>

            <ServiceCardGrid categories={serviceCategories} services={services} />
          </div>
        </Container>
      </section>

      <SiteFooter settings={settings} />
    </main>
  );
}
