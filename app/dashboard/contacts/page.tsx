import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "مدیریت مخاطبین" };

export default function ContactsPage() {
  return <LegalTechPlatform page="contacts" />;
}
