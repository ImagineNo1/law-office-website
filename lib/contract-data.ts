import type { ContractTemplate } from "@/types";

export const contractCategories = [
  "ملکی",
  "استخدام",
  "شراکت",
  "خرید و فروش",
  "پیمانکاری",
  "کسب و کار",
  "سرمایه گذاری",
  "شرکت‌ها",
] as const;

const sharedBenefits = [
  "تنظیم شده توسط وکیل متخصص",
  "قابل ویرایش و شخصی‌سازی",
  "مطابق قوانین روز",
  "کاهش ریسک حقوقی",
  "پوشش کامل بندهای ضروری",
];

const sharedDocuments = [
  "تصویر کارت ملی طرفین",
  "مشخصات کامل طرفین قرارداد",
  "مدارک مالکیت یا اختیار امضا",
  "اطلاعات مالی و تعهدات اصلی",
];

const sharedFaq = [
  {
    question: "آیا این قرارداد قابل ویرایش است؟",
    answer:
      "بله، متن قرارداد به صورت ساختاریافته آماده شده و می‌توانید بندهای اختصاصی را متناسب با توافق خود اصلاح کنید.",
  },
  {
    question: "آیا برای استفاده از قرارداد نیاز به مشاوره دارم؟",
    answer:
      "در موارد ساده می‌توانید از نمونه آماده استفاده کنید، اما برای معاملات حساس پیشنهاد می‌شود درخواست تنظیم اختصاصی ثبت شود.",
  },
  {
    question: "بعد از دریافت قرارداد چه پشتیبانی ارائه می‌شود؟",
    answer:
      "پشتیبانی اولیه برای توضیح بندها و راهنمای تکمیل اطلاعات از طریق تیم حقوقی ارائه می‌شود.",
  },
];

const contractsSeed: Array<
  Pick<
    ContractTemplate,
    "title" | "slug" | "category" | "excerpt" | "priceLabel" | "order"
  >
