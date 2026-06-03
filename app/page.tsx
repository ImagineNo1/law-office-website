import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ContactCta } from "@/components/site/ContactCta";
import { HeroSection } from "@/components/site/HeroSection";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  getHomeContent,
  getLatestNews,
  getLatestPosts,
  getPublishedServices,
  getSiteSettings,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "صفحه اصلی",
};

export default async function Home() {
  const [settings, homeContent, services, latestPosts, latestNews] =
    await Promise.all([
      getSiteSettings(),
      getHomeContent(),
      getPublishedServices(6),
      getLatestPosts(3),
      getLatestNews(3),
    ]);

  return (
    <main className="bg-background">
      <SiteHeader settings={settings} />
      <HeroSection
        hero={homeContent.hero}
        stats={homeContent.stats}
        trustFeatures={homeContent.trustFeatures}
      />

      <section className="bg-background pb-20 pt-[72px]">
        <div className="container-shell">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black text-gold">خدمات ما</p>
              <h2 className="font-heading mt-3 text-4xl font-black text-foreground sm:text-5xl">
                حوزه های تخصصی حقوقی
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-muted">
                از مشاوره اولیه تا پیگیری تخصصی پرونده، ساختار خدمات ما برای
                تصمیم گیری شفاف طراحی شده است.
              </p>
            </div>

            <Button href="/services" variant="outline">
              مشاهده همه خدمات
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 dark:bg-surface">
        <div className="container-shell">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black text-gold">مقالات و اخبار</p>
              <h2 className="font-heading mt-3 text-4xl font-black text-foreground sm:text-5xl">
                تازه ترین محتوای حقوقی
              </h2>
            </div>

            <Button href="/blog" variant="ghost">
              مشاهده همه
            </Button>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_380px]">
            <div className="grid gap-5 md:grid-cols-3">
              {latestPosts.map((post) => (
                <ArticleCard
                  href={`/blog/${post.slug}`}
                  item={post}
                  key={post.slug}
                />
              ))}
            </div>

            <Card className="rounded-[18px] bg-white p-6 dark:bg-surface-strong/92">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-heading text-2xl font-black text-foreground">
                  آخرین اخبار
                </h3>
                <Button href="/news" variant="ghost">
                  همه
                </Button>
              </div>

              <div className="grid gap-4">
                {latestNews.map((news) => (
                  <a
                    className="group grid grid-cols-[72px_1fr] gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0"
                    href={`/news/${news.slug}`}
                    key={news.slug}
                  >
                    <span className="article-thumb h-16 rounded-xl border border-border transition group-hover:border-gold/45" />
                    <span>
                      <span className="block text-sm font-black leading-6 text-foreground transition group-hover:text-gold">
                        {news.title}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {news.publishedAt}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="legal-photo min-h-[430px] rounded-[28px] border border-border shadow-soft" />

          <div>
            <p className="text-sm font-black text-gold">معرفی موسسه</p>

            <h2 className="font-heading mt-3 text-4xl font-black leading-[1.3] text-foreground sm:text-5xl">
              ساختار حقوقی مدرن برای تصمیم های حساس
            </h2>

            <p className="mt-5 leading-9 text-muted">
              عدالت گستر برای پرونده هایی طراحی شده که به تحلیل دقیق،
              محرمانگی، پیگیری منظم و ارتباط شفاف نیاز دارند. تیم موسسه مسیر
              حقوقی را به زبان قابل فهم و با برنامه اجرایی روشن ارائه می کند.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/institute">معرفی موسسه</Button>
              <Button href="/about" variant="outline">
                درباره ما
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactCta cta={homeContent.contactCta} />
      <SiteFooter settings={settings} />
    </main>
  );
}
