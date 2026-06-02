import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ContactCta } from "@/components/site/ContactCta";
import { HeroSection } from "@/components/site/HeroSection";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { blogPosts, newsItems, services } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "صفحه اصلی",
};

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="min-h-80 rounded-lg border border-gold/20 bg-[linear-gradient(145deg,rgba(199,151,65,0.22),rgba(8,15,24,0.94)),url('/window.svg')] bg-[length:auto,180px] bg-center bg-no-repeat shadow-soft" />
          <div>
            <p className="text-sm font-bold text-gold">معرفی موسسه</p>
            <h2 className="mt-3 text-3xl font-black leading-10 text-foreground">رویکرد تخصصی برای تصمیم های حقوقی حساس</h2>
            <p className="mt-5 leading-9 text-muted">
              موسسه حقوقی عدالت گستر با ترکیب تجربه عملی، پژوهش حقوقی و پیگیری منظم، خدمات مشاوره و وکالت را در حوزه های خانواده، قراردادها، شرکت ها و دعاوی ملکی ارائه می کند.
            </p>
            <Button className="mt-7" href="/about" variant="outline">
              اطلاعات بیشتر
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gold">خدمات موسسه</p>
            <h2 className="mt-3 text-3xl font-black text-foreground">حوزه های تخصصی حقوقی</h2>
          </div>
          <Button href="/contact" variant="ghost">
            تماس با مشاور
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gold">آخرین مطالب</p>
            <h2 className="mt-3 text-3xl font-black text-foreground">اخبار و مقالات</h2>
          </div>
          <Button href="/blog" variant="outline">
            مشاهده همه
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.slice(0, 2).map((post) => (
            <ArticleCard href={`/blog/${post.slug}`} item={post} key={post.slug} />
          ))}
          {newsItems.slice(0, 2).map((news) => (
            <ArticleCard href={`/news/${news.slug}`} item={news} key={news.slug} type="news" />
          ))}
        </div>
      </section>
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
