import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { UnderConstructionPanel } from "@/components/dashboard/ClientPortalUi";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "قراردادهای من" };

export default async function DashboardContractsPage() {
  return (
    <ClientPortalShell title="قراردادهای من">
      <UnderConstructionPanel />
    </ClientPortalShell>
  );
}
