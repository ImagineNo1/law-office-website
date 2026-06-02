import { Card } from "@/components/ui/Card";

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-muted">{label}</p>
      <strong className="mt-3 block text-3xl text-foreground">{value}</strong>
      <span className="mt-2 block text-xs text-gold">مشاهده همه</span>
    </Card>
  );
}
