import type { Metadata } from "next";
import { ContractsExperience } from "@/components/platform/contracts/ContractsExperience";
import { getPlatformContracts } from "@/lib/platform-db";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/contracts");
  return buildMetadata({
    path: "/contracts",
    seo: page?.seo,
    title: page?.title ?? "بانک قراردادها",
  });
}

export default async function ContractsPage() {
  const contracts = await getPlatformContracts();
  return <ContractsExperience contracts={contracts} />;
}
