export function ServiceIcon({
  name = "scale",
  className = "size-6",
}: {
  name?: string;
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "gavel") {
    return (
      <svg {...common}>
        <path d="m13 5 6 6M5 13l6 6M11 7l6 6-4 4-6-6 4-4Zm-2 8-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "document" || name === "brief") {
    return (
      <svg {...common}>
        <path d="M7 3h7l4 4v14H7V3Zm7 0v5h4M9.5 12h5M9.5 16h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4V6Zm1.5 1.5L12 13l6.5-5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "case") {
    return (
      <svg {...common}>
        <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m5 4v9H4v-9m16 0H4m16 0V7H4v3m6 3h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "folder") {
    return (
      <svg {...common}>
        <path d="M4 6h6l2 2h8v10.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V6Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <path d="M7 4v3m10-3v3M4.5 9h15M6 6h12a1.5 1.5 0 0 1 1.5 1.5V19A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7.5A1.5 1.5 0 0 1 6 6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 20 6v6.8c0 4.4-3.2 7.1-8 8.2-4.8-1.1-8-3.8-8-8.2V6l8-3Zm-3 9 2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg {...common}>
        <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 3v18M6 7h12M7 7l-4 8h8L7 7Zm10 0-4 8h8l-4-8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}
