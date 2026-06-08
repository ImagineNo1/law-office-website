import type { Metadata } from "next";
import { HomeExperience } from "@/components/platform/home/HomeExperience";
import { getPlatformArticles, getPlatformContracts, getPlatformFaqs, getPlatformServices } from "@/lib/platform-db";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/");
  return buildMetadata({
    path: "/",
    seo: page?.seo,
    title: page?.title ?? "وکیل یار | پلتفرم حقوقی، قرارداد و امضا",
  });
}

export default async function Home() {
  const [services, contracts, faqs, articles] = await Promise.all([
    getPlatformServices(),
    getPlatformContracts(),
    getPlatformFaqs("general"),
    getPlatformArticles(4),
  ]);
  return <HomeExperience articles={articles} contracts={contracts} faqs={faqs} services={services} />;
}
