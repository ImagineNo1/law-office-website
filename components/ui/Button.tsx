import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const variants = {
  primary: "bg-gold text-ink shadow-[0_10px_32px_rgba(199,151,65,0.22)] hover:bg-gold-light",
  outline: "border border-gold/45 text-gold hover:border-gold hover:bg-gold/10",
  ghost: "text-muted hover:bg-white/5 hover:text-foreground",
};

export function Button({ children, href, variant = "primary", className = "", type = "button" }: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-bold transition ${variants[variant]} ${className}`;

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
