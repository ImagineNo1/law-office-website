import { ContractCard } from "@/components/platform/contracts/ContractCard";
import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

export function ContractBank({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(11,23,42,.05)] md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-black">قراردادهای آماده</h2>
        <div className="flex gap-2">
          <select className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold">
            <option>مرتب سازی محبوب ترین</option>
          </select>
          <button className="rounded-xl bg-[#0B172A] px-4 text-sm font-black text-white">فیلتر</button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contracts.map((contract) => (
          <ContractCard contract={contract} key={contract.id} />
        ))}
      </div>
    </div>
  );
}
