import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";
import {
  PublicPageHero,
  PublicShell,
} from "@/components/platform/layout/PublicShell";
import {
  fallbackServices,
  type PlatformFaq,
  type PlatformService,
} from "@/lib/platform-db";
import { ServiceHero } from "@/components/platform/services/ServiceHero";
import { ServicesExplorer } from "@/components/platform/services/ServicesExplorer";
import { ServiceDetailPanels } from "@/components/platform/services/ServiceDetailPanels";
import { ServiceRequestPanel } from "@/components/platform/services/ServiceRequestPanel";
import { ServiceFaq } from "@/components/platform/services/ServiceFaq";

export function ServicesExperience({
  detailSlug,
  faqs,
  service: selectedService,
  services = fallbackServices,
}: {
  detailSlug?: string;
  faqs?: PlatformFaq[];
  service?: PlatformService | null;
  services?: PlatformService[];
}) {
  const service =
    selectedService ??
    services.find((item) => item.slug === detailSlug) ??
    services[0];
  const isDetail = Boolean(detailSlug);

  if (!service) {
    return (
      <PublicShell>
        <section className="py-12">
          <Container>
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.06)]">
              <h1 className="text-3xl font-black">
                خدمتی برای نمایش وجود ندارد
              </h1>
              <p className="mt-3 text-sm font-bold leading-7 text-[#66758A]">
                محتوای خدمات هنوز در پایگاه داده منتشر نشده است.
              </p>
              <Link
                className="mt-6 inline-flex h-12 items-center rounded-xl bg-[#0B172A] px-6 text-sm font-black text-white"
                href="/dashboard/requests?new=1"
              >
                ثبت درخواست حقوقی
              </Link>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {["مشاوره اولیه", "بررسی مدارک", "پیگیری در داشبورد"].map(
                  (item) => (
                    <div
                      className="rounded-2xl bg-slate-50 p-4 text-sm font-black"
                      key={item}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </Container>
        </section>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      {isDetail ? (
        <ServiceHero
          detail
          title={service.title}
          description={service.heroDescription || service.description}
        />
      ) : (
        <PublicPageHero
          description="خدمت مناسب را پیدا کنید، جزئیات مدارک و مراحل را ببینید و درخواست حقوقی خود را با مسیر پیگیری روشن ثبت کنید."
          eyebrow="خدمات حقوقی"
          title="خدمات حقوقی تخصصی"
        />
      )}
      <section className="py-8">
        <Container
          className={
            isDetail
              ? "grid gap-6 lg:grid-cols-[1fr_360px]"
              : "grid gap-6 lg:grid-cols-[300px_1fr]"
          }
        >
          {isDetail ? (
            <>
              <ServiceRequestPanel />
              <div className="grid gap-6">
                <ServiceDetailPanels
                  benefits={service.benefits}
                  requiredDocuments={service.requiredDocuments}
                  steps={service.processSteps}
                  title={service.title}
                />
                <ServiceFaq
                  faqs={
                    faqs ??
                    service.faqItems.map((item, index) => ({
                      id: `service-faq-${index}`,
                      category: service.category,
                      pageType: "service",
                      pageSlug: service.slug,
                      ...item,
                    }))
                  }
                />
              </div>
            </>
          ) : (
            <>
              <ServicesExplorer services={services} />
            </>
          )}
        </Container>
      </section>
    </PublicShell>
  );
}
