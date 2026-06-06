import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const metadata: Metadata = { title: "قالب‌های اسناد" };

export default async function TemplatesPage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="templates" />;
}
