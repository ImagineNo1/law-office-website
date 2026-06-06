import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const metadata: Metadata = { title: "مرکز گزارش‌ها" };

export default async function ReportsPage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="reports" />;
}
