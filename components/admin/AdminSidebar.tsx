"use client";

import {
  BarChart3,
  FileText,
  FolderOpen,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/admin-actions";

const links = [
  { label: "پیشخوان", href: "/admin", icon: LayoutDashboard },
  { label: "درخواست‌ها", href: "/admin/requests", icon: FileText },
  { label: "خدمات", href: "/admin/services", icon: FolderOpen },
  { label: "قراردادها", href: "/admin/contracts", icon: FileText },
  { label: "فرم‌های حقوقی", href: "/admin/legal-forms", icon: Globe },
  { label: "سوالات متداول", href: "/admin/faqs", icon: MessageSquare },
  { label: "وبلاگ", href: "/admin/blog", icon: Newspaper },
  { label: "اخبار", href: "/admin/news", icon: BarChart3 },
  { label: "پیام‌ها", href: "/admin/messages", icon: MessageSquare },
  { label: "کاربران", href: "/admin/users", icon: Users },
  { label: "تنظیمات", href: "/admin/settings", icon: Settings },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col border-l border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[18px_0_55px_rgba(12,27,51,0.08)] lg:flex">
      <div className="border-b border-sidebar-border p-5">
        <Link className="flex items-center gap-3" href="/admin">
          <span className="grid size-11 place-items-center rounded-lg border border-sidebar-primary/40 bg-sidebar-primary/10 text-sidebar-primary">
            <LayoutDashboard aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block font-heading text-base font-extrabold text-sidebar-foreground">پنل مدیریت</span>
            <span className="text-xs font-bold text-sidebar-foreground/70">موسسه حقوقی</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          const Icon = link.icon;
          return (
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-extrabold transition ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/82 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              href={link.href}
              key={link.href}
            >
              <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.1} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="border-t border-sidebar-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-extrabold text-sidebar-foreground/82 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" type="submit">
          <LogOut aria-hidden="true" className="size-5" strokeWidth={2.1} />
          <span>خروج</span>
        </button>
      </form>
    </aside>
  );
}
