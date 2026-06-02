import Link from "next/link";

const links = [
  { label: "داشبورد", href: "/admin" },
  { label: "وبلاگ", href: "/admin/blog" },
  { label: "اخبار", href: "/admin/news" },
  { label: "صفحات", href: "/admin/pages" },
  { label: "پیام ها", href: "/admin/messages" },
  { label: "تنظیمات", href: "/admin/settings" },
];

export function AdminSidebar() {
  return (
    <aside className="border-l border-gold/10 bg-ink/80 p-4 lg:min-h-screen lg:w-64">
      <Link className="mb-8 flex items-center gap-3" href="/admin">
        <span className="grid size-10 place-items-center rounded-lg border border-gold/35 text-gold">پن</span>
        <span className="font-black text-foreground">پنل مدیریت</span>
      </Link>
      <nav className="grid gap-2">
        {links.map((link) => (
          <Link className="rounded-lg px-4 py-3 text-sm font-bold text-muted transition hover:bg-gold/10 hover:text-gold" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
