import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "مدیریت گردش کار" };

export default function WorkflowsPage() {
  return <LegalTechPlatform page="workflows" />;
}
