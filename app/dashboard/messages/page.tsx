import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { MessagingCenter } from "@/components/dashboard/MessagingCenter";
import {
  getClientMessageContacts,
  getClientMessages,
} from "@/lib/client-portal-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پیام‌ها" };

export default async function DashboardMessagesPage() {
  const [messages, contacts] = await Promise.all([
    getClientMessages(),
    getClientMessageContacts(),
  ]);
  return (
    <ClientPortalShell title="پیام‌ها">
      <MessagingCenter contacts={contacts} messages={messages} />
    </ClientPortalShell>
  );
}
