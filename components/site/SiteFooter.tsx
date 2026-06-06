import Link from "next/link";
import { LegalLogo } from "@/components/site/LegalLogo";
import { Container } from "@/components/ui/Foundation";
import type { SiteSettings } from "@/types";

const quickLinks = [
  ["صفحه اصلی", "/"],
  ["خدمات حقوقی", "/services"],
  ["مجله حقوقی", "/blog"],
  ["اخبار حقوقی", "/news"],
  ["تماس با ما", "/contact"],
];

const serviceLinks = [
  ["مشاوره حقوقی", "/services"],
  ["تنظیم قرارداد", "/services"],
  ["تنظیم دادخواست", "/services"],
  ["تنظیم شکواییه", "/services"],
  ["پیگیری پرونده", "/services"],
];

const contractLinks = [
  ["قراردادهای ملکی", "/contracts"],
  ["قراردادهای استخدام", "/contracts"],
  ["قراردادهای شراکت", "/contracts"],
  ["قراردادهای کسب‌وکار", "/contracts"],
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div>
      <h3 className="text-base font-black text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {links.map(([label, href]) => (
          <Link
            className="text-sm font-bold text-white/68 transition hover:text-gold"
            href={href}
            key={label}
            prefetch={false}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const description =
    settings.siteDescription && !/[ØÙÛ]/.test(settings.siteDescription)
      ? settings.siteDescription
      : "پلتفرم حقوقی مدرن برای مشاوره، تنظیم قرارداد، تولید فرم‌های قضایی و پیگیری دقیق پرونده‌ها.";
  const title =
    settings.siteTitle && !/[ØÙÛ]/.test(settings.siteTitle) && settings.siteTitle.includes("موسسه")
      ? settings.siteTitle
      : "موسسه حقوقی عدالت گستر";

  return (
    <footer className="bg-[#071225] text-white">
      <Container className="grid gap-10 border-t border-white/10 py-16 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.9fr_1fr]">
        <div>
          <div className="[&_.text-navy]:text-white">
            <LegalLogo text={settings.logoText || settings.siteTitle || "موسسه حقوقی عدالت گستر"} />
          </div>
          <p className="mt-5 max-w-md text-pretty text-sm font-bold leading-8 text-white/68">
            {description}
          </p>
          <div className="mt-6 h-px w-28 bg-gold" />
        </div>

        <FooterColumn links={quickLinks} title="دسترسی سریع" />
        <FooterColumn links={serviceLinks} title="خدمات" />
        <FooterColumn links={contractLinks} title="قراردادها" />

        <div>
          <h3 className="text-base font-black text-white">اطلاعات تماس</h3>
          <div className="mt-5 grid gap-3 text-sm font-bold leading-7 text-white/68">
            <span>{settings.phone || "۰۲۱-۱۲۳۴۵۶۷۸"}</span>
            <span>{settings.email || "info@law-office.local"}</span>
            <span>{settings.address || "تهران، دفتر مرکزی موسسه"}</span>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs font-bold text-white/48 sm:flex-row">
          <span>
            تمام حقوق برای {title} محفوظ است.
          </span>
          <span className="text-gold">LegalTech Foundation, Phase 1</span>
        </Container>
      </div>
    </footer>
  );
}
