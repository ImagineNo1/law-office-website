import type { Metadata } from "next";
import { HomeExperience } from "@/components/platform/home/HomeExperience";
import {
  getPlatformArticles,
  getPlatformContracts,
  getPlatformFaqs,
  getPlatformNews,
} from "@/lib/platform-db";
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
  const [contracts, faqs, articles, news] = await Promise.all([
    getPlatformContracts(),
    getPlatformFaqs("general"),
    getPlatformArticles(4),
    getPlatformNews(3),
  ]);
  return (
    <HomeExperience
      articles={articles}
      contracts={contracts}
      faqs={faqs}
      news={news}
    />
  );
}
