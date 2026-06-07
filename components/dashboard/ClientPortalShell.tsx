import { ClientSidebar } from "@/components/dashboard/ClientSidebar";
import { getCurrentClient } from "@/lib/client-auth";
import { getClientMessages } from "@/lib/client-portal-db";
import { Bell, Clock } from "lucide-react";

export async function ClientPortalShell({ children, title = "پیشخوان" }: { children: React.ReactNode; title?: string }) {
  const client = await getCurrentClient();
  const displayName = client?.fullName || "کاربر";
  const initials = displayName.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("") || "ک";
  const unreadCount = client ? (await getClientMessages(client)).filter((message) => message.sender === "admin").length : 0;

  return (
    <div className="dashboard-surface min-h-screen font-body text-foreground lg:flex lg:flex-row-reverse">
      <ClientSidebar />
      <div className="min-w-0 flex-1">
        <header className="border-b border-border bg-card/92 px-4 py-5 shadow-sm backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-primary">{title}</h1>
              <p className="mt-2 text-sm font-medium leading-8 text-muted-foreground">خوش آمدید، {displayName}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-primary">
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-bold text-muted-foreground">
                <Clock aria-hidden="true" className="size-4" />
                پشتیبانی ۲۴/۷
              </span>
              <span className="relative grid size-10 place-items-center rounded-lg border border-border bg-card text-primary">
                <Bell aria-hidden="true" className="size-5" />
                {unreadCount ? <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-extrabold text-accent-foreground">{unreadCount}</span> : null}
              </span>
              <span className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-extrabold">
                <span className="grid size-8 place-items-center rounded-lg bg-primary text-xs text-primary-foreground">{initials}</span>
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
