"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LegalLogo } from "@/components/site/LegalLogo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import type { SiteSettings } from "@/types";

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "معرفی موسسه", href: "/institute" },
  { label: "خدمات", href: "/services" },
  { label: "وبلاگ", href: "/blog" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 h-[84px] border-b border-[#ece6d8] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition dark:border-[rgba(212,168,79,0.16)] dark:bg-[#05070d] dark:shadow-none">
      <div className="container-shell grid h-[84px] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[240px_minmax(0,1fr)_240px]" dir="ltr">
        <div className="flex items-center gap-3 justify-self-start lg:col-start-1">
          <ThemeToggle />

          <Link
            className="hidden min-h-[52px] items-center justify-center rounded-2xl bg-[#c9a24a] px-6 text-sm font-extrabold text-[#111827] shadow-[0_12px_30px_rgba(201,162,74,0.24)] transition hover:bg-[#d8b45c] dark:bg-[#d4a84f] dark:hover:bg-[#e0b85d] sm:inline-flex"
            href="/contact"
          >
            مشاوره حقوقی
          </Link>

          <button
            aria-expanded={open}
            aria-label="منوی سایت"
            className="grid size-12 place-items-center rounded-2xl border border-[#ece6d8] bg-white text-[#0f172a] transition hover:border-[#c9a24a] hover:text-[#c9a24a] dark:border-white/12 dark:bg-transparent dark:text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                open
                  ? "rotate-45 shadow-none"
                  : "shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]"
              }`}
            />
          </button>
        </div>

        <nav className="hidden justify-self-center text-sm font-bold text-[#0f172a] dark:text-white/78 lg:flex" dir="rtl">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                className={`relative px-5 py-3 transition after:absolute after:inset-x-5 after:bottom-1 after:h-px after:origin-center after:bg-[#c9a24a] after:transition-transform ${
                  active
                    ? "text-[#c9a24a] after:scale-x-100"
                    : "after:scale-x-0 hover:text-[#c9a24a] dark:hover:text-white"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          aria-label="موسسه حقوقی عدالت گستر"
          className="w-[170px] justify-self-end text-[#0f172a] dark:text-white sm:w-[240px] lg:col-start-3"
          dir="rtl"
          href="/"
          onClick={() => setOpen(false)}
        >
          <LegalLogo text={settings.logoText || settings.siteTitle} />
        </Link>
      </div>

      {open ? (
        <div className="container-shell pb-4 lg:hidden">
          <div className="rounded-3xl border border-[#ece6d8] bg-white p-3 shadow-soft dark:border-[rgba(212,168,79,0.16)] dark:bg-[#05070d]">
            <nav className="grid gap-1 text-sm font-bold text-[#0f172a] dark:text-white/78" dir="rtl">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    className={`rounded-2xl px-4 py-3 transition ${
                      active
                        ? "text-[#c9a24a]"
                        : "hover:text-[#c9a24a] dark:hover:text-white"
                    }`}
                    href={item.href}
                    key={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 border-t border-[#ece6d8] pt-3 dark:border-[rgba(212,168,79,0.16)]">
              <Link
                className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-[#c9a24a] px-6 text-sm font-extrabold text-[#111827] shadow-[0_12px_30px_rgba(201,162,74,0.24)] transition hover:bg-[#d8b45c] dark:bg-[#d4a84f]"
                href="/contact"
              >
                دریافت مشاوره حقوقی
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
