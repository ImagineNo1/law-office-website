import type { Metadata } from "next";
import { AdminEmptyState, AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  deleteMessageAction,
  sendAdminClientMessageAction,
  updateMessageStatusAction,
} from "@/lib/admin-actions";
import { getAdminClientConversations } from "@/lib/admin-db";
import { getMessages } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پیام‌ها" };

export default async function AdminMessagesPage() {
  const [conversations, contactMessages] = await Promise.all([
    getAdminClientConversations(),
    getMessages(),
  ]);
  const active = conversations[0];
  return (
    <AdminShell
      title="پیام‌ها"
      description="پاسخگویی به چت کاربران داشبورد و پیام‌های فرم تماس"
    >
      <div className="grid gap-6">
        <AdminPageHeader
          title="پیام‌ها"
          description="گفتگوهای پورتال مشتری و پیام‌های فرم تماس عمومی اینجا نمایش داده می‌شود."
        />


        <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-navy">
                پیام‌های فرم تماس
              </h2>
              <p className="mt-1 text-xs font-bold text-muted">
                پیام‌هایی که کاربران از صفحه تماس ارسال می‌کنند اینجا ذخیره می‌شود.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-700">
              {contactMessages.length} پیام
            </span>
          </div>
          {contactMessages.length ? (
            <div className="grid gap-3">
              {contactMessages.map((message) => (
                <article
                  className="rounded-xl border border-border bg-slate-50 p-4"
                  key={message.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-navy">
                        {message.subject}
                      </h3>
                      <p className="mt-1 text-xs font-bold text-muted">
                        {message.fullName} · {message.phone}
                        {message.email ? ` · ${message.email}` : ""}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-muted ring-1 ring-border">
                      {message.status === "unread"
                        ? "خوانده نشده"
                        : message.status === "read"
                          ? "خوانده شده"
                          : "آرشیو"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-bold leading-8 text-navy">
                    {message.message}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-muted">
                      {message.createdAt}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <form action={updateMessageStatusAction}>
                        <input name="id" type="hidden" value={message.id} />
                        <input name="status" type="hidden" value="read" />
                        <button className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-black text-navy">
                          خوانده شد
                        </button>
                      </form>
                      <form action={updateMessageStatusAction}>
                        <input name="id" type="hidden" value={message.id} />
                        <input name="status" type="hidden" value="archived" />
                        <button className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-black text-navy">
                          آرشیو
                        </button>
                      </form>
                      <form action={deleteMessageAction}>
                        <input name="id" type="hidden" value={message.id} />
                        <button className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-black text-red-700">
                          حذف
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState
              title="پیامی از فرم تماس ثبت نشده است"
              description="پس از ارسال فرم تماس توسط کاربران، پیام‌ها در همین بخش ذخیره و قابل مدیریت هستند."
            />
          )}
        </section>

        {conversations.length ? (
          <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
            <section className="rounded-2xl border border-border bg-white p-4 shadow-card">
              <h2 className="mb-4 text-lg font-black text-navy">لیست چت‌ها</h2>
              <div className="grid gap-2">
                {conversations.map((item, index) => (
                  <div
                    className={`rounded-xl border p-4 ${index === 0 ? "border-emerald-500 bg-emerald-500/10" : "border-border"}`}
                    key={`${item.clientId}-${item.threadId}`}
                  >
                    <strong className="block text-sm text-navy">
                      {item.threadTitle}
                    </strong>
                    <span className="mt-2 block text-xs font-bold text-muted">
                      {item.clientName} · {item.clientPhone || "بدون تماس"}
                    </span>
                    <span className="mt-1 block text-xs font-bold text-muted">
                      {item.messages.length} پیام
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="mb-4">
                <h2 className="text-xl font-black text-navy">
                  {active.threadTitle}
                </h2>
                <p className="mt-1 text-sm font-bold text-muted">
                  {active.clientName}
                </p>
              </div>
              <div className="grid max-h-[560px] gap-4 overflow-y-auto rounded-xl bg-slate-50 p-4">
                {active.messages.map((message) => (
                  <div
                    className={`flex ${message.sender === "admin" ? "justify-start" : "justify-end"}`}
                    key={message.id}
                  >
                    <div className="max-w-[78%] rounded-xl border border-border bg-white p-4 shadow-sm">
                      <div className="mb-2 flex gap-2 text-xs font-black text-muted">
                        <span>{message.senderName}</span>
                        <span>{message.createdAtText}</span>
                      </div>
                      <p className="text-sm font-bold leading-8 text-navy">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form
                action={sendAdminClientMessageAction}
                className="mt-4 flex gap-2 rounded-xl border border-border p-3"
              >
                <input name="clientId" type="hidden" value={active.clientId} />
                <input name="threadId" type="hidden" value={active.threadId} />
                <input
                  name="threadTitle"
                  type="hidden"
                  value={active.threadTitle}
                />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
                  name="message"
                  placeholder="پاسخ به کاربر..."
                  required
                />
                <button className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white">
                  ارسال پاسخ
                </button>
              </form>
            </section>
          </div>
        ) : (
          <AdminEmptyState
            title="چتی وجود ندارد"
            description="پس از ایجاد چت توسط کاربران در داشبورد، گفتگوها اینجا قابل پاسخگویی است."
          />
        )}
      </div>
    </AdminShell>
  );
}
