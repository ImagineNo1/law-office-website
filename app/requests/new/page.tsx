import type { Metadata } from "next";
import { RequestFormExperience } from "@/components/platform/services/RequestFormExperience";
import { getPlatformServices } from "@/lib/platform-db";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/requests/new");
  return buildMetadata({
    path: "/requests/new",
    seo: page?.seo,
    title: page?.title ?? "ثبت درخواست حقوقی",
  });
}

export default async function NewRequestPage() {
  const services = await getPlatformServices();
  return <RequestFormExperience services={services} />;
}
