import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "مرکز امضای دیجیتال" };

export default function SignaturesPage() {
  return <LegalTechPlatform page="signatures" />;
}
