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
  LatestMediaSection,
  LegalSupportSection,
  ProcessTimeline,
} from "@/components/platform/home/HomeSections";
import {
  fallbackContracts,
  type PlatformArticle,
  type PlatformContract,
  type PlatformFaq,
} from "@/lib/platform-db";

export function HomeExperience({
  articles = [],
  contracts = fallbackContracts,
  faqs = [],
  news = [],
}: {
  articles?: PlatformArticle[];
  contracts?: PlatformContract[];
  faqs?: PlatformFaq[];
  news?: PlatformArticle[];
}) {
  return (
    <PageShell>
      <PublicHeader />
      <HeroSection />
      <HelpIntentSection />
      <DepartmentsSection />
      <ProcessTimeline />
      <ContractPreview contracts={contracts} />
      <LegalSupportSection />
      <KnowledgeCenterSection articles={articles} />
      <LatestMediaSection articles={articles} news={news} />
      <FaqSection faqs={faqs} />
      <FinalCta />
      <PublicFooter />
    </PageShell>
  );
}
