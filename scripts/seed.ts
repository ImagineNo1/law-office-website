import bcrypt from "bcryptjs";
import { connectDb } from "../lib/db";
import { HomeContent } from "../models/HomeContent";
import { News } from "../models/News";
import { PageContent } from "../models/PageContent";
import { Post } from "../models/Post";
import { Service } from "../models/Service";
import { SiteSettings } from "../models/SiteSettings";
import { User } from "../models/User";

const services = [
  {
    title: "دعاوی خانواده",
    slug: "دعاوی-خانواده",
    excerpt:
      "طلاق، حضانت، مهریه، نفقه، توافق های خانوادگی و امور مربوط به خانواده.",
    content:
      "ارائه مشاوره و پیگیری تخصصی در پرونده های خانواده با حفظ محرمانگی و تمرکز بر راه حل های عملی.",
    order: 1,
  },
  {
    title: "دعاوی ملکی",
    slug: "دعاوی-ملکی",
    excerpt:
      "خرید، فروش، اجاره، سرقفلی، مشارکت در ساخت و الزام به تنظیم سند.",
    content:
      "تحلیل اسناد، قراردادها و اختلافات ملکی برای کاهش ریسک و انتخاب مسیر حقوقی دقیق.",
    order: 2,
  },
  {
    title: "قراردادها",
    slug: "قراردادها",
    excerpt:
      "تنظیم و بررسی انواع قراردادهای داخلی و بین المللی با رویکرد کاهش ریسک.",
    content:
      "طراحی، بازبینی و مذاکره قراردادها با تمرکز بر تعهدات، ضمانت اجرا و منافع طرفین.",
    order: 3,
  },
  {
    title: "امور شرکت ها",
    slug: "امور-شرکت-ها",
    excerpt:
      "ثبت شرکت، تغییرات، دعاوی سهامداران، قراردادهای تجاری و مشاوره مدیران.",
    content:
      "خدمات حقوقی مورد نیاز شرکت ها از مرحله ثبت تا حل اختلافات و پشتیبانی تصمیم های مدیریتی.",
    order: 4,
  },
  {
    title: "داوری و حل اختلاف",
    slug: "داوری-حل-اختلاف",
    excerpt:
      "میانجی گری، داوری، مذاکره و طراحی مسیر حل اختلاف بدون فرسایش طولانی.",
    content:
      "استفاده از مسیرهای جایگزین حل اختلاف برای کاهش زمان، هزینه و فشار پرونده.",
    order: 5,
  },
  {
    title: "دفاع کیفری",
    slug: "دفاع-کیفری",
    excerpt:
      "دفاع در جرایم اقتصادی، مالی، چک، کلاهبرداری و پرونده های کیفری تخصصی.",
    content:
      "بررسی مستندات، تنظیم دفاعیه و همراهی مرحله به مرحله در پرونده های کیفری حساس.",
    order: 6,
  },
];

const posts = [
  {
    title: "نکات مهم در تنظیم قرارداد مشارکت",
    slug: "partnership-contract-points",
    excerpt:
      "چک لیستی برای تعیین سهم، تعهدات، ضمانت اجرا و روش خروج از قرارداد مشارکت.",
    content:
      "قرارداد مشارکت زمانی قابل اتکا است که سهم طرفین، تعهدات اجرایی، ضمانت اجرا، شیوه حل اختلاف و مسیر خروج به شکل روشن تنظیم شده باشد.",
    category: "قراردادها",
  },
  {
    title: "بررسی حقوق و تکالیف موجر و مستاجر",
    slug: "landlord-tenant-rights",
    excerpt:
      "مروری بر اجاره نامه، ودیعه، تمدید، تخلیه و اختلافات رایج میان موجر و مستاجر.",
    content:
      "در روابط موجر و مستاجر، متن قرارداد، رسیدهای پرداخت، وضعیت ملک و مهلت های قانونی نقش اصلی را در تصمیم گیری حقوقی دارند.",
    category: "دعاوی ملکی",
  },
  {
    title: "مراحل قانونی ثبت شرکت در ایران",
    slug: "company-registration-iran",
    excerpt:
      "راهنمای انتخاب نوع شرکت، مدارک ثبت، مسئولیت مدیران و تعهدات پس از ثبت.",
    content:
      "ثبت شرکت فقط یک فرایند اداری نیست؛ انتخاب نوع شرکت و تنظیم اساسنامه می تواند مسئولیت مدیران و سهامداران را تغییر دهد.",
    category: "شرکت ها",
  },
];

