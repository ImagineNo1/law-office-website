import { PageShell, Container } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { fallbackServices, type PlatformFaq, type PlatformService } from "@/lib/platform-db";
import { ServiceHero } from "@/components/platform/services/ServiceHero";
import { ServiceFilters } from "@/components/platform/services/ServiceFilters";
import { ServiceCard } from "@/components/platform/services/ServiceCard";
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
  const service = selectedService ?? services.find((item) => item.slug === detailSlug) ?? services[0];
  const isDetail = Boolean(detailSlug);

  return (
    <PageShell>
      <PublicHeader />
      <ServiceHero
        detail={isDetail}
        title={isDetail ? service.title : "خدمات حقوقی تخصصی"}
        description={
          isDetail
            ? service.heroDescription || service.description
            : "انتخاب، ثبت درخواست، بارگذاری مدارک و پیگیری مرحله ای خدمات حقوقی در یک تجربه SaaS فارسی."
        }
      />
      <section className="py-8">
        <Container className={isDetail ? "grid gap-6 lg:grid-cols-[1fr_360px]" : "grid gap-6 lg:grid-cols-[300px_1fr]"}>
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
              <ServiceFilters />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services.map((item) => (
                  <ServiceCard
                    desc={item.description}
                    key={item.slug}
                    sla={item.sla}
                    slug={item.slug}
                    tag={item.tag}
                    title={item.title}
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
      <PublicFooter />
    </PageShell>
  );
}
