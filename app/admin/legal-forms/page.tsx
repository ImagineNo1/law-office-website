import type { Metadata } from "next";
import { LegalFormsExperience } from "@/components/platform/legal-forms/LegalFormsExperience";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";

export const metadata: Metadata = { title: "مدیریت فرم‌های حقوقی" };

export default function AdminLegalFormsPage() {
  return (
    <AdminCrmShell>
      <LegalFormsExperience admin />
    </AdminCrmShell>
  );
}
