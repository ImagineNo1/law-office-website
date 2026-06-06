import Link from "next/link";

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
}) {
  return (
    <Link className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C9973F]/40 hover:shadow-[0_22px_60px_rgba(15,23,42,.09)]" href={`/services/${slug}`}>
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-[#C9973F]/10 text-lg font-black text-[#A87522] transition group-hover:scale-105">§</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-500">{tag}</span>
      </div>
      <h3 className="mt-5 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-3 min-h-20 text-sm font-bold leading-7 text-slate-500">{desc}</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-black">
        <span className="rounded-full bg-slate-50 px-3 py-1 text-slate-500">{sla}</span>
        <span className="text-[#C9973F] opacity-0 transition group-hover:opacity-100">جزئیات ←</span>
      </div>
    </Link>
  );
}
