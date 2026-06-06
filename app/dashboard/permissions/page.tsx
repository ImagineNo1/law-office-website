import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const metadata: Metadata = { title: "سطوح دسترسی" };

export default async function PermissionsPage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="permissions" />;
}
