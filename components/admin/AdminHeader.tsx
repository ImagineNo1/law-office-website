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
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background/82 px-4 py-5 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div>
        <h1 className="font-heading text-3xl font-black text-foreground">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <label className="hidden h-11 w-72 items-center gap-2 rounded-xl border border-border bg-surface-strong/80 px-3 text-sm text-muted md:flex">
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
            className="rounded-xl border border-border bg-surface-strong/80 px-3 py-2 text-sm font-bold text-muted transition hover:text-foreground"
            type="submit"
          >
            خروج
          </button>
        </form>
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-full border border-border bg-surface-strong/80 py-1 pr-1 pl-4 text-sm font-bold text-foreground">
          <span className="grid size-9 place-items-center rounded-full bg-gold text-[#1b1305]">
            {userName.slice(0, 1)}
          </span>
          {userName}
        </div>
      </div>
    </header>
  );
}
