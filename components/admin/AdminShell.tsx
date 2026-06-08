import { AdminHeader } from "@/components/admin/AdminHeader";
import { TourProvider } from "@/components/onboarding/TourProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/auth";
import { getAdminTourState, markAdminTourCompleted } from "@/lib/onboarding/actions";

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
  const tourState = await getAdminTourState();

  return (
    <TourProvider initialState={tourState} kind="admin" markCompletedAction={markAdminTourCompleted}>
      <div className="admin-surface flex min-h-screen font-body text-foreground" dir="rtl">
      <AdminSidebar />
      <div className="min-w-0 flex-1 lg:mr-64">
        <AdminHeader title={title} description={description} userName={user.fullName} />
        <main className="p-4 sm:p-6 lg:p-8" data-tour="admin-dashboard">{children}</main>
      </div>
      </div>
    </TourProvider>
  );
}
