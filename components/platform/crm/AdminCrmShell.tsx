import { PageShell } from "@/components/platform/layout/PageShell";
import { AdminCrmSidebar } from "@/components/platform/crm/AdminCrmSidebar";

export function AdminCrmShell({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <div className="rounded-[28px] bg-slate-50 lg:flex lg:flex-row-reverse">
        <AdminCrmSidebar />
        <main className="min-w-0 flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </PageShell>
  );
}
