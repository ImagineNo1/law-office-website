import type { Metadata } from "next";
import { HomeExperience } from "@/components/platform/home/HomeExperience";
import { getPlatformContracts, getPlatformServices } from "@/lib/platform-db";

export const metadata: Metadata = {
  title: "وکیل یار | پلتفرم حقوقی، قرارداد و امضا",
};

export default async function Home() {
  const [services, contracts] = await Promise.all([getPlatformServices(), getPlatformContracts()]);
  return <HomeExperience contracts={contracts} services={services} />;
}
