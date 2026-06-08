import { contractSamples, getFallbackContract } from "@/lib/contract-data";
import { connectDb } from "@/lib/db";
import {
  getFallbackService,
  isMojibake,
  serviceSamples,
} from "@/lib/service-data";
import { ContractTemplate } from "@/models/ContractTemplate";
import { HomeContent } from "@/models/HomeContent";
import { Message } from "@/models/Message";
import { News } from "@/models/News";
import { PageContent } from "@/models/PageContent";
import { Post } from "@/models/Post";
import { Service } from "@/models/Service";
import { SiteSettings } from "@/models/SiteSettings";
import { User } from "@/models/User";
import { slugLookupVariants } from "@/lib/slug";
import type {
  Article,
  ContractTemplate as ContractTemplateData,
  HomeContentData,
  MessageData,
  NewsItem,
  PageContentData,
  Service as ServiceData,
  SiteSettings as SiteSettingsData,
  UserData,
} from "@/types";

const defaultSettings: SiteSettingsData = {
  siteTitle: "وکیل‌یار | خدمات حقوقی، قرارداد و پیگیری پرونده",
  siteDescription:
    "پلتفرم هوشمند\nخدمات حقوقی\nاز مشاوره تا قرارداد\nو پیگیری پرونده",
  detailedDescription:
    "در وکیل‌یار می‌توانید درخواست حقوقی ثبت کنید، مدارک خود را ارسال کنید، با تیم حقوقی گفتگو کنید و روند پرونده را در داشبورد اختصاصی پیگیری کنید.",
  logoText: "وکیل‌یار",
  siteIcon: "",
  phone: "",
  email: "",
  address: "",
  workingHours: "",
  socialLinks: {},
  seoTitle: "وکیل‌یار | خدمات حقوقی، قرارداد و پیگیری پرونده",
  seoDescription:
    "در وکیل‌یار می‌توانید درخواست حقوقی ثبت کنید، مدارک خود را ارسال کنید، با تیم حقوقی گفتگو کنید و روند پرونده را در داشبورد اختصاصی پیگیری کنید.",
  footerDescription:
    "پلتفرم فارسی خدمات حقوقی، بانک قرارداد، CRM، پورتال موکل و امضای دیجیتال.",
  footerCopyright: "© ۱۴۰۳ وکیل‌یار — تمامی حقوق محفوظ است.",
};

const defaultHomeContent: HomeContentData = {
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
  trustFeatures: [],
  stats: [],
  processSteps: [
    { title: "ثبت درخواست", excerpt: "ثبت اطلاعات و شرح موضوع", icon: "file", order: 0 },
    { title: "بررسی اولیه", excerpt: "بررسی مدارک و ریسک‌ها", icon: "search", order: 1 },
    { title: "تخصیص وکیل", excerpt: "ارجاع به تیم متخصص", icon: "users", order: 2 },
    { title: "گفتگو و مدارک", excerpt: "پیام، فایل و هماهنگی", icon: "chat", order: 3 },
    { title: "دریافت خروجی", excerpt: "تحویل سند یا برنامه اقدام", icon: "check", order: 4 },
  ],
  legalSupport: {
    eyebrow: "تیم حقوقی وکیل‌یار",
    title: "همراهی تیم حقوقی در مسیر پرونده شما",
    description:
      "بدون نمایش چهره‌های ساختگی؛ تمرکز وکیل‌یار روی فرایند شفاف، محرمانگی و خروجی قابل اتکا برای هر درخواست حقوقی است.",
  },
  legalSupportCards: [
    {
      title: "بررسی محرمانه مدارک",
      excerpt: "پرونده و فایل‌های شما با دسترسی کنترل‌شده بررسی می‌شود.",
      icon: "lock",
      order: 0,
    },
    {
      title: "پیشنهاد مسیر اقدام",
      excerpt: "پس از ارزیابی اولیه، مسیر حقوقی و ریسک‌ها شفاف اعلام می‌شود.",
      icon: "route",
      order: 1,
    },
    {
      title: "تنظیم و بازبینی اسناد",
      excerpt: "قرارداد، دادخواست یا نامه حقوقی با ساختار قابل پیگیری آماده می‌شود.",
      icon: "edit",
      order: 2,
    },
    {
      title: "پیگیری در داشبورد اختصاصی",
      excerpt: "وضعیت درخواست، پیام‌ها و خروجی‌ها در کارتابل شما ثبت می‌شود.",
      icon: "dashboard",
      order: 3,
    },
  ],
  finalCta: {
    eyebrow: "شروع شفاف و قابل پیگیری",
    title: "پرونده حقوقی خود را شفاف شروع کنید",
    description:
      "درخواست، مدارک، پیام‌ها، قراردادها و خروجی نهایی را در یک مسیر امن و مرحله‌به‌مرحله مدیریت کنید.",
  },
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
};

