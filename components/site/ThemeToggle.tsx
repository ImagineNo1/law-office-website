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

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      aria-label="تغییر حالت روشن و تیره"
      className="relative inline-flex h-10 w-20 items-center rounded-full border border-border bg-surface p-1 transition"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <span className="sr-only">تغییر حالت سایت</span>
      <span className={`grid size-8 place-items-center rounded-full bg-surface-strong text-xs shadow-card transition ${isDark ? "translate-x-[-38px]" : ""}`}>
        {isDark ? "ماه" : "خور"}
      </span>
    </button>
  );
}
