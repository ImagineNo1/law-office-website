import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { RequestsTable } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "درخواست‌های من" };

export default function DashboardRequestsPage() {
  const { requests } = getClientDashboardData();
  return <ClientPortalShell title="درخواست‌های من"><RequestsTable requests={requests} /></ClientPortalShell>;
}
