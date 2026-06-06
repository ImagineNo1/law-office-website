import { fallbackServices, type PlatformService } from "@/lib/platform-db";
import { ServiceCard } from "@/components/platform/services/ServiceCard";

export function ServicesShowcase({ services = fallbackServices }: { services?: PlatformService[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard desc={service.description} key={service.slug} sla={service.sla} slug={service.slug} tag={service.tag} title={service.title} />
      ))}
    </div>
  );
}
