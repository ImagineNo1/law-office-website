import type { Metadata } from "next";
import { recoveryContracts } from "@/lib/platform-recovery-data";
import { PageShell } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { ContractDetailHero } from "@/components/platform/contracts/ContractDetailHero";
import { ContractPricingPanel } from "@/components/platform/contracts/ContractPricingPanel";
import { ContractTabs } from "@/components/platform/contracts/ContractTabs";
import { RelatedContracts } from "@/components/platform/contracts/RelatedContracts";

export const metadata: Metadata = { title: "جزئیات قرارداد" };

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contract = recoveryContracts.find((item) => item.slug === slug) ?? recoveryContracts[0];

  return (
    <PageShell>
      <PublicHeader />
      <ContractDetailHero contract={contract} />
      <section className="py-8">
        <div className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            <ContractTabs />
            <RelatedContracts />
          </div>
          <ContractPricingPanel contract={contract} />
        </div>
      </section>
    </PageShell>
  );
}
