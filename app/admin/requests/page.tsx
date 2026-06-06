import type { Metadata } from "next";
import { AdminRequestsExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = { title: "CRM حقوقی و درخواست‌ها" };

export default function AdminRequestsPage() {
  return <AdminRequestsExperience />;
}
