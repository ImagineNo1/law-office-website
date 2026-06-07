import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { PaymentsTable } from "@/components/dashboard/ClientPortalUi";
import { getClientPayments } from "@/lib/client-portal-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پرداخت‌ها" };

export default async function DashboardPaymentsPage() {
  const payments = await getClientPayments();
  return <ClientPortalShell title="پرداخت‌ها"><PaymentsTable payments={payments} /></ClientPortalShell>;
}
