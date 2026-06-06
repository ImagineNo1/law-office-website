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
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 sm:max-w-md">
        <svg aria-hidden="true" className="size-4 text-muted-foreground" viewBox="0 0 24 24" fill="none">
          <path d="m21 21-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
        <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" placeholder="جستجو..." />
      </div>
      <div className="hidden min-w-0 flex-1 lg:block">
        <p className="truncate text-xs text-muted-foreground">{description ?? title}</p>
      </div>
      <span className="hidden rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground sm:flex">مدیر سیستم</span>
      <ThemeToggle />
      <form action={logoutAction}>
        <button className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground" type="submit">
          خروج
        </button>
      </form>
      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {userName.slice(0, 1)}
      </span>
    </header>
  );
}
