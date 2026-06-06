import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequestTimeline, StatusBadge } from "@/components/requests/CrmUi";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { formatRequestDate, getServiceRequestById } from "@/lib/service-requests";
import { getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پیگیری درخواست" };

export default async function TrackRequestPage({ params }: { params: Promise<{ requestNumber: string }> }) {
  const { requestNumber } = await params;
  const [settings, request] = await Promise.all([getSiteSettings(), getServiceRequestById(decodeURIComponent(requestNumber))]);
  if (!request) notFound();

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader settings={settings} />
      <section className="soft-page-bg py-10">
        <div className="container-shell">
          <div className="mb-8 rounded-3xl border border-border bg-white p-6 shadow-card">
            <p className="text-sm font-black text-gold">پیگیری عمومی بدون ورود</p>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><h1 className="text-3xl font-black text-navy">{request.subject}</h1><p className="mt-2 text-sm font-bold text-muted" dir="ltr">{request.requestNumber}</p></div><StatusBadge status={request.status} /></div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <h2 className="text-xl font-black text-navy">آخرین بروزرسانی‌ها</h2>
              <div className="mt-5 grid gap-4">
                {request.messages.slice(-3).map((message) => <article className="rounded-2xl border border-border p-4" key={message.id}><div className="flex items-center justify-between gap-3"><strong className="text-navy">{message.senderName}</strong><span className="text-xs font-bold text-muted">{formatRequestDate(message.createdAt)}</span></div><p className="mt-2 text-sm font-bold leading-7 text-muted">{message.message}</p></article>)}
              </div>
            </section>
            <aside className="grid gap-6"><RequestTimeline request={request} compact /><section className="rounded-2xl border border-border bg-white p-5 shadow-card"><h2 className="text-lg font-black text-navy">کارشناس مسئول</h2><p className="mt-3 text-sm font-bold text-muted">{request.assignedTo}</p><p className="mt-2 text-xs font-bold text-muted">آخرین بروزرسانی: {formatRequestDate(request.updatedAt)}</p></section></aside>
          </div>
        </div>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}
