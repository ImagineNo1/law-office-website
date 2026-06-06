import { recoveryServices } from "@/lib/platform-recovery-data";
import { ServiceCard } from "@/components/platform/services/ServiceCard";

export function ServicesShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {recoveryServices.map(([title, slug, desc, tag, sla]) => (
        <ServiceCard desc={desc} key={slug} sla={sla} slug={slug} tag={tag} title={title} />
      ))}
    </div>
  );
}
