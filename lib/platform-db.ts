import { connectDb } from "@/lib/db";
import {
  dashboardEvents,
  fa,
  legalForms,
  recoveryContracts,
  recoveryFaqs,
  recoveryServices,
} from "@/lib/platform-recovery-data";
import {
  getServiceRequestById,
  getServiceRequests,
} from "@/lib/service-requests";
import { ContractTemplate } from "@/models/ContractTemplate";
import { FAQ } from "@/models/FAQ";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { News } from "@/models/News";
import { Post } from "@/models/Post";
import { Service } from "@/models/Service";

export type PlatformService = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tag: string;
  sla: string;
  benefits: string[];
  processSteps: string[];
  requiredDocuments: string[];
  faqItems: { question: string; answer: string }[];
  priceLabel: string;
  heroDescription: string;
  heroFeatures: string[];
};

export type PlatformContract = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  price: string;
  downloads: number;
  rating: string;
  heroImage?: string;
  benefits: string[];
  requiredDocuments: string[];
  faqItems: { question: string; answer: string }[];
};

export type PlatformArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  href: string;
};

export type PlatformLegalForm = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  fields: number;
  usage: number;
};

export type PlatformFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  pageType: "general" | "service" | "contract" | "legal-form";
  pageSlug: string;
};

export const fallbackServices: PlatformService[] = recoveryServices.map(
  ([title, slug, description, tag, sla], index) => ({
    id: `service-${index + 1}`,
    title,
    slug,
    description,
    category: tag,
    tag,
    sla,
    benefits: ["بررسی تخصصی", "تحویل قابل پیگیری", "آماده امضا"],
    processSteps: [
      "ثبت درخواست",
      "بررسی مدارک",
      "تهیه پیش نویس",
      "بازبینی موکل",
      "تحویل و بایگانی",
    ],
    requiredDocuments: [
      "کارت ملی",
      "شرح موضوع",
      "مستندات مرتبط",
      "اطلاعات طرف مقابل",
    ],
    faqItems: recoveryFaqs.map(([question, answer]) => ({ question, answer })),
    priceLabel: "براساس بررسی",
    heroDescription: description,
    heroFeatures: ["CRM حقوقی", "امضای دیجیتال", "آرشیو امن"],
  }),
);

export const fallbackContracts: PlatformContract[] = recoveryContracts.map(
  (contract) => ({
    id: contract.id,
    title: contract.title,
    slug: contract.slug,
    category: contract.category,
    description: contract.description,
    price: contract.price,
    downloads: contract.downloads,
    rating: contract.rating,
    benefits: ["قابل ویرایش", "بررسی حقوقی", "آماده امضا"],
    requiredDocuments: ["مشخصات طرفین", "مدارک هویتی", "شرایط معامله"],
    faqItems: recoveryFaqs.map(([question, answer]) => ({ question, answer })),
    heroImage: "",
  }),
);

export const fallbackLegalForms: PlatformLegalForm[] = legalForms.map(
  (form) => ({
    id: form.id,
    title: form.title,
    slug: form.slug,
    category: form.category,
    description: form.description,
    fields: form.fields,
    usage: form.usage,
  }),
);

export const fallbackDashboardEvents = dashboardEvents;

function hasDatabase() {
  return Boolean(process.env.MONGODB_URI);
}

function canUseDemoFallback() {
  return process.env.ALLOW_DEMO_DATA === "true";
}

function idOf(value: unknown, fallback: string) {
  return value && typeof value === "object" && "toString" in value
    ? String(value)
    : fallback;
}

export async function getPlatformServices(): Promise<PlatformService[]> {
  if (!hasDatabase()) return canUseDemoFallback() ? fallbackServices : [];
  await connectDb();
  const docs = await Service.find({ status: "published" })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  if (!docs.length) return canUseDemoFallback() ? fallbackServices : [];
  return docs.map((doc, index) => ({
    id: idOf(doc._id, `service-${index + 1}`),
    title: String(doc.title),
    slug: String(doc.slug),
    description: String(doc.excerpt || doc.heroDescription || ""),
    category: String(doc.category || "خدمات"),
    tag: String(doc.category || "خدمات"),
    sla: String(doc.priceLabel || "براساس بررسی"),
    benefits: doc.benefits ?? [],
    processSteps: doc.processSteps ?? [],
    requiredDocuments: doc.requiredDocuments ?? [],
    faqItems: doc.faqItems ?? [],
    priceLabel: String(doc.priceLabel || "براساس بررسی"),
    heroDescription: String(doc.heroDescription || doc.excerpt || ""),
    heroFeatures: doc.heroFeatures ?? [],
  }));
}

export async function getPlatformServiceBySlug(slug: string) {
  const services = await getPlatformServices();
  return (
    services.find((service) => service.slug === slug) ?? services[0] ?? null
  );
}

