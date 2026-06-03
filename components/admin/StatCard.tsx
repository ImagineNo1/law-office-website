import { Card } from "@/components/ui/Card";

export function StatCard({ change, label, value }: { change?: string; label: string; value: string }) {
  return (
    <Card className="rounded-[18px] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="text-sm font-bold text-muted">{label}</p>
        <span className="grid size-12 place-items-center rounded-2xl bg-gold/10 text-gold">
          <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
            <path d="M4 19V5M4 19h16M8 16V9M12 16V7M16 16v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <strong className="font-heading block text-4xl text-foreground">{value}</strong>
      {change ? <span className="mt-3 block text-xs font-bold text-emerald-600 dark:text-emerald-300">{change}</span> : null}
    </Card>
  );
}
