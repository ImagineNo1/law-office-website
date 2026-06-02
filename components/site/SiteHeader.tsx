import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "معرفی موسسه", href: "/institute" },
  { label: "خدمات", href: "/services" },
  { label: "وبلاگ", href: "/blog" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/82 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-5">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-11 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-base font-black text-gold">
            عد
          </span>
          <span>
            <span className="block text-sm font-black text-foreground sm:text-base">موسسه حقوقی عدالت گستر</span>
            <span className="hidden text-xs font-medium text-muted sm:block">خدمات حقوقی تخصصی</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted lg:flex">
          {navItems.map((item) => (
            <Link className="transition hover:text-foreground" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button className="hidden sm:inline-flex" href="/contact">
            مشاوره حقوقی
          </Button>
        </div>
      </div>
    </header>
  );
}
