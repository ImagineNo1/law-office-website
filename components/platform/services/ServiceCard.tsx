import Link from "next/link";
import { IconBox } from "@/components/platform/layout/PageShell";

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
    <Link className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] transition hover:-translate-y-1 hover:border-[#C9973F] hover:shadow-[0_24px_60px_rgba(11,23,42,.1)]" href={`/services/${slug}`}>
      <div className="flex items-center justify-between">
        <IconBox>§</IconBox>
        <span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-black text-[#C9973F]">{tag}</span>
      </div>
      <h3 className="mt-5 text-xl font-black">{title}</h3>
      <p className="mt-3 min-h-20 text-sm font-bold leading-7 text-[#66758A]">{desc}</p>
      <div className="mt-5 flex items-center justify-between border-t border-[#eadfce] pt-4 text-xs font-black">
        <span>{sla}</span>
        <span className="text-[#C9973F]">جزئیات</span>
      </div>
    </Link>
  );
}
