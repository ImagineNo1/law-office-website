import type { Metadata } from "next";
import { ServicesExperience } from "@/components/platform/services/ServicesExperience";
import { getPlatformFaqs, getPlatformServiceBySlug, getPlatformServices } from "@/lib/platform-db";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, page] = await Promise.all([
    getPlatformServiceBySlug(slug),
    getSeoForPath(`/services/${slug}`),
  ]);
  return buildMetadata({
    path: `/services/${slug}`,
    seo: page?.seo,
    title: page?.title ?? service?.title ?? "جزئیات خدمت حقوقی",
    description: service?.description,
  });
}

export default async function ServiceDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const [services, service, faqs] = await Promise.all([
    getPlatformServices(),
    getPlatformServiceBySlug(slug),
    getPlatformFaqs("service", slug),
  ]);
  return <ServicesExperience detailSlug={slug} faqs={faqs} service={service} services={services} />;
}
