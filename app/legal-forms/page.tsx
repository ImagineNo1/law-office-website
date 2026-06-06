import type { Metadata } from "next";
import { LegalFormsExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = { title: "فرم‌های حقوقی" };

export default function LegalFormsPage() {
  return <LegalFormsExperience />;
}
