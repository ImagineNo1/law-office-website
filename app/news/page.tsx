import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { newsItems } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "اخبار",
};

export default function NewsPage() {
  const [featured, ...items] = newsItems;

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold text-gold">اخبار موسسه</p>
        <h1 className="mt-3 text-4xl font-black text-foreground">آخرین اطلاعیه ها و رویدادها</h1>
        <Card className="mt-8 grid gap-6 overflow-hidden p-6 lg:grid-cols-[0.8fr_1fr]">
          <div className="article-thumb min-h-64 rounded-2xl border border-border" />
          <div>
            <span className="text-sm text-gold">خبر ویژه</span>
            <h2 className="mt-3 text-2xl font-black text-foreground">{featured.title}</h2>
            <p className="mt-4 leading-8 text-muted">{featured.excerpt}</p>
            <Button className="mt-6" href={`/news/${featured.slug}`} variant="outline">
              مشاهده خبر
            </Button>
          </div>
        </Card>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <ArticleCard href={`/news/${item.slug}`} item={item} key={item.slug} type="news" />
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2 text-sm text-muted">
          <span className="rounded-md border border-gold/15 px-3 py-2 text-gold">۱</span>
          <span className="rounded-md border border-gold/15 px-3 py-2">۲</span>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
