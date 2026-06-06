import Link from "next/link";

const iconColors = [
  "bg-blue-500/10 text-blue-600",
  "bg-emerald-500/10 text-emerald-600",
  "bg-purple-500/10 text-purple-600",
  "bg-red-500/10 text-red-600",
  "bg-amber-500/10 text-amber-600",
  "bg-cyan-500/10 text-cyan-600",
  "bg-indigo-500/10 text-indigo-600",
  "bg-orange-500/10 text-orange-600",
];

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
  index = 0,
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
      className="group relative cursor-pointer rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-primary/5"
      href={`/services/${slug}`}
    >
      <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${iconColors[index % iconColors.length]} transition-transform group-hover:scale-110`}>
        <FileIcon />
      </div>
      <h3 className="mb-2 text-base font-bold">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-secondary-foreground">{sla || tag}</span>
        <span className="text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">جزئیات ←</span>
      </div>
    </Link>
  );
}
