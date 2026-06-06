import type { Metadata } from "next";
import { LegalFormsExperience } from "@/components/platform/legal-forms/LegalFormsExperience";

export const metadata: Metadata = { title: "فرم‌های حقوقی" };

export default function LegalFormsPage() {
  return <LegalFormsExperience />;
}
