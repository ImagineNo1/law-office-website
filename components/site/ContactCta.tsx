import { Button } from "@/components/ui/Button";
import type { ContactCtaContent } from "@/types";

export function ContactCta({ cta }: { cta: ContactCtaContent }) {
  return (
    <section className="container-shell py-20">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#071225] p-8 text-white shadow-soft sm:p-10 lg:p-14">
        <div className="absolute -left-16 -top-16 size-56 rounded-full bg-gold/24 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-60 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-gold/45 to-transparent" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black text-gold">
              {cta.eyebrow}
            </p>

            <h2 className="font-heading mt-3 max-w-3xl text-4xl font-black leading-[1.3] sm:text-5xl">
              {cta.title}
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              {cta.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={cta.primaryHref}>{cta.primaryLabel}</Button>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/18 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              href={cta.secondaryHref}
            >
              {cta.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
