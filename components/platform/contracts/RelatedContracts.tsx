import { ContractCard } from "@/components/platform/contracts/ContractCard";
import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

export function RelatedContracts({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {contracts.slice(0, 3).map((contract) => (
        <ContractCard contract={contract} key={contract.id} />
      ))}
    </section>
  );
}
