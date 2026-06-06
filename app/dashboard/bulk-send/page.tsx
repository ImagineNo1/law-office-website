import type { Metadata } from "next";
import { LegalTechPlatform } from "@/components/dashboard/LegalTechPlatform";

export const metadata: Metadata = { title: "ارسال گروهی" };

export default function BulkSendPage() {
  return <LegalTechPlatform page="bulk-send" />;
}
