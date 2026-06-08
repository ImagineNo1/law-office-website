import type { Metadata } from "next";
import { HomeExperience } from "@/components/platform/home/HomeExperience";
import { getPlatformContracts, getPlatformServices } from "@/lib/platform-db";
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
  const [services, contracts] = await Promise.all([getPlatformServices(), getPlatformContracts()]);
  return <HomeExperience contracts={contracts} services={services} />;
}
