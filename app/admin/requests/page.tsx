import type { Metadata } from "next";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { RequestKpiCards } from "@/components/platform/crm/RequestKpiCards";
import { RequestTable } from "@/components/platform/crm/RequestTable";
import { getServiceRequests } from "@/lib/platform-db";

export const metadata: Metadata = { title: "درخواست‌ها" };

export default async function AdminRequestsPage() {
  const requests = await getServiceRequests();
  return (
    <AdminCrmShell>
      <h1 className="text-3xl font-black">درخواست‌ها</h1>
      <div className="mt-6 grid gap-6">
        <RequestKpiCards requests={requests} />
        <RequestTable requests={requests} />
      </div>
    </AdminCrmShell>
  );
}
