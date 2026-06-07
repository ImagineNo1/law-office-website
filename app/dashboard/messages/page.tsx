import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { MessagingCenter } from "@/components/dashboard/ClientPortalUi";
import { getClientMessages } from "@/lib/client-portal-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پیام‌ها" };

export default async function DashboardMessagesPage() {
  const messages = await getClientMessages();
  return <ClientPortalShell title="پیام‌ها"><MessagingCenter messages={messages} /></ClientPortalShell>;
}
