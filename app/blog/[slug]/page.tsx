import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/site/ArticleCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/lib/mockData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  return {
    title: post?.title ?? "مقاله",
    description: post?.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <SiteHeader />
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Badge>{post.category}</Badge>
        <h1 className="mt-5 text-4xl font-black leading-[1.35] text-foreground">{post.title}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          <span>{post.publishedAt}</span>
          <span>{post.readTime}</span>
          <span>نویسنده: تیم حقوقی موسسه</span>
        </div>
        <div className="article-thumb mt-8 min-h-80 rounded-3xl border border-border shadow-card" />
        <div className="mt-8 space-y-6 text-base leading-9 text-muted">
          <p>{post.excerpt}</p>
          <p>
            در این مطلب، مسیر کلی بررسی پرونده، مدارک لازم، ملاحظات زمانی و ریسک های احتمالی توضیح داده می شود. هدف این محتوا ارائه شناخت اولیه است و جایگزین مشاوره اختصاصی بر اساس مدارک پرونده نیست.
          </p>
          <h2 className="text-2xl font-black text-foreground">نکات مهم</h2>
          <p>
            پیش از هر اقدام، اسناد، مکاتبات، قراردادها و سوابق پرداخت یا ابلاغ باید به صورت منظم گردآوری شود. تصمیم حقوقی دقیق زمانی ممکن است که تصویر کامل از رابطه حقوقی طرفین وجود داشته باشد.
          </p>
        </div>
      </article>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 text-2xl font-black text-foreground">مقالات مرتبط</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <ArticleCard href={`/blog/${item.slug}`} item={item} key={item.slug} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
