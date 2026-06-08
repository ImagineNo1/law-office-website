import { PageShell, Container } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { HeroSection } from "@/components/platform/home/HeroSection";
import { ServicesShowcase } from "@/components/platform/home/ServicesShowcase";
import { ContractPreview } from "@/components/platform/home/ContractPreview";
import { FinalCta } from "@/components/platform/home/FinalCta";
import {
  DepartmentsSection,
  FaqSection,
  HelpIntentSection,
  KnowledgeCenterSection,
  LegalSupportSection,
  ProcessTimeline,
} from "@/components/platform/home/HomeSections";
import { fallbackContracts, fallbackServices, type PlatformArticle, type PlatformContract, type PlatformFaq, type PlatformService } from "@/lib/platform-db";

export function HomeExperience({
  articles = [],
  contracts = fallbackContracts,
  faqs = [],
  services = fallbackServices,
}: {
  articles?: PlatformArticle[];
  contracts?: PlatformContract[];
  faqs?: PlatformFaq[];
  services?: PlatformService[];
}) {
  return (
    <PageShell>
      <PublicHeader />
      <HeroSection />
      <HelpIntentSection />
      <DepartmentsSection />
      <ProcessTimeline />
      <section id="services" className="bg-[#F8FAFC] py-16" dir="rtl">
        <Container>
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-black text-[#0F766E]">
              خدمات تخصصی
            </span>
            <h2 className="text-3xl font-black text-[#071527]">مسیرهای اصلی خدمات حقوقی</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-8 text-[#64748B]">
              از مشاوره تا تنظیم سند، پیگیری پرونده و آماده‌سازی خروجی قابل امضا در یک تجربه یکپارچه.
            </p>
          </div>
          <ServicesShowcase services={services} />
        </Container>
      </section>
      <ContractPreview contracts={contracts} />
      <LegalSupportSection />
      <KnowledgeCenterSection articles={articles} />
      <FaqSection faqs={faqs} />
      <FinalCta />
      <PublicFooter />
    </PageShell>
  );
}
