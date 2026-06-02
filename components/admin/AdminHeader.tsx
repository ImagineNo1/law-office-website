import { ThemeToggle } from "@/components/site/ThemeToggle";

export function AdminHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface/86 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <label className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-border bg-surface-strong px-3 text-sm text-muted md:flex">
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
            <path d="m21 21-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input className="w-full bg-transparent outline-none placeholder:text-muted" placeholder="جستجو..." />
        </label>
        <button className="grid size-10 place-items-center rounded-xl border border-border bg-surface-strong text-muted transition hover:text-foreground" type="button" aria-label="اعلان ها">
          <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
            <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2ZM10 21h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-full border border-border bg-surface-strong py-1 pr-1 pl-4 text-sm font-bold text-foreground">
          <span className="grid size-8 place-items-center rounded-full bg-gold text-white">م</span>
          مدیر سایت
        </div>
      </div>
    </header>
  );
}
