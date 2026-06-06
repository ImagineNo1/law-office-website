import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const metadata: Metadata = { title: "ارسال گروهی" };

export default async function BulkSendPage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="bulk-send" />;
}
