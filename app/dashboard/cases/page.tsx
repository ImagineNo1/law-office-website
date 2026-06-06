import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { PortalCard, RequestsTable } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const metadata: Metadata = { title: "پرونده‌ها" };

export default function DashboardCasesPage() {
  const { requests } = getClientDashboardData();
  return (
    <ClientPortalShell title="پرونده‌ها">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          {["پرونده‌های فعال", "نیازمند اقدام", "در انتظار دادگاه", "مختومه"].map((item, index) => <PortalCard className="p-5" key={item}><strong className="text-3xl font-black text-navy">{[4, 2, 1, 8][index]}</strong><p className="mt-2 text-sm font-black text-muted">{item}</p></PortalCard>)}
        </div>
        <RequestsTable requests={requests.slice(0, 8)} />
      </div>
    </ClientPortalShell>
  );
}
