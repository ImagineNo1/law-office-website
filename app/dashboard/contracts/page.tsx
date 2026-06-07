import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { ContractsList } from "@/components/dashboard/ClientPortalUi";
import { getClientContracts } from "@/lib/client-portal-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "قراردادهای من" };

export default async function DashboardContractsPage() {
  const contracts = await getClientContracts();
  return <ClientPortalShell title="قراردادهای من"><ContractsList contracts={contracts} /></ClientPortalShell>;
}
