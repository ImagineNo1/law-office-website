import { ThemeToggle } from "@/components/site/ThemeToggle";

export function AdminHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background/82 px-4 py-5 backdrop-blur-xl sm:px-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="rounded-full border border-border bg-surface-strong px-4 py-2 text-sm font-bold text-foreground">مدیر سایت</div>
      </div>
    </header>
  );
}
