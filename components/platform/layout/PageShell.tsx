export function PageShell({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <main
      className={
        dark
          ? "min-h-screen bg-[#071225] text-white"
          : "min-h-screen bg-white text-[#0B172A]"
      }
      dir="rtl"
    >
      {children}
    </main>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-[min(1440px,calc(100%-32px))] ${className}`}>
      {children}
    </div>
  );
}

export function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#FFF8EA] text-[#C9973F] shadow-inner">
      {children}
    </span>
  );
}
