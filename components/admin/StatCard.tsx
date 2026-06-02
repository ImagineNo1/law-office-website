import { Card } from "@/components/ui/Card";

export function StatCard({ change, label, value }: { change?: string; label: string; value: string }) {
  return (
    <Card className="p-5">
      <p className="text-sm font-bold text-muted">{label}</p>
      <strong className="mt-4 block text-3xl text-foreground">{value}</strong>
      {change ? <span className="mt-3 block text-xs font-bold text-emerald-600 dark:text-emerald-300">{change}</span> : null}
    </Card>
  );
}
