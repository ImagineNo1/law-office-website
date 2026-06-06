import type { Metadata } from "next";
import { RequestFormExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = { title: "ثبت درخواست حقوقی" };

export default function NewRequestPage() {
  return <RequestFormExperience />;
}
