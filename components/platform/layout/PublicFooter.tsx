import Link from "next/link";

function ScaleIcon() {
  return (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none">
      <path
        d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xs font-black text-white/70 transition hover:border-[#0F766E] hover:text-[#99F6E4]">
      {label}
    </span>
  );
}

const columns = [
  {
    title: "خدمات حقوقی",
    items: ["مشاوره حقوقی", "تنظیم قرارداد", "تنظیم دادخواست", "پیگیری پرونده"],
    href: "/services",
  },
  {
    title: "بانک قراردادها",
    items: [
      "قراردادهای ملکی",
      "قراردادهای استخدامی",
      "قراردادهای تجاری",
      "قراردادهای محرمانگی",
    ],
    href: "/contracts",
  },
  {
    title: "وبلاگ",
    items: ["مقالات حقوقی", "اخبار حقوقی", "راهنمای قرارداد", "سوالات متداول"],
    href: "/blog",
  },
  {
    title: "تماس با ما",
    items: ["ثبت درخواست", "پشتیبانی آنلاین", "درباره وکیل‌یار", "تماس با ما"],
    href: "/contact",
  },
];

export function PublicFooter() {
  return (
    <footer
      id="footer"
      className="bg-[radial-gradient(circle_at_15%_20%,rgba(15,118,110,0.28),transparent_24%),linear-gradient(135deg,#071527,#10233B)] px-4 pt-12 pb-8 text-white shadow-[0_-18px_70px_rgba(7,21,39,0.16)] sm:px-8 lg:px-10"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-13 place-items-center rounded-2xl bg-[#ECFDF5] text-[#0F766E]">
                <ScaleIcon />
              </span>
              <span>
                <span className="block text-2xl font-black">وکیل‌یار</span>
                <span className="text-xs font-bold text-white/55">
                  سامانه خدمات حقوقی
                </span>
              </span>
            </div>
            <p className="max-w-sm text-sm font-bold leading-8 text-white/60">
              پلتفرم فارسی خدمات حقوقی، بانک قرارداد، CRM، پورتال موکل و امضای
              دیجیتال.
            </p>
            <div className="mt-6 flex gap-3" aria-label="شبکه‌های اجتماعی">
              <SocialIcon label="in" />
              <SocialIcon label="ig" />
              <SocialIcon label="tg" />
              <SocialIcon label="wa" />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-sm font-black text-white">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item}>
                      <Link
                        className="text-sm font-bold text-white/55 transition-colors hover:text-[#99F6E4]"
                        href={column.href}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs font-bold text-white/40">
            © ۱۴۰۳ وکیل‌یار — تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-6 text-xs font-bold text-white/40">
            <Link
              className="transition-colors hover:text-[#99F6E4]"
              href="/about"
            >
              درباره ما
            </Link>
            <Link
              className="transition-colors hover:text-[#99F6E4]"
              href="/contact"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
