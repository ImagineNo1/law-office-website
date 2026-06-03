import { Card } from "@/components/ui/Card";
import type { Service } from "@/types";

function ServiceIcon() {
  return (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4v16M7 8h10M8 8l-3 7h6L8 8Zm8 0-3 7h6l-3-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-[18px] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-soft dark:bg-surface-strong/92">
      <div className="absolute -left-12 -top-12 size-40 rounded-full bg-gold/8 blur-3xl transition group-hover:bg-gold/16" />

      <div className="relative mb-7 grid size-[58px] place-items-center self-start rounded-2xl border border-gold/18 bg-[#fbf1dc] text-gold transition group-hover:bg-gold group-hover:text-[#1b1305] dark:bg-gold/10">
        <ServiceIcon />
      </div>

      <h3 className="font-heading relative text-2xl font-black text-foreground">
        {service.title}
      </h3>

      <p className="relative mt-4 flex-1 leading-8 text-muted">
        {service.excerpt}
      </p>

      <span className="relative mt-7 inline-flex items-center gap-2 text-sm font-bold text-gold">
        بیشتر بدانید
        <span aria-hidden="true">←</span>
      </span>
    </Card>
  );
}
