import { PageShell } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { HeroSection } from "@/components/platform/home/HeroSection";
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
import {
  fallbackContracts,
  type PlatformArticle,
  type PlatformContract,
  type PlatformFaq,
} from "@/lib/platform-db";
import type { HomeContentData, SiteSettings } from "@/types";

export function HomeExperience({
  articles = [],
  contracts = fallbackContracts,
  faqs = [],
  home,
  settings,
}: {
  articles?: PlatformArticle[];
  contracts?: PlatformContract[];
  faqs?: PlatformFaq[];
  home: HomeContentData;
  settings: SiteSettings;
}) {
  return (
    <PageShell>
      <PublicHeader />
      <HeroSection settings={settings} />
      <HelpIntentSection />
      <DepartmentsSection />
      <ProcessTimeline steps={home.processSteps} />
      <ContractPreview contracts={contracts} />
      <LegalSupportSection
        cards={home.legalSupportCards}
        section={home.legalSupport}
      />
      <KnowledgeCenterSection articles={articles} />
      <FaqSection faqs={faqs} />
      <FinalCta content={home.finalCta} />
      <PublicFooter />
    </PageShell>
  );
}
