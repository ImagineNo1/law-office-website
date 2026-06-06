import Link from "next/link";
import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

export function ContractPreview({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  return (
    <section id="contracts" className="bg-slate-50 py-20 text-slate-950">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="rounded-full border border-[#C9973F]/20 bg-[#C9973F]/10 px-4 py-1.5 text-xs font-black text-[#A87522]">بانک قرارداد</span>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">قراردادهای آماده، قابل ویرایش و قابل امضا</h2>
          </div>
          <Link className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-100" href="/contracts">مشاهده همه</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contracts.slice(0, 6).map((contract) => (
            <Link className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C9973F]/40 hover:shadow-[0_20px_55px_rgba(15,23,42,.08)]" href={`/contracts/${contract.category}/${contract.slug}`} key={contract.id}>
              <div className="flex items-start justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-[#0B172A]/5 text-[#0B172A]">□</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-500">{contract.category}</span>
              </div>
              <h3 className="mt-5 min-h-12 text-base font-black text-slate-950">{contract.title}</h3>
              <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-slate-500">{contract.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-black">
                <span className="text-slate-500">{contract.price}</span>
                <span className="text-[#C9973F]">آماده امضا</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
