import { ClientSidebar } from "@/components/dashboard/ClientSidebar";
import { currentClientProfile } from "@/lib/client-portal";
import { getClientSession } from "@/lib/client-auth";

export async function ClientPortalShell({ children, title = "پیشخوان" }: { children: React.ReactNode; title?: string }) {
  const session = await getClientSession();
  const displayName = session?.fullName || currentClientProfile.fullName;
  const initials = displayName.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("") || "ک";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-foreground lg:flex lg:flex-row-reverse">
      <ClientSidebar />
      <div className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white/90 px-4 py-5 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-black text-navy">{title}</h1>
              <p className="mt-2 text-sm font-bold text-slate-500">خوش آمدید، {displayName}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-navy">
              <span className="text-sm font-bold text-slate-500">پشتیبانی ۲۴/۷</span>
              <span className="relative grid size-10 place-items-center rounded-xl border border-slate-200 bg-white">
                پیام
                <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-black text-white">۲</span>
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black">
                <span className="grid size-8 place-items-center rounded-lg bg-[#0B172A] text-xs text-white">{initials}</span>
                {displayName}
              </span>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
