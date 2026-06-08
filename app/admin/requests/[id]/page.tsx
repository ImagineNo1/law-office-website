import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addRequestAdminAttachmentAction,
  addRequestAdminMessageAction,
  addRequestNoteAction,
  updateRequestAction,
} from "@/lib/admin-actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminEmptyState, AdminStatusBadge } from "@/components/admin/AdminUi";
import {
  formatAdminDate,
  formatAdminDateTime,
  getAdminRequestById,
  getAssignableLawyers,
} from "@/lib/admin-db";
import {
  requestPriorityLabels,
  requestPriorities,
  requestStatusLabels,
  requestStatuses,
} from "@/lib/service-requests";
import type { ServiceRequestData } from "@/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "جزئیات درخواست" };

function minutesBetween(previous: string | null, current: string) {
  if (!previous) return "شروع";
  const diff = Math.max(
    0,
    Math.round((new Date(current).getTime() - new Date(previous).getTime()) / 60000),
  );
  return `${new Intl.NumberFormat("fa-IR").format(diff)} دقیقه بعد`;
}

function timelineEvents(request: ServiceRequestData) {
  const explicit = request.timeline ?? [];
  if (explicit.length) return explicit.sort((a, b) => +new Date(a.at) - +new Date(b.at));

  return [
    {
      id: "created",
      title: "ثبت درخواست",
      description: request.subject,
      actor: request.fullName,
      type: "created" as const,
      at: request.createdAt,
    },
    ...request.attachments.map((file) => ({
      id: `file-${file.id}`,
      title: file.uploadedBy === "admin" ? "آپلود فایل مدیر" : "آپلود فایل مشتری",
      description: file.filename,
      actor: file.uploadedBy === "admin" ? "مدیریت" : request.fullName,
      type: "attachment" as const,
      at: file.uploadedAt,
    })),
    ...request.messages.map((message) => ({
      id: `message-${message.id}`,
      title: message.sender === "admin" ? "پیام مدیر" : "پیام مشتری",
      description: message.message,
      actor: message.senderName,
      type: "message" as const,
      at: message.createdAt,
    })),
    ...request.adminNotes.map((note) => ({
      id: `note-${note.id}`,
      title: "یادداشت مدیر",
      description: note.message,
      actor: note.author,
      type: "note" as const,
      at: note.createdAt,
    })),
  ].sort((a, b) => +new Date(a.at) - +new Date(b.at));
}

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [request, lawyers] = await Promise.all([
    getAdminRequestById(id),
    getAssignableLawyers(),
  ]);
  if (!request) notFound();
  const events = timelineEvents(request);

  return (
    <AdminShell
      title={`درخواست ${request.requestNumber}`}
      description="جزئیات درخواست، پیام‌ها، فایل‌ها و تایم‌لاین مدیریتی"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="grid gap-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-black text-emerald-700">
                  {request.requestNumber}
                </p>
                <h2 className="mt-2 text-2xl font-black text-navy">
                  {request.subject}
                </h2>
                <p className="mt-2 text-sm font-bold leading-8 text-muted">
                  {request.serviceTitle} · {formatAdminDate(request.createdAt)}
                </p>
              </div>
              <AdminStatusBadge status={request.status} />
            </div>
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-8 text-muted">
              {request.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <h3 className="text-xl font-black text-navy">تایم‌لاین اتفاقات</h3>
            <div className="mt-5 grid gap-4">
              {events.map((event, index) => {
                const previous = index ? events[index - 1]?.at ?? null : null;
                return (
                  <article
                    className="grid grid-cols-[38px_1fr] gap-3"
                    key={event.id}
                  >
                    <div className="relative flex justify-center">
                      {index < events.length - 1 ? (
                        <span className="absolute top-9 h-full w-px bg-emerald-100" />
                      ) : null}
                      <span className="relative z-10 grid size-8 place-items-center rounded-full bg-emerald-600 text-xs font-black text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="rounded-2xl border border-border bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <strong className="text-navy">{event.title}</strong>
                        <span className="text-xs font-black text-emerald-700">
                          {minutesBetween(previous, event.at)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold leading-7 text-muted">
                        {event.description}
                      </p>
                      <p className="mt-2 text-xs font-bold text-muted">
                        {event.actor || "سیستم"} · {formatAdminDateTime(event.at)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <h3 className="text-xl font-black text-navy">پیام‌ها</h3>
            {request.messages.length ? (
              <div className="mt-4 grid gap-3">
                {request.messages.map((message) => (
                  <article className="rounded-2xl border border-border p-4" key={message.id}>
                    <div className="flex items-center justify-between gap-3">
                      <strong className="text-navy">{message.senderName}</strong>
                      <span className="text-xs font-bold text-muted">
                        {formatAdminDateTime(message.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold leading-8 text-muted">
                      {message.message}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <AdminEmptyState
                  title="پیامی ثبت نشده است"
                  description="پیام‌های مرتبط با این درخواست اینجا نمایش داده می‌شوند."
                />
              </div>
            )}
            <form action={addRequestAdminMessageAction} className="mt-4 grid gap-3">
              <input name="id" type="hidden" value={request.id} />
              <textarea
                className="service-input min-h-24 py-3"
                name="message"
                placeholder="ارسال پیام مدیریتی..."
                required
              />
              <button className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white" type="submit">
                ارسال پیام
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
            <h3 className="text-xl font-black text-navy">یادداشت‌های مدیر</h3>
            {request.adminNotes.length ? (
              <div className="mt-4 grid gap-3">
                {request.adminNotes.map((note) => (
                  <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-8 text-muted" key={note.id}>
                    {note.message}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-muted">
                یادداشتی ثبت نشده است.
              </p>
            )}
            <form action={addRequestNoteAction} className="mt-4 grid gap-3">
              <input name="id" type="hidden" value={request.id} />
              <textarea className="service-input min-h-24 py-3" name="message" placeholder="افزودن یادداشت..." required />
              <button className="rounded-xl bg-navy px-5 py-3 text-sm font-black text-white" type="submit">
                ثبت یادداشت
              </button>
            </form>
          </div>
        </section>

        <aside className="grid content-start gap-6">
          <form action={updateRequestAction} className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <input name="id" type="hidden" value={request.id} />
            <h3 className="text-lg font-black text-navy">به‌روزرسانی</h3>
            <label className="mt-4 grid gap-2 text-sm font-black text-navy">
              <span>وضعیت</span>
              <select className="service-input" defaultValue={request.status} name="status">
                {requestStatuses.map((status) => (
                  <option key={status} value={status}>
                    {requestStatusLabels[status]}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 grid gap-2 text-sm font-black text-navy">
              <span>اولویت</span>
              <select className="service-input" defaultValue={request.priority} name="priority">
                {requestPriorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {requestPriorityLabels[priority]}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 grid gap-2 text-sm font-black text-navy">
              <span>وکیل مسئول</span>
              <select className="service-input" defaultValue={request.assignedLawyerId ?? ""} name="assignedLawyerId">
                <option value="">در انتظار تخصیص</option>
                {lawyers.map((lawyer) => (
                  <option key={`${lawyer.source}:${lawyer.id}`} value={`${lawyer.source}:${lawyer.id}`}>
                    {lawyer.fullName} · {lawyer.lawyerLicenseLabel}
                  </option>
                ))}
              </select>
            </label>
            <button className="mt-5 w-full rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white" type="submit">
              ذخیره تغییرات
            </button>
          </form>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h3 className="text-lg font-black text-navy">اطلاعات مشتری</h3>
            <div className="mt-4 grid gap-2 text-sm font-bold leading-8 text-muted">
              <span>{request.fullName}</span>
              <span>{request.phone}</span>
              <span>{request.email || "ایمیل ثبت نشده"}</span>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h3 className="text-lg font-black text-navy">پیوست‌ها</h3>
            {request.attachments.length ? (
              <div className="mt-4 grid gap-2">
                {request.attachments.map((file) => (
                  <div className="rounded-xl border border-border p-3 text-sm font-bold text-muted" key={file.id}>
                    <div className="flex items-center justify-between gap-3">
                      {file.url ? (
                        <Link className="font-black text-emerald-700" href={file.url} target="_blank">
                          {file.filename}
                        </Link>
                      ) : (
                        <span className="font-black text-navy">{file.filename}</span>
                      )}
                      <span className="text-xs">{file.uploadedBy === "admin" ? "مدیر" : "مشتری"}</span>
                    </div>
                    <p className="mt-1 text-xs">{file.size}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm font-bold text-muted">
                پیوستی ثبت نشده است.
              </p>
            )}
            <form action={addRequestAdminAttachmentAction} className="mt-4 grid gap-3">
              <input name="id" type="hidden" value={request.id} />
              <input className="service-input py-2" name="attachment" type="file" />
              <button className="rounded-xl bg-navy px-5 py-3 text-sm font-black text-white" type="submit">
                آپلود فایل مدیر
              </button>
            </form>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
