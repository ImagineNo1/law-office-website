import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const metadata: Metadata = { title: "بایگانی اسناد" };

export default async function ArchivePage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="archive" />;
}
