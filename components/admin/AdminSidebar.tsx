"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LegalLogo } from "@/components/site/LegalLogo";

const links = [
  { label: "پیشخوان", href: "/admin", icon: "M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9.5Z" },
  { label: "درخواست‌ها", href: "/admin/requests", icon: "M8 7h8M8 12h8M8 17h5M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" },
  { label: "خدمات", href: "/admin/services", icon: "M12 5v14M5 12h14" },
  { label: "قراردادها", href: "/admin/contracts", icon: "M4 7h7l2 2h7v10H4V7Z" },
  { label: "فرم‌های حقوقی", href: "/admin/legal-forms", icon: "M7 3h7l5 5v13H7V3Zm7 0v6h6M10 13h7M10 17h5" },
  { label: "سوالات متداول", href: "/admin/faqs", icon: "M12 18h.01M9.1 9a3 3 0 1 1 5.7 1.4c-.8 1.5-2.8 1.7-2.8 3.6" },
  { label: "مشتریان", href: "/admin/users", icon: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 10v-2a3 3 0 0 0-2-2.8" },
  { label: "پیام‌ها", href: "/admin/messages", icon: "M4 6h16v12H4V6Zm0 1 8 6 8-6" },
  { label: "صفحات", href: "/admin/pages", icon: "M5 4h14v16H5V4Zm4 5h6M9 13h6M9 17h4" },
  { label: "گزارش‌ها", href: "/admin/news", icon: "M5 19V9m7 10V5m7 14v-7" },
  { label: "تنظیمات", href: "/admin/settings", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-l border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-0 lg:min-h-screen lg:w-[286px]">
      <Link className="mb-8 flex items-center gap-3 rounded-2xl bg-slate-50 p-3" href="/admin">
        <LegalLogo compact />
        <span>
          <span className="block font-black text-slate-950">موسسه حقوقی</span>
          <span className="text-xs font-bold text-slate-500">پنل مدیریت محتوا</span>
        </span>
      </Link>
      <nav className="grid gap-1.5">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <Link
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                active
                  ? "bg-[#071326] text-white shadow-lg shadow-slate-900/10"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
              href={link.href}
              key={link.href}
            >
              <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
                <path
                  d={link.icon}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link
        className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-[#C9973F] hover:text-[#9A6A19]"
        href="/"
      >
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18 9 12l6-6M9 12h12M4 4v16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
        بازگشت به سایت
      </Link>
    </aside>
  );
}
