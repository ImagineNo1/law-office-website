"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/admin-actions";

const links = [
  { label: "پیشخوان", href: "/admin", icon: "M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3v-9.5Z" },
  { label: "درخواست‌ها", href: "/admin/requests", icon: "M7 3h10v18H7V3Zm3 5h4M10 12h4M10 16h3" },
  { label: "خدمات", href: "/admin/services", icon: "M12 5v14M5 12h14" },
  { label: "قراردادها", href: "/admin/contracts", icon: "M4 7h7l2 2h7v10H4V7Z" },
  { label: "فرم‌های حقوقی", href: "/admin/legal-forms", icon: "M7 3h7l5 5v13H7V3Zm7 0v6h6" },
  { label: "سوالات متداول", href: "/admin/faqs", icon: "M12 18h.01M9.1 9a3 3 0 1 1 5.7 1.4c-.8 1.5-2.8 1.7-2.8 3.6" },
  { label: "وبلاگ", href: "/admin/blog", icon: "M5 4h14v16H5V4Zm4 5h6M9 13h6M9 17h4" },
  { label: "اخبار", href: "/admin/news", icon: "M5 19V9m7 10V5m7 14v-7" },
  { label: "پیام‌ها", href: "/admin/messages", icon: "M4 6h16v12H4V6Zm0 1 8 6 8-6" },
  { label: "کاربران", href: "/admin/users", icon: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" },
  { label: "تنظیمات", href: "/admin/settings", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2M12 19v2M3 12h2M19 12h2" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Icon({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none">
      <path d={path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col border-l border-slate-200 bg-[#071326] text-white shadow-[24px_0_70px_rgba(0,0,0,0.14)] lg:flex">
      <div className="border-b border-white/10 p-5">
        <Link className="flex items-center gap-3" href="/admin">
          <span className="flex size-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold">
            <Icon path="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
          </span>
          <span>
            <span className="block text-base font-black">پنل مدیریت</span>
            <span className="text-xs font-bold text-slate-300">موسسه حقوقی</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <Link
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-black transition ${
                active ? "bg-white/10 text-gold ring-1 ring-gold/30" : "text-slate-200 hover:bg-white/8 hover:text-white"
              }`}
              href={link.href}
              key={link.href}
            >
              <Icon path={link.icon} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="border-t border-white/10 p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-black text-slate-200 transition hover:bg-white/8 hover:text-white" type="submit">
          <Icon path="M15 18 9 12l6-6M9 12h12M4 4v16" />
          <span>خروج</span>
        </button>
      </form>
    </aside>
  );
}
