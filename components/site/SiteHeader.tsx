import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "معرفی موسسه", href: "/institute" },
  { label: "درباره ما", href: "/about" },
  { label: "وبلاگ", href: "/blog" },
  { label: "اخبار", href: "/news" },
  { label: "ارتباط با ما", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/10 bg-ink/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center rounded-lg border border-gold/40 bg-gold/10 text-sm font-black text-gold">عد</span>
          <span className="text-sm font-bold text-foreground sm:text-base">موسسه حقوقی عدالت گستر</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {navItems.map((item) => (
            <Link className="transition hover:text-gold" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button className="hidden sm:inline-flex" href="/contact">
          مشاوره حقوقی
        </Button>
      </div>
    </header>
  );
}
