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
    <PageShell dark>
      <PublicHeader />
      <HeroSection />
      <section className="bg-[#F7F3EA] py-10 text-[#0B172A]">
        <Container className="grid gap-6 xl:grid-cols-[310px_1fr]">
          <PrimaryPathways />
          <ServicesShowcase services={services} />
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
