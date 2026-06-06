import type { Metadata } from "next";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { RequestKpiCards } from "@/components/platform/crm/RequestKpiCards";
import { RequestTable } from "@/components/platform/crm/RequestTable";

export const metadata: Metadata = { title: "CRM حقوقی و درخواست‌ها" };

export default function AdminRequestsPage() {
  return (
    <AdminCrmShell>
      <h1 className="text-3xl font-black">CRM حقوقی و مدیریت درخواست‌ها</h1>
      <div className="mt-6 grid gap-6">
        <RequestKpiCards />
        <RequestTable />
      </div>
    </AdminCrmShell>
  );
}
