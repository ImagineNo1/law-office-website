type BadgeProps = {
  children: React.ReactNode;
  tone?: "green" | "blue" | "muted" | "gold";
};

const tones = {
  gold: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
  green:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  blue: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  muted: "border-border bg-surface text-muted",
};

export function Badge({ children, tone = "green" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
