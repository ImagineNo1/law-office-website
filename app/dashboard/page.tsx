import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";
import { getDashboardData } from "@/lib/dashboard-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "داشبورد پیشرفته اسناد و امضا" };

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <LegalTechPlatform data={data} page="dashboard" />;
}
