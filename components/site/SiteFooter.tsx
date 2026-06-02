import Link from "next/link";
import { contactInfo } from "@/lib/mockData";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-shell grid gap-8 py-10 text-sm text-muted lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gold/10 text-base font-black text-gold">عد</span>
            <p className="text-lg font-black text-foreground">موسسه حقوقی عدالت گستر</p>
          </div>
          <p className="mt-4 max-w-xl leading-8">
            ارائه خدمات حقوقی تخصصی با تجربه، محرمانگی و ساختار پیگیری شفاف برای اشخاص و کسب و کارها.
          </p>
        </div>
        <div>
          <p className="font-bold text-foreground">دسترسی سریع</p>
          <div className="mt-3 grid gap-2">
            <Link href="/services">خدمات</Link>
            <Link href="/about">درباره ما</Link>
            <Link href="/blog">وبلاگ</Link>
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
