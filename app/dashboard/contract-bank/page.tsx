import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { ContractsExplorer } from "@/components/platform/contracts/ContractsExplorer";
import { getPlatformContracts } from "@/lib/platform-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "بانک قراردادها" };

export default async function DashboardContractBankPage() {
  const contracts = await getPlatformContracts();

  return (
    <ClientPortalShell title="بانک قراردادها">
      <ContractsExplorer contracts={contracts} />
    </ClientPortalShell>
  );
}
