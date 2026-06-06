import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const metadata: Metadata = { title: "مدیریت مخاطبین" };

export default async function ContactsPage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="contacts" />;
}
