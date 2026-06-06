import type { Metadata } from "next";
import { RequestFormExperience } from "@/components/platform/services/RequestFormExperience";
import { getPlatformServices } from "@/lib/platform-db";

export const metadata: Metadata = { title: "ثبت درخواست حقوقی" };

export default async function NewRequestPage() {
  const services = await getPlatformServices();
  return <RequestFormExperience services={services} />;
}