const newsItems = [
  {
    title: "افتتاحیه جدید بخش دعاوی خانوادگی",
    slug: "family-division-launch",
    excerpt:
      "واحد تخصصی دعاوی خانوادگی با تمرکز بر مشاوره محرمانه و پیگیری سریع آغاز به کار کرد.",
    content:
      "این بخش برای ارائه پاسخ سریع تر و تخصصی تر به پرونده های خانواده راه اندازی شده است.",
  },
  {
    title: "جلسه آموزشی حقوق موجر و مستاجر",
    slug: "tenant-rights-session",
    excerpt:
      "جلسه آموزشی موسسه درباره اجاره، تخلیه و اختلافات ملکی برگزار شد.",
    content:
      "در این جلسه، نکات کاربردی قرارداد اجاره، ودیعه، تمدید و تخلیه بررسی شد.",
  },
  {
    title: "کارگاه بررسی قراردادهای مشارکت",
    slug: "partnership-contract-review",
    excerpt:
      "کارگاه تخصصی تحلیل قراردادهای مشارکت و بندهای پرریسک آن برگزار می شود.",
    content:
      "این کارگاه با تمرکز بر تعهدات، ضمانت اجرا و روش حل اختلاف طراحی شده است.",
  },
];

async function main() {
  await connectDb();

  await SiteSettings.findOneAndUpdate(
    { key: "site" },
    {
      key: "site",
      siteTitle: "موسسه حقوقی عدالت گستر",
      siteDescription:
        "ارائه خدمات حقوقی تخصصی با تجربه، محرمانگی و ساختار پیگیری شفاف برای اشخاص، شرکت ها و سازمان ها.",
      logoText: "موسسه حقوقی عدالت گستر",
      phone: "۰۲۱-۱۲۳۴۵۶۷۸",
      email: "info@deladgostar.com",
      address: "تهران، خیابان ولیعصر، خیابان مطهری، پلاک ۱۲، واحد ۳",
      workingHours: "شنبه تا چهارشنبه، ساعت ۹ تا ۱۸",
      socialLinks: {
        instagram: "https://instagram.com/",
        linkedin: "https://linkedin.com/",
        telegram: "https://t.me/",
      },
      seoTitle: "موسسه حقوقی عدالت گستر",
      seoDescription: "خدمات حقوقی تخصصی و مشاوره محرمانه",
    },
    { upsert: true, runValidators: true },
  );

  await HomeContent.findOneAndUpdate(
    { key: "home" },
    {
      key: "home",
      hero: {
        eyebrow: "تخصص، تجربه، تعهد",
        title: "راهکارهای حقوقی هوشمند برای آرامش و موفقیت شما",
        description:
          "ما در موسسه عدالت گستر با تکیه بر تجربه و دانش تخصصی، بهترین راهکارهای حقوقی را برای افراد و کسب و کارها ارائه می دهیم.",
        primaryCtaLabel: "درخواست مشاوره",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "درباره موسسه",
        secondaryCtaHref: "/institute",
        consultationTitle: "مشاوره محرمانه",
        consultationText:
          "بررسی اولیه مدارک، تشخیص مسیر حقوقی و اعلام مراحل اجرایی پرونده.",
      },
      trustFeatures: [
        { title: "نتایج قابل اعتماد", excerpt: "سابقه موفق در پرونده ها", icon: "shield", order: 1 },
        { title: "تعهد و محرمانگی", excerpt: "حفظ اطلاعات موکلین", icon: "shield", order: 2 },
        { title: "پیگیری سریع", excerpt: "در کوتاه ترین زمان ممکن", icon: "clock", order: 3 },
        { title: "تیم متخصص", excerpt: "وکیل پایه یک دادگستری", icon: "team", order: 4 },
      ],
      stats: [
        { value: "۱۲+", label: "سال تجربه", icon: "scale", order: 1 },
        { value: "۸۵۰+", label: "پرونده موفق", icon: "file", order: 2 },
        { value: "۲۴/۷", label: "پشتیبانی و مشاوره", icon: "clock", order: 3 },
        { value: "۹۸٪", label: "رضایت موکلین", icon: "check", order: 4 },
      ],
      contactCta: {
        eyebrow: "مشاوره تخصصی همین حالا",
        title: "برای دریافت مشاوره حقوقی، مسیر پرونده خود را شفاف شروع کنید",
        description:
          "تیم ما آماده بررسی اولیه درخواست، پاسخگویی محرمانه و ارائه برنامه اقدام حقوقی برای شماست.",
        primaryLabel: "تماس با ما",
        primaryHref: "/contact",
        secondaryLabel: "۰۲۱-۱۲۳۴۵۶۷۸",
        secondaryHref: "tel:02112345678",
      },
    },
    { upsert: true, runValidators: true },
  );

  await Promise.all(
    services.map((service) =>
      Service.findOneAndUpdate(
        { slug: service.slug },
        { ...service, icon: "scale", status: "published" },
        { upsert: true, runValidators: true },
      ),
    ),
  );

  await Promise.all(
    posts.map((post) =>
      Post.findOneAndUpdate(
        { slug: post.slug },
        { ...post, status: "published", publishedAt: new Date() },
        { upsert: true, runValidators: true },
      ),
    ),
  );

  await Promise.all(
    newsItems.map((item) =>
      News.findOneAndUpdate(
        { slug: item.slug },
        { ...item, status: "published", publishedAt: new Date() },
        { upsert: true, runValidators: true },
      ),
    ),
  );

  await Promise.all([
    PageContent.findOneAndUpdate(
      { key: "about" },
      {
        key: "about",
        title: "موسسه ای برای راهبری حقوقی دقیق و قابل اعتماد",
        subtitle: "ماموریت ما",
        content:
          "هدف موسسه، تبدیل مسائل پیچیده حقوقی به مسیرهای روشن اجرایی است. هر پرونده با ارزیابی مستندات، تشخیص ریسک ها و طراحی برنامه پیگیری آغاز می شود.",
      },
      { upsert: true, runValidators: true },
    ),
    PageContent.findOneAndUpdate(
      { key: "institute" },
      {
        key: "institute",
        title: "تجربه حقوقی در کنار رویکرد مدیریتی مدرن",
        subtitle: "معرفی موسسه",
        content:
          "عدالت گستر برای پرونده هایی طراحی شده که به تحلیل دقیق، مستندسازی منظم و تصمیم گیری مرحله ای نیاز دارند. تمرکز اصلی موسسه بر دعاوی خانواده، قراردادها، شرکت ها و حل اختلاف است.",
      },
      { upsert: true, runValidators: true },
    ),
    PageContent.findOneAndUpdate(
      { key: "contact" },
      {
        key: "contact",
        title: "ثبت درخواست مشاوره",
        subtitle: "ارتباط با ما",
        content:
          "برای آغاز بررسی پرونده، اطلاعات تماس و شرح کوتاهی از موضوع حقوقی خود را ارسال کنید.",
      },
      { upsert: true, runValidators: true },
    ),
  ]);

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (adminEmail && adminPassword) {
    await User.findOneAndUpdate(
      { email: adminEmail },
      {
        fullName: process.env.ADMIN_NAME?.trim() || "مدیر سایت",
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 12),
        role: "admin",
        status: "active",
      },
      { upsert: true, runValidators: true },
    );
  }

  console.log("Seed completed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
