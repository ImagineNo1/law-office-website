import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Article, NewsItem } from "@/types";

type ArticleCardProps = {
  item: Article | NewsItem;
  href: string;
  type?: "blog" | "news";
};

export function ArticleCard({ item, href, type = "blog" }: ArticleCardProps) {
  const category = "category" in item ? item.category : "خبر موسسه";
  const coverStyle = item.coverImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.02), rgba(15, 23, 42, 0.22)), url(${item.coverImage})`,
      }
    : undefined;

  return (
    <Card className="group overflow-hidden rounded-[18px] border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-500/45 hover:shadow-[0_24px_70px_rgba(15,23,42,.12)] dark:bg-surface-strong/92">
      <Link href={href} className="block">
        <div
          className="article-thumb relative h-56 overflow-hidden bg-cover bg-center"
          style={coverStyle}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/16 via-transparent to-white/5 opacity-75 transition group-hover:opacity-55 dark:from-black/42" />
          <div className="absolute right-4 top-4">
            <Badge tone="green">{category}</Badge>
          </div>
          <div className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-emerald-800 shadow-sm backdrop-blur">
            <Clock3 className="size-3.5" />
            {type === "blog" && "readTime" in item && item.readTime
              ? item.readTime
              : "۵ دقیقه مطالعه"}
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-heading text-xl font-black leading-8 text-[#0B172A] transition group-hover:text-emerald-700">
            {item.title}
          </h3>

          <p className="mt-3 line-clamp-2 min-h-14 text-sm font-bold leading-7 text-slate-500">
            {item.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs font-bold text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {item.publishedAt}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-black text-emerald-700">
              ادامه مطلب
              <span aria-hidden="true">←</span>
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
