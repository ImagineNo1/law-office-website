import { legalDocuments, signatureRequests, contacts, templates, workflows } from "@/lib/legaltech-data";

export const fa = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

export const recoveryServices = [
  ["تنظیم قرارداد", "contract-drafting", "تنظیم قراردادهای ملکی، استخدامی، مشارکت و کسب‌وکار با کنترل ریسک و بندهای قابل امضا.", "قرارداد", "۲۴ تا ۴۸ ساعت"],
  ["مشاوره حقوقی", "legal-consultation", "جلسه مشاوره با وکیل متخصص، خلاصه ریسک، مسیر اقدام و مدارک موردنیاز.", "مشاوره", "همان روز"],
  ["تنظیم دادخواست", "petition-drafting", "تهیه دادخواست حقوقی با خواسته دقیق، مستندات، خوانده و مرجع صالح.", "دعاوی", "۴۸ ساعت"],
  ["تنظیم شکواییه", "criminal-complaint", "شکواییه کیفری با تشخیص عنوان اتهامی، ادله و شرح منظم واقعه.", "کیفری", "۴۸ ساعت"],
  ["تنظیم اظهارنامه", "legal-notice", "اظهارنامه رسمی برای مطالبه، اخطار، اعلام موضع یا شروع مسیر قانونی.", "ابلاغ", "۲۴ ساعت"],
  ["تنظیم لایحه", "defense-brief", "لایحه دفاعیه یا توضیحی با تحلیل پرونده، استناد به مدارک و دفاع منظم.", "دفاع", "۷۲ ساعت"],
  ["پیگیری پرونده", "case-follow-up", "رصد وضعیت پرونده، ابلاغیه‌ها، مهلت‌ها و گزارش اقدام بعدی.", "پرونده", "هفتگی"],
  ["امضای دیجیتال اسناد", "digital-signature", "ارسال قرارداد برای امضا، پیگیری وضعیت و بایگانی گواهی امضا.", "امضا", "فوری"],
] as const;

const contractCategories = ["ملکی", "استخدام", "شراکت", "خرید و فروش", "پیمانکاری", "کسب‌وکار", "سرمایه‌گذاری", "شرکت‌ها"];
const contractTitles = [
  "قرارداد اجاره ملک",
  "قرارداد مشارکت در ساخت",
  "قرارداد استخدام کارمند",
  "قرارداد محرمانگی اطلاعات",
  "قرارداد خرید و فروش خودرو",
  "قرارداد پیمانکاری ساختمان",
  "قرارداد طراحی سایت",
  "توافق‌نامه سهامداران",
];

export const recoveryContracts = Array.from({ length: 24 }, (_, index) => ({
  id: `contract-${index + 1}`,
  title: `${contractTitles[index % contractTitles.length]} ${fa(index + 1)}`,
  slug: ["property-lease", "construction-partnership", "employee-employment", "employee-nda", "vehicle-sale", "building-contracting", "website-design", "shareholders-agreement"][index % 8],
  category: contractCategories[index % contractCategories.length],
  price: `${fa(780 + index * 90)} هزار تومان`,
  downloads: 120 + index * 17,
  rating: "۴.۸",
  description: "قالب حقوقی آماده با بندهای ضروری، چک‌لیست مدارک، امکان سفارشی‌سازی و مسیر امضای دیجیتال.",
}));

export const legalForms = [
  ["فرم وکالت کاری", "work-attorney", "وکالت‌نامه کاری با محدوده اختیار و مدت اعتبار"],
  ["فرم رضایت‌نامه", "consent", "رضایت‌نامه رسمی برای امور اداری و قراردادی"],
  ["فرم تحویل مدارک", "document-handover", "رسید تحویل و دریافت مدارک با شماره پیگیری"],
  ["فرم تعهدنامه", "undertaking", "تعهدنامه قابل امضا با شاهد و ضمانت اجرا"],
  ["فرم درخواست مشاوره", "consultation", "ثبت موضوع، فوریت، مدارک و زمان پیشنهادی"],
  ["فرم اعلام خسارت", "damage-notice", "ثبت خسارت، مستندات و خواسته جبران"],
  ["فرم معرفی نماینده", "representative", "معرفی نماینده شرکت یا شخص برای پیگیری"],
  ["فرم تسویه حساب", "settlement", "صورتجلسه تسویه و خاتمه همکاری"],
].map(([title, slug, description], index) => ({
  id: `form-${index + 1}`,
  title,
  slug,
  description,
  category: ["وکالتی", "اداری", "قراردادی", "مالی"][index % 4],
  fields: 6 + index,
  usage: 80 + index * 23,
}));

export const crmRequests = Array.from({ length: 50 }, (_, index) => ({
  id: `req-${index + 1}`,
  number: `REQ-1403-${fa(String(index + 1).padStart(4, "0"))}`,
  client: ["علی محمدی", "سارا رضایی", "شرکت توسعه پارس", "موسسه حقوقی داوران"][index % 4],
  service: recoveryServices[index % recoveryServices.length][0],
  status: ["جدید", "در بررسی", "در حال انجام", "در انتظار موکل", "تکمیل شده"][index % 5],
  priority: ["عادی", "مهم", "فوری"][index % 3],
  date: `۱۴۰۳/۰${(index % 8) + 1}/${fa(String((index % 27) + 1).padStart(2, "0"))}`,
}));

export const dashboardEvents = Array.from({ length: 30 }, (_, index) => ({
  id: `event-${index + 1}`,
  title: ["درخواست جدید ثبت شد", "سند برای امضا ارسال شد", "پیام موکل پاسخ داده شد", "پرداخت تایید شد", "قرارداد بایگانی شد"][index % 5],
  time: `${fa((index % 9) + 1)} ساعت پیش`,
}));

export const recoveryFaqs = [
  ["مدت زمان تنظیم قرارداد چقدر است؟", "برای قراردادهای متعارف ۲۴ تا ۴۸ ساعت کاری و برای موارد تخصصی پس از بررسی مدارک زمان‌بندی دقیق اعلام می‌شود."],
  ["آیا امکان امضای دیجیتال وجود دارد؟", "بله، سند از مرکز امضای دیجیتال برای امضاکنندگان ارسال و وضعیت مشاهده، امضا یا رد شدن پیگیری می‌شود."],
  ["آیا اطلاعات محرمانه می‌ماند؟", "دسترسی اسناد با نقش‌ها، سطح دسترسی و ثبت رویدادهای امنیتی کنترل می‌شود."],
  ["آیا قالب‌ها قابل ویرایش هستند؟", "قالب‌ها ساختاریافته هستند و قبل از ارسال برای امضا قابل شخصی‌سازی و بازبینی حقوقی‌اند."],
];

export const phaseInventory = {
  documents: legalDocuments.slice(0, 40),
  contacts: contacts.slice(0, 20),
  templates: templates.slice(0, 12),
  signatures: signatureRequests.slice(0, 20),
  workflows: workflows.slice(0, 10),
};
