import type { Metadata } from "next";
import { ServicesExperience } from "@/components/platform/services/ServicesExperience";

export const metadata: Metadata = { title: "خدمات حقوقی" };

export default function ServicesPage() {
  return <ServicesExperience />;
}
