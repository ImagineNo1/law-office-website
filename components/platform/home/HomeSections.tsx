import Image from "next/image";
import Link from "next/link";
import type { PlatformArticle, PlatformFaq } from "@/lib/platform-db";

function Icon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, string> = {
    chat: "M21 12a8 8 0 0 1-8 8H7l-4 3v-6.5A8 8 0 1 1 21 12Z",
    file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h4",
    gavel: "m14 13-7 7-3-3 7-7m3 3 5-5m-9-1 5-5 6 6-5 5-6-6Z",
    home: "M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5Z",
    question: "M12 18h.01M9.3 9a3 3 0 1 1 5.4 1.8c-.9 1.1-2.7 1.5-2.7 3.2",
    briefcase: "M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1m-9 0h14v13H5V6Zm0 5h14",
    users:
      "M17 21a5 5 0 0 0-10 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 8a4 4 0 0 0-3-3.8M18 7.5a3 3 0 0 1 0 5.8M4 21a4 4 0 0 1 3-3.8M6 7.5a3 3 0 0 0 0 5.8",
    shield: "M12 3 20 6v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6l8-3Z",
    monitor: "M4 5h16v11H4V5Zm6 15h4M8 20h8",
    scale: "m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5",
    lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6V11Z",
    route: "M6 4h.01M18 20h.01M7 4h4a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h8",
    edit: "M16.8 3.6 20.4 7.2 9.6 18H6v-3.6L16.8 3.6Z",
    dashboard: "M4 5h7v7H4V5Zm9 0h7v4h-7V5ZM4 14h7v5H4v-5Zm9-3h7v8h-7v-8Z",
    search: "m21 21-4.4-4.4M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    check: "m6 12 4 4 8-9",
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d={paths[name]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const helpCards = [
  ["مشاوره حقوقی", "دریافت راهکار از حقوقدان متخصص", "chat"],
  ["تنظیم قرارداد", "تنظیم حرفه‌ای و قابل امضا", "file"],
  ["تنظیم دادخواست", "دادخواست ساختاریافته و مستند", "gavel"],
  ["پرونده ملکی", "ارزیابی دعاوی و اسناد ملکی", "home"],
  ["سوال حقوقی", "پاسخ روشن به مسئله شما", "question"],
  ["قرارداد آماده", "قالب‌های آماده و قابل ویرایش", "briefcase"],
];

const departments = [
  ["خانواده و طلاق", "طلاق، نفقه، حضانت", "users"],
  ["ملکی و ثبتی", "خرید و فروش، اجاره، ثبت", "home"],
  ["کیفری", "دفاع و شکایت کیفری", "gavel"],
  ["چک و مطالبات", "مطالبه وجه و اسناد", "file"],
  ["قراردادها", "تنظیم و بازبینی اسناد", "edit"],
  ["شرکت‌ها و کسب‌وکار", "ثبت، قرارداد، مشاوره", "briefcase"],
  ["ارث", "انحصار وراثت و تقسیم", "scale"],
  ["جرایم رایانه‌ای", "کلاهبرداری و ادله دیجیتال", "monitor"],
];

const process = [
  "ثبت درخواست",
  "بررسی اولیه",
  "تخصیص وکیل",
  "گفتگو و مدارک",
  "دریافت خروجی",
];
const support = [
  [
    "بررسی محرمانه مدارک",
    "پرونده و فایل‌های شما با دسترسی کنترل‌شده بررسی می‌شود.",
    "lock",
  ],
  [
    "پیشنهاد مسیر اقدام",
    "پس از ارزیابی اولیه، مسیر حقوقی و ریسک‌ها شفاف اعلام می‌شود.",
    "route",
  ],
  [
    "تنظیم و بازبینی اسناد",
    "قرارداد، دادخواست یا نامه حقوقی با ساختار قابل پیگیری آماده می‌شود.",
    "edit",
  ],
  [
    "پیگیری در داشبورد اختصاصی",
    "وضعیت درخواست، پیام‌ها و خروجی‌ها در کارتابل شما ثبت می‌شود.",
    "dashboard",
  ],
];

export function HelpIntentSection() {
  return (
    <section className="bg-white py-16" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-black text-[#071527] sm:text-3xl">
          برای چه کاری وارد وکیل‌یار شده‌اید؟
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {helpCards.map(([title, desc, icon]) => (
            <Link
              className="group rounded-3xl border border-[#E2E8F0] bg-white p-5 text-center shadow-[0_18px_45px_rgba(7,21,39,0.04)] transition hover:-translate-y-1 hover:border-[#0F766E]/30 hover:shadow-[0_24px_60px_rgba(15,118,110,0.12)]"
              href="/services"
              key={title}
            >
              <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-[#ECFDF5] text-[#0F766E] transition group-hover:scale-110">
                <Icon name={icon} />
              </span>
              <h3 className="text-sm font-black text-[#10233B]">{title}</h3>
              <p className="mt-2 min-h-10 text-xs font-bold leading-6 text-[#64748B]">
                {desc}
              </p>
              <span className="mt-3 inline-flex text-[#0F766E]">←</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DepartmentsSection() {
  return (
    <section className="bg-[#F8FAFC] py-16" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-black text-[#071527] sm:text-3xl">
          دپارتمان‌های تخصصی حقوقی
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {departments.map(([title, desc, icon]) => (
            <Link
              className="group rounded-3xl border border-white bg-white p-5 shadow-[0_16px_40px_rgba(7,21,39,0.04)] transition hover:-translate-y-1 hover:border-[#0F766E]/20"
              href="/services"
              key={title}
            >
              <span className="mb-4 grid size-13 place-items-center rounded-2xl bg-[#ECFDF5] text-[#0F766E] transition group-hover:bg-[#0F766E] group-hover:text-white">
                <Icon name={icon} />
              </span>
              <h3 className="text-sm font-black text-[#10233B]">{title}</h3>
              <p className="mt-2 min-h-10 text-xs font-bold leading-6 text-[#64748B]">
                {desc}
              </p>
              <span className="mt-4 inline-flex text-xs font-black text-[#0F766E]">
                مشاهده خدمات ›
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline() {
  return (
    <section className="bg-white py-16" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-black text-[#071527] sm:text-3xl">
          از ثبت درخواست تا نتیجه نهایی
        </h2>
        <div className="relative mt-12 grid gap-6 md:grid-cols-5">
          <div className="absolute left-10 right-10 top-9 hidden h-px bg-gradient-to-l from-[#0F766E] via-[#99F6E4] to-[#0F766E] md:block" />
          {process.map((step, index) => (
            <div className="relative text-center" key={step}>
              <span className="mx-auto grid size-18 place-items-center rounded-full border border-[#0F766E]/25 bg-[#ECFDF5] text-[#0F766E] shadow-[0_12px_30px_rgba(15,118,110,0.10)]">
                <Icon
                  name={
                    index === 0
                      ? "file"
                      : index === 1
                        ? "search"
                        : index === 2
                          ? "users"
                          : index === 3
                            ? "chat"
                            : "check"
                  }
                  className="size-7"
                />
              </span>
              <h3 className="mt-4 text-sm font-black text-[#10233B]">
                {index + 1}. {step}
              </h3>
              <p className="mx-auto mt-2 max-w-40 text-xs font-bold leading-6 text-[#64748B]">
                {index === 0
                  ? "ثبت اطلاعات و شرح موضوع"
                  : index === 1
                    ? "بررسی مدارک و ریسک‌ها"
                    : index === 2
                      ? "ارجاع به تیم متخصص"
                      : index === 3
                        ? "پیام، فایل و هماهنگی"
                        : "تحویل سند یا برنامه اقدام"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegalSupportSection() {
  return (
    <section className="bg-white py-16" dir="rtl">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#E2E8F0] bg-[linear-gradient(90deg,#ffffff_0%,#F8FAFC_100%)] px-4 py-10 shadow-[0_24px_70px_rgba(7,21,39,0.06)] sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-black text-[#0F766E]">
              تیم حقوقی وکیل‌یار
            </span>
            <h2 className="mt-4 text-3xl font-black leading-[1.5] text-[#071527]">
              همراهی تیم حقوقی در مسیر پرونده شما
            </h2>
            <p className="mt-4 text-sm font-bold leading-8 text-[#64748B]">
              بدون نمایش چهره‌های ساختگی؛ تمرکز وکیل‌یار روی فرایند شفاف،
              محرمانگی و خروجی قابل اتکا برای هر درخواست حقوقی است.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {support.map(([title, desc, icon]) => (
              <article
                className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_40px_rgba(7,21,39,0.04)]"
                key={title}
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-[#ECFDF5] text-[#0F766E]">
                  <Icon name={icon} />
                </span>
                <h3 className="mt-4 text-base font-black text-[#10233B]">
                  {title}
                </h3>
                <p className="mt-2 text-sm font-bold leading-7 text-[#64748B]">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const fallbackArticles: PlatformArticle[] = [
  {
    id: "knowledge-1",
    title: "نحوه تنظیم قرارداد اجاره محکم و قابل استناد",
    slug: "lease-contract-guide",
    excerpt: "نکات کلیدی برای کاهش ریسک موجر و مستاجر در قرارداد اجاره.",
    category: "قراردادها",
    coverImage: "",
    publishedAt: "",
    href: "/blog",
  },
  {
    id: "knowledge-2",
    title: "راهنمای کامل اقدام حقوقی در مطالبه وجه",
    slug: "claim-guide",
    excerpt: "از جمع‌آوری مدارک تا انتخاب مسیر مناسب برای مطالبه.",
    category: "دعاوی",
    coverImage: "",
    publishedAt: "",
    href: "/blog",
  },
  {
    id: "knowledge-3",
    title: "چطور بندهای حساس قرارداد را دقیق‌تر بنویسیم؟",
    slug: "nda-guide",
    excerpt: "بندهای ضروری NDA و نکات اجرایی برای کسب‌وکارها.",
    category: "کسب‌وکار",
    coverImage: "",
    publishedAt: "",
    href: "/blog",
  },
  {
    id: "knowledge-4",
    title: "روند بررسی یک درخواست حقوقی چگونه پیش می‌رود؟",
    slug: "legal-workflow",
    excerpt: "آشنایی با روند بررسی، تخصیص متخصص و تحویل خروجی.",
    category: "وکیل‌یار",
    coverImage: "",
    publishedAt: "",
    href: "/blog",
  },
];

function ArticleImage({
  article,
  featured = false,
}: {
  article: PlatformArticle;
  featured?: boolean;
}) {
  if (article.coverImage) {
    return (
      <Image
        alt={article.title}
        className="h-full w-full object-cover"
        height={featured ? 420 : 180}
        src={article.coverImage}
        width={featured ? 720 : 320}
      />
    );
  }

  return (
    <div className="flex h-full min-h-40 items-center justify-center bg-[radial-gradient(circle_at_40%_30%,rgba(214,162,58,0.18),transparent_30%),linear-gradient(135deg,#ECFDF5,#ffffff)] text-[#0F766E]">
      <Icon name="scale" className="size-12" />
    </div>
  );
}

export function KnowledgeCenterSection({
  articles = [],
}: {
  articles?: PlatformArticle[];
}) {
  const items = articles.length ? articles : fallbackArticles;
  const [featured, ...secondary] = items.slice(0, 4);

  return (
    <section id="knowledge" className="bg-[#F8FAFC] py-16" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-black text-[#0F766E]">
              وبلاگ
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#071527]">
              راهنماهای حقوقی برای تصمیم بهتر
            </h2>
          </div>
          <Link
            className="inline-flex items-center justify-center rounded-2xl border border-[#0F766E]/25 bg-white px-5 py-3 text-sm font-black text-[#0F766E]"
            href="/blog"
          >
            مشاهده همه مقالات ←
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Link
            className="overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white shadow-[0_20px_55px_rgba(7,21,39,0.06)]"
            href={featured.href}
          >
            <div className="h-64 overflow-hidden">
              <ArticleImage article={featured} featured />
            </div>
            <div className="p-6">
              <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-black text-[#0F766E]">
                {featured.category}
              </span>
              <h3 className="mt-4 text-2xl font-black leading-10 text-[#071527]">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm font-bold leading-8 text-[#64748B]">
                {featured.excerpt}
              </p>
            </div>
          </Link>
          <div className="grid gap-5">
            {secondary.map((article) => (
              <Link
                className="grid gap-4 rounded-3xl border border-[#E2E8F0] bg-white p-4 shadow-[0_14px_35px_rgba(7,21,39,0.04)] sm:grid-cols-[150px_1fr]"
                href={article.href}
                key={article.id}
              >
                <div className="overflow-hidden rounded-2xl">
                  <ArticleImage article={article} />
                </div>
                <div>
                  <span className="text-xs font-black text-[#0F766E]">
                    {article.category}
                  </span>
                  <h3 className="mt-2 text-base font-black leading-8 text-[#10233B]">
                    {article.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs font-bold leading-6 text-[#64748B]">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ faqs = [] }: { faqs?: PlatformFaq[] }) {
  const items = faqs.length
    ? faqs.slice(0, 6)
    : [
        {
          id: "faq-1",
          question: "چطور درخواست حقوقی ثبت کنم؟",
          answer:
            "از دکمه ثبت درخواست، موضوع را انتخاب کنید و مدارک اولیه را در داشبورد امن بارگذاری کنید.",
          category: "عمومی",
          pageType: "general" as const,
          pageSlug: "",
        },
        {
          id: "faq-2",
          question: "آیا اطلاعات من محرمانه می‌ماند؟",
          answer:
            "دسترسی به اطلاعات پرونده محدود و مرحله‌به‌مرحله کنترل می‌شود.",
          category: "امنیت",
          pageType: "general" as const,
          pageSlug: "",
        },
        {
          id: "faq-3",
          question: "قراردادها قابل ویرایش هستند؟",
          answer:
            "بله، قالب‌های قرارداد پیش از ارسال برای امضا قابل ویرایش و بازبینی هستند.",
          category: "قرارداد",
          pageType: "general" as const,
          pageSlug: "",
        },
      ];

  return (
    <section className="bg-white py-16" dir="rtl">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black text-[#071527]">
          سوالات متداول
        </h2>
        <div className="mt-8 space-y-4">
          {items.map((faq) => (
            <details
              className="group rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_35px_rgba(7,21,39,0.04)]"
              key={faq.id}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-[#10233B]">
                {faq.question}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#ECFDF5] text-[#0F766E] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 border-t border-[#E2E8F0] pt-4 text-sm font-bold leading-8 text-[#64748B]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
