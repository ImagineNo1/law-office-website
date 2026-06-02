import Link from "next/link";
import { contactInfo } from "@/lib/mockData";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-muted sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black text-gold">موسسه حقوقی عدالت گستر</p>
          <p className="mt-3 max-w-xl leading-8">
            ارائه خدمات حقوقی تخصصی با رویکرد دقیق، محرمانه و قابل اتکا برای اشخاص، شرکت ها و سازمان ها.
          </p>
        </div>
        <div>
          <p className="font-bold text-foreground">دسترسی سریع</p>
          <div className="mt-3 grid gap-2">
            <Link href="/about">درباره ما</Link>
            <Link href="/blog">وبلاگ</Link>
            <Link href="/news">اخبار</Link>
            <Link href="/admin">پنل مدیریت</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-foreground">اطلاعات تماس</p>
          <div className="mt-3 grid gap-2">
            <span>{contactInfo.phone}</span>
            <span>{contactInfo.email}</span>
            <span>{contactInfo.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
