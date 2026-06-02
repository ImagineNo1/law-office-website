import type { Service } from "@/types";
import { Card } from "@/components/ui/Card";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="p-6 transition hover:-translate-y-1 hover:border-gold/35">
      <div className="mb-5 h-1 w-12 rounded-full bg-gold" />
      <h3 className="text-xl font-black text-foreground">{service.title}</h3>
      <p className="mt-4 leading-8 text-muted">{service.excerpt}</p>
    </Card>
  );
}
