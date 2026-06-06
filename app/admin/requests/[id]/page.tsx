import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PriorityBadge, RequestTimeline, StatusBadge } from "@/components/requests/CrmUi";
import { formatRequestDate, getServiceRequestById } from "@/lib/service-requests";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "جزئیات درخواست" };

export default async function AdminRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await getServiceRequestById(id);
  if (!request) notFound();

  return (
    <AdminShell title="جزئیات درخواست" description={`${request.requestNumber} / ${request.serviceTitle}`}>
      <div className="grid gap-6 xl:grid-cols-[1fr_330px]" dir="ltr">
        <div className="grid min-w-0 gap-6" dir="rtl">
          <section className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2"><StatusBadge status={request.status} /><PriorityBadge priority={request.priority} /></div>
                <h1 className="text-3xl font-black text-navy">{request.serviceTitle}</h1>
                <p className="mt-3 text-sm font-bold text-muted">{request.requestNumber} · تاریخ ثبت: {formatRequestDate(request.createdAt)} · کارشناس: {request.assignedTo}</p>
              </div>
              <button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(201,151,63,0.28)]">به‌روزرسانی وضعیت</button>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <h2 className="text-lg font-black text-navy">اطلاعات درخواست</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                {[["وضعیت", ""], ["اولویت", ""], ["خدمت", request.serviceTitle], ["موضوع", request.subject], ["کارشناس مسئول", request.assignedTo ?? ""], ["آخرین بروزرسانی", formatRequestDate(request.updatedAt)]].map(([label, value]) => (
                  <div className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0" key={label}>
                    <dt className="font-black text-muted">{label}</dt>
                    <dd className="font-black text-navy">{label === "وضعیت" ? <StatusBadge status={request.status} /> : label === "اولویت" ? <PriorityBadge priority={request.priority} /> : value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-2xl border border-border bg-white shadow-card">
              <div className="grid grid-cols-3 border-b border-border text-center text-sm font-black text-muted">
                <span className="p-4">یادداشت‌ها</span><span className="border-x border-border p-4 text-gold">پیگیری و پیام‌ها</span><span className="p-4">تاریخچه وضعیت</span>
              </div>
              <div className="grid gap-4 p-5">
                {request.messages.map((message) => (
                  <div className={`flex gap-3 ${message.sender === "client" ? "justify-start" : "justify-end"}`} key={message.id}>
                    <div className={`max-w-[78%] rounded-2xl border border-border p-4 ${message.sender === "admin" ? "bg-[#fbf7ef]" : "bg-white"}`}>
                      <div className="mb-2 flex items-center gap-2 text-xs font-black text-navy"><span className="grid size-8 place-items-center rounded-full bg-navy text-white">{message.senderName.slice(0, 1)}</span>{message.senderName}<span className="text-muted">{formatRequestDate(message.createdAt)}</span></div>
                      <p className="text-sm font-bold leading-7 text-muted">{message.message}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border p-3">
                  <button className="grid size-10 place-items-center rounded-xl bg-slate-100 text-muted">📎</button>
                  <input className="min-w-0 flex-1 border-0 bg-transparent text-sm font-bold outline-none" placeholder="پیام خود را بنویسید..." />
                  <button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white">ارسال</button>
                </div>
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-black text-navy">یادداشت‌های داخلی</h2><button className="rounded-xl border border-border px-4 py-2 text-sm font-black text-navy">افزودن یادداشت</button></div>
            <div className="grid gap-3">
              {request.adminNotes.map((note) => (
                <article className="rounded-2xl border border-border bg-slate-50 p-4" key={note.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3"><strong className="text-navy">{note.author}</strong><span className="text-xs font-bold text-muted">{formatRequestDate(note.createdAt)}</span></div>
                  <p className="mt-2 text-sm font-bold leading-7 text-muted">{note.message}</p>
                  <div className="mt-3 flex gap-2 text-xs font-black text-gold"><button>ویرایش</button><button className="text-red-500">حذف</button></div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="grid gap-6" dir="rtl">
          <RequestTimeline request={request} />
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h2 className="text-lg font-black text-navy">اطلاعات مشتری</h2>
            <div className="mt-4 grid gap-3 text-sm font-bold text-muted"><p>نام: <strong className="text-navy">{request.fullName}</strong></p><p>شماره تماس: {request.phone}</p><p>ایمیل: {request.email}</p></div>
          </section>
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h2 className="text-lg font-black text-navy">فایل‌های پیوست</h2>
            <div className="mt-4 grid gap-3">
              {request.attachments.map((attachment) => (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3" key={attachment.id}>
                  <div><p className="text-sm font-black text-navy">{attachment.filename}</p><p className="mt-1 text-xs font-bold text-muted">{attachment.size} · {formatRequestDate(attachment.uploadedAt)}</p></div><span>📄</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
