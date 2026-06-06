import type { Metadata } from "next";
import { LegalFormsExperience } from "@/components/platform/legal-forms/LegalFormsExperience";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { getPlatformLegalForms } from "@/lib/platform-db";

export const metadata: Metadata = { title: "مدیریت فرم‌های حقوقی" };

export default async function AdminLegalFormsPage() {
  const forms = await getPlatformLegalForms();
  return (
    <AdminCrmShell>
      <LegalFormsExperience admin forms={forms} />
    </AdminCrmShell>
  );
}
