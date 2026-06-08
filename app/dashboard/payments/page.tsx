import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { UnderConstructionPanel } from "@/components/dashboard/ClientPortalUi";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پرداخت‌ها" };

export default async function DashboardPaymentsPage() {
  return <ClientPortalShell title="پرداخت‌ها"><UnderConstructionPanel /></ClientPortalShell>;
}
