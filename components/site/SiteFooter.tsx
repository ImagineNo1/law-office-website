import Link from "next/link";
import { LegalLogo } from "@/components/site/LegalLogo";
import { contactInfo } from "@/lib/mockData";

export function SiteFooter() {
  return (
    <footer className="bg-admin-nav text-white">
      <div className="container-shell grid gap-8 py-10 text-sm text-slate-300 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="[&_*]:text-white">
            <LegalLogo />
          </div>
          <p className="mt-4 max-w-xl leading-8">
            ارائه خدمات حقوقی تخصصی با تجربه، محرمانگی و ساختار پیگیری شفاف برای اشخاص و کسب و کارها.
          </p>
        </div>
        <div>
          <p className="font-bold text-white">خدمات</p>
          <div className="mt-3 grid gap-2">
            <Link href="/services">خدمات حقوقی</Link>
            <Link href="/institute">معرفی موسسه</Link>
            <Link href="/about">درباره ما</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">دسترسی سریع</p>
          <div className="mt-3 grid gap-2">
            <Link href="/blog">وبلاگ</Link>
            <Link href="/news">اخبار</Link>
            <Link href="/admin">پنل مدیریت</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">اطلاعات تماس</p>
          <div className="mt-3 grid gap-2">
            <span>{contactInfo.phone}</span>
            <span>{contactInfo.email}</span>
            <span>{contactInfo.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">تمامی حقوق برای موسسه حقوقی عدالت گستر محفوظ است.</div>
    </footer>
  );
}
