import type { Metadata } from "next";
import { ServicesExperience } from "@/components/platform/services/ServicesExperience";
import { getPlatformServices } from "@/lib/platform-db";

export const metadata: Metadata = { title: "خدمات حقوقی" };

export default async function ServicesPage() {
  const services = await getPlatformServices();
  return <ServicesExperience services={services} />;
}
