import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { FilesTable } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const metadata: Metadata = { title: "فایل‌های من" };

export default function DashboardFilesPage() {
  const { files } = getClientDashboardData();
  return <ClientPortalShell title="فایل‌های من"><FilesTable files={files} /></ClientPortalShell>;
}
