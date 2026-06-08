import { PageShell, Container } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { fallbackServices, type PlatformFaq, type PlatformService } from "@/lib/platform-db";
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
  const service = selectedService ?? services.find((item) => item.slug === detailSlug) ?? services[0];
  const isDetail = Boolean(detailSlug);

  if (!service) {
    return (
      <PageShell>
        <PublicHeader />
        <section className="py-12">
          <Container>
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.06)]">
              <h1 className="text-3xl font-black">خدمتی برای نمایش وجود ندارد</h1>
              <p className="mt-3 text-sm font-bold leading-7 text-[#66758A]">
                محتوای خدمات هنوز در پایگاه داده منتشر نشده است.
              </p>
              <a className="mt-6 inline-flex h-12 items-center rounded-xl bg-[#0B172A] px-6 text-sm font-black text-white" href="/admin/services">
                مدیریت خدمات
              </a>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {["ایجاد خدمت", "انتشار محتوا", "اتصال درخواست"].map((item) => (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm font-black" key={item}>{item}</div>
                ))}
              </div>
            </div>
          </Container>
        </section>
        <PublicFooter />
      </PageShell>
    );
  }

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
              <ServicesExplorer services={services} />
            </>
          )}
        </Container>
      </section>
      <PublicFooter />
    </PageShell>
  );
}
