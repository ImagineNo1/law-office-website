"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LegalLogo } from "@/components/site/LegalLogo";

const links = [
  { label: "داشبورد", href: "/admin", icon: "M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9.5Z" },
  { label: "وبلاگ", href: "/admin/blog", icon: "M6 4h12v16H6V4Zm3 4h6M9 12h6M9 16h4" },
  { label: "اخبار", href: "/admin/news", icon: "M5 5h14v14H5V5Zm3 4h8M8 13h8M8 17h5" },
  { label: "خدمات", href: "/admin/services", icon: "M12 4v16M7 8h10M8 8l-3 7h6L8 8Zm8 0-3 7h6l-3-7Z" },
  { label: "صفحات", href: "/admin/pages", icon: "M7 3h7l4 4v14H7V3Zm7 0v5h5" },
  { label: "پیام ها", href: "/admin/messages", icon: "M4 6h16v12H4V6Zm0 1 8 6 8-6" },
  { label: "کاربران", href: "/admin/users", icon: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 10v-2a3 3 0 0 0-2-2.8" },
  { label: "تنظیمات", href: "/admin/settings", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-admin-nav p-4 text-white shadow-[24px_0_70px_rgba(0,0,0,0.18)] lg:sticky lg:top-0 lg:min-h-screen lg:w-[304px]">
      <Link className="mb-10 flex items-center gap-3 [&_*]:text-white" href="/admin">
        <LegalLogo compact />
        <span>
          <span className="block font-black">موسسه حقوقی</span>
          <span className="text-xs text-slate-400">عدالت گستر</span>
        </span>
      </Link>
      <nav className="grid gap-1.5">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);

          return (
            <Link
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                active
                  ? "bg-gold text-[#1b1305] shadow-[0_12px_28px_rgba(212,168,79,0.28)]"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`}
              href={link.href}
              key={link.href}
            >
              <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
                <path
                  d={link.icon}
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link
        className="mt-12 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/8 hover:text-white"
        href="/"
      >
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18 9 12l6-6M9 12h12M4 4v16"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        بازگشت به سایت
      </Link>
    </aside>
  );
}
