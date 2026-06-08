import { connectDb } from "@/lib/db";
import { scoreSeo } from "@/lib/seo";
import { ContractTemplate } from "@/models/ContractTemplate";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { News } from "@/models/News";
import { PageContent } from "@/models/PageContent";
import { Post } from "@/models/Post";
import { SEOSettings } from "@/models/SEOSettings";
import { Service } from "@/models/Service";

type SeoSeedDoc = {
  _id: unknown;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  description?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
};

function seoFor(doc: SeoSeedDoc, path: string, fallbackDescription = "") {
  const title = String(doc.title ?? "");
  const description = String(doc.excerpt ?? doc.description ?? fallbackDescription).slice(0, 155);
  const seo = {
    metaTitle: title ? `${title} | وکیل یار` : "وکیل یار",
    metaDescription: description,
    keywords: title ? [title] : [],
    focusKeyword: title,
    canonicalUrl: "",
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: title,
    ogDescription: description,
    ogImage: "",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "",
    imageAlt: title,
    schemaType: "WebPage",
    schemaJson: {},
    sitemapInclude: true,
    sitemapPriority: path === "/" ? 1 : 0.7,
    sitemapChangeFrequency: "weekly" as const,
  };
  const { score, issues } = scoreSeo(seo, path, title);
  return { ...seo, seoScore: score, seoNotes: issues };
}

async function fillCollection<T extends SeoSeedDoc>(
  label: string,
  model: { find: (query?: Record<string, unknown>) => { lean: <R>() => Promise<R> }; findByIdAndUpdate: (id: unknown, update: Record<string, unknown>) => Promise<unknown> },
  pathOf: (doc: T) => string,
) {
  const docs = await model.find().lean<T[]>();
  let changed = 0;
  for (const doc of docs) {
    if (doc.seo?.metaTitle || doc.seo?.metaDescription) continue;
    await model.findByIdAndUpdate(doc._id, { seo: seoFor(doc, pathOf(doc)) });
    changed += 1;
  }
  console.log(`${label}: ${changed} SEO records seeded`);
}

async function main() {
  await connectDb();

  await SEOSettings.findOneAndUpdate(
    { key: "seo" },
    {
      $setOnInsert: {
        key: "seo",
        siteName: "وکیل یار",
        defaultMetaTitle: "وکیل یار | خدمات حقوقی، قرارداد و امضا",
        defaultMetaDescription: "پلتفرم فارسی خدمات حقوقی، بانک قرارداد، ثبت درخواست و پیگیری پرونده برای موکلان.",
        canonicalBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vakilyar.vercel.app",
        organizationName: "وکیل یار",
      },
    },
    { upsert: true },
  );

  const staticPages = [
    ["home", "صفحه اصلی", "/"],
    ["about", "درباره ما", "/about"],
    ["institute", "معرفی موسسه", "/institute"],
    ["contact", "تماس با ما", "/contact"],
    ["services", "خدمات حقوقی", "/services"],
    ["contracts", "بانک قراردادها", "/contracts"],
    ["legal-forms", "فرم‌های حقوقی", "/legal-forms"],
    ["blog", "وبلاگ", "/blog"],
    ["news", "اخبار", "/news"],
    ["requests-new", "ثبت درخواست حقوقی", "/requests/new"],
  ] as const;

  for (const [key, title, path] of staticPages) {
    const existing = await PageContent.findOne({ key }).lean<SeoSeedDoc | null>();
    if (existing?.seo?.metaTitle || existing?.seo?.metaDescription) continue;
    await PageContent.findOneAndUpdate(
      { key },
      { $setOnInsert: { key, title }, $set: { seo: seoFor({ _id: key, title }, path) } },
      { upsert: true },
    );
  }

  await fillCollection("Services", Service, (doc) => `/services/${doc.slug}`);
  await fillCollection("Contracts", ContractTemplate, (doc) => `/contracts/${doc.category}/${doc.slug}`);
  await fillCollection("Legal forms", LegalFormTemplate, (doc) => `/legal-forms#${doc.slug}`);
  await fillCollection("Blog posts", Post, (doc) => `/blog/${doc.slug}`);
  await fillCollection("News", News, (doc) => `/news/${doc.slug}`);

  console.log("SEO seed complete");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
