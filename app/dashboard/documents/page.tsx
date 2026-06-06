import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "مرکز اسناد" };

export default function DocumentsPage() {
  return <LegalTechPlatform page="documents" />;
}
