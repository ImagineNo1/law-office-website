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
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface/86 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <label className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-border bg-surface-strong px-3 text-sm text-muted md:flex">
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
            <path
              d="m21 21-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input className="w-full bg-transparent outline-none placeholder:text-muted" placeholder="جستجو..." />
        </label>
        <form action={logoutAction}>
          <button
            className="rounded-xl border border-border bg-surface-strong px-3 py-2 text-sm font-bold text-muted transition hover:text-foreground"
            type="submit"
          >
            خروج
          </button>
        </form>
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-full border border-border bg-surface-strong py-1 pr-1 pl-4 text-sm font-bold text-foreground">
          <span className="grid size-8 place-items-center rounded-full bg-gold text-white">
            {userName.slice(0, 1)}
          </span>
          {userName}
        </div>
      </div>
    </header>
  );
}