export async function getPlatformContracts(): Promise<PlatformContract[]> {
  if (!hasDatabase()) return canUseDemoFallback() ? fallbackContracts : [];
  await connectDb();
  const docs = await ContractTemplate.find({ status: "published" })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  if (!docs.length) return canUseDemoFallback() ? fallbackContracts : [];
  return docs.map((doc, index) => {
    const stats = doc as typeof doc & { downloads?: number; rating?: string };
    return {
      id: idOf(doc._id, `contract-${index + 1}`),
      title: String(doc.title),
      slug: String(doc.slug),
      category: String(doc.category),
      description: String(doc.excerpt || doc.content || ""),
      price: String(doc.priceLabel || "رایگان"),
      downloads: Number(stats.downloads || 0),
      rating: String(stats.rating || ""),
      heroImage: String(doc.heroImage || ""),
      benefits: doc.benefits ?? [],
      requiredDocuments: doc.requiredDocuments ?? [],
      faqItems: doc.faqItems ?? [],
    };
  });
}

export async function getPlatformContractBySlug(slug: string) {
  const contracts = await getPlatformContracts();
  return (
    contracts.find((contract) => contract.slug === slug) ?? contracts[0] ?? null
  );
}

export async function getPlatformArticles(
  limit = 4,
): Promise<PlatformArticle[]> {
  if (!hasDatabase()) return [];
  await connectDb();
  const docs = await Post.find({ status: "published" })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();

  return docs.map((doc, index) => ({
    id: idOf(doc._id, `article-${index + 1}`),
    title: String(doc.title),
    slug: String(doc.slug),
    excerpt: String(doc.excerpt || ""),
    category: String(doc.category || "مقاله"),
    coverImage: String(doc.coverImage || ""),
    publishedAt: doc.publishedAt
      ? new Intl.DateTimeFormat("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(doc.publishedAt))
      : "",
    href: `/blog/${doc.slug}`,
  }));
}

export async function getPlatformNews(limit = 4): Promise<PlatformArticle[]> {
  if (!hasDatabase()) return [];
  await connectDb();
  const docs = await News.find({ status: "published" })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();

  return docs.map((doc, index) => ({
    id: idOf(doc._id, `news-${index + 1}`),
    title: String(doc.title),
    slug: String(doc.slug),
    excerpt: String(doc.excerpt || ""),
    category: String(doc.category || "خبر"),
    coverImage: String(doc.coverImage || ""),
    publishedAt: doc.publishedAt
      ? new Intl.DateTimeFormat("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(doc.publishedAt))
      : "",
    href: `/news/${doc.slug}`,
  }));
}

export async function getPlatformLegalForms(): Promise<PlatformLegalForm[]> {
  if (!hasDatabase()) return canUseDemoFallback() ? fallbackLegalForms : [];
  await connectDb();
  const docs = await LegalFormTemplate.find({ status: "published" })
    .sort({ createdAt: -1 })
    .lean();
  if (!docs.length) return canUseDemoFallback() ? fallbackLegalForms : [];
  return docs.map((doc, index) => ({
    id: idOf(doc._id, `form-${index + 1}`),
    title: String(doc.title),
    slug: String(doc.slug),
    category: String(doc.category),
    description: String(doc.description || ""),
    fields: Array.isArray(doc.fields) ? doc.fields.length : 0,
    usage: Number(doc.usageCount || 0),
  }));
}

export async function getPlatformFaqs(
  pageType?: PlatformFaq["pageType"],
  pageSlug?: string,
): Promise<PlatformFaq[]> {
  if (!hasDatabase()) {
    return canUseDemoFallback()
      ? recoveryFaqs.map(([question, answer], index) => ({
          id: `faq-${index + 1}`,
          question,
          answer,
          category: "عمومی",
          pageType: pageType ?? "general",
          pageSlug: pageSlug ?? "",
        }))
      : [];
  }
  await connectDb();
  const query: Record<string, string> = { status: "published" };
  if (pageType) query.pageType = pageType;
  if (pageSlug) query.pageSlug = pageSlug;
  const docs = await FAQ.find(query).sort({ order: 1, createdAt: -1 }).lean();
  if (!docs.length && pageType !== "general") return getPlatformFaqs("general");
  if (!docs.length) {
    return canUseDemoFallback()
      ? recoveryFaqs.map(([question, answer], index) => ({
          id: `faq-${index + 1}`,
          question,
          answer,
          category: "عمومی",
          pageType: pageType ?? "general",
          pageSlug: pageSlug ?? "",
        }))
      : [];
  }
  return docs.map((doc, index) => ({
    id: idOf(doc._id, `faq-${index + 1}`),
    question: String(doc.question),
    answer: String(doc.answer),
    category: String(doc.category || "عمومی"),
    pageType: (doc.pageType as PlatformFaq["pageType"]) ?? "general",
    pageSlug: String(doc.pageSlug || ""),
  }));
}

export { fa, getServiceRequestById, getServiceRequests };
