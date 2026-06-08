import type { Metadata } from "next";
import { getPlatformContractBySlug, getPlatformContracts } from "@/lib/platform-db";
import { PublicShell } from "@/components/platform/layout/PublicShell";
import { ContractDetailHero } from "@/components/platform/contracts/ContractDetailHero";
import { ContractPricingPanel } from "@/components/platform/contracts/ContractPricingPanel";
import { ContractTabs } from "@/components/platform/contracts/ContractTabs";
import { RelatedContracts } from "@/components/platform/contracts/RelatedContracts";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const [contract, page] = await Promise.all([
    getPlatformContractBySlug(slug),
    getSeoForPath(`/contracts/${category}/${slug}`),
  ]);
  return buildMetadata({
    path: `/contracts/${category}/${slug}`,
    seo: page?.seo,
    title: page?.title ?? contract?.title ?? "جزئیات قرارداد",
    description: contract?.description,
  });
}

export default async function ContractDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const [contract, contracts] = await Promise.all([getPlatformContractBySlug(slug), getPlatformContracts()]);
  const related = contracts.filter((item) => item.slug !== contract?.slug && item.category === contract?.category);

  return (
    <PublicShell>
      {contract ? <ContractDetailHero contract={contract} /> : null}
      <section className="py-8">
        <div className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            <ContractTabs />
            <RelatedContracts contracts={related.length ? related : contracts} />
          </div>
          {contract ? <ContractPricingPanel contract={contract} /> : null}
        </div>
      </section>
    </PublicShell>
  );
}
