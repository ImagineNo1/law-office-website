import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

export function ContractSidebar({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  const categories = Array.from(new Set(contracts.map((item) => item.category)));
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] lg:sticky lg:top-28 lg:self-start">
      <input className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-[#C9973F]" placeholder="جستجوی قرارداد..." />
      <div className="mt-4 grid gap-2">
        <button className="rounded-xl bg-[#0B172A] px-4 py-3 text-right text-sm font-black text-white">همه قراردادها ({contracts.length})</button>
        {categories.map((category) => (
          <button className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-black" key={category}>
            <span>{category}</span>
            <span>{contracts.filter((item) => item.category === category).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-[#0B172A] p-4 text-white">
        <p className="font-black text-[#D4A64A]">قرارداد اختصاصی</p>
        <p className="mt-2 text-xs font-bold leading-6 text-slate-300">اگر قالب آماده کافی نیست، تنظیم اختصاصی را ثبت کنید.</p>
      </div>
    </aside>
  );
}
