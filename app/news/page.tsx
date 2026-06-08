import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Container } from "@/components/platform/layout/PageShell";
import {
  PublicPageHero,
  PublicShell,
} from "@/components/platform/layout/PublicShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getLatestNews } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/news");
  return buildMetadata({
    path: "/news",
    seo: page?.seo,
    title: page?.title ?? "اخبار",
  });
}

export default async function NewsPage() {
  const news = await getLatestNews();
  const [featured, ...items] = news;

  return (
    <PublicShell>
      <PublicPageHero
        description="خبرها، اطلاعیه‌ها و رویدادهای منتشرشده موسسه را در یک صفحه منظم دنبال کنید."
        eyebrow="اخبار حقوقی"
        title="اخبار حقوقی"
      />
      <section className="py-12">
        <Container>
          {featured ? (
            <Card className="mt-8 grid gap-6 overflow-hidden p-6 lg:grid-cols-[0.8fr_1fr]">
              <div className="article-thumb min-h-64 rounded-2xl border border-border" />
              <div>
                <span className="text-sm text-emerald-700">خبر ویژه</span>
                <h2 className="mt-3 text-2xl font-black text-foreground">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 text-muted">{featured.excerpt}</p>
                <Button
                  className="mt-6"
                  href={`/news/${featured.slug}`}
                  variant="outline"
                >
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
          {!featured ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.04)]">
              <h2 className="text-2xl font-black text-[#0B172A]">
                خبری منتشر نشده است
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-500">
                پس از انتشار اخبار در پنل مدیریت، این صفحه با داده‌های واقعی
                تکمیل می‌شود.
              </p>
            </div>
          ) : null}
        </Container>
      </section>
    </PublicShell>
  );
}
