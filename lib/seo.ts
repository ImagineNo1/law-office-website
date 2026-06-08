import type { Metadata, MetadataRoute } from "next";
import { connectDb } from "@/lib/db";
import { ContractTemplate } from "@/models/ContractTemplate";
import { FAQ } from "@/models/FAQ";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { News } from "@/models/News";
import { PageContent } from "@/models/PageContent";
import { Post } from "@/models/Post";
import { SEORedirect } from "@/models/SEORedirect";
import { SEOSettings } from "@/models/SEOSettings";
import { SiteSettings } from "@/models/SiteSettings";
import { Service } from "@/models/Service";

export type SeoData = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  focusKeyword: string;
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  imageAlt: string;
  schemaType: string;
  schemaJson: Record<string, unknown>;
  sitemapInclude: boolean;
  sitemapPriority: number;
  sitemapChangeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  seoScore: number;
  seoNotes: string[];
};

export type SeoPageType =
  | "home"
  | "page"
  | "service"
  | "contract"
  | "legal-form"
  | "blog"
  | "news"
  | "faq";

export type SeoPage = {
  id: string;
  model: string;
  type: SeoPageType;
  typeLabel: string;
  title: string;
  path: string;
  status: string;
  updatedAt?: Date | string;
  seo: SeoData;
  issues: string[];
  score: number;
};

type SeoDoc = {
  _id?: unknown;
  key?: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  description?: string;
  status?: string;
  seo?: Partial<SeoData>;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: Date | string;
};

const defaultSeo: SeoData = {
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  focusKeyword: "",
  canonicalUrl: "",
  robotsIndex: true,
  robotsFollow: true,
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  imageAlt: "",
  schemaType: "",
  schemaJson: {},
  sitemapInclude: true,
  sitemapPriority: 0.7,
  sitemapChangeFrequency: "weekly",
  seoScore: 0,
  seoNotes: [],
};

const typeLabels: Record<SeoPageType, string> = {
  home: "صفحه اصلی",
  page: "صفحه ثابت",
  service: "خدمت",
  contract: "قرارداد",
  "legal-form": "فرم حقوقی",
  blog: "وبلاگ",
  news: "خبر",
  faq: "سوال متداول",
};

const staticPages = [
  { key: "home", title: "صفحه اصلی", path: "/", type: "home" as const },
  { key: "about", title: "درباره ما", path: "/about", type: "page" as const },
  {
    key: "institute",
    title: "معرفی موسسه",
    path: "/institute",
    type: "page" as const,
  },
  {
    key: "contact",
    title: "تماس با ما",
    path: "/contact",
    type: "page" as const,
  },
  {
    key: "services",
    title: "خدمات حقوقی",
    path: "/services",
    type: "page" as const,
  },
  {
    key: "contracts",
    title: "بانک قراردادها",
    path: "/contracts",
    type: "page" as const,
  },
  {
    key: "legal-forms",
    title: "فرم‌های حقوقی",
    path: "/legal-forms",
    type: "page" as const,
  },
  { key: "blog", title: "وبلاگ", path: "/blog", type: "page" as const },
  { key: "news", title: "اخبار", path: "/news", type: "page" as const },
  {
    key: "requests-new",
    title: "ثبت درخواست",
    path: "/requests/new",
    type: "page" as const,
  },
];

function idOf(value: unknown, fallback: string) {
  return value && typeof value === "object" && "toString" in value
    ? String(value)
    : fallback;
}

export function hasDatabase() {
  return Boolean(process.env.MONGODB_URI);
}

export function canUseDemoData() {
  return process.env.ALLOW_DEMO_DATA === "true";
}

export function normalizeSeo(input?: Partial<SeoData> | null): SeoData {
  return {
    ...defaultSeo,
    ...(input ?? {}),
    keywords: Array.isArray(input?.keywords)
      ? input.keywords.filter(Boolean)
      : [],
    seoNotes: Array.isArray(input?.seoNotes)
      ? input.seoNotes.filter(Boolean)
      : [],
    schemaJson:
      input?.schemaJson && typeof input.schemaJson === "object"
        ? input.schemaJson
        : {},
  };
}