type DateLike = string | Date | null | undefined;

function formatDate(value: DateLike) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function hasDatabase() {
  return Boolean(process.env.MONGODB_URI);
}

function canUseDemoFallback() {
  return process.env.ALLOW_DEMO_DATA === "true";
}

function sortByOrder<T extends { order?: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

type PostLike = {
  _id?: unknown;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string | null;
  category: string;
  status: "draft" | "published";
  seo?: Record<string, unknown>;
  publishedAt?: DateLike;
  createdAt?: DateLike;
};

type NewsLike = Omit<PostLike, "category">;

type ContractLike = {
  _id?: unknown;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content?: string | null;
  heroImage?: string | null;
  priceLabel?: string | null;
  sampleFileUrl?: string | null;
  useCases?: string[] | null;
  benefits?: string[] | null;
  requiredDocuments?: string[] | null;
  faqItems?: { question: string; answer: string }[] | null;
  relatedContracts?: string[] | null;
  status?: "draft" | "published";
  order?: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt?: DateLike;
  updatedAt?: DateLike;
};

type ServiceLike = {
  _id?: unknown;
  title: string;
  slug: string;
  excerpt: string;
  content?: string | null;
  category?: string | null;
  benefits?: string[] | null;
  processSteps?: string[] | null;
  requiredDocuments?: string[] | null;
  faqItems?: { question: string; answer: string }[] | null;
  priceLabel?: string | null;
  heroDescription?: string | null;
  heroFeatures?: string[] | null;
  icon?: string | null;
  order?: number;
  status?: "draft" | "published";
};

function toPost(doc: PostLike): Article {
  return {
    id: String(doc._id ?? ""),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content ?? "",
    coverImage: doc.coverImage ?? "",
    category: doc.category,
    publishedAt: formatDate(doc.publishedAt ?? doc.createdAt),
    readTime: "۵ دقیقه",
    status: doc.status,
    seo: doc.seo,
  };
}

function toNews(doc: NewsLike): NewsItem {
  return {
    id: String(doc._id ?? ""),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content ?? "",
    coverImage: doc.coverImage ?? "",
    publishedAt: formatDate(doc.publishedAt ?? doc.createdAt),
    status: doc.status,
    seo: doc.seo,
  };
}

function toContract(doc: ContractLike): ContractTemplateData {
  return {
    id: String(doc._id ?? ""),
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    excerpt: doc.excerpt,
    content: doc.content ?? "",
    heroImage: doc.heroImage ?? "",
    priceLabel: doc.priceLabel ?? "",
    sampleFileUrl: doc.sampleFileUrl ?? "",
    useCases: doc.useCases ?? [],
    benefits: doc.benefits ?? [],
    requiredDocuments: doc.requiredDocuments ?? [],
    faqItems: doc.faqItems ?? [],
    relatedContracts: doc.relatedContracts ?? [],
    status: doc.status ?? "draft",
    order: doc.order ?? 0,
    seoTitle: doc.seoTitle ?? "",
    seoDescription: doc.seoDescription ?? "",
    createdAt: formatDate(doc.createdAt),
    updatedAt: formatDate(doc.updatedAt ?? doc.createdAt),
  };
}

function toService(doc: ServiceLike): ServiceData {
  return {
    id: String(doc._id ?? ""),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content ?? "",
    category: doc.category ?? "",
    benefits: doc.benefits ?? [],
    processSteps: doc.processSteps ?? [],
    requiredDocuments: doc.requiredDocuments ?? [],
    faqItems: doc.faqItems ?? [],
    priceLabel: doc.priceLabel ?? "",
    heroDescription: doc.heroDescription ?? "",
    heroFeatures: doc.heroFeatures ?? [],
    icon: doc.icon ?? "scale",
    order: doc.order ?? 0,
    status: doc.status ?? "draft",
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (!hasDatabase()) {
    return defaultSettings;
  }

  await connectDb();
  const settings = await SiteSettings.findOne({ key: "site" }).lean();

  if (!settings) {
    return defaultSettings;
  }

  return {
    siteTitle: settings.siteTitle ?? defaultSettings.siteTitle,
    siteDescription: settings.siteDescription ?? defaultSettings.siteDescription,
    detailedDescription:
      settings.detailedDescription ?? defaultSettings.detailedDescription,
    logoText:
      settings.logoText ?? defaultSettings.logoText,
    siteIcon: settings.siteIcon ?? "",
    phone: settings.phone ?? "",
    email: settings.email ?? "",
    address: settings.address ?? "",
    workingHours: settings.workingHours ?? "",
    socialLinks: {
      instagram: settings.socialLinks?.instagram ?? "",
      linkedin: settings.socialLinks?.linkedin ?? "",
      telegram: settings.socialLinks?.telegram ?? "",
    },
    seoTitle: settings.seoTitle ?? settings.siteTitle ?? "",
    seoDescription:
      settings.seoDescription ??
      settings.detailedDescription ??
      defaultSettings.seoDescription,
    footerDescription:
      settings.footerDescription ?? defaultSettings.footerDescription,
    footerCopyright: settings.footerCopyright ?? defaultSettings.footerCopyright,
  };
}

export async function getHomeContent(): Promise<HomeContentData> {
  if (!hasDatabase()) {
    return defaultHomeContent;
  }

  await connectDb();
  const content = await HomeContent.findOne({ key: "home" }).lean();

  if (!content) {
    return defaultHomeContent;
  }

  return {
    hero: { ...defaultHomeContent.hero, ...content.hero },
    trustFeatures: sortByOrder(content.trustFeatures ?? []),
    stats: sortByOrder(content.stats ?? []),
    processSteps: sortByOrder(
      content.processSteps?.length
        ? content.processSteps
        : defaultHomeContent.processSteps,
    ),
    legalSupport: {
      ...defaultHomeContent.legalSupport,
      ...content.legalSupport,
    },
    legalSupportCards: sortByOrder(
      content.legalSupportCards?.length
        ? content.legalSupportCards
        : defaultHomeContent.legalSupportCards,
    ),
    finalCta: { ...defaultHomeContent.finalCta, ...content.finalCta },
    contactCta: { ...defaultHomeContent.contactCta, ...content.contactCta },
  };
}

export async function getPublishedContracts(limit?: number) {
  if (!hasDatabase()) {
    return canUseDemoFallback()
      ? limit
        ? contractSamples.slice(0, limit)
        : contractSamples
      : [];
  }

  await connectDb();
  const query = ContractTemplate.find({ status: "published" }).sort({
    order: 1,
    createdAt: -1,
  });
  if (limit) {
    query.limit(limit);
  }
  const docs = await query.lean();
  const contracts = docs.map(toContract);
  if (!contracts.length) {
    return canUseDemoFallback()
      ? limit
        ? contractSamples.slice(0, limit)
        : contractSamples
      : [];
  }
  return contracts;
}

export async function getAllContracts() {
  if (!hasDatabase()) {
    return [];
  }

  await connectDb();
  const docs = await ContractTemplate.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return docs.map(toContract);
}

export async function getContractBySlug(slug: string) {
  if (!hasDatabase()) {
    return canUseDemoFallback() ? getFallbackContract(slug) : null;
  }

  await connectDb();
  const doc = await ContractTemplate.findOne({
    slug,
    status: "published",
  }).lean();
  const contract = doc ? toContract(doc) : null;
  return contract ?? (canUseDemoFallback() ? getFallbackContract(slug) : null);
}

export async function getPublishedServices(limit?: number) {
  if (!hasDatabase()) {
    return canUseDemoFallback()
      ? limit
        ? serviceSamples.slice(0, limit)
        : serviceSamples
      : [];
  }

  await connectDb();
  const query = Service.find({ status: "published" }).sort({
    order: 1,
    createdAt: -1,
  });
  if (limit) {
    query.limit(limit);
  }
  const docs = await query.lean();
  const services = docs.map(toService);
  const sampleSlugs = new Set(serviceSamples.map((service) => service.slug));
  const hasPhaseTwoShape =
    services.length >= serviceSamples.length &&
    serviceSamples.every((sample) =>
      services.some(
        (service) =>
          service.slug === sample.slug &&
          service.heroDescription &&
          (service.faqItems?.length ?? 0) > 0,
      ),
    );

  if (
    !services.length ||
    !hasPhaseTwoShape ||
    services.some(
      (service) =>
        isMojibake(service.title) || !sampleSlugs.has(String(service.slug)),
    )
  ) {
    return canUseDemoFallback()
      ? limit
        ? serviceSamples.slice(0, limit)
        : serviceSamples
      : services;
  }
  return services;
}

export async function getAllServices() {
  await connectDb();
  const docs = await Service.find().sort({ order: 1, createdAt: -1 }).lean();
  return docs.map(toService);
}

export async function getServiceBySlug(slug: string) {
  await connectDb();
  const doc = await Service.findOne({ slug, status: "published" }).lean();
  const service = doc ? toService(doc) : null;
  if (!service || isMojibake(service.title)) {
    return canUseDemoFallback() ? getFallbackService(slug) : null;
  }
  return service;
}

export async function getLatestPosts(limit?: number) {
  await connectDb();
  const query = Post.find({ status: "published" }).sort({
    publishedAt: -1,
    createdAt: -1,
  });
  if (limit) {
    query.limit(limit);
  }
  const docs = await query.lean();
  return docs.map(toPost);
}

export async function getAllPosts() {
  await connectDb();
  const docs = await Post.find()
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
  return docs.map(toPost);
}

export async function getPostBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {},
) {
  await connectDb();
  const slugVariants = slugLookupVariants(slug);
  const query: { slug: string | { $in: string[] }; status?: "published" } =
    options.includeDrafts
      ? { slug: { $in: slugVariants } }
      : { slug: { $in: slugVariants }, status: "published" };
  const doc = await Post.findOne(query).lean();
  return doc ? toPost(doc) : null;
}

export async function getLatestNews(limit?: number) {
  await connectDb();
  const query = News.find({ status: "published" }).sort({
    publishedAt: -1,
    createdAt: -1,
  });
  if (limit) {
    query.limit(limit);
  }
  const docs = await query.lean();
  return docs.map(toNews);
}

export async function getAllNews() {
  await connectDb();
  const docs = await News.find()
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
  return docs.map(toNews);
}

export async function getNewsBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {},
) {
  await connectDb();
  const query: { slug: string; status?: "published" } = options.includeDrafts
    ? { slug }
    : { slug, status: "published" };
  const doc = await News.findOne(query).lean();
  return doc ? toNews(doc) : null;
}

