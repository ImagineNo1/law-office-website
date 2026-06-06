import type { Metadata } from "next";
import { ContractsExperience } from "@/components/platform/contracts/ContractsExperience";
import { getPlatformContracts } from "@/lib/platform-db";

export const metadata: Metadata = { title: "بانک قراردادها" };

export default async function ContractsPage() {
  const contracts = await getPlatformContracts();
  return <ContractsExperience contracts={contracts} />;
}
