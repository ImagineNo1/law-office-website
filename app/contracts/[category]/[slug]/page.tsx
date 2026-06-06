import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContractDetail } from "@/components/contracts/ContractDetail";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Container } from "@/components/ui/Foundation";
import { getContractBySlug, getPublishedContracts, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const contract = await getContractBySlug(slug);
  return {
    title: contract?.seoTitle || contract?.title || "جزئیات قرارداد",
    description: contract?.seoDescription || contract?.excerpt,
  };
}

export default async function ContractDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  const [settings, contract, contracts] = await Promise.all([getSiteSettings(), getContractBySlug(slug), getPublishedContracts()]);

  if (!contract) {
    notFound();
  }

  const relatedSlugs = new Set(contract.relatedContracts ?? []);
  const related = contracts
    .filter((item) => item.slug !== contract.slug && (relatedSlugs.has(item.slug) || item.category === contract.category))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F7F3EA]">
      <SiteHeader settings={settings} />
      <section className="py-6 sm:py-8">
        <Container>
          <ContractDetail contract={contract} related={related} />
        </Container>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}
