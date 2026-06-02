export function AdminHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/10 px-4 py-5 sm:px-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      <div className="rounded-lg border border-gold/15 bg-white/[0.04] px-4 py-2 text-sm text-muted">مدیر سیستم</div>
    </header>
  );
}
