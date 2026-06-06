import Link from "next/link";
import { fallbackContracts, fallbackLegalForms, fallbackServices } from "@/lib/platform-db";

export function MegaMenu() {
  return (
    <div className="pointer-events-none absolute right-1/2 top-[calc(100%+14px)] z-40 hidden w-[920px] translate-x-1/2 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 lg:block">
      <div className="grid grid-cols-[1.1fr_0.9fr_0.8fr] gap-4 rounded-[26px] border border-[#eadfce] bg-white p-5 text-[#0B172A] shadow-[0_30px_90px_rgba(11,23,42,.18)]">
        <div>
          <p className="mb-3 text-xs font-black text-[#C9973F]">خدمات پرتکرار</p>
          <div className="grid gap-2">
            {fallbackServices.slice(0, 5).map((service) => (
              <Link className="rounded-2xl p-3 hover:bg-[#F7F3EA]" href={`/services/${service.slug}`} key={service.slug}>
                <strong className="block text-sm">{service.title}</strong>
                <span className="mt-1 line-clamp-1 block text-xs font-bold text-[#66758A]">
                  {service.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-black text-[#C9973F]">بانک قرارداد</p>
          <div className="grid gap-2">
            {fallbackContracts.slice(0, 5).map((contract) => (
              <Link className="flex items-center justify-between rounded-2xl bg-[#fbf7ef] px-3 py-3 text-sm font-black hover:bg-[#F4E9D3]" href={`/contracts/${contract.category}/${contract.slug}`} key={contract.id}>
                <span>{contract.title}</span>
                <span className="text-xs text-[#C9973F]">{contract.category}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#0B172A] p-4 text-white">
          <p className="text-xs font-black text-[#D4A64A]">فرم ها و امضا</p>
          <div className="mt-3 grid gap-2">
            {fallbackLegalForms.slice(0, 4).map((form) => (
              <Link className="rounded-xl bg-white/8 px-3 py-3 text-sm font-black hover:bg-white/12" href="/legal-forms" key={form.id}>
                {form.title}
              </Link>
            ))}
          </div>
          <Link className="mt-4 flex h-11 items-center justify-center rounded-xl bg-[#C9973F] text-sm font-black" href="/requests/new">
            شروع درخواست
          </Link>
        </div>
      </div>
    </div>
  );
}
