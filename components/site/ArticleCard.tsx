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
    <Card className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-soft">
      <div className="h-44 bg-[linear-gradient(135deg,rgba(200,155,60,0.18),rgba(248,248,248,0.72)),url('/legal-hero.svg')] bg-cover bg-center dark:bg-[linear-gradient(135deg,rgba(200,155,60,0.16),rgba(17,24,39,0.88)),url('/legal-hero.svg')]" />
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
