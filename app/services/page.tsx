import type { Metadata } from "next";
import { ServicesExperience } from "@/components/platform/services/ServicesExperience";
import { getPlatformServices } from "@/lib/platform-db";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/services");
  return buildMetadata({
    path: "/services",
    seo: page?.seo,
    title: page?.title ?? "خدمات حقوقی",
  });
}

export default async function ServicesPage() {
  const services = await getPlatformServices();
  return <ServicesExperience services={services} />;
}
