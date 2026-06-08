"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "صفحه اصلی", href: "/" },
  { label: "خدمات حقوقی", href: "/services" },
  { label: "بانک قراردادها", href: "/contracts" },
  { label: "فرم‌های حقوقی", href: "/legal-forms" },
  { label: "مرکز دانش", href: "/blog" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const trustItems = ["مشاوره اولیه رایگان", "محرمانگی اطلاعات", "پیگیری مرحله‌به‌مرحله", "پشتیبانی آنلاین"];

function ScaleIcon({ className = "size-5" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none"><path d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function CheckIcon() {
  return <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none"><path d="m6 12 4 4 8-9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function MenuIcon({ open }: { open: boolean }) {
  return <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">{open ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /> : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />}</svg>;
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path d="M15 18 9 12l6-6M9 12h12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function RequestIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M14 3v5h5M12 12v6M9 15h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function PublicHeaderClient({ dashboardHref, isLoggedIn }: { dashboardHref: string; isLoggedIn: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-[#E2E8F0] bg-white/95 font-body shadow-[0_12px_35px_rgba(7,21,39,0.04)] backdrop-blur" dir="rtl">
      <div className="border-b border-[#E2E8F0]/80 bg-[#F8FAFC]/80">
        <div className="mx-auto flex min-h-9 max-w-[1540px] items-center justify-center gap-5 px-5 text-[11px] font-black text-[#10233B] sm:px-8 lg:justify-between lg:px-16">
          {trustItems.map((item) => (
            <span className="hidden items-center gap-2 md:inline-flex" key={item}>
              <span className="grid size-5 place-items-center rounded-full bg-[#ECFDF5] text-[#0F766E]"><CheckIcon /></span>
              {item}
            </span>
          ))}
          <span className="inline-flex items-center gap-2 text-[#0F766E] md:hidden"><CheckIcon /> محرمانگی اطلاعات و پشتیبانی آنلاین</span>
        </div>
      </div>

      <nav className="mx-auto flex min-h-20 w-full max-w-[1540px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-16">
        <Link className="flex min-w-36 items-center gap-3" href="/">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#ECFDF5] text-[#0F766E] ring-1 ring-[#0F766E]/10"><ScaleIcon className="size-7" /></span>
          <span>
            <span className="block text-2xl font-black leading-8 text-[#071527]">وکیل‌یار</span>
            <span className="block text-[11px] font-black text-[#64748B]">سامانه خدمات حقوقی</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                className={`inline-flex items-center rounded-2xl px-3.5 py-2.5 text-sm font-black transition-colors ${active ? "bg-[#ECFDF5] text-[#0F766E]" : "text-[#10233B] hover:bg-[#F8FAFC] hover:text-[#0F766E]"}`}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden min-w-72 items-center justify-end gap-3 font-body md:flex">
          <Link className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#071527] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(7,21,39,0.18)] transition hover:bg-[#10233B]" href={dashboardHref}>
            {isLoggedIn ? "داشبورد" : "ورود"}
            <ArrowIcon />
          </Link>
          <Link className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#0F766E] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,118,110,0.18)] transition hover:bg-[#0b625c]" href="/requests/new">
            ثبت درخواست جدید
            <RequestIcon />
          </Link>
        </div>

        <button className="rounded-2xl border border-[#E2E8F0] p-3 text-[#071527] xl:hidden" onClick={() => setMobileOpen((value) => !value)} type="button" aria-label="باز کردن منو"><MenuIcon open={mobileOpen} /></button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-[#E2E8F0] bg-white xl:hidden">
          <div className="space-y-3 px-5 py-4 sm:px-8">
            {links.map((link) => <Link className="block rounded-2xl px-3 py-2 text-sm font-black text-[#10233B] hover:bg-[#F8FAFC]" href={link.href} key={link.label} onClick={() => setMobileOpen(false)}>{link.label}</Link>)}
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <Link className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#071527] px-4 text-sm font-black text-white" href={dashboardHref}>{isLoggedIn ? "داشبورد" : "ورود"}</Link>
              <Link className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0F766E] px-4 text-sm font-black text-white" href="/requests/new">ثبت درخواست جدید</Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
