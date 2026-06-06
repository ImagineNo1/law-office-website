import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/auth";

export async function AdminShell({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description?: string;
  title: string;
}) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background text-foreground" dir="rtl">
      <AdminSidebar />
      <div className="min-w-0 flex-1 lg:mr-56">
        <AdminHeader title={title} description={description} userName={user.fullName} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
