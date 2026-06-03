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
    <header className="sticky top-0 z-40 h-[88px] border-b border-[rgba(15,23,42,0.08)] bg-[rgba(248,245,239,0.9)] backdrop-blur-[20px] transition dark:border-[rgba(212,168,79,0.12)] dark:bg-[rgba(3,6,18,0.75)] dark:backdrop-blur-[18px]">
      <div className="container-shell grid h-[88px] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[240px_minmax(0,1fr)_240px]" dir="ltr">
        <div className="flex items-center gap-3 justify-self-start lg:col-start-1">
          <ThemeToggle />

          <Link
            className="hidden min-h-[52px] items-center justify-center rounded-2xl bg-[#d4a84f] px-6 text-sm font-extrabold text-[#1b1305] shadow-[0_12px_30px_rgba(212,168,79,0.25)] transition hover:bg-[#e0b85d] sm:inline-flex"
            href="/contact"
          >
            مشاوره حقوقی
          </Link>

          <button
            aria-expanded={open}
            aria-label="منوی سایت"
            className="grid size-12 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-foreground transition hover:border-gold/40 hover:text-gold dark:border-[rgba(212,168,79,0.12)] dark:bg-white/[0.03] lg:hidden"
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

        <nav className="hidden justify-self-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white px-2 py-2 text-sm font-bold text-muted shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-[rgba(212,168,79,0.08)] dark:bg-white/[0.03] lg:flex" dir="rtl">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                className={`relative rounded-full px-4 py-2 transition ${
                  active
                    ? "bg-gold/10 text-gold"
                    : "hover:bg-surface/70 hover:text-foreground dark:hover:bg-white/[0.05]"
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
          className="w-[170px] justify-self-end sm:w-[240px] lg:col-start-3"
          dir="rtl"
          href="/"
          onClick={() => setOpen(false)}
        >
          <LegalLogo text={settings.logoText || settings.siteTitle} />
        </Link>

      </div>

      {open ? (
        <div className="container-shell pb-4 lg:hidden">
          <div className="rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[rgba(248,245,239,0.96)] p-3 shadow-soft backdrop-blur dark:border-[rgba(212,168,79,0.12)] dark:bg-[#050b12]/96">
            <nav className="grid gap-1 text-sm font-bold text-muted" dir="rtl">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    className={`rounded-2xl px-4 py-3 transition ${
                      active
                        ? "bg-gold/10 text-gold"
                        : "hover:bg-surface hover:text-foreground"
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

            <div className="mt-3 border-t border-border pt-3">
              <Link
                className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-[#d4a84f] px-6 text-sm font-extrabold text-[#1b1305] shadow-[0_12px_30px_rgba(212,168,79,0.25)] transition hover:bg-[#e0b85d]"
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
