import { recoveryContracts } from "@/lib/platform-recovery-data";
import { ContractCard } from "@/components/platform/contracts/ContractCard";

export function ContractBank() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {recoveryContracts.map((contract) => (
        <ContractCard contract={contract} key={contract.id} />
      ))}
    </div>
  );
}
