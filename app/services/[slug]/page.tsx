import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceInfoCards } from "@/components/services/ServiceInfoCards";
import { ServiceRequestForm } from "@/components/services/ServiceRequestForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Container } from "@/components/ui/Foundation";
import {
  getPublishedServices,
  getServiceBySlug,
  getSiteSettings,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return {
    title: service?.title ?? "جزئیات خدمت",
    description: service?.heroDescription ?? service?.excerpt,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, service, services] = await Promise.all([
    getSiteSettings(),
    getServiceBySlug(slug),
    getPublishedServices(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader settings={settings} />
      <div className="bg-[#061122] px-4 pb-5 pt-4 text-center">
        <span className="inline-flex min-w-[280px] justify-center rounded-b-[8px] bg-navy px-8 py-3 text-xl font-black text-white shadow-soft">
          صفحه جزئیات خدمت
        </span>
      </div>

      <section className="py-6 sm:py-8">
        <Container>
          <div className="grid gap-5 xl:grid-cols-[1fr_420px]" dir="ltr">
            <div className="grid min-w-0 gap-5" dir="rtl">
              <ServiceHero service={service} />
              <ServiceInfoCards service={service} />
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <ServiceFaq items={service.faqItems ?? []} />
                <ServiceBenefits service={service} />
              </div>
            </div>

            <div dir="rtl">
              <ServiceRequestForm service={service} services={services} />
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter settings={settings} />
    </main>
  );
}
