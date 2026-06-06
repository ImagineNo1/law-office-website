import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "سطوح دسترسی" };

export default function PermissionsPage() {
  return <LegalTechPlatform page="permissions" />;
}
