"use client";

import { useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function getSavedTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem("theme", theme);
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6ZM12 2v2.4M12 19.6V22M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M2 12h2.4M19.6 12H22M4.93 19.07l1.7-1.7M17.37 6.63l1.7-1.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M20 14.4A7.6 7.6 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ToggleShell({
  isDark,
  onClick,
}: {
  isDark: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}
      className="relative inline-flex h-10 w-[70px] items-center rounded-full border border-[#ece6d8] bg-white p-1 text-[#0f172a] shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition focus:outline-none focus:ring-4 focus:ring-[rgba(201,162,74,0.28)] dark:border-[rgba(212,168,79,0.16)] dark:bg-white/[0.04] dark:text-white"
      disabled={!onClick}
      onClick={onClick}
      type="button"
    >
      <span className="absolute right-2 grid size-5 place-items-center opacity-70">
        <SunIcon />
      </span>
      <span className="absolute left-2 grid size-5 place-items-center opacity-70">
        <MoonIcon />
      </span>
      <span className={`absolute right-1 z-10 grid size-8 place-items-center rounded-full bg-[#0f172a] text-white shadow-[0_8px_18px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-out dark:bg-[#c9a24a] ${isDark ? "-translate-x-[30px]" : "translate-x-0"}`}>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

export function ThemeToggle() {
  const mounted = useMounted();
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  if (!mounted) {
    return <ToggleShell isDark={false} />;
  }

  const currentTheme = selectedTheme ?? getSavedTheme();
  const isDark = currentTheme === "dark";

  function toggleTheme() {
    const nextTheme: Theme = isDark ? "light" : "dark";

    setSelectedTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return <ToggleShell isDark={isDark} onClick={toggleTheme} />;
}
