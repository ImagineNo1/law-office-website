import type { Metadata } from "next";
import { ServicesExperience } from "@/components/platform/services/ServicesExperience";

export const metadata: Metadata = { title: "جزئیات خدمت حقوقی" };

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ServicesExperience detailSlug={slug} />;
}
