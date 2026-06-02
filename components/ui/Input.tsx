type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm text-muted">
      {label ? <span>{label}</span> : null}
      <input
        className={`h-11 rounded-md border border-gold/15 bg-white/[0.04] px-3 text-foreground outline-none transition placeholder:text-muted/55 focus:border-gold/60 ${className}`}
        {...props}
      />
    </label>
  );
}
