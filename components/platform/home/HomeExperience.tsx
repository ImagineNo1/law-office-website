import { PageShell, Container } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { HeroSection } from "@/components/platform/home/HeroSection";
import { PrimaryPathways } from "@/components/platform/home/PrimaryPathways";
import { ServicesShowcase } from "@/components/platform/home/ServicesShowcase";
import { ContractPreview } from "@/components/platform/home/ContractPreview";
import { KnowledgePreview } from "@/components/platform/home/KnowledgePreview";
import { TrustStrip } from "@/components/platform/home/TrustStrip";
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
      <section id="services" className="bg-white py-20 text-slate-950">
        <Container>
          <div className="mb-12 text-center">
            <span className="rounded-full border border-[#C9973F]/20 bg-[#C9973F]/10 px-4 py-1.5 text-xs font-black text-[#A87522]">خدمات تخصصی</span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">مسیرهای اصلی خدمات حقوقی</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-7 text-slate-500">
              از مشاوره تا تنظیم سند و امضای دیجیتال، تمام نیازهای حقوقی شما در یکجا.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <PrimaryPathways />
            <ServicesShowcase services={services} />
          </div>
        </Container>
      </section>
      <ContractPreview contracts={contracts} />
      <KnowledgePreview />
      <TrustStrip />
      <FinalCta />
      <PublicFooter />
    </PageShell>
  );
}
