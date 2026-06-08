"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { scoreSeo } from "@/lib/seo";
import { FAQ } from "@/models/FAQ";

function requireText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required`);
  return value;
}

const pageTypes = ["general", "service", "contract", "legal-form"] as const;
const statuses = ["draft", "published", "archived"] as const;
const frequencies = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
] as const;

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function csv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function jsonObject(value: string) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function categoryValue(formData: FormData, fallback: string) {
  return (
    text(formData, "category") || text(formData, "categoryPreset") || fallback
  );
}

function checked(formData: FormData, key: string, fallback = false) {
  const value = formData.get(key);
  if (value === null) return fallback;
  return value === "on" || value === "true" || value === "1";
}

async function uploadedImageDataUrl(formData: FormData, key: string) {
  const file = formData.get(key);
  if (!(file instanceof File) || !file.name || file.size === 0) return "";
  if (!file.type.startsWith("image/")) return "";
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

async function imageValue(
  formData: FormData,
  textKey: string,
  fileKey: string,
) {
  return (
    (await uploadedImageDataUrl(formData, fileKey)) || text(formData, textKey)
  );
}

function frequencyOf(value: string, fallback: (typeof frequencies)[number]) {
  return frequencies.includes(value as (typeof frequencies)[number])
    ? (value as (typeof frequencies)[number])
    : fallback;
}

async function seoPayload(formData: FormData) {
  const pageType = text(formData, "pageType") || "general";
  const pageSlug = text(formData, "pageSlug");
  const path = pageSlug ? `/${pageType}/${pageSlug}` : "/faq";
  const seo = {
    metaTitle: text(formData, "seo.metaTitle"),
    metaDescription: text(formData, "seo.metaDescription"),
    keywords: csv(text(formData, "seo.keywords")),
    focusKeyword: text(formData, "seo.focusKeyword"),
    canonicalUrl: text(formData, "seo.canonicalUrl"),
    robotsIndex: checked(formData, "seo.robotsIndex", true),
    robotsFollow: checked(formData, "seo.robotsFollow", true),
    ogTitle: text(formData, "seo.ogTitle"),
    ogDescription: text(formData, "seo.ogDescription"),
    ogImage: await imageValue(formData, "seo.ogImage", "seo.ogImageFile"),
    twitterTitle: text(formData, "seo.twitterTitle"),
    twitterDescription: text(formData, "seo.twitterDescription"),
    twitterImage: await imageValue(
      formData,
      "seo.twitterImage",
      "seo.twitterImageFile",
    ),
    imageAlt: text(formData, "seo.imageAlt"),
    schemaType: text(formData, "seo.schemaType"),
    schemaJson: jsonObject(text(formData, "seo.schemaJson")),
    sitemapInclude: checked(formData, "seo.sitemapInclude", true),
    sitemapPriority: Math.max(
      0,
      Math.min(1, Number(text(formData, "seo.sitemapPriority")) || 0.5),
    ),
    sitemapChangeFrequency: frequencyOf(
      text(formData, "seo.sitemapChangeFrequency"),
      "monthly",
    ),
  };
  const { score, issues } = scoreSeo(seo, path, text(formData, "question"));
  return { ...seo, seoScore: score, seoNotes: issues };
}

function oneOf<T extends readonly string[]>(
  value: string,
  values: T,
  fallback: T[number],
): T[number] {
  return values.includes(value) ? (value as T[number]) : fallback;
}

export async function saveFaqAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const id = String(formData.get("id") ?? "").trim();
  const payload = {
    question: requireText(formData, "question"),
    answer: requireText(formData, "answer"),
    category: categoryValue(formData, "عمومی"),
    pageType: oneOf(
      String(formData.get("pageType") ?? "general"),
      pageTypes,
      "general",
    ),
    pageSlug: String(formData.get("pageSlug") ?? "").trim(),
    status: oneOf(
      String(formData.get("status") ?? "published"),
      statuses,
      "published",
    ),
    order: Number(formData.get("order") ?? 0),
    seo: await seoPayload(formData),
  };
  if (id) {
    await FAQ.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    await FAQ.create(payload);
  }
  revalidatePath("/admin/faqs");
  revalidatePath("/services");
  revalidatePath("/contracts");
  revalidatePath("/legal-forms");
}

export async function archiveFaqAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const id = requireText(formData, "id");
  await FAQ.findByIdAndUpdate(
    id,
    { status: "archived" },
    { runValidators: true },
  );
  revalidatePath("/admin/faqs");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const id = requireText(formData, "id");
  await FAQ.findByIdAndDelete(id);
  revalidatePath("/admin/faqs");
}
