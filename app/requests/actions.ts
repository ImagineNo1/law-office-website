"use server";

import { redirect } from "next/navigation";
import { getPlatformServiceBySlug } from "@/lib/platform-db";
import { createServiceRequest } from "@/lib/service-requests";

export async function createServiceRequestAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const serviceSlug = String(formData.get("serviceSlug") ?? "general").trim();
  const selectedService = await getPlatformServiceBySlug(serviceSlug);
  const serviceTitle = String(selectedService?.title ?? formData.get("serviceTitle") ?? formData.get("serviceType") ?? "مشاوره حقوقی").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const attachment = formData.get("attachment");
  const attachmentName = attachment instanceof File && attachment.name ? attachment.name : "";

  if (!fullName || !phone || !subject || !description) {
    redirect("/requests/new?error=missing");
  }

  const result = await createServiceRequest({
    fullName,
    phone,
    email,
    serviceSlug,
    serviceTitle,
    subject,
    description,
    attachmentName,
  });

  redirect(`/requests/success?requestNumber=${encodeURIComponent(result.requestNumber)}`);
}
