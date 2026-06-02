import type { AdminContentRow, Article, NewsItem, Service, SiteStat } from "@/types";

export const siteStats: SiteStat[] = [
  { label: "پرونده موفق", value: "۳۲۰+" },
  { label: "سال تجربه", value: "۸+" },
  { label: "وکیل متخصص", value: "۱۵" },
  { label: "رضایت موکلین", value: "۹۸٪" },
];

export const services: Service[] = [
  {
    title: "دعاوی خانواده",
    excerpt: "مشاوره و پیگیری پرونده های طلاق، مهریه، حضانت، نفقه و توافق های خانوادگی.",
  },
  {
    title: "قراردادها",
    excerpt: "تنظیم، بازبینی و مذاکره قراردادهای تجاری، ملکی، استخدامی و مشارکت.",
  },
  {
    title: "امور شرکت ها",
    excerpt: "ثبت، تغییرات، صورت جلسات، دعاوی سهامداران و مشاوره حقوقی کسب و کار.",
  },
  {
    title: "دعاوی ملکی",
    excerpt: "رسیدگی به اختلافات خرید و فروش، اجاره، سرقفلی، الزام به تنظیم سند و تخلیه.",
  },
  {
    title: "داوری و حل اختلاف",
    excerpt: "طراحی راهبرد مذاکره، میانجی گری و داوری برای کاهش زمان و هزینه اختلاف.",
  },
  {
    title: "جرایم اقتصادی",
    excerpt: "دفاع و مشاوره در پرونده های مالی، چک، کلاهبرداری، مالیات و تعهدات بانکی.",
  },
];

export const blogPosts: Article[] = [
  {
    title: "بررسی دعاوی خانواده در سال ۱۴۰۳",
    slug: "family-claims-1403",
    excerpt: "مروری کاربردی بر روند رسیدگی، مدارک لازم و نکات مهم در پرونده های خانواده.",
    category: "دعاوی خانواده",
    publishedAt: "۱۴۰۳/۰۳/۲۰",
    readTime: "۷ دقیقه",
    status: "published",
  },
  {
    title: "تغییرات جدید در قانون کار",
    slug: "labor-law-updates",
    excerpt: "آنچه کارفرمایان و کارکنان درباره قرارداد، بیمه و خاتمه همکاری باید بدانند.",
    category: "قانون کار",
    publishedAt: "۱۴۰۳/۰۲/۱۸",
    readTime: "۵ دقیقه",
    status: "published",
  },
  {
    title: "راهنمای حقوقی ثبت شرکت ها",
    slug: "company-registration-guide",
    excerpt: "راهنمای انتخاب نوع شرکت، مدارک ثبت، مسئولیت مدیران و تعهدات پس از ثبت.",
    category: "ثبت شرکت",
    publishedAt: "۱۴۰۳/۰۲/۱۵",
    readTime: "۶ دقیقه",
    status: "published",
  },
  {
    title: "نکات مهم در تنظیم قراردادها",
    slug: "contract-drafting-points",
    excerpt: "چک لیستی برای بندهای کلیدی قرارداد، ضمانت اجرا و کاهش ریسک اختلاف.",
    category: "قراردادها",
    publishedAt: "۱۴۰۳/۰۲/۱۲",
    readTime: "۴ دقیقه",
    status: "draft",
  },
];

export const newsItems: NewsItem[] = [
  {
    title: "اهمیت داوری در حل اختلافات",
    slug: "arbitration-importance",
    excerpt: "نشست تخصصی موسسه درباره نقش داوری در پرونده های تجاری برگزار شد.",
    publishedAt: "۱۴۰۳/۰۳/۱۰",
    status: "published",
  },
  {
    title: "تمدید زمان مشاوره حقوقی شرکت ها",
    slug: "company-consulting-hours",
    excerpt: "برنامه مشاوره حقوقی شرکت ها در روزهای دوشنبه و چهارشنبه تمدید شد.",
    publishedAt: "۱۴۰۳/۰۲/۲۸",
    status: "published",
  },
  {
    title: "کارگاه تنظیم قراردادهای تجاری",
    slug: "commercial-contract-workshop",
    excerpt: "ثبت نام کارگاه آموزشی تنظیم قراردادهای تجاری برای مدیران آغاز شد.",
    publishedAt: "۱۴۰۳/۰۲/۲۲",
    status: "draft",
  },
];

export const adminRows: AdminContentRow[] = [
  { title: "بررسی دعاوی خانواده در سال ۱۴۰۳", category: "دعاوی خانواده", date: "۱۴۰۳/۰۳/۲۰", status: "منتشر شده" },
  { title: "تغییرات جدید در قانون کار", category: "قانون کار", date: "۱۴۰۳/۰۲/۱۸", status: "منتشر شده" },
  { title: "راهنمای حقوقی ثبت شرکت ها", category: "ثبت شرکت", date: "۱۴۰۳/۰۲/۱۵", status: "منتشر شده" },
  { title: "نکات مهم در تنظیم قراردادها", category: "قراردادها", date: "۱۴۰۳/۰۲/۱۲", status: "پیش نویس" },
];

export const contactInfo = {
  phone: "۰۲۱-۱۲۳۴۵۶۷۸",
  email: "info@deladgostar.com",
  address: "تهران، خیابان ولیعصر، خیابان مطهری، پلاک ۱۲، واحد ۳",
  workingHours: "شنبه تا چهارشنبه، ساعت ۹ تا ۱۸",
};
