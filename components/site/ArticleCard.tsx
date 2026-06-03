import Link from "next/link";
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

  return (
    <Card className="group overflow-hidden rounded-[1.5rem] bg-white transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-soft dark:bg-surface-strong">
      <Link href={href} className="block">
        <div className="article-thumb relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/18 via-transparent to-white/8 opacity-75 transition group-hover:opacity-55 dark:from-black/42" />
          <div className="absolute right-4 top-4">
            <Badge tone="gold">{category}</Badge>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs text-muted">
            <span>{type === "blog" ? "مقاله حقوقی" : "خبر موسسه"}</span>
            <span>{item.publishedAt}</span>
          </div>

          <h3 className="text-lg font-black leading-8 text-foreground transition group-hover:text-gold">
            {item.title}
          </h3>

          <p className="mt-3 line-clamp-3 leading-7 text-muted">
            {item.excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">
            {type === "blog" ? "مطالعه مقاله" : "مشاهده خبر"}
            <span aria-hidden="true">←</span>
          </span>
        </div>
      </Link>
    </Card>
  );
}
