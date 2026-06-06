import Link from "next/link";
import { fa, type PlatformContract } from "@/lib/platform-db";
import { IconBox } from "@/components/platform/layout/PageShell";

export function ContractCard({ contract }: { contract: PlatformContract }) {
  return (
    <Link className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] transition hover:-translate-y-1 hover:border-[#C9973F]" href={`/contracts/${contract.category}/${contract.slug}`}>
      <div className="flex items-center justify-between">
        <IconBox>□</IconBox>
        <span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-black">{contract.category}</span>
      </div>
      <h3 className="mt-5 min-h-12 text-lg font-black">{contract.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm font-bold leading-7 text-[#66758A]">{contract.description}</p>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#eadfce] pt-4 text-center text-xs font-black">
        <span>{contract.price}</span>
        <span>{fa(contract.downloads)} دانلود</span>
        <span className="text-[#C9973F]">امضا</span>
      </div>
    </Link>
  );
}
