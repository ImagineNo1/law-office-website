import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-emerald-700 text-white shadow-[0_16px_34px_rgba(15,118,110,0.24)] hover:bg-emerald-600",
  secondary: "bg-foreground text-background hover:opacity-90",
  outline:
    "border border-border bg-surface-strong/70 text-foreground hover:border-emerald-500/50 hover:text-emerald-700",
  ghost: "text-muted hover:bg-surface/70 hover:text-foreground",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold transition duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--ring)] ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
