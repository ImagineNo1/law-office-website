import Link from "next/link";
import { LegalLogo } from "@/components/site/LegalLogo";
import type { SiteSettings } from "@/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const socialLinks = [
    ["لینکدین", settings.socialLinks.linkedin],
    ["اینستاگرام", settings.socialLinks.instagram],
    ["تلگرام", settings.socialLinks.telegram],
  ].filter(([, href]) => href);

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="container-shell grid gap-10 border-t border-white/10 py-14 text-sm text-slate-300 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="[&_*]:text-white">
            <LegalLogo text={settings.logoText || settings.siteTitle} />
          </div>

          <p className="mt-5 max-w-xl leading-8 text-slate-300">
            {settings.siteDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map(([item, href]) => (
              <a
                className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-gold/40 hover:text-gold"
                key={item}
                href={href}
              >
                {item}
              </a>
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
            <span>{settings.phone}</span>
            <span>{settings.email}</span>
            <span>{settings.address}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        تمام حقوق برای {settings.siteTitle} محفوظ است.
      </div>
    </footer>
  );
}
