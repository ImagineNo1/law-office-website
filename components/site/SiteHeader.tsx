"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LegalLogo } from "@/components/site/LegalLogo";
import type { SiteSettings } from "@/types";

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "خدمات حقوقی", href: "/services", menu: "services" },
  { label: "بانک قراردادها", href: "/contracts", menu: "contracts" },
  { label: "فرم‌های قضایی", href: "/legal-forms", menu: "forms" },
  { label: "منابع حقوقی", href: "/blog", menu: "resources" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const megaGroups = [
  {
    key: "services",
    title: "خدمات حقوقی",
    href: "/services",
    items: [
      ["مشاوره حقوقی", "/services"],
      ["تنظیم قرارداد", "/services"],
      ["تنظیم دادخواست", "/services"],
      ["تنظیم شکواییه", "/services"],
      ["تنظیم اظهارنامه", "/services"],
      ["تنظیم لایحه", "/services"],
      ["پیگیری پرونده", "/services"],
    ],
  },
  {
    key: "contracts",
    title: "بانک قراردادها",
    href: "/contracts",
    items: [
      ["قراردادهای ملکی", "/contracts"],
      ["قراردادهای استخدام", "/contracts"],
      ["قراردادهای شراکت", "/contracts"],
      ["قراردادهای خرید و فروش", "/contracts"],
      ["قراردادهای پیمانکاری", "/contracts"],
      ["قراردادهای کسب‌وکار", "/contracts"],
    ],
  },
  {
    key: "forms",
    title: "فرم‌های قضایی",
    href: "/legal-forms",
    items: [
      ["دادخواست", "/legal-forms"],
      ["شکواییه", "/legal-forms"],
      ["اظهارنامه", "/legal-forms"],
      ["استشهادیه", "/legal-forms"],
      ["لایحه دفاعیه", "/legal-forms"],
    ],
  },
  {
    key: "resources",
    title: "منابع حقوقی",
    href: "/blog",
    items: [
      ["مجله حقوقی", "/blog"],
      ["اخبار حقوقی", "/news"],
      ["سوالات متداول", "/faq"],
      ["آموزش تصویری", "/guides"],
    ],
  },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="m20 20-4.5-4.5m2.5-5.2a7.7 7.7 0 1 1-15.4 0 7.7 7.7 0 0 1 15.4 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M7.4 4.8 9.2 4c.9-.4 1.9.1 2.2 1l.8 2.4c.2.7 0 1.4-.6 1.8l-1.1.8a11 11 0 0 0 3.6 3.6l.8-1.1c.4-.6 1.1-.8 1.8-.6l2.4.8c.9.3 1.4 1.3 1 2.2l-.8 1.8c-.4.8-1.2 1.3-2.1 1.2C10.8 17.3 5.7 12.2 5.1 5.8c-.1-.9.4-1.7 1.2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const phone =
    settings.phone && !/[ØÙÛ]/.test(settings.phone) && settings.phone.includes("۰۲۱")
      ? settings.phone
      : "۰۲۱-۱۲۳۴۵۶۷۸";

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-white/95 shadow-[0_12px_36px_rgba(11,23,42,0.06)] backdrop-blur"
      ref={headerRef}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link
          aria-label="صفحه اصلی"
          className="min-w-0 shrink-0"
          href="/"
          onClick={() => setMobileOpen(false)}
        >
          <LegalLogo text={settings.logoText || settings.siteTitle || "موسسه حقوقی عدالت گستر"} />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-black text-navy lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={`rounded-full px-4 py-2.5 transition ${
                  active
                    ? "bg-gold/10 text-gold"
                    : "hover:bg-soft-gray hover:text-gold"
                }`}
                href={item.href}
                key={item.label}
                onClick={() => item.menu && setMegaOpen((value) => !value)}
                onMouseEnter={() => item.menu && setMegaOpen(true)}
                prefetch={false}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            aria-label="جستجو"
            className="grid size-11 place-items-center rounded-full border border-border bg-white text-navy transition hover:border-gold hover:text-gold"
            type="button"
          >
            <SearchIcon />
          </button>
          <Link
            className="hidden min-h-11 items-center gap-2 rounded-full bg-gold px-4 text-sm font-black text-[#1b1305] shadow-[0_14px_32px_rgba(201,151,63,0.24)] transition hover:bg-gold-light md:inline-flex"
            href="/contact"
          >
            <PhoneIcon />
            {phone}
          </Link>
          <button
            aria-expanded={mobileOpen}
            aria-label="باز کردن منوی سایت"
            className="grid size-11 place-items-center rounded-full border border-border bg-white text-navy transition hover:border-gold hover:text-gold lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                mobileOpen
                  ? "rotate-45 shadow-none"
                  : "shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 top-full hidden border-t border-border bg-white transition lg:block ${
          megaOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="container-shell py-6">
          <div className="mega-menu-panel grid grid-cols-4 overflow-hidden rounded-[10px] border border-border bg-white">
            {megaGroups.map((group, index) => (
              <div
                className={`p-6 ${index > 0 ? "border-r border-border" : ""}`}
                key={group.key}
              >
                <Link
                  className="mb-4 flex items-center justify-between text-base font-black text-navy transition hover:text-gold"
                  href={group.href}
                  onClick={() => setMegaOpen(false)}
                  prefetch={false}
                >
                  {group.title}
                  <span className="h-px w-10 bg-gold/55" />
                </Link>
                <div className="grid gap-3">
                  {group.items.map(([label, href]) => (
                    <Link
                      className="rounded-xl px-3 py-2 text-sm font-bold text-muted transition hover:bg-gold/10 hover:text-gold"
                      href={href}
                      key={label}
                      onClick={() => setMegaOpen(false)}
                      prefetch={false}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="container-shell pb-4 lg:hidden">
          <div className="mobile-drawer rounded-[10px] border border-border bg-white p-3">
            <nav className="grid gap-1 text-sm font-black text-navy">
              {navItems.map((item) => (
                <Link
                  className="rounded-xl px-4 py-3 transition hover:bg-gold/10 hover:text-gold"
                  href={item.href}
                  key={item.label}
                  onClick={() => setMobileOpen(false)}
                  prefetch={false}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 grid gap-3 border-t border-border pt-3">
              {megaGroups.map((group) => (
                <details className="rounded-xl bg-soft-gray px-4 py-3" key={group.key}>
                  <summary className="cursor-pointer text-sm font-black text-navy">
                    {group.title}
                  </summary>
                  <div className="mt-3 grid gap-2">
                    {group.items.map(([label, href]) => (
                      <Link
                        className="text-sm font-bold text-muted"
                        href={href}
                        key={label}
                        onClick={() => setMobileOpen(false)}
                        prefetch={false}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
