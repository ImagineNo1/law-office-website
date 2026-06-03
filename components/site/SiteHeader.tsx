"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LegalLogo } from "@/components/site/LegalLogo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "معرفی موسسه", href: "/institute" },
  { label: "خدمات", href: "/services" },
  { label: "وبلاگ", href: "/blog" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/92 shadow-[0_1px_22px_rgba(15,23,42,0.045)] backdrop-blur-xl transition dark:bg-background/86">
      <div className="container-shell grid h-20 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          className="justify-self-start lg:justify-self-start"
          href="/"
          aria-label="موسسه حقوقی عدالت گستر"
          onClick={() => setOpen(false)}
        >
          <LegalLogo />
        </Link>

        <nav className="hidden items-center justify-center rounded-full border border-border bg-white/88 px-2 py-1 text-sm font-bold text-muted shadow-[0_14px_34px_rgba(15,23,42,0.055)] dark:bg-surface-strong/78 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                className={`rounded-full px-4 py-2 transition ${
                  active
                    ? "bg-surface text-foreground"
                    : "hover:bg-surface hover:text-foreground"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <ThemeToggle />

          <Button
            className="hidden rounded-xl px-4 shadow-[0_10px_24px_rgba(200,155,60,0.25)] sm:inline-flex"
            href="/contact"
          >
            مشاوره حقوقی
          </Button>

          <button
            className="grid size-10 place-items-center rounded-xl border border-border bg-white text-foreground transition hover:border-gold/40 hover:text-gold dark:bg-surface-strong lg:hidden"
            type="button"
            aria-label="منوی سایت"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
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
      </div>

      {open ? (
        <div className="container-shell pb-4 lg:hidden">
          <div className="rounded-3xl border border-border bg-white/96 p-3 shadow-soft backdrop-blur dark:bg-surface-strong/96">
            <nav className="grid gap-1 text-sm font-bold text-muted">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    className={`rounded-2xl px-4 py-3 transition ${
                      active
                        ? "bg-surface text-foreground"
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
              <Button className="w-full" href="/contact">
                دریافت مشاوره حقوقی
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
