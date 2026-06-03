export function LegalLogo({
  compact = false,
  text = "موسسه حقوقی عدالت گستر",
}: {
  compact?: boolean;
  text?: string;
}) {
  return (
    <span className="inline-flex max-w-full items-center gap-3">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#c9a24a]/35 bg-[#c9a24a]/10 text-[#c9a24a] shadow-[0_12px_28px_rgba(201,162,74,0.16)]">
        <svg
          aria-hidden="true"
          className="size-7"
          fill="none"
          viewBox="0 0 32 32"
        >
          <path
            d="M16 3.5 25 7v7.7c0 5.7-3.6 10.7-9 13.8-5.4-3.1-9-8.1-9-13.8V7l9-3.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M16 8v15M11 12h10M12.2 12l-3.4 7h6.8l-3.4-7Zm7.6 0-3.4 7h6.8l-3.4-7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </span>
      {!compact ? (
        <span className="min-w-0">
          <span className="font-heading block truncate text-base font-extrabold tracking-[-0.015em] text-[#0f172a] dark:text-white sm:text-lg">
            {text}
          </span>
          <span className="hidden truncate text-xs font-medium tracking-[-0.01em] text-[#64748b] dark:text-white/72 sm:block">
            خدمات حقوقی تخصصی
          </span>
        </span>
      ) : null}
    </span>
  );
}
