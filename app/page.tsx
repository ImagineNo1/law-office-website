import type { Metadata } from "next";
import { HomeExperience } from "@/components/platform/home/HomeExperience";
import {
  getPlatformArticles,
  getPlatformContracts,
  getPlatformFaqs,
} from "@/lib/platform-db";
import { getHomeContent, getSiteSettings } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getSeoForPath("/"),
    getSiteSettings(),
  ]);
  return buildMetadata({
    path: "/",
    seo: page?.seo,
    title: page?.title ?? settings.siteTitle,
    description: settings.detailedDescription,
  });
}

export default async function Home() {
  const [contracts, faqs, articles, home, settings] = await Promise.all([
    getPlatformContracts(),
    getPlatformFaqs("general"),
    getPlatformArticles(4),
    getHomeContent(),
    getSiteSettings(),
  ]);
  return (
    <HomeExperience
      articles={articles}
      contracts={contracts}
      faqs={faqs}
      home={home}
      settings={settings}
    />
  );
}
