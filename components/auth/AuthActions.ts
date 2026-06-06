"use server";

import { redirect } from "next/navigation";
import { createClientSession } from "@/lib/client-auth";

function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "/dashboard";
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/admin")) {
    return "/dashboard";
  }
  return next;
}

export async function loginClientAction(formData: FormData) {
  await createClientSession({
    email: String(formData.get("identifier") || ""),
    phone: String(formData.get("identifier") || ""),
  });
  redirect(safeNext(formData.get("next")));
}

export async function signupClientAction(formData: FormData) {
  await createClientSession({
    fullName: String(formData.get("fullName") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
  });
  redirect(safeNext(formData.get("next")));
}
