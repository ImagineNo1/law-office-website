import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "مرکز گزارش‌ها" };

export default function ReportsPage() {
  return <LegalTechPlatform page="reports" />;
}
