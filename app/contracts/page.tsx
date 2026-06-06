import type { Metadata } from "next";
import { ContractsExperience } from "@/components/platform/contracts/ContractsExperience";

export const metadata: Metadata = { title: "بانک قراردادها" };

export default function ContractsPage() {
  return <ContractsExperience />;
}
