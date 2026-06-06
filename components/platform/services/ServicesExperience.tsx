import { PageShell, Container } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { recoveryServices } from "@/lib/platform-recovery-data";
import { ServiceHero } from "@/components/platform/services/ServiceHero";
import { ServiceFilters } from "@/components/platform/services/ServiceFilters";
import { ServiceCard } from "@/components/platform/services/ServiceCard";
import { ServiceDetailPanels } from "@/components/platform/services/ServiceDetailPanels";
import { ServiceRequestPanel } from "@/components/platform/services/ServiceRequestPanel";
import { ServiceFaq } from "@/components/platform/services/ServiceFaq";

export function ServicesExperience({ detailSlug }: { detailSlug?: string }) {
  const service = recoveryServices.find((item) => item[1] === detailSlug) ?? recoveryServices[0];
  const isDetail = Boolean(detailSlug);

  return (
    <PageShell>
      <PublicHeader />
      <ServiceHero
        detail={isDetail}
        title={isDetail ? service[0] : "خدمات حقوقی تخصصی"}
        description={
          isDetail
            ? service[2]
            : "انتخاب، ثبت درخواست، بارگذاری مدارک و پیگیری مرحله‌ای خدمات حقوقی در یک تجربه SaaS فارسی."
        }
      />
      <section className="py-8">
        <Container className={isDetail ? "grid gap-6 lg:grid-cols-[1fr_360px]" : "grid gap-6 lg:grid-cols-[300px_1fr]"}>
          {isDetail ? (
            <>
              <ServiceRequestPanel />
              <div className="grid gap-6">
                <ServiceDetailPanels title={service[0]} />
                <ServiceFaq />
              </div>
            </>
          ) : (
            <>
              <ServiceFilters />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recoveryServices.map(([title, slug, desc, tag, sla]) => (
                  <ServiceCard desc={desc} key={slug} sla={sla} slug={slug} tag={tag} title={title} />
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
