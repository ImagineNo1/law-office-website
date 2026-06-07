import { ThemeToggle } from "@/components/site/ThemeToggle";
import { logoutAction } from "@/lib/admin-actions";

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
    <header className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl">
      <div className="hidden min-w-0 flex-1 lg:block">
        <h1 className="truncate text-xl font-black text-navy">{title}</h1>
        <p className="mt-1 truncate text-xs font-bold text-muted">{description ?? title}</p>
      </div>
      <span className="hidden rounded-full border border-border px-3 py-1.5 text-xs font-black text-muted sm:flex">مدیر سیستم</span>
      <ThemeToggle />
      <form action={logoutAction}>
        <button className="rounded-lg px-3 py-2 text-sm font-black text-muted transition hover:bg-slate-100 hover:text-navy" type="submit">
          خروج
        </button>
      </form>
      <span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
        {userName.slice(0, 1)}
      </span>
    </header>
  );
}
