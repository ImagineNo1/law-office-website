"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "@/lib/db";
import { FAQ } from "@/models/FAQ";

function requireText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required`);
  return value;
}

const pageTypes = ["general", "service", "contract", "legal-form"] as const;
const statuses = ["draft", "published", "archived"] as const;

function oneOf<T extends readonly string[]>(value: string, values: T, fallback: T[number]): T[number] {
  return values.includes(value) ? value as T[number] : fallback;
}

export async function saveFaqAction(formData: FormData) {
  await connectDb();
  const id = String(formData.get("id") ?? "").trim();
  const payload = {
    question: requireText(formData, "question"),
    answer: requireText(formData, "answer"),
    category: String(formData.get("category") ?? "عمومی").trim() || "عمومی",
    pageType: oneOf(String(formData.get("pageType") ?? "general"), pageTypes, "general"),
    pageSlug: String(formData.get("pageSlug") ?? "").trim(),
    status: oneOf(String(formData.get("status") ?? "published"), statuses, "published"),
    order: Number(formData.get("order") ?? 0),
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
  await connectDb();
  const id = requireText(formData, "id");
  await FAQ.findByIdAndUpdate(id, { status: "archived" }, { runValidators: true });
  revalidatePath("/admin/faqs");
}

export async function deleteFaqAction(formData: FormData) {
  await connectDb();
  const id = requireText(formData, "id");
  await FAQ.findByIdAndDelete(id);
  revalidatePath("/admin/faqs");
}
