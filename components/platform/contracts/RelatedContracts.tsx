import { recoveryContracts } from "@/lib/platform-recovery-data";
import { ContractCard } from "@/components/platform/contracts/ContractCard";

export function RelatedContracts() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {recoveryContracts.slice(0, 3).map((contract) => (
        <ContractCard contract={contract} key={contract.id} />
      ))}
    </section>
  );
}
