import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/requests/new");
  return buildMetadata({
    path: "/requests/new",
    seo: page?.seo,
    title: page?.title ?? "ثبت درخواست حقوقی",
  });
}

export default function NewRequestPage() {
  redirect("/dashboard/requests?new=1");
}
