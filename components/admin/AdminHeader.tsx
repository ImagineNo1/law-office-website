import { ThemeToggle } from "@/components/site/ThemeToggle";
import { logoutAction } from "@/lib/admin-actions";
import { LogOut, Settings } from "lucide-react";

export function AdminHeader({
  description,
  title,
  userName,
}: {
  title: string;
  description?: string;
  userName: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b border-border bg-card/92 px-4 backdrop-blur-xl">
      <div className="hidden min-w-0 flex-1 lg:block">
        <h1 className="truncate font-heading text-xl font-extrabold text-primary">{title}</h1>
        <p className="mt-1 truncate text-xs font-bold leading-6 text-muted-foreground">{description ?? title}</p>
      </div>
      <span className="hidden items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-extrabold text-muted-foreground sm:flex">
        <Settings aria-hidden="true" className="size-4" />
        مدیر سیستم
      </span>
      <ThemeToggle />
      <form action={logoutAction}>
        <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold text-muted-foreground transition hover:bg-muted hover:text-primary" type="submit">
          <LogOut aria-hidden="true" className="size-4" />
          <span>خروج</span>
        </button>
      </form>
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-extrabold text-primary-foreground">
        {userName.slice(0, 1)}
      </span>
    </header>
  );
}
