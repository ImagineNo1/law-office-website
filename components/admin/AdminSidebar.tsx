"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "پیشخوان", href: "/admin", icon: "M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3v-9.5Z" },
  { label: "درخواست‌ها", href: "/admin/requests", icon: "M7 3h10v18H7V3Zm3 5h4M10 12h4M10 16h3" },
  { label: "قراردادها", href: "/admin/contracts", icon: "M4 7h7l2 2h7v10H4V7Z" },
  { label: "فرم‌های حقوقی", href: "/admin/legal-forms", icon: "M7 3h7l5 5v13H7V3Zm7 0v6h6" },
  { label: "سوالات متداول", href: "/admin/faqs", icon: "M12 18h.01M9.1 9a3 3 0 1 1 5.7 1.4c-.8 1.5-2.8 1.7-2.8 3.6" },
  { label: "مشتریان", href: "/admin/users", icon: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" },
  { label: "پیام‌ها", href: "/admin/messages", icon: "M4 6h16v12H4V6Zm0 1 8 6 8-6" },
  { label: "فایل‌ها", href: "/admin/pages", icon: "M4 7h7l2 2h7v10H4V7Z" },
  { label: "گزارش‌ها", href: "/admin/news", icon: "M5 19V9m7 10V5m7 14v-7" },
  { label: "تنظیمات", href: "/admin/settings", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2M12 19v2M3 12h2M19 12h2" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Icon({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path d={path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-56 flex-col border-l border-border bg-card lg:flex">
      <div className="border-b border-border p-5">
        <Link className="flex items-center gap-3" href="/admin">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </span>
          <span>
            <span className="block text-sm font-bold">موسسه حقوقی</span>
            <span className="text-[10px] text-muted-foreground">عدالت گستر</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                active ? "bg-accent/10 font-semibold text-accent" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
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

      <div className="border-t border-border p-3">
        <Link className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-muted/50 hover:text-foreground" href="/">
          <Icon path="M15 18 9 12l6-6M9 12h12M4 4v16" />
          <span>خروج</span>
        </Link>
      </div>
    </aside>
  );
}
