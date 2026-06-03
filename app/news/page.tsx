import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getLatestNews, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "اخبار",
};

export default async function NewsPage() {
  const [settings, news] = await Promise.all([getSiteSettings(), getLatestNews()]);
  const [featured, ...items] = news;

  return (
    <main>
      <SiteHeader settings={settings} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold text-gold">اخبار موسسه</p>
        <h1 className="mt-3 text-4xl font-black text-foreground">
          آخرین اطلاعیه ها و رویدادها
        </h1>
        {featured ? (
          <Card className="mt-8 grid gap-6 overflow-hidden p-6 lg:grid-cols-[0.8fr_1fr]">
            <div className="article-thumb min-h-64 rounded-2xl border border-border" />
            <div>
              <span className="text-sm text-gold">خبر ویژه</span>
              <h2 className="mt-3 text-2xl font-black text-foreground">
                {featured.title}
              </h2>
              <p className="mt-4 leading-8 text-muted">{featured.excerpt}</p>
              <Button className="mt-6" href={`/news/${featured.slug}`} variant="outline">
                مشاهده خبر
              </Button>
            </div>
          </Card>
        ) : null}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <ArticleCard
              href={`/news/${item.slug}`}
              item={item}
              key={item.slug}
              type="news"
            />
          ))}
        </div>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}
