import { fallbackContracts } from "@/lib/platform-db";
import { ContractCard } from "@/components/platform/contracts/ContractCard";

export function ContractBank() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {fallbackContracts.map((contract) => (
        <ContractCard contract={contract} key={contract.id} />
      ))}
    </div>
  );
}
