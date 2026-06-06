import type { Metadata } from "next";
import { LegalFormsExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = { title: "مدیریت فرم‌های حقوقی" };

export default function AdminLegalFormsPage() {
  return <LegalFormsExperience admin />;
}
