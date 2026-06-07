"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "خدمات حقوقی", href: "#services", dropdown: true },
  { label: "بانک قراردادها", href: "#contracts" },
  { label: "مرکز دانش", href: "#knowledge" },
  { label: "تماس با ما", href: "#footer" },
];

function ScaleIcon({ className = "size-5" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none"><path d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function MenuIcon({ open }: { open: boolean }) {
  return <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">{open ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /> : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />}</svg>;
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M15 18 9 12l6-6M9 12h12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function RequestIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M14 3v5h5M12 12v6M9 15h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function PublicHeaderClient({ dashboardHref, isLoggedIn }: { dashboardHref: string; isLoggedIn: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky inset-x-0 top-0 z-50 border-b border-border bg-white font-body" dir="rtl">
      <div className="mx-auto flex min-h-24 w-full max-w-[1540px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-16">
        <Link className="flex min-w-40 items-center gap-4" href="/">
          <span className="grid size-14 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_14px_30px_rgba(11,23,42,0.18)]"><ScaleIcon className="size-7" /></span>
          <span>
            <span className="block text-2xl font-black leading-8 text-foreground">وکیلیار</span>
            <span className="block text-xs font-bold text-muted-foreground">سامانه خدمات حقوقی</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-10 lg:flex">
          {links.map((link) => (
            <a className="inline-flex items-center gap-2 text-base font-extrabold text-foreground transition-colors hover:text-accent" href={link.href} key={link.label}>
              {link.label}
              {link.dropdown ? <ChevronDown /> : null}
            </a>
          ))}
        </div>

        <div className="hidden min-w-72 items-center justify-end gap-3 font-body md:flex">
          <Link className="inline-flex h-14 items-center gap-3 rounded-xl bg-[#0B172A] px-7 text-base font-extrabold shadow-[0_14px_30px_rgba(11,23,42,0.18)] transition hover:bg-[#142641]" href={dashboardHref} style={{ color: "#ffffff" }}>
            {isLoggedIn ? "داشبورد" : "ورود"}
            <ArrowIcon />
          </Link>
          <Link className="inline-flex h-14 items-center gap-3 rounded-xl border border-accent bg-white px-7 text-base font-extrabold text-[#0B172A] shadow-[0_14px_30px_rgba(212,168,67,0.08)] transition hover:border-[#b88420] hover:text-[#b88420]" href="/requests/new">
            ثبت درخواست جدید
            <RequestIcon />
          </Link>
        </div>

        <button className="rounded-lg border border-border p-3 lg:hidden" onClick={() => setMobileOpen((value) => !value)} type="button"><MenuIcon open={mobileOpen} /></button>
      </div>

      {mobileOpen ? (
        <div className="border-b border-border bg-white lg:hidden">
          <div className="space-y-3 px-5 py-4 sm:px-8">
            {links.map((link) => <a className="block py-2 text-sm font-bold text-foreground" href={link.href} key={link.label} onClick={() => setMobileOpen(false)}>{link.label}</a>)}
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <Link className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0B172A] px-4 text-sm font-extrabold text-white" href={dashboardHref}>{isLoggedIn ? "داشبورد" : "ورود"}</Link>
              <Link className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-accent px-4 text-sm font-extrabold text-[#0B172A]" href="/requests/new">ثبت درخواست جدید</Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
