import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "بایگانی اسناد" };

export default function ArchivePage() {
  return <LegalTechPlatform page="archive" />;
}
