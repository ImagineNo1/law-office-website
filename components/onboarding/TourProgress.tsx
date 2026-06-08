"use client";

export function TourProgress({ current, total }: { current: number; total: number }) {
  const percent = Math.max(0, Math.min(100, (current / total) * 100));
  return (
    <div className="grid gap-2" aria-label={`مرحله ${current} از ${total}`}>
      <div className="flex items-center justify-between text-xs font-extrabold text-muted-foreground">
        <span>مرحله {new Intl.NumberFormat("fa-IR").format(current)} از {new Intl.NumberFormat("fa-IR").format(total)}</span>
        <span>{new Intl.NumberFormat("fa-IR").format(Math.round(percent))}٪</span>
      </div>
      <span className="block h-2 overflow-hidden rounded-full bg-slate-100">
        <span className="block h-full rounded-full bg-gold transition-all" style={{ width: `${percent}%` }} />
      </span>
    </div>
  );
}
