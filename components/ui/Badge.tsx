type BadgeProps = {
  children: React.ReactNode;
  tone?: "gold" | "green" | "muted";
};

const tones = {
  gold: "border-gold/25 bg-gold/10 text-gold",
  green: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  muted: "border-white/10 bg-white/5 text-muted",
};

export function Badge({ children, tone = "gold" }: BadgeProps) {
  return <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}
