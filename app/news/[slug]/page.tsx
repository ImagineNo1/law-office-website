import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/site/ArticleCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getLatestNews, getNewsBySlug, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  return buildMetadata({
    path: `/news/${slug}`,
    seo: item?.seo,
    title: item?.title ?? "خبر",
    description: item?.excerpt,
    image: item?.coverImage,
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const [settings, item, newsItems] = await Promise.all([
    getSiteSettings(),
    getNewsBySlug(slug),
    getLatestNews(4),
  ]);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <SiteHeader settings={settings} />
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold text-gold">{item.publishedAt}</p>
        <h1 className="mt-4 text-4xl font-black leading-[1.35] text-foreground">
          {item.title}
        </h1>
        <div className="article-thumb mt-8 min-h-72 rounded-3xl border border-border shadow-card" />
        <div className="mt-8 space-y-6 whitespace-pre-line leading-9 text-muted">
          <p>{item.content || item.excerpt}</p>
        </div>
      </article>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 text-2xl font-black text-foreground">
          اخبار مرتبط
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {newsItems
            .filter((news) => news.slug !== item.slug)
            .map((news) => (
              <ArticleCard href={`/news/${news.slug}`} item={news} key={news.slug} type="news" />
            ))}
        </div>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}
