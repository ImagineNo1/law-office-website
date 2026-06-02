import type { Service } from "@/types";
import { Card } from "@/components/ui/Card";

function ServiceIcon() {
  return (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16M7 8h10M8 8l-3 7h6L8 8Zm8 0-3 7h6l-3-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group flex min-h-[210px] flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-soft">
      <div className="mb-5 grid size-12 place-items-center rounded-2xl border border-gold/15 bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-white">
        <ServiceIcon />
      </div>
      <h3 className="text-lg font-black text-foreground">{service.title}</h3>
      <p className="mt-3 flex-1 leading-8 text-muted">{service.excerpt}</p>
      <span className="mt-5 inline-flex text-sm font-bold text-gold">بیشتر بدانید</span>
    </Card>
  );
}
