import Link from "next/link";
import { recoveryContracts } from "@/lib/platform-recovery-data";

export function ContractPreview() {
  return (
    <section className="bg-white py-10 text-[#0B172A]">
      <div className="mx-auto w-[min(1440px,calc(100%-32px))]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-black text-[#C9973F]">بانک قرارداد</span>
            <h2 className="mt-2 text-3xl font-black text-[#0B172A]">قراردادهای آماده، قابل ویرایش و قابل امضا</h2>
          </div>
          <Link className="rounded-xl bg-[#0B172A] px-5 py-3 text-sm font-black text-white" href="/contracts">مشاهده بانک</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recoveryContracts.slice(0, 8).map((contract) => (
            <Link className="rounded-2xl border border-[#eadfce] bg-[#fbf7ef] p-5 transition hover:-translate-y-1 hover:border-[#C9973F]" href={`/contracts/${contract.category}/${contract.slug}`} key={contract.id}>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#C9973F]">{contract.category}</span>
              <h3 className="mt-4 min-h-12 font-black">{contract.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm font-bold leading-7 text-[#66758A]">{contract.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#eadfce] pt-4 text-xs font-black">
                <span>{contract.price}</span>
                <span>امضا</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
