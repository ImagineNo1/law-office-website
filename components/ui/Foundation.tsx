import Link from "next/link";

type WithChildren = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: WithChildren) {
  return <div className={`container-shell ${className}`}>{children}</div>;
}

export function Section({ children, className = "" }: WithChildren) {
  return <section className={`py-16 sm:py-20 lg:py-24 ${className}`}>{children}</section>;
}

export function Badge({ children, className = "" }: WithChildren) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-black text-gold ${className}`}
    >
      {children}
    </span>
  );
}

export function IconBadge({ children, className = "" }: WithChildren) {
  return (
    <span
      className={`grid size-14 shrink-0 place-items-center rounded-2xl border border-gold/20 bg-[#FCF4E4] text-gold shadow-[0_12px_30px_rgba(201,151,63,0.12)] ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`mx-auto mb-10 max-w-3xl ${
        align === "center" ? "text-center" : "mx-0 text-right"
      }`}
    >
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-4 text-balance text-3xl font-black leading-[1.35] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-8 text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex min-h-24 items-center gap-4 border-border px-5 py-4 sm:border-l last:sm:border-l-0">
      <IconBadge className="size-12 rounded-full bg-soft-gray shadow-none">{icon}</IconBadge>
      <div>
        <p className="text-2xl font-black leading-none text-foreground">{value}</p>
        <p className="mt-2 text-sm font-bold leading-6 text-muted">{label}</p>
      </div>
    </div>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: WithChildren & { href: string }) {
  return (
    <Link
      className={`inline-flex items-center gap-2 text-sm font-black text-gold transition hover:text-gold-light ${className}`}
      href={href}
      prefetch={false}
    >
      {children}
      <span aria-hidden="true">←</span>
    </Link>
  );
}
