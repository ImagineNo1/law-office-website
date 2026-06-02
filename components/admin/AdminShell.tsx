import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ children, description, title }: { children: React.ReactNode; description?: string; title: string }) {
  return (
    <div className="min-h-screen bg-surface text-foreground lg:flex lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title={title} description={description} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
