"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6ZM12 2v2.4M12 19.6V22M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M2 12h2.4M19.6 12H22M4.93 19.07l1.7-1.7M17.37 6.63l1.7-1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path d="M20 14.4A7.6 7.6 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", theme);
  }, [isDark, theme]);

  return (
    <button
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}
      className="relative inline-flex h-9 w-[66px] items-center rounded-full border border-border bg-surface p-1 text-muted transition hover:text-foreground focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <span className="absolute right-2 grid size-5 place-items-center">
        <SunIcon />
      </span>
      <span className="absolute left-2 grid size-5 place-items-center">
        <MoonIcon />
      </span>
      <span className={`relative z-10 grid size-7 place-items-center rounded-full bg-surface-strong text-gold shadow-card transition-transform duration-300 ${isDark ? "-translate-x-8" : "translate-x-0"}`}>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
