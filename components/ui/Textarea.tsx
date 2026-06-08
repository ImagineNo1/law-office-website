type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {label ? <span>{label}</span> : null}
      <textarea
        className={`min-h-32 rounded-xl border border-border bg-background px-3 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-emerald-500 focus:ring-4 focus:ring-[var(--ring)] ${className}`}
        {...props}
      />
    </label>
  );
}
