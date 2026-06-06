"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "خدمات حقوقی", href: "#services" },
  { label: "بانک قرارداد", href: "#contracts" },
  { label: "مرکز دانش", href: "#knowledge" },
  { label: "تماس با ما", href: "#footer" },
];

function ScaleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      )}
    </svg>
  );
}

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-xl" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ScaleIcon />
            </span>
            <span>
              <span className="block text-lg font-bold text-foreground">وکیل‌یار</span>
              <span className="-mt-1 block text-[10px] text-muted-foreground">سامانه خدمات، قرارداد و امضا</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted" href="/login">
              ورود به داشبورد
            </Link>
            <Link className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90" href="/signup">
              شروع رایگان
            </Link>
          </div>

          <button className="p-2 md:hidden" onClick={() => setMobileOpen((value) => !value)} type="button">
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-b border-border bg-white md:hidden">
          <div className="space-y-3 px-4 py-4">
            {links.map((link) => (
              <a className="block py-2 text-sm font-medium text-foreground" href={link.href} key={link.label} onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm font-semibold" href="/login">
                ورود
              </Link>
              <Link className="flex-1 rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-accent-foreground" href="/signup">
                ثبت‌نام
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