export async function getPageContent(
  key: string,
): Promise<PageContentData | null> {
  await connectDb();
  const doc = await PageContent.findOne({ key }).lean();
  if (!doc) {
    return null;
  }

  return {
    key: doc.key,
    title: doc.title,
    subtitle: doc.subtitle ?? "",
    content: doc.content ?? "",
    metadata: (doc.metadata ?? {}) as Record<string, unknown>,
    seo: (doc.seo ?? {}) as Record<string, unknown>,
  };
}

export async function getAllPageContent() {
  await connectDb();
  const docs = await PageContent.find().sort({ key: 1 }).lean();
  return docs.map((doc) => ({
    key: doc.key,
    title: doc.title,
    subtitle: doc.subtitle ?? "",
    content: doc.content ?? "",
    metadata: (doc.metadata ?? {}) as Record<string, unknown>,
    seo: (doc.seo ?? {}) as Record<string, unknown>,
  }));
}

export async function getMessages() {
  await connectDb();
  const docs = await Message.find().sort({ createdAt: -1 }).lean();
  return docs.map<MessageData>((doc) => ({
    id: String(doc._id),
    fullName: doc.fullName,
    phone: doc.phone,
    email: doc.email ?? "",
    subject: doc.subject,
    message: doc.message,
    status: doc.status,
    createdAt: formatDate(doc.createdAt),
  }));
}

