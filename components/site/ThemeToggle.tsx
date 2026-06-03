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
      <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6ZM12 2v2.4M12 19.6V22M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M2 12h2.4M19.6 12H22M4.93 19.07l1.7-1.7M17.37 6.63l1.7-1.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path d="M20 14.4A7.6 7.6 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
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
      className="relative inline-flex h-10 w-[70px] items-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white p-1 text-[#0f172a] shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition focus:outline-none focus:ring-4 focus:ring-[var(--ring)] dark:border-[rgba(212,168,79,0.12)] dark:bg-white/[0.03] dark:text-gold"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <span className="absolute right-2 grid size-5 place-items-center opacity-70">
        <SunIcon />
      </span>
      <span className="absolute left-2 grid size-5 place-items-center opacity-70">
        <MoonIcon />
      </span>
      <span className={`absolute right-1 z-10 grid size-8 place-items-center rounded-full bg-[#0f172a] text-white shadow-[0_8px_18px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-out dark:bg-gold dark:text-[#1b1305] ${isDark ? "-translate-x-[30px]" : "translate-x-0"}`}>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
