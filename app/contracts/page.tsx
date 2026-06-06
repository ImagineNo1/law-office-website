import type { Metadata } from "next";
import { ContractsExperience } from "@/components/platform/RecoveryUi";

export const metadata: Metadata = { title: "بانک قراردادها" };

export default function ContractsPage() {
  return <ContractsExperience />;
}
