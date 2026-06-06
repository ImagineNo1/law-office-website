import type { Metadata } from "next";
import { crmRequests } from "@/lib/platform-recovery-data";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { RequestDetailPanel } from "@/components/platform/crm/RequestDetailPanel";
import { RequestTimeline } from "@/components/platform/crm/RequestTimeline";
import { MessagesPanel } from "@/components/platform/crm/MessagesPanel";

export const metadata: Metadata = { title: "جزئیات درخواست CRM" };

export default async function AdminRequestDetailPage() {
  const request = crmRequests[0];
  return (
    <AdminCrmShell>
      <h1 className="text-3xl font-black">پرونده درخواست {request.number}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <RequestDetailPanel request={request} />
          <MessagesPanel />
        </div>
        <RequestTimeline />
      </div>
    </AdminCrmShell>
  );
}
