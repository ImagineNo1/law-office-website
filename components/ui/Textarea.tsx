type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <label className="grid gap-2 text-sm text-muted">
      {label ? <span>{label}</span> : null}
      <textarea
        className={`min-h-32 rounded-md border border-gold/15 bg-white/[0.04] px-3 py-3 text-foreground outline-none transition placeholder:text-muted/55 focus:border-gold/60 ${className}`}
        {...props}
      />
    </label>
  );
}
