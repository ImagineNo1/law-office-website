import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const metadata: Metadata = { title: "مدیریت گردش کار" };

export default async function WorkflowsPage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="workflows" />;
}
