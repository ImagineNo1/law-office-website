import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { FilesTable } from "@/components/dashboard/ClientPortalUi";
import { getClientFiles } from "@/lib/client-portal-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "فایل‌های من" };

export default async function DashboardFilesPage() {
  const files = await getClientFiles();
  return <ClientPortalShell title="فایل‌های من"><FilesTable files={files} /></ClientPortalShell>;
}
