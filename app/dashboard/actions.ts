"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  appendClientRequestMessage,
  createClientMessage,
  updateClientProfile,
} from "@/lib/client-portal-db";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function sendClientMessageAction(formData: FormData) {
  const message = text(formData, "message");
  if (!message) return;
  await createClientMessage(message);
  revalidatePath("/dashboard/messages");
}

export async function sendRequestMessageAction(formData: FormData) {
  const requestId = text(formData, "requestId");
  const message = text(formData, "message");
  if (!requestId || !message) return;
  await appendClientRequestMessage(requestId, message);
  revalidatePath(`/dashboard/requests/${requestId}`);
}

export async function updateClientProfileAction(formData: FormData) {
  const fullName = text(formData, "fullName");
  const phone = text(formData, "phone").replace(/\s+/g, "");
  const email = text(formData, "email").toLowerCase();
  const nationalCode = text(formData, "nationalCode");
  const address = text(formData, "address");

  if (fullName.length < 3 || phone.length < 8 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    redirect("/dashboard/profile?error=اطلاعات وارد شده معتبر نیست");
  }

  await updateClientProfile({ fullName, phone, email, nationalCode, address });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile?saved=1");
}
