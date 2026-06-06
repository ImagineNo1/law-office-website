import { PageShell, Container } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { HeroSection } from "@/components/platform/home/HeroSection";
import { ServicesShowcase } from "@/components/platform/home/ServicesShowcase";
import { ContractPreview } from "@/components/platform/home/ContractPreview";
import { KnowledgePreview } from "@/components/platform/home/KnowledgePreview";
import { FinalCta } from "@/components/platform/home/FinalCta";
import { fallbackContracts, fallbackServices, type PlatformContract, type PlatformService } from "@/lib/platform-db";

export function HomeExperience({
  contracts = fallbackContracts,
  services = fallbackServices,
}: {
  contracts?: PlatformContract[];
  services?: PlatformService[];
}) {
  return (
    <PageShell>
      <PublicHeader />
      <HeroSection />
      <section id="services" className="bg-background py-24" dir="rtl">
        <Container>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              خدمات تخصصی
            </span>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">مسیرهای اصلی</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              از مشاوره تا تنظیم سند و امضای دیجیتال، تمام نیازهای حقوقی شما در یکجا
            </p>
          </div>
          <ServicesShowcase services={services} />
        </Container>
      </section>
      <ContractPreview contracts={contracts} />
      <KnowledgePreview />
      <FinalCta />
      <PublicFooter />
    </PageShell>
  );
}
