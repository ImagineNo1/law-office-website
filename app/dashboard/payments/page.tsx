import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { PaymentsTable } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const metadata: Metadata = { title: "پرداخت‌ها" };

export default function DashboardPaymentsPage() {
  const { payments } = getClientDashboardData();
  return <ClientPortalShell title="پرداخت‌ها"><PaymentsTable payments={payments} /></ClientPortalShell>;
}
