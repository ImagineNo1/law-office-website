import { recoveryContracts } from "@/lib/platform-recovery-data";

export function ContractDetailHero({ contract }: { contract: (typeof recoveryContracts)[number] }) {
  return (
    <section className="bg-[#0B172A] py-10 text-white">
      <div className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_420px]">
        <div>
          <span className="text-sm font-black text-[#D4A64A]">{contract.category}</span>
          <h1 className="mt-3 text-4xl font-black leading-tight">{contract.title}</h1>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-slate-200">{contract.description}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
          <div className="min-h-56 rounded-2xl bg-[linear-gradient(135deg,rgba(212,166,74,.28),rgba(255,255,255,.06)),url('/legal-scene-dark-final.png')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
}
