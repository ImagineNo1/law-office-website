export function ContractIcon({
  name = "document",
  className = "size-6",
}: {
  name?: string;
  className?: string;
}) {
  const paths: Record<string, string> = {
    document: "M7 3h7l5 5v13H7V3Zm7 0v6h6M10 13h7M10 17h5",
    home: "M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3V11.5Z",
    briefcase:
      "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 7h16v14H4V7Zm0 5h16M10 12v2h4v-2",
    users:
      "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 10v-2a3 3 0 0 0-2-2.8",
    cart: "M5 6h2l2 11h9l2-8H8M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    tool: "M14 6a5 5 0 0 0 6 6L11 21l-4-4 9-9a5 5 0 0 0-2-2Z",
    shield: "M12 3 20 6v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-3Z",
    check: "M20 6 9 17l-5-5",
    clock: "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    support:
      "M4 13a8 8 0 1 1 16 0v3a3 3 0 0 1-3 3h-2M4 13v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Zm16 0a2 2 0 0 0-2-2h-1v7h1a2 2 0 0 0 2-2v-3Z",
    download: "M12 3v12m0 0 5-5m-5 5-5-5M5 21h14",
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d={paths[name] ?? paths.document}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function categoryIcon(category: string) {
  if (category.includes("ملکی")) return "home";
  if (category.includes("استخدام")) return "briefcase";
  if (category.includes("شراکت") || category.includes("شرکت")) return "users";
  if (category.includes("خرید")) return "cart";
  if (category.includes("پیمان")) return "tool";
  return "document";
}
