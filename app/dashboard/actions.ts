"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireClient } from "@/lib/client-auth";
import {
  getPlatformServiceBySlug,
  getPlatformServices,
} from "@/lib/platform-db";
import { createServiceRequest } from "@/lib/service-requests";
import {
  appendClientRequestMessage,
  createClientMessage,
  updateClientProfile,
} from "@/lib/client-portal-db";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugFromText(value: string) {
  return (
    value
      .trim()
      .replace(/[\u200c\s]+/g, "-")
      .replace(/[^\p{L}\p{N}-]+/gu, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "general"
  );
}

export async function createDashboardRequestAction(formData: FormData) {
  const client = await requireClient("/dashboard/requests");
  const requestedServiceTitle = text(formData, "serviceTitle");
  const typedServiceSlug = slugFromText(requestedServiceTitle);
  const serviceSlug = text(formData, "serviceSlug") || typedServiceSlug;
  const services = await getPlatformServices();
  const matchedService = services.find(
    (service) => service.title === requestedServiceTitle,
  );
  const selectedService =
    matchedService ?? (await getPlatformServiceBySlug(serviceSlug));
  const subject = text(formData, "subject");
  const description = text(formData, "description");
  const serviceTitle =
    selectedService?.title || requestedServiceTitle || "مشاوره حقوقی";

  if (!subject || !description || !serviceTitle) {
    redirect("/dashboard/requests?new=1&error=missing");
  }

  const result = await createServiceRequest({
    clientId: client.id,
    fullName: client.fullName,
    phone: client.phone,
    email: client.email,
    serviceSlug: selectedService?.slug || serviceSlug,
    serviceTitle,
    subject,
    description,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/requests");
  redirect(
    `/dashboard/requests?created=${encodeURIComponent(result.requestNumber)}`,
  );
}

export async function sendClientMessageAction(formData: FormData) {
  const message = text(formData, "message");
  if (!message) return;
  const threadTitle = text(formData, "threadTitle") || "گفتگوی پشتیبانی";
  const threadId = text(formData, "threadId");
  await createClientMessage(message, threadTitle, threadId);
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

  if (
    fullName.length < 3 ||
    phone.length < 8 ||
    (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    redirect("/dashboard/profile?error=اطلاعات وارد شده معتبر نیست");
  }

  await updateClientProfile({ fullName, phone, email, nationalCode, address });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile?saved=1");
}
