import type { Metadata } from "next";
import { LegalFormsExperience } from "@/components/platform/legal-forms/LegalFormsExperience";
import { getPlatformLegalForms } from "@/lib/platform-db";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/legal-forms");
  return buildMetadata({
    path: "/legal-forms",
    seo: page?.seo,
    title: page?.title ?? "فرم‌های حقوقی",
  });
}

export default async function LegalFormsPage() {
  const forms = await getPlatformLegalForms();
  return <LegalFormsExperience forms={forms} />;
}
