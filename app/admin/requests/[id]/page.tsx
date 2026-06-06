import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { MessagesPanel } from "@/components/platform/crm/MessagesPanel";
import { RequestDetailPanel } from "@/components/platform/crm/RequestDetailPanel";
import { RequestTimeline } from "@/components/platform/crm/RequestTimeline";
import { getServiceRequestById } from "@/lib/platform-db";

export const metadata: Metadata = { title: "جزئیات درخواست" };

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await getServiceRequestById(id);
  if (!request) notFound();

  return (
    <AdminCrmShell>
      <h1 className="text-3xl font-black">درخواست {request.requestNumber}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <RequestDetailPanel request={request} />
          <MessagesPanel messages={request.messages} />
        </div>
        <RequestTimeline />
      </div>
    </AdminCrmShell>
  );
}
