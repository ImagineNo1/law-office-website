import type { Service } from "@/types";
import { Card } from "@/components/ui/Card";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-soft">
      <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-gold/10 text-lg font-black text-gold">
        {service.title.slice(0, 1)}
      </div>
      <h3 className="text-lg font-black text-foreground">{service.title}</h3>
      <p className="mt-3 leading-8 text-muted">{service.excerpt}</p>
      <span className="mt-5 inline-flex text-sm font-bold text-gold">مشاهده جزئیات</span>
    </Card>
  );
}
