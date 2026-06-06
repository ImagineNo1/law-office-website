import type { Metadata } from "next";
import { ServicesExperience } from "@/components/platform/services/ServicesExperience";
import { getPlatformFaqs, getPlatformServiceBySlug, getPlatformServices } from "@/lib/platform-db";

export const metadata: Metadata = { title: "جزئیات خدمت حقوقی" };

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [services, service, faqs] = await Promise.all([
    getPlatformServices(),
    getPlatformServiceBySlug(slug),
    getPlatformFaqs("service", slug),
  ]);
  return <ServicesExperience detailSlug={slug} faqs={faqs} service={service} services={services} />;
}