export async function getUsers() {
  await connectDb();
  const docs = await User.find()
    .select("fullName email role status createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return docs.map<UserData>((doc) => ({
    id: String(doc._id),
    fullName: doc.fullName,
    email: doc.email,
    role: doc.role,
    status: doc.status,
    createdAt: formatDate(doc.createdAt),
  }));
}

export async function getDashboardData() {
  await connectDb();
  const [
    postCount,
    newsCount,
    unreadMessageCount,
    serviceCount,
    recentPosts,
    recentNews,
    recentMessages,
  ] = await Promise.all([
    Post.countDocuments(),
    News.countDocuments(),
    Message.countDocuments({ status: "unread" }),
    Service.countDocuments(),
    Post.find().sort({ createdAt: -1 }).limit(4).lean(),
    News.find().sort({ createdAt: -1 }).limit(4).lean(),
    Message.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return {
    metrics: [
      { label: "مقالات", value: String(postCount), change: "محتوای وبلاگ" },
      { label: "اخبار", value: String(newsCount), change: "اطلاعیه های موسسه" },
      {
        label: "پیام های خوانده نشده",
        value: String(unreadMessageCount),
        change: "نیازمند پیگیری",
      },
      { label: "خدمات", value: String(serviceCount), change: "حوزه های حقوقی" },
    ],
    recentContent: [
      ...recentPosts.map((item) => ({
        title: item.title,
        category: item.category,
        date: formatDate(item.createdAt),
        status: item.status === "published" ? "منتشر شده" : "پیش نویس",
      })),
      ...recentNews.map((item) => ({
        title: item.title,
        category: "خبر موسسه",
        date: formatDate(item.createdAt),
        status: item.status === "published" ? "منتشر شده" : "پیش نویس",
      })),
    ].slice(0, 6),
    recentMessages: recentMessages.map((item) => ({
      name: item.fullName,
      email: item.email ?? "",
      subject: item.subject,
      date: formatDate(item.createdAt),
    })),
  };
}
