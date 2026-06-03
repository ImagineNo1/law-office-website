import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { deleteMessageAction, updateMessageStatusAction } from "@/lib/admin-actions";
import { getMessages } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پیام ها",
};

const statusLabels = {
  unread: "خوانده نشده",
  read: "خوانده شده",
  archived: "بایگانی",
};

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <AdminShell title="پیام ها" description="مشاهده و تغییر وضعیت پیام های تماس">
      <Card className="p-5">
        <h1 className="mb-5 text-xl font-black text-foreground">پیام های تماس</h1>
        <div className="grid gap-3">
          {messages.map((message) => (
            <div className="grid gap-3 rounded-2xl border border-border bg-surface p-4" key={message.id}>
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <strong>{message.fullName}</strong>
                <span className="text-muted">{message.subject}</span>
                <Badge tone={message.status === "unread" ? "gold" : "muted"}>
                  {statusLabels[message.status]}
                </Badge>
              </div>
              <p className="leading-8 text-muted">{message.message}</p>
              <div className="grid gap-2 text-sm text-muted md:grid-cols-3">
                <span>{message.phone}</span>
                <span>{message.email}</span>
                <span>{message.createdAt}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["unread", "read", "archived"] as const).map((status) => (
                  <form action={updateMessageStatusAction} key={status}>
                    <input name="id" type="hidden" value={message.id} />
                    <input name="status" type="hidden" value={status} />
                    <Button type="submit" variant="outline">{statusLabels[status]}</Button>
                  </form>
                ))}
                <form action={deleteMessageAction}>
                  <input name="id" type="hidden" value={message.id} />
                  <Button type="submit" variant="ghost">حذف</Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AdminShell>
  );
}
