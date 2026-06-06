import type { Metadata } from "next";
import { FaqAdminExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = { title: "مدیریت سوالات متداول" };

export default function AdminFaqsPage() {
  return <FaqAdminExperience />;
}
