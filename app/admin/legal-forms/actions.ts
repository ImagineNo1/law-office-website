"use server";

import { revalidatePath } from "next/cache";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { scoreSeo } from "@/lib/seo";

function requireText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required`);
  return value;
}

function lines(value: FormDataEntryValue | null) {
  return String(value ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function csv(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function jsonObject(value: string) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function checked(formData: FormData, key: string, fallback = false) {
  const value = formData.get(key);
  if (value === null) return fallback;
  return value === "on" || value === "true" || value === "1";
}

const frequencies = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"] as const;

function frequencyOf(value: string, fallback: (typeof frequencies)[number]) {
  return frequencies.includes(value as (typeof frequencies)[number]) ? value as (typeof frequencies)[number] : fallback;
}

function seoPayload(formData: FormData) {
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
    ogImage: text(formData, "seo.ogImage"),
    twitterTitle: text(formData, "seo.twitterTitle"),
    twitterDescription: text(formData, "seo.twitterDescription"),
    twitterImage: text(formData, "seo.twitterImage"),
    imageAlt: text(formData, "seo.imageAlt"),
    schemaType: text(formData, "seo.schemaType"),
    schemaJson: jsonObject(text(formData, "seo.schemaJson")),
    sitemapInclude: checked(formData, "seo.sitemapInclude", true),
    sitemapPriority: Math.max(0, Math.min(1, Number(text(formData, "seo.sitemapPriority")) || 0.7)),
    sitemapChangeFrequency: frequencyOf(text(formData, "seo.sitemapChangeFrequency"), "weekly"),
  };
  const { score, issues } = scoreSeo(seo, `/legal-forms/${text(formData, "slug")}`, text(formData, "title"));
  return { ...seo, seoScore: score, seoNotes: issues };
}

const statuses = ["draft", "published", "archived"] as const;

function statusOf(value: string) {
  return statuses.includes(value as (typeof statuses)[number]) ? value as (typeof statuses)[number] : "published";
}

export async function saveLegalFormAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const id = String(formData.get("id") ?? "").trim();
  const title = requireText(formData, "title");
  const slug = requireText(formData, "slug");
  const category = requireText(formData, "category");
  const payload = {
    title,
    slug,
    category,
    description: String(formData.get("description") ?? "").trim(),
    fields: lines(formData.get("fields")),
    usageCount: Number(formData.get("usageCount") ?? 0),
    status: statusOf(String(formData.get("status") ?? "published")),
    seo: seoPayload(formData),
  };
  if (id) {
    await LegalFormTemplate.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    await LegalFormTemplate.create(payload);
  }
  revalidatePath("/admin/legal-forms");
  revalidatePath("/legal-forms");
}

export async function archiveLegalFormAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const id = requireText(formData, "id");
  await LegalFormTemplate.findByIdAndUpdate(id, { status: "archived" }, { runValidators: true });
  revalidatePath("/admin/legal-forms");
  revalidatePath("/legal-forms");
}

export async function deleteLegalFormAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const id = requireText(formData, "id");
  await LegalFormTemplate.findByIdAndDelete(id);
  revalidatePath("/admin/legal-forms");
  revalidatePath("/legal-forms");
}
