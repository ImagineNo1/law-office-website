import Link from "next/link";
import { LegalLogo } from "@/components/site/LegalLogo";
import { contactInfo } from "@/lib/mockData";

export function SiteFooter() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="container-shell grid gap-10 border-t border-white/10 py-14 text-sm text-slate-300 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="[&_*]:text-white">
            <LegalLogo />
          </div>

          <p className="mt-5 max-w-xl leading-8 text-slate-300">
            ارائه خدمات حقوقی تخصصی با تجربه، محرمانگی و ساختار پیگیری شفاف
            برای اشخاص، شرکت ها و سازمان ها.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["لینکدین", "اینستاگرام", "تلگرام"].map((item) => (
              <span
                className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-gold/40 hover:text-gold"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-black text-white">خدمات</p>
          <div className="mt-4 grid gap-3">
            <Link className="transition hover:text-gold" href="/services">
              خدمات حقوقی
            </Link>
            <Link className="transition hover:text-gold" href="/institute">
              معرفی موسسه
            </Link>
            <Link className="transition hover:text-gold" href="/about">
              درباره ما
            </Link>
          </div>
        </div>

        <div>
          <p className="font-black text-white">دسترسی سریع</p>
          <div className="mt-4 grid gap-3">
            <Link className="transition hover:text-gold" href="/blog">
              وبلاگ
            </Link>
            <Link className="transition hover:text-gold" href="/news">
              اخبار
            </Link>
            <Link className="transition hover:text-gold" href="/admin">
              پنل مدیریت
            </Link>
          </div>
        </div>

        <div>
          <p className="font-black text-white">اطلاعات تماس</p>
          <div className="mt-4 grid gap-3 leading-7">
            <span>{contactInfo.phone}</span>
            <span>{contactInfo.email}</span>
            <span>{contactInfo.address}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        تمام حقوق برای موسسه حقوقی عدالت گستر محفوظ است.
      </div>
    </footer>
  );
}
