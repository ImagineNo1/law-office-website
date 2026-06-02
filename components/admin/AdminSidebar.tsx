import Link from "next/link";

const links = [
  { label: "داشبورد", href: "/admin" },
  { label: "وبلاگ", href: "/admin/blog" },
  { label: "اخبار", href: "/admin/news" },
  { label: "صفحات", href: "/admin/pages" },
  { label: "پیام ها", href: "/admin/messages" },
  { label: "کاربران", href: "/admin/users" },
  { label: "تنظیمات", href: "/admin/settings" },
];

export function AdminSidebar() {
  return (
    <aside className="bg-admin-nav p-4 text-white lg:sticky lg:top-0 lg:min-h-screen lg:w-72">
      <Link className="mb-8 flex items-center gap-3" href="/admin">
        <span className="grid size-11 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">عد</span>
        <span>
          <span className="block font-black">موسسه حقوقی</span>
          <span className="text-xs text-slate-400">عدالت گستر</span>
        </span>
      </Link>
      <nav className="grid gap-1">
        {links.map((link, index) => (
          <Link
            className={`rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-white/10 ${index === 0 ? "bg-gold text-white shadow-[0_12px_28px_rgba(200,155,60,0.28)]" : "text-slate-300"}`}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="mt-12 block rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10" href="/">
        خروج به سایت
      </Link>
    </aside>
  );
}
