import type {
  AdminContentRow,
  Article,
  DashboardMetric,
  MessagePreview,
  NewsItem,
  Service,
  SiteStat,
  TrustFeature,
} from "@/types";

export const trustFeatures: TrustFeature[] = [
  { title: "نتایج قابل اعتماد", excerpt: "سابقه موفق در پرونده ها" },
  { title: "تعهد و محرمانگی", excerpt: "حفظ اطلاعات موکلین" },
  { title: "پاسخگویی سریع", excerpt: "در کوتاه ترین زمان ممکن" },
  { title: "تیم متخصص", excerpt: "وکیل پایه یک دادگستری" },
];

export const siteStats: SiteStat[] = [
  { label: "سال تجربه", value: "۱۲+" },
  { label: "پرونده موفق", value: "۸۵۰+" },
  { label: "پشتیبانی و مشاوره", value: "۲۴/۷" },
  { label: "رضایت موکلین", value: "۹۸٪" },
];

export const services: Service[] = [
  {
    title: "دعاوی خانواده",
    excerpt:
      "طلاق، حضانت، مهریه، نفقه، توافق های خانوادگی و امور مربوط به خانواده.",
  },
  {
    title: "دعاوی ملکی",
    excerpt: "خرید، فروش، اجاره، سرقفلی، مشارکت در ساخت و الزام به تنظیم سند.",
  },
  {
    title: "قراردادها",
    excerpt:
      "تنظیم و بررسی انواع قراردادهای داخلی و بین المللی با رویکرد کاهش ریسک.",
  },
  {
    title: "امور شرکت ها",
    excerpt:
      "ثبت شرکت، تغییرات، دعاوی سهامداران، قراردادهای تجاری و مشاوره مدیران.",
  },
  {
    title: "داوری و حل اختلاف",
    excerpt:
      "میانجی گری، داوری، مذاکره و طراحی مسیر حل اختلاف بدون فرسایش طولانی.",
  },
  {
    title: "دفاع کیفری",
    excerpt:
      "دفاع در جرایم اقتصادی، مالی، چک، کلاهبرداری و پرونده های کیفری تخصصی.",
  },
];

export const blogPosts: Article[] = [
  {
    title: "نکات مهم در تنظیم قرارداد مشارکت",
    slug: "partnership-contract-points",
    excerpt:
      "چک لیستی برای تعیین سهم، تعهدات، ضمانت اجرا و روش خروج از قرارداد مشارکت.",
    category: "قراردادها",
    publishedAt: "۱۴۰۳/۰۳/۲۰",
    readTime: "۷ دقیقه",
    status: "published",
  },
  {
    title: "بررسی حقوق و تکالیف موجر و مستاجر",
    slug: "landlord-tenant-rights",
    excerpt:
      "مروری بر اجاره نامه، ودیعه، تمدید، تخلیه و اختلافات رایج میان موجر و مستاجر.",
    category: "دعاوی ملکی",
    publishedAt: "۱۴۰۳/۰۳/۱۵",
    readTime: "۶ دقیقه",
    status: "published",
  },
  {
    title: "مراحل قانونی ثبت شرکت در ایران",
    slug: "company-registration-iran",
    excerpt:
      "راهنمای انتخاب نوع شرکت، مدارک ثبت، مسئولیت مدیران و تعهدات پس از ثبت.",
    category: "شرکت ها",
    publishedAt: "۱۴۰۳/۰۲/۲۸",
    readTime: "۵ دقیقه",
    status: "published",
  },
  {
    title: "بررسی دعاوی خانواده در سال ۱۴۰۳",
    slug: "family-claims-1403",
    excerpt:
      "مروری کاربردی بر روند رسیدگی، مدارک لازم و نکات مهم در پرونده های خانواده.",
    category: "دعاوی خانواده",
    publishedAt: "۱۴۰۳/۰۲/۲۴",
    readTime: "۸ دقیقه",
    status: "draft",
  },
];

export const newsItems: NewsItem[] = [
  {
    title: "افتتاحیه جدید بخش دعاوی خانوادگی",
    slug: "family-division-launch",
    excerpt:
      "واحد تخصصی دعاوی خانوادگی با تمرکز بر مشاوره محرمانه و پیگیری سریع آغاز به کار کرد.",
    publishedAt: "۱۴۰۳/۰۳/۲۱",
    status: "published",
  },
  {
    title: "بررسی حقوق و تکالیف موجر و مستاجر",
    slug: "tenant-rights-session",
    excerpt: "جلسه آموزشی موسسه درباره اجاره، تخلیه و اختلافات ملکی برگزار شد.",
    publishedAt: "۱۴۰۳/۰۳/۱۵",
    status: "published",
  },
  {
    title: "بررسی حقوقی قراردادهای مشارکت",
    slug: "partnership-contract-review",
    excerpt:
      "کارگاه تخصصی تحلیل قراردادهای مشارکت و بندهای پرریسک آن برگزار می شود.",
    publishedAt: "۱۴۰۳/۰۲/۳۰",
    status: "draft",
  },
];

export const adminRows: AdminContentRow[] = [
  {
    title: "نکات مهم در تنظیم قرارداد مشارکت",
    category: "قراردادها",
    date: "۱۴۰۳/۰۳/۲۰",
    status: "منتشر شده",
  },
  {
    title: "افتتاحیه جدید بخش دعاوی خانوادگی",
    category: "خبر",
    date: "۱۴۰۳/۰۳/۲۱",
    status: "منتشر شده",
  },
  {
    title: "بررسی حقوق و تکالیف موجر و مستاجر",
    category: "ملکی",
    date: "۱۴۰۳/۰۳/۱۵",
    status: "منتشر شده",
  },
  {
    title: "بررسی دعاوی خانواده در سال ۱۴۰۳",
    category: "خانواده",
    date: "۱۴۰۳/۰۲/۲۴",
    status: "پیش نویس",
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "بازدید امروز", value: "۱,۲۴۸", change: "+۱۲٪ نسبت به دیروز" },
  { label: "اخبار", value: "۲۸", change: "+۳ مورد این ماه" },
  { label: "مقالات", value: "۴۵", change: "+۶ مورد این ماه" },
  { label: "پیام های جدید", value: "۱۲", change: "+۲ پیام امروز" },
];

export const messagePreviews: MessagePreview[] = [
  {
    name: "علی محمدی",
    email: "ali@example.com",
    subject: "مشاوره در زمینه دعاوی ملکی",
    status: "جدید",
    date: "۱۴۰۳/۰۳/۲۲",
  },
  {
    name: "سارا رضایی",
    email: "sara@example.com",
    subject: "سوال درباره قراردادها",
    status: "خوانده شده",
    date: "۱۴۰۳/۰۳/۲۱",
  },
  {
    name: "محمد کریمی",
    email: "karimi@example.com",
    subject: "پیگیری پرونده حقوقی",
    status: "جدید",
    date: "۱۴۰۳/۰۳/۱۸",
  },
  {
    name: "فاطمه احمدی",
    email: "ahmadi@example.com",
    subject: "مشاوره خانوادگی",
    status: "خوانده شده",
    date: "۱۴۰۳/۰۳/۱۵",
  },
];

export const contactInfo = {
  phone: "۰۲۱-۱۲۳۴۵۶۷۸",
  email: "info@deladgostar.com",
  address: "تهران، خیابان ولیعصر، خیابان مطهری، پلاک ۱۲، واحد ۳",
  workingHours: "شنبه تا چهارشنبه، ساعت ۹ تا ۱۸",
};
