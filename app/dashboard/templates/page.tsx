import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "قالب‌های اسناد" };

export default function TemplatesPage() {
  return <LegalTechPlatform page="templates" />;
}
