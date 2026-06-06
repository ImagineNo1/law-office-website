import { ClientSidebar } from "@/components/dashboard/ClientSidebar";
import { currentClientProfile } from "@/lib/client-portal";

export function ClientPortalShell({ children, title = "داشبورد مشتری" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground lg:flex lg:flex-row-reverse">
      <ClientSidebar />
      <div className="min-w-0 flex-1">
        <header className="border-b border-border bg-white/90 px-4 py-5 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-black text-navy">{title}</h1>
              <p className="mt-2 text-sm font-bold text-muted">خوش آمدید، {currentClientProfile.fullName}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-navy">
              <span className="text-sm font-bold text-muted">پشتیبانی ۲۴/۷ · ۰۲۱-۱۲۳۴۵۶۷۸</span>
              <span className="relative grid size-10 place-items-center rounded-xl border border-border bg-white">🔔<span className="absolute -top-1 -left-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-black text-white">۳</span></span>
              <span className="relative grid size-10 place-items-center rounded-xl border border-border bg-white">✉<span className="absolute -top-1 -left-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-black text-white">۲</span></span>
              <span className="grid size-10 place-items-center rounded-xl border border-border bg-white">🎧</span>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
