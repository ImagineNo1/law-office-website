import { Container, PageShell } from "@/components/platform/layout/PageShell";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <PublicHeader />
      <div className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_46%,#FFFFFF_100%)]">
        {children}
      </div>
      <PublicFooter />
    </PageShell>
  );
}

export function PublicPageHero({
  actions,
  description,
  eyebrow,
  title,
}: {
  actions?: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-white py-12 sm:py-16" dir="rtl">
      <Container>
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-black text-accent">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-black leading-[1.35] text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-bold leading-9 text-muted-foreground sm:text-lg">
            {description}
          </p>
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
