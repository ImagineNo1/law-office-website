import type { Metadata } from "next";
import { HomeExperience } from "@/components/platform/home/HomeExperience";

export const metadata: Metadata = {
  title: "وکیل یار | پلتفرم حقوقی، قرارداد و امضا",
};

export default function Home() {
  return <HomeExperience />;
}
