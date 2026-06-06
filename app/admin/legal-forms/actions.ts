"use server";

import { revalidatePath } from "next/cache";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { connectDb } from "@/lib/db";

function requireText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required`);
  return value;
}

function lines(value: FormDataEntryValue | null) {
  return String(value ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
}

const statuses = ["draft", "published", "archived"] as const;

function statusOf(value: string) {
  return statuses.includes(value as (typeof statuses)[number]) ? value as (typeof statuses)[number] : "published";
}

export async function saveLegalFormAction(formData: FormData) {
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
  await connectDb();
  const id = requireText(formData, "id");
  await LegalFormTemplate.findByIdAndUpdate(id, { status: "archived" }, { runValidators: true });
  revalidatePath("/admin/legal-forms");
  revalidatePath("/legal-forms");
}

export async function deleteLegalFormAction(formData: FormData) {
  await connectDb();
  const id = requireText(formData, "id");
  await LegalFormTemplate.findByIdAndDelete(id);
  revalidatePath("/admin/legal-forms");
  revalidatePath("/legal-forms");
}
