import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { PortalCard } from "@/components/dashboard/ClientPortalUi";
import { RequestTimeline } from "@/components/requests/CrmUi";
import { formatRequestDate, requestPriorityLabels, requestStatusLabels } from "@/lib/service-requests";
import { getClientRequestById } from "@/lib/client-portal";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "جزئیات درخواست" };

export default async function DashboardRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = getClientRequestById(id);
  if (!request) notFound();

  return (
    <ClientPortalShell title="جزئیات درخواست">
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]" dir="ltr">
        <div className="grid min-w-0 gap-6" dir="rtl">
          <PortalCard className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div><p className="text-sm font-black text-gold" dir="ltr">{request.requestNumber}</p><h2 className="mt-2 text-3xl font-black text-navy">{request.subject}</h2><p className="mt-3 text-sm font-bold text-muted">{request.serviceTitle} · ثبت شده در {formatRequestDate(request.createdAt)}</p></div>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">{requestStatusLabels[request.status]}</span>
            </div>
            <div className="mt-6 rounded-2xl bg-[#fbf7ef] p-4"><div className="mb-2 flex items-center justify-between text-xs font-black text-muted"><span>پیشرفت پرونده</span><span>۶۵٪</span></div><span className="block h-2 overflow-hidden rounded-full bg-white"><span className="block h-full rounded-full bg-gold" style={{ width: "65%" }} /></span></div>
          </PortalCard>
          <PortalCard className="p-6"><h3 className="text-xl font-black text-navy">پیام‌ها</h3><div className="mt-5 grid gap-4">{request.messages.map((message) => <article className="rounded-2xl border border-border p-4" key={message.id}><div className="flex items-center justify-between"><strong className="text-navy">{message.senderName}</strong><span className="text-xs font-bold text-muted">{formatRequestDate(message.createdAt)}</span></div><p className="mt-2 text-sm font-bold leading-7 text-muted">{message.message}</p></article>)}</div><div className="mt-4 flex gap-2 rounded-2xl border border-border p-3"><input className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" placeholder="ارسال پیام..." /><button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white">ارسال</button></div></PortalCard>
          <PortalCard className="p-6"><h3 className="text-xl font-black text-navy">یادداشت‌های قابل مشاهده</h3><div className="mt-5 grid gap-3">{request.adminNotes.slice(0, 1).map((note) => <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-7 text-muted" key={note.id}>{note.message}</p>)}</div></PortalCard>
        </div>
        <aside className="grid gap-6" dir="rtl">
          <RequestTimeline request={request} />
          <PortalCard className="p-5"><h3 className="text-lg font-black text-navy">کارشناس مسئول</h3><p className="mt-3 font-black text-muted">{request.assignedTo}</p><p className="mt-2 text-sm font-bold text-muted">اولویت: {requestPriorityLabels[request.priority]}</p></PortalCard>
          <PortalCard className="p-5"><h3 className="text-lg font-black text-navy">فایل‌ها</h3><div className="mt-4 grid gap-3">{request.attachments.map((file) => <div className="flex items-center justify-between rounded-xl border border-border p-3" key={file.id}><span className="text-sm font-black text-navy">{file.filename}</span><button className="text-xs font-black text-gold">دانلود</button></div>)}</div></PortalCard>
        </aside>
      </div>
    </ClientPortalShell>
  );
}
