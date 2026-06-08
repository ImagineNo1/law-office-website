"use client";

import {
  BookOpenText,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PenTool,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientLogoutAction } from "@/app/auth-actions";
import { LegalLogo } from "@/components/site/LegalLogo";
import { TourHelpButton } from "@/components/onboarding/TourHelpButton";

const links = [
  {
    label: "پیشخوان",
    href: "/dashboard",
    icon: LayoutDashboard,
    tour: "client-dashboard",
  },
  {
    label: "درخواست‌های من",
    href: "/dashboard/requests",
    icon: FileText,
    tour: "client-requests",
  },
  {
    label: "بانک قراردادها",
    href: "/dashboard/contract-bank",
    icon: BookOpenText,
    tour: "client-contract-bank",
  },
  {
    label: "قراردادهای من",
    href: "/dashboard/contracts",
    icon: PenTool,
    tour: "client-contracts",
  },
  {
    label: "پیام‌ها",
    href: "/dashboard/messages",
    icon: MessageSquare,
    tour: "client-messages",
  },
  {
    label: "پرداخت‌ها",
    href: "/dashboard/payments",
    icon: Download,
    tour: "client-payments",
  },
  {
    label: "پروفایل کاربری",
    href: "/dashboard/profile",
    icon: Users,
    tour: "client-profile",
  },
];

function activePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ClientSidebar() {
  const pathname = usePathname();

  return (
    <aside
      data-tour="client-sidebar"
      className="border-l border-sidebar-border bg-sidebar px-4 py-6 text-sidebar-foreground shadow-[-18px_0_55px_rgba(12,27,51,0.08)] lg:sticky lg:top-0 lg:order-2 lg:min-h-screen lg:w-[306px]"
    >
      <Link
        className="mb-10 flex items-center gap-3 text-sidebar-foreground"
        href="/dashboard"
      >
        <LegalLogo compact />
        <span>
          <span className="block font-display text-2xl font-extrabold">
            وکیل‌یار
          </span>
          <span className="text-sm font-medium text-sidebar-foreground/60">
            پورتال مشتری
          </span>
        </span>
      </Link>
      <nav className="grid gap-2">
        {links.map((link) => {
          const active = activePath(pathname, link.href);
          const Icon = link.icon;
          return (
            <Link
              data-tour={link.tour}
              className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-extrabold transition ${active ? "bg-emerald-700 text-white shadow-sm" : "text-sidebar-foreground/82 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
              href={link.href}
              key={link.href}
            >
              <span className="flex items-center gap-3">
                <Icon aria-hidden="true" className="size-5" strokeWidth={2.1} />
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-12 grid gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/70 p-5">
        <TourHelpButton
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-sidebar-border bg-white px-4 py-3 text-sm font-extrabold text-sidebar-foreground transition hover:border-emerald-600 hover:bg-emerald-50"
          label="راهنما"
          tourId="client-help"
        />
        <form action={clientLogoutAction}>
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-sidebar-border bg-white px-4 py-3 text-sm font-extrabold text-sidebar-foreground transition hover:border-emerald-600 hover:bg-emerald-50"
            type="submit"
          >
            <LogOut aria-hidden="true" className="size-4" />
            خروج
          </button>
        </form>
      </div>
    </aside>
  );
}
