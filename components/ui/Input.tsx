type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {label ? <span>{label}</span> : null}
      <input
        className={`h-11 rounded-xl border border-border bg-background px-3 text-foreground outline-none transition placeholder:text-muted focus:border-emerald-500 focus:ring-4 focus:ring-[var(--ring)] ${className}`}
        {...props}
      />
    </label>
  );
}
