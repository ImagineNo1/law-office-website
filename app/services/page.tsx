import type { Metadata } from "next";
import { ServicesExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = { title: "خدمات حقوقی" };

export default function ServicesPage() {
  return <ServicesExperience />;
}
