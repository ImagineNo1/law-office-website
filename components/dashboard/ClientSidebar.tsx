"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LegalLogo } from "@/components/site/LegalLogo";

const links = [
  { label: "پیشخوان", href: "/dashboard", icon: "M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9.5Z" },
  { label: "درخواست‌های من", href: "/dashboard/requests", icon: "M8 7h8M8 12h8M8 17h5M5 3h14v18H5V3Z" },
  { label: "قراردادهای من", href: "/dashboard/contracts", icon: "M7 3h7l5 5v13H7V3Zm7 0v6h6M10 13h7M10 17h5" },
  { label: "فایل‌های من", href: "/dashboard/files", icon: "M7 3h7l5 5v13H7V3Z" },
  { label: "پیام‌ها", href: "/dashboard/messages", icon: "M4 6h16v12H4V6Zm0 1 8 6 8-6" },
  { label: "پرداخت‌ها", href: "/dashboard/payments", icon: "M4 7h16v12H4V7Zm0 4h16" },
  { label: "پروفایل کاربری", href: "/dashboard/profile", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" },
];

function activePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ClientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#071326] px-4 py-6 text-white shadow-[24px_0_70px_rgba(0,0,0,0.18)] lg:sticky lg:top-0 lg:min-h-screen lg:w-[306px]">
      <Link className="mb-10 flex items-center gap-3 [&_*]:text-white" href="/dashboard">
        <LegalLogo compact />
        <span>
          <span className="block text-2xl font-black">وکیل‌یار</span>
          <span className="text-sm text-slate-300">پورتال مشتری</span>
        </span>
      </Link>
      <nav className="grid gap-2">
        {links.map((link, index) => {
          const active = activePath(pathname, link.href);
          return (
            <Link className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black transition ${active ? "bg-white/10 text-gold shadow-inner ring-1 ring-gold/30" : "text-slate-200 hover:bg-white/8 hover:text-white"}`} href={link.href} key={link.href}>
              <span className="flex items-center gap-3">
                <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
                  <path d={link.icon} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                </svg>
                {link.label}
              </span>
              {index === 4 ? <span className="grid size-6 place-items-center rounded-full bg-gold text-xs text-white">۲</span> : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-16 rounded-2xl bg-white/8 p-5">
        <p className="text-sm font-black text-white">نیاز به راهنمایی دارید؟</p>
        <p className="mt-2 text-xs leading-6 text-slate-300">درخواست مشاوره جدید را از فرم اصلی ثبت کنید.</p>
        <Link className="mt-4 flex items-center justify-center rounded-xl border border-gold px-4 py-3 text-sm font-black text-gold" href="/requests/new">
          ثبت درخواست
        </Link>
      </div>
    </aside>
  );
}
