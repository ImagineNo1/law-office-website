import Link from "next/link";

function FileIcon() {
  return (
    <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l5 5v13H7V3Zm7 0v6h6M10 13h7M10 17h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function ServiceCard({
  title,
  slug,
  desc,
  tag,
  sla,
}: {
  title: string;
  slug: string;
  desc: string;
  tag: string;
  sla: string;
  index?: number;
}) {
  return (
    <Link
      className="group relative cursor-pointer rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_40px_rgba(7,21,39,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#0F766E]/25 hover:shadow-[0_24px_60px_rgba(15,118,110,0.12)]"
      href={`/services/${slug}`}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#0F766E] transition group-hover:scale-110 group-hover:bg-[#0F766E] group-hover:text-white">
        <FileIcon />
      </div>
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-[11px] font-black text-[#64748B]">{tag || "خدمات"}</span>
        <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-[11px] font-black text-[#0F766E]">{sla || "بررسی سریع"}</span>
      </div>
      <h3 className="mb-2 text-base font-black text-[#10233B]">{title}</h3>
      <p className="mb-4 line-clamp-3 min-h-20 text-sm font-bold leading-7 text-[#64748B]">{desc}</p>
      <span className="text-xs font-black text-[#0F766E] opacity-0 transition-opacity group-hover:opacity-100">مشاهده خدمت ←</span>
    </Link>
  );
}