> = [
  {
    title: "قرارداد مشارکت در ساخت",
    slug: "construction-partnership",
    category: "ملکی",
    excerpt:
      "نمونه کامل مشارکت مالک و سازنده با جدول تعهدات، ضمانت اجرا و برنامه تحویل.",
    priceLabel: "۳,۹۰۰,۰۰۰ تومان",
    order: 1,
  },
  {
    title: "قرارداد اجاره ملک",
    slug: "property-lease",
    category: "ملکی",
    excerpt:
      "قرارداد رهن و اجاره مسکونی یا اداری با شروط تخلیه، ودیعه و خسارت تأخیر.",
    priceLabel: "۹۸۰,۰۰۰ تومان",
    order: 2,
  },
  {
    title: "قرارداد فروش ملک",
    slug: "property-sale",
    category: "ملکی",
    excerpt:
      "مبایعه‌نامه ملکی با بندهای انتقال سند، تسویه، وجه التزام و تحویل مورد معامله.",
    priceLabel: "۲,۴۰۰,۰۰۰ تومان",
    order: 3,
  },
  {
    title: "قرارداد پیش‌فروش آپارتمان",
    slug: "apartment-presale",
    category: "ملکی",
    excerpt:
      "قالب تخصصی پیش‌فروش با زمان‌بندی پرداخت، مشخصات فنی و ضمانت تکمیل پروژه.",
    priceLabel: "۳,۲۰۰,۰۰۰ تومان",
    order: 4,
  },
  {
    title: "قرارداد استخدام کارمند",
    slug: "employee-employment",
    category: "استخدام",
    excerpt:
      "قرارداد استخدام تمام‌وقت با شرح وظایف، محرمانگی، مزایا و شرایط خاتمه همکاری.",
    priceLabel: "۱,۴۰۰,۰۰۰ تومان",
    order: 5,
  },
  {
    title: "قرارداد کار پاره‌وقت",
    slug: "part-time-employment",
    category: "استخدام",
    excerpt:
      "نمونه قرارداد همکاری پاره‌وقت با ساعت کاری، حق‌الزحمه و تعهدات شغلی شفاف.",
    priceLabel: "۱,۱۰۰,۰۰۰ تومان",
    order: 6,
  },
  {
    title: "قرارداد محرمانگی کارکنان",
    slug: "employee-nda",
    category: "استخدام",
    excerpt: "تعهدنامه محرمانگی اطلاعات، منع افشا و حفاظت از اسرار تجاری شرکت.",
    priceLabel: "۸۹۰,۰۰۰ تومان",
    order: 7,
  },
  {
    title: "قرارداد شراکت",
    slug: "general-partnership",
    category: "شراکت",
    excerpt:
      "چارچوب شراکت دو یا چند نفر با سهم‌الشرکه، تقسیم سود و سازوکار خروج.",
    priceLabel: "۲,۸۰۰,۰۰۰ تومان",
    order: 8,
  },
  {
    title: "قرارداد مشارکت مدنی",
    slug: "civil-partnership",
    category: "شراکت",
    excerpt:
      "قرارداد مشارکت مدنی برای پروژه‌های مشترک با تعیین آورده‌ها و مدیریت مالی.",
    priceLabel: "۲,۹۰۰,۰۰۰ تومان",
    order: 9,
  },
  {
    title: "قرارداد سرمایه‌گذاری استارتاپ",
    slug: "startup-investment",
    category: "سرمایه گذاری",
    excerpt:
      "قرارداد ورود سرمایه‌گذار با ارزش‌گذاری، سهام، ضد رقیق‌شدن و تعهدات بنیان‌گذاران.",
    priceLabel: "۴,۹۰۰,۰۰۰ تومان",
    order: 10,
  },
  {
    title: "قرارداد خرید و فروش خودرو",
    slug: "vehicle-sale",
    category: "خرید و فروش",
    excerpt:
      "قولنامه خودرو با بندهای اصالت، تعویض پلاک، پرداخت مرحله‌ای و خسارت فسخ.",
    priceLabel: "۹۵۰,۰۰۰ تومان",
    order: 11,
  },
  {
    title: "قرارداد فروش کالا",
    slug: "goods-sale",
    category: "خرید و فروش",
    excerpt:
      "نمونه فروش کالا برای کسب‌وکارها با شرایط تحویل، گارانتی و پرداخت.",
    priceLabel: "۱,۳۰۰,۰۰۰ تومان",
    order: 12,
  },
  {
    title: "قرارداد پیمانکاری ساختمان",
    slug: "building-contracting",
    category: "پیمانکاری",
    excerpt:
      "قرارداد اجرای عملیات ساختمانی با صورت‌وضعیت، ضمانت حسن انجام کار و تحویل.",
    priceLabel: "۳,۷۰۰,۰۰۰ تومان",
    order: 13,
  },
  {
    title: "قرارداد پیمانکاری خدمات",
    slug: "service-contracting",
    category: "پیمانکاری",
    excerpt:
      "قالب پیمانکاری خدماتی با SLA، گزارش عملکرد، جریمه تأخیر و نحوه تسویه.",
    priceLabel: "۲,۲۰۰,۰۰۰ تومان",
    order: 14,
  },
  {
    title: "قرارداد طراحی سایت",
    slug: "website-design",
    category: "کسب و کار",
    excerpt:
      "قرارداد طراحی و توسعه وب‌سایت با مالکیت کد، زمان‌بندی، پشتیبانی و تحویل.",
    priceLabel: "۱,۹۰۰,۰۰۰ تومان",
    order: 15,
  },
  {
    title: "قرارداد نمایندگی فروش",
    slug: "sales-agency",
    category: "کسب و کار",
    excerpt:
      "قرارداد اعطای نمایندگی فروش با منطقه فعالیت، پورسانت، اهداف فروش و فسخ.",
    priceLabel: "۲,۶۰۰,۰۰۰ تومان",
    order: 16,
  },
  {
    title: "قرارداد فرانچایز",
    slug: "franchise",
    category: "کسب و کار",
    excerpt:
      "قالب اعطای امتیاز برند با استانداردهای عملیاتی، حق امتیاز و کنترل کیفیت.",
    priceLabel: "۵,۸۰۰,۰۰۰ تومان",
    order: 17,
  },
  {
    title: "توافق‌نامه سهامداران",
    slug: "shareholders-agreement",
    category: "شرکت‌ها",
    excerpt:
      "توافق‌نامه سهامداران با حق تقدم، انتقال سهام، بن‌بست مدیریتی و خروج شریک.",
    priceLabel: "۴,۶۰۰,۰۰۰ تومان",
    order: 18,
  },
  {
    title: "قرارداد مدیرعامل",
    slug: "ceo-contract",
    category: "شرکت‌ها",
    excerpt:
      "قرارداد انتصاب مدیرعامل با اختیارات، پاداش، محرمانگی و مسئولیت‌های قانونی.",
    priceLabel: "۲,۷۰۰,۰۰۰ تومان",
    order: 19,
  },
  {
    title: "قرارداد تأمین مالی",
    slug: "financing-contract",
    category: "سرمایه گذاری",
    excerpt:
      "قرارداد تأمین مالی پروژه با تضامین، نرخ بازده، کنترل هزینه و گزارش‌دهی.",
    priceLabel: "۴,۲۰۰,۰۰۰ تومان",
    order: 20,
  },
];

export const contractSamples: ContractTemplate[] = contractsSeed.map(
  (item, index) => ({
    id: `sample-contract-${index + 1}`,
    title: item.title,
    slug: item.slug,
    category: item.category,
    excerpt: item.excerpt,
    content: `این نمونه ${item.title} برای استفاده حرفه‌ای در روابط حقوقی فارسی تهیه شده و شامل تعاریف، موضوع قرارداد، تعهدات طرفین، شرایط مالی، ضمانت اجرا، محرمانگی، حل اختلاف و پیوست‌های کاربردی است. متن قرارداد با زبان دقیق حقوقی تنظیم شده اما ساختار آن برای تکمیل سریع اطلاعات نیز ساده و قابل استفاده است.`,
    heroImage: `/contracts/${item.slug}.jpg`,
    priceLabel: item.priceLabel,
    sampleFileUrl: `/samples/${item.slug}.pdf`,
    useCases: [
      `استفاده در مذاکرات و توافق‌های مرتبط با ${item.category}`,
      "ثبت دقیق تعهدات مالی، زمانی و اجرایی طرفین",
      "کاهش ابهام در زمان امضا، اجرا و خاتمه همکاری",
    ],
    benefits: sharedBenefits,
    requiredDocuments: sharedDocuments,
    faqItems: sharedFaq,
    relatedContracts: contractsSeed
      .filter(
        (contract) =>
          contract.category === item.category && contract.slug !== item.slug,
      )
      .slice(0, 3)
      .map((contract) => contract.slug),
    status: "published",
    order: item.order,
    seoTitle: `${item.title} | بانک قراردادها`,
    seoDescription: item.excerpt,
    createdAt: "2026-01-15",
    updatedAt: "2026-06-01",
  }),
);

export function getFallbackContract(slug: string) {
  return contractSamples.find((contract) => contract.slug === slug) ?? null;
}
