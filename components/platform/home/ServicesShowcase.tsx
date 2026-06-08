import { fallbackServices, type PlatformService } from "@/lib/platform-db";
import { ServiceCard } from "@/components/platform/services/ServiceCard";

export function ServicesShowcase({
  services = fallbackServices,
}: {
  services?: PlatformService[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.slice(0, 8).map((service, index) => (
        <ServiceCard
          desc={service.description}
          index={index}
          key={service.slug}
          sla={service.sla}
          slug={service.slug}
          tag={service.tag}
          title={service.title}
        />
      ))}
    </div>
  );
}
