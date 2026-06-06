import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { MessagingCenter } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const metadata: Metadata = { title: "پیام‌ها" };

export default function DashboardMessagesPage() {
  const { messages } = getClientDashboardData();
  return <ClientPortalShell title="پیام‌ها"><MessagingCenter messages={messages} /></ClientPortalShell>;
}
