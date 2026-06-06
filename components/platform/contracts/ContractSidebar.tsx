import { recoveryContracts } from "@/lib/platform-recovery-data";

export function ContractSidebar() {
  const categories = Array.from(new Set(recoveryContracts.map((item) => item.category)));
  return (
    <aside className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] lg:sticky lg:top-28 lg:self-start">
      <input className="h-12 w-full rounded-xl border border-[#eadfce] px-4 text-sm font-bold outline-none focus:border-[#C9973F]" placeholder="جستجوی قرارداد..." />
      <div className="mt-4 grid gap-2">
        <button className="rounded-xl bg-[#0B172A] px-4 py-3 text-right text-sm font-black text-white">همه قراردادها ({recoveryContracts.length})</button>
        {categories.map((category) => (
          <button className="flex items-center justify-between rounded-xl bg-[#F7F3EA] px-4 py-3 text-sm font-black" key={category}>
            <span>{category}</span>
            <span>{recoveryContracts.filter((item) => item.category === category).length}</span>
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
