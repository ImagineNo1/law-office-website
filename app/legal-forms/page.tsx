import type { Metadata } from "next";
import { LegalFormsExperience } from "@/components/platform/legal-forms/LegalFormsExperience";
import { getPlatformLegalForms } from "@/lib/platform-db";

export const metadata: Metadata = { title: "فرم‌های حقوقی" };

export default async function LegalFormsPage() {
  const forms = await getPlatformLegalForms();
  return <LegalFormsExperience forms={forms} />;
}
