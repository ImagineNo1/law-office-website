import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { RequestsTable } from "@/components/dashboard/ClientPortalUi";
import { RequestCreateModal } from "@/components/dashboard/RequestCreateModal";
import { getClientRequests } from "@/lib/client-portal-db";
import { getPlatformServices } from "@/lib/platform-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "درخواست‌های من" };

export default async function DashboardRequestsPage({ searchParams }: { searchParams?: Promise<{ q?: string; status?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const [requests, services] = await Promise.all([getClientRequests(undefined, { q: params.q, status: params.status }), getPlatformServices()]);
  return <ClientPortalShell title="درخواست‌های من"><RequestsTable requests={requests} search={params.q} status={params.status} action={<RequestCreateModal services={services} />} /></ClientPortalShell>;
}
