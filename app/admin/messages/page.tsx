import type { Metadata } from "next";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import { AdminDataTable, AdminEmptyState, AdminPageHeader, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteMessageAction, updateMessageStatusAction } from "@/lib/admin-actions";
import { getAdminMessages } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پیام‌ها" };

const statusLabels = { unread: "خوانده نشده", read: "خوانده شده", archived: "آرشیو شده" } as const;

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();
  return <AdminShell title="پیام‌ها" description="مشاهده و مدیریت پیام‌های تماس"><div className="grid gap-6"><AdminPageHeader title="پیام‌ها" description="پیام‌های فرم تماس از پایگاه داده نمایش داده می‌شوند." />{messages.length ? <AdminDataTable headers={["نام", "موضوع", "تماس", "وضعیت", "تاریخ", "عملیات"]}>{messages.map((message) => <tr className="border-t border-border" key={message.id}><td className="px-5 py-4 font-black text-navy">{message.fullName}</td><td className="px-5 py-4 font-bold text-muted">{message.subject}</td><td className="px-5 py-4 font-bold text-muted">{message.phone}</td><td className="px-5 py-4"><AdminStatusBadge status={message.status} /></td><td className="px-5 py-4 font-bold text-muted">{message.createdAtText}</td><td className="px-5 py-4"><div className="flex flex-wrap gap-2">{(["unread", "read", "archived"] as const).map((status) => <form action={updateMessageStatusAction} key={status}><input name="id" type="hidden" value={message.id} /><input name="status" type="hidden" value={status} /><button className="rounded-lg border border-border px-3 py-2 text-xs font-black text-navy" type="submit">{statusLabels[status]}</button></form>)}<AdminConfirmDialog action={<form action={deleteMessageAction}><input name="id" type="hidden" value={message.id} /><button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">حذف</button></form>} /></div></td></tr>)}</AdminDataTable> : <AdminEmptyState title="پیامی ثبت نشده است" description="پیام‌های فرم تماس پس از ارسال کاربران در این بخش نمایش داده می‌شوند." />}</div></AdminShell>;
}
