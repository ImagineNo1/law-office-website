import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "داشبورد پیشرفته اسناد و امضا" };

export default function DashboardPage() {
  return <LegalTechPlatform page="dashboard" />;
}
