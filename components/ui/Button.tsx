import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const variants = {
  primary: "bg-gold text-[#1b1305] shadow-[0_16px_34px_rgba(201,162,74,0.26)] hover:bg-gold-light",
  secondary: "bg-foreground text-background hover:opacity-90",
  outline: "border border-border bg-surface-strong/70 text-foreground hover:border-gold/50 hover:text-gold",
  ghost: "text-muted hover:bg-surface/70 hover:text-foreground",
};

export function Button({ children, href, variant = "primary", className = "", type = "button" }: ButtonProps) {
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
