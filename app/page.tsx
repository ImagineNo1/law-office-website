import type { Metadata } from "next";
import { HomeExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = {
  title: "وکیل یار | پلتفرم حقوقی، قرارداد و امضا",
};

export default function Home() {
  return <HomeExperience />;
}