function charIssue(value: string, min: number, max: number, label: string) {
  if (!value) return `${label} نوشته نشده است.`;
  if (value.length < min)
    return `${label} کوتاه است؛ بهتر است حداقل ${min} کاراکتر باشد.`;
  if (value.length > max)
    return `${label} طولانی است؛ بهتر است حداکثر ${max} کاراکتر باشد.`;
  return "";
}

export function scoreSeo(
  seoInput?: Partial<SeoData> | null,
  path = "",
  title = "",
) {
  const seo = normalizeSeo(seoInput);
  const issues = [
    charIssue(seo.metaTitle, 40, 60, "عنوان سئو"),
    charIssue(seo.metaDescription, 120, 160, "توضیحات متا"),
  ].filter(Boolean);

  if (!seo.focusKeyword) issues.push("کلمه کلیدی اصلی انتخاب نشده است.");
  if (
    seo.focusKeyword &&
    seo.metaTitle &&
    !seo.metaTitle.includes(seo.focusKeyword)
  )
    issues.push("کلمه کلیدی اصلی در عنوان سئو نیست.");
  if (
    seo.focusKeyword &&
    seo.metaDescription &&
    !seo.metaDescription.includes(seo.focusKeyword)
  )
    issues.push("کلمه کلیدی اصلی در توضیحات متا نیست.");
  if (
    !/^[a-z0-9\-\/]+$/i.test(path) &&
    !path.includes("/contracts/") &&
    !path.includes("/services/")
  )
    issues.push(
      "مسیر صفحه بهتر است کوتاه، خوانا و بدون کاراکترهای پیچیده باشد.",
    );
  if (seo.canonicalUrl && !/^https?:\/\//.test(seo.canonicalUrl))
    issues.push("آدرس canonical باید با http یا https شروع شود.");
  if (!seo.ogTitle) issues.push("عنوان شبکه‌های اجتماعی نوشته نشده است.");
  if (!seo.ogDescription) issues.push("توضیح شبکه‌های اجتماعی نوشته نشده است.");
  if (!seo.ogImage) issues.push("تصویر اشتراک‌گذاری انتخاب نشده است.");
  if (!seo.imageAlt) issues.push("متن جایگزین تصویر نوشته نشده است.");
  if (!seo.schemaType) issues.push("نوع اسکیما انتخاب نشده است.");
  if (!seo.robotsIndex && seo.sitemapInclude)
    issues.push("صفحه noindex نباید در سایت‌مپ باشد.");
  if (!title) issues.push("عنوان صفحه مشخص نیست.");

  const checks = 13;
  const score = Math.max(
    0,
    Math.min(100, Math.round(((checks - issues.length) / checks) * 100)),
  );
  return { score, issues };
}

export function scoreLabel(score: number) {
  if (score >= 80) return "خوب";
  if (score >= 50) return "نیاز به بهبود";
  return "ضعیف";
}

export function buildPath(type: SeoPageType, doc: SeoDoc) {
  if (type === "service") return `/services/${doc.slug}`;
  if (type === "contract") return `/contracts/${doc.category}/${doc.slug}`;
  if (type === "legal-form") return `/legal-forms#${doc.slug}`;
  if (type === "blog") return `/blog/${doc.slug}`;
  if (type === "news") return `/news/${doc.slug}`;
  if (type === "faq") return doc.slug ? `/faq/${doc.slug}` : "/#faq";
  return "/";
}

function toSeoPage(
  type: SeoPageType,
  model: string,
  doc: SeoDoc,
  fallbackPath?: string,
): SeoPage {
  const title = doc.title ?? doc.key ?? "بدون عنوان";
  const seo = normalizeSeo({
    ...(doc.seo ?? {}),
    metaTitle: doc.seo?.metaTitle || doc.seoTitle || "",
    metaDescription: doc.seo?.metaDescription || doc.seoDescription || "",
  });
  const path = fallbackPath ?? buildPath(type, doc);
  const { score, issues } = scoreSeo(seo, path, title);
  return {
    id: idOf(doc._id, doc.key ?? path),
    model,
    type,
    typeLabel: typeLabels[type],
    title,
    path,
    status: doc.status ?? "published",
    updatedAt: doc.updatedAt,
    seo: { ...seo, seoScore: score, seoNotes: issues },
    issues,
    score,
  };
}

export async function getSeoSettings() {
  if (!hasDatabase()) {
    return {
      siteName: "وکیل‌یار",
      defaultMetaTitle: "وکیل‌یار | خدمات حقوقی، قرارداد و امضا",
      defaultMetaDescription:
        "پلتفرم فارسی خدمات حقوقی، بانک قرارداد، ثبت درخواست و پیگیری پرونده برای موکلان.",
      defaultOgImage: "",
      canonicalBaseUrl: "https://vakilyar.vercel.app",
      robotsTxt: "",
      organizationName: "وکیل‌یار",
      phone: "",
      address: "",
      logo: "",
      socialProfiles: [],
    };
  }
  await connectDb();
  const [settings, site] = await Promise.all([
    SEOSettings.findOne({ key: "seo" }).lean<Record<string, unknown>>(),
    SiteSettings.findOne({ key: "site" }).lean<Record<string, unknown>>(),
  ]);
  const brandName = String(site?.logoText || site?.siteTitle || "وکیل‌یار");
  const siteTitle = String(
    site?.siteTitle || "وکیل‌یار | خدمات حقوقی، قرارداد و پیگیری پرونده",
  );
  const siteDescription = String(
    site?.detailedDescription ||
      "پلتفرم فارسی خدمات حقوقی، بانک قرارداد، ثبت درخواست و پیگیری پرونده برای موکلان.",
  );
  const siteIcon = String(site?.siteIcon || "");

  return {
    siteName: String(settings?.siteName || brandName),
    defaultMetaTitle: String(settings?.defaultMetaTitle || siteTitle),
    defaultMetaDescription: String(
      settings?.defaultMetaDescription || siteDescription,
    ),
    defaultOgImage: String(settings?.defaultOgImage || siteIcon),
    canonicalBaseUrl: String(
      settings?.canonicalBaseUrl ?? "https://vakilyar.vercel.app",
    ).replace(/\/$/, ""),
    robotsTxt: String(settings?.robotsTxt ?? ""),
    organizationName: String(settings?.organizationName || brandName),
    phone: String(settings?.phone || site?.phone || ""),
    address: String(settings?.address || site?.address || ""),
    logo: String(settings?.logo || siteIcon),
    socialProfiles: Array.isArray(settings?.socialProfiles)
      ? (settings.socialProfiles as string[])
      : [],
  };
}

export async function getSeoPages(): Promise<SeoPage[]> {
  if (!hasDatabase())
    return staticPages.map((item) =>
      toSeoPage(
        item.type,
        "PageContent",
        { key: item.key, title: item.title },
        item.path,
      ),
    );
  await connectDb();

  const [pages, services, contracts, forms, posts, news, faqs] =
    await Promise.all([
      PageContent.find().lean<SeoDoc[]>(),
      Service.find({ status: "published" })
        .sort({ order: 1, createdAt: -1 })
        .lean<SeoDoc[]>(),
      ContractTemplate.find({ status: "published" })
        .sort({ order: 1, createdAt: -1 })
        .lean<SeoDoc[]>(),
      LegalFormTemplate.find({ status: "published" })
        .sort({ createdAt: -1 })
        .lean<SeoDoc[]>(),
      Post.find({ status: "published" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .lean<SeoDoc[]>(),
      News.find({ status: "published" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .lean<SeoDoc[]>(),
      FAQ.find({ status: "published" })
        .sort({ order: 1, createdAt: -1 })
        .lean<SeoDoc[]>(),
    ]);

  const pageMap = new Map(pages.map((page) => [page.key, page]));
  const staticSeoPages = staticPages.map((item) =>
    toSeoPage(
      item.type,
      "PageContent",
      {
        ...pageMap.get(item.key),
        key: item.key,
        title: pageMap.get(item.key)?.title ?? item.title,
      },
      item.path,
    ),
  );

  return [
    ...staticSeoPages,
    ...services.map((doc) => toSeoPage("service", "Service", doc)),
    ...contracts.map((doc) => toSeoPage("contract", "ContractTemplate", doc)),
    ...forms.map((doc) => toSeoPage("legal-form", "LegalFormTemplate", doc)),
    ...posts.map((doc) => toSeoPage("blog", "Post", doc)),
    ...news.map((doc) => toSeoPage("news", "News", doc)),
    ...faqs.map((doc) =>
      toSeoPage(
        "faq",
        "FAQ",
        {
          ...doc,
          title: doc.title ?? doc.excerpt ?? "سوال متداول",
          slug: doc.slug ?? doc.key ?? "",
        },
        doc.key ? `/#${doc.key}` : undefined,
      ),
    ),
  ];
}

export async function getSeoForPath(path: string) {
  const pages = await getSeoPages();
  return pages.find((page) => page.path === path) ?? null;
}

export async function buildMetadata({
  path,
  seo,
  title,
  description,
  image,
  noIndex = false,
}: {
  path: string;
  seo?: Partial<SeoData> | null;
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}): Promise<Metadata> {
  const settings = await getSeoSettings();
  const normalized = normalizeSeo(seo);
  const pageTitle = normalized.metaTitle || title || settings.defaultMetaTitle;
  const pageDescription =
    normalized.metaDescription ||
    description ||
    settings.defaultMetaDescription;
  const canonical =
    normalized.canonicalUrl || `${settings.canonicalBaseUrl}${path}`;
  const ogImage =
    normalized.ogImage ||
    normalized.twitterImage ||
    image ||
    settings.defaultOgImage ||
    undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: normalized.keywords,
    alternates: { canonical },
    robots: {
      index: !noIndex && normalized.robotsIndex,
      follow: normalized.robotsFollow,
    },
    openGraph: {
      title: normalized.ogTitle || pageTitle,
      description: normalized.ogDescription || pageDescription,
      url: canonical,
      siteName: settings.siteName,
      images: ogImage
        ? [{ url: ogImage, alt: normalized.imageAlt || pageTitle }]
        : undefined,
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: normalized.twitterTitle || normalized.ogTitle || pageTitle,
      description:
        normalized.twitterDescription ||
        normalized.ogDescription ||
        pageDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings();
  const pages = await getSeoPages();
  return pages
    .filter(
      (page) =>
        page.status === "published" &&
        page.seo.sitemapInclude &&
        page.seo.robotsIndex,
    )
    .filter(
      (page) =>
        !page.path.startsWith("/admin") &&
        !page.path.startsWith("/dashboard") &&
        !["/login", "/signup"].includes(page.path),
    )
    .map((page) => ({
      url: `${settings.canonicalBaseUrl}${page.path}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: page.seo.sitemapChangeFrequency,
      priority: page.seo.sitemapPriority,
    }));
}

export async function getRobots(): Promise<MetadataRoute.Robots> {
  const settings = await getSeoSettings();
  const disallow = [
    "/admin",
    "/admin/",
    "/dashboard",
    "/dashboard/",
    "/login",
    "/signup",
    "/auth",
    "/api",
  ];
  return {
    rules: { userAgent: "*", allow: "/", disallow },
    sitemap: `${settings.canonicalBaseUrl}/sitemap.xml`,
  };
}

export async function getSeoRedirects() {
  if (!hasDatabase()) return [];
  await connectDb();
  const docs = await SEORedirect.find().sort({ createdAt: -1 }).lean<
    {
      _id: unknown;
      sourcePath: string;
      targetPath: string;
      statusCode: number;
      enabled: boolean;
      hitCount?: number;
      createdAt?: Date | string;
      updatedAt?: Date | string;
    }[]
  >();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id, doc.sourcePath) }));
}
