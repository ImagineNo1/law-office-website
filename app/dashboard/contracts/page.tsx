import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { ContractsList } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const metadata: Metadata = { title: "قراردادهای من" };

export default function DashboardContractsPage() {
  const { contracts } = getClientDashboardData();
  return <ClientPortalShell title="قراردادهای من"><ContractsList contracts={contracts} /></ClientPortalShell>;
}
