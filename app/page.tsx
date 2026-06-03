import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ContactCta } from "@/components/site/ContactCta";
import { HeroSection } from "@/components/site/HeroSection";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { blogPosts, newsItems, services } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "صفحه اصلی",
};

export default function Home() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <HeroSection />

      <section className="bg-background pb-10 pt-8">
        <div className="container-shell">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black text-gold">خدمات ما</p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
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

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] py-16 dark:bg-surface">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black text-gold">مقالات و اخبار</p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
                تازه ترین محتوای حقوقی
              </h2>
            </div>

            <Button href="/blog" variant="ghost">
              مشاهده همه
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-5 md:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <ArticleCard
                  href={`/blog/${post.slug}`}
                  item={post}
                  key={post.slug}
                />
              ))}
            </div>

            <Card className="rounded-[1.5rem] bg-white p-5 dark:bg-surface-strong">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-black text-foreground">
                  آخرین اخبار
                </h3>
                <Button href="/news" variant="ghost">
                  همه
                </Button>
              </div>

              <div className="grid gap-4">
                {newsItems.map((news) => (
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

      <section className="bg-background py-16">
        <div className="container-shell grid gap-10 rounded-[2rem] border border-border bg-white/76 p-6 shadow-card dark:bg-surface-strong/70 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="legal-photo min-h-[320px] rounded-[1.75rem] border border-border shadow-soft" />

          <div>
            <p className="text-sm font-black text-gold">معرفی موسسه</p>

            <h2 className="mt-3 text-3xl font-black leading-[1.35] text-foreground sm:text-4xl">
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

      <ContactCta />
      <SiteFooter />
    </main>
  );
}
