export function LegalLogo({
  compact = false,
  text = "موسسه حقوقی عدالت گستر",
}: {
  compact?: boolean;
  text?: string;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="grid size-[52px] place-items-center rounded-2xl border border-gold/35 bg-gold/10 text-gold shadow-[0_12px_28px_rgba(201,162,74,0.18)]">
        <svg
          aria-hidden="true"
          className="size-7"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 3.5 25 7v7.7c0 5.7-3.6 10.7-9 13.8-5.4-3.1-9-8.1-9-13.8V7l9-3.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M16 8v15M11 12h10M12.2 12l-3.4 7h6.8l-3.4-7Zm7.6 0-3.4 7h6.8l-3.4-7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact ? (
        <span>
          <span className="font-heading block text-base font-black text-foreground sm:text-lg">
            {text}
          </span>
          <span className="hidden text-xs font-medium text-muted sm:block">
            خدمات حقوقی تخصصی
          </span>
        </span>
      ) : null}
    </span>
  );
}
