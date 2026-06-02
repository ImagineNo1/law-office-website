import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "پیام ها",
};

export default function AdminMessagesPage() {
  const messages = [
    { name: "موکل جدید", subject: "مشاوره دعاوی خانواده", status: "خوانده نشده" },
    { name: "شرکت تجاری", subject: "بازبینی قرارداد مشارکت", status: "خوانده شده" },
    { name: "درخواست عمومی", subject: "ساعات کاری موسسه", status: "بایگانی" },
  ];

  return (
    <AdminShell title="پیام ها" description="مشاهده و تغییر وضعیت پیام های تماس">
      <Card className="p-5">
      <h1 className="mb-5 text-xl font-black text-foreground">پیام های تماس</h1>
      <div className="grid gap-3">
        {messages.map((message) => (
          <div className="grid gap-3 rounded-lg border border-gold/10 bg-white/[0.03] p-4 md:grid-cols-[1fr_1fr_auto]" key={message.subject}>
            <strong>{message.name}</strong>
            <span className="text-muted">{message.subject}</span>
            <Badge tone={message.status === "خوانده نشده" ? "gold" : "muted"}>{message.status}</Badge>
          </div>
        ))}
      </div>
      </Card>
    </AdminShell>
  );
}
