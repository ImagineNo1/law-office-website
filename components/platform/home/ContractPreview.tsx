import Image from "next/image";
import Link from "next/link";
import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

function FileIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l5 5v13H7V3Zm7 0v6h6M10 13h6M10 17h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ContractImage({ contract, index }: { contract: PlatformContract; index: number }) {
  const fallbackImages = ["/legal-scene-light-final.png", "/home-legal-desk-hero.png", "/legal-scene-dark-final.png"];
  const image = contract.heroImage || fallbackImages[index % fallbackImages.length];

  if (image.startsWith("/")) {
    return <Image alt={contract.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" height={220} src={image} width={420} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={contract.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={image} />
  );
}

export function ContractPreview({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  const items = contracts.length ? contracts : fallbackContracts.slice(0, 3);

  return (
    <section id="contracts" className="bg-white py-16" dir="rtl">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#E2E8F0] bg-white px-4 py-8 shadow-[0_24px_70px_rgba(7,21,39,0.06)] sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-black text-[#0F766E]">بانک قرارداد</span>
            <h2 className="mt-4 text-3xl font-black leading-[1.5] text-[#071527]">قراردادهای آماده، قابل ویرایش و قابل امضا</h2>
            <p className="mt-4 text-sm font-bold leading-8 text-[#64748B]">دسترسی به صدها قرارداد استاندارد و تخصصی متناسب با پرونده یا کسب‌وکار شما.</p>
            <Link className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-[#0F766E]/30 bg-white px-5 py-3 text-sm font-black text-[#0F766E] transition hover:bg-[#ECFDF5]" href="/contracts">
              مشاهده بانک قراردادها
              <span aria-hidden="true">←</span>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {items.slice(0, 3).map((contract, index) => (
              <Link
                className="group overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_18px_45px_rgba(7,21,39,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,118,110,0.12)]"
                href={`/contracts/${contract.category}/${contract.slug}`}
                key={`${contract.id}-${contract.slug}-${index}`}
              >
                <div className="h-36 overflow-hidden bg-[#F8FAFC]"><ContractImage contract={contract} index={index} /></div>
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-[11px] font-black text-[#0F766E]">{contract.category || "قرارداد"}</span>
                    <span className="grid size-9 place-items-center rounded-xl bg-[#F8FAFC] text-[#D6A23A]"><FileIcon /></span>
                  </div>
                  <h3 className="line-clamp-2 min-h-14 text-sm font-black leading-7 text-[#10233B]">{contract.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs font-bold leading-6 text-[#64748B]">
                    {contract.description || "قالب حقوقی آماده با بندهای ضروری، چک‌لیست مدارک و امکان سفارشی‌سازی."}
                  </p>
                  <span className="mt-4 inline-flex text-xs font-black text-[#0F766E]">مشاهده جزئیات ←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
