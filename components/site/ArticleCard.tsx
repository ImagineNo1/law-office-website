import Link from "next/link";
import type { Article, NewsItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type ArticleCardProps = {
  item: Article | NewsItem;
  href: string;
  type?: "blog" | "news";
};

export function ArticleCard({ item, href, type = "blog" }: ArticleCardProps) {
  const category = "category" in item ? item.category : "خبر موسسه";

  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:border-gold/35">
      <div className="h-40 bg-[linear-gradient(135deg,rgba(199,151,65,0.2),rgba(14,24,35,0.95)),url('/file.svg')] bg-[length:auto,96px] bg-center bg-no-repeat" />
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3 text-xs text-muted">
          <Badge tone="muted">{category}</Badge>
          <span>{item.publishedAt}</span>
        </div>
        <h3 className="text-lg font-black leading-8 text-foreground">{item.title}</h3>
        <p className="mt-3 line-clamp-3 leading-7 text-muted">{item.excerpt}</p>
        <Link className="mt-5 inline-flex text-sm font-bold text-gold" href={href}>
          {type === "blog" ? "مطالعه مقاله" : "مشاهده خبر"}
        </Link>
      </div>
    </Card>
  );
}
