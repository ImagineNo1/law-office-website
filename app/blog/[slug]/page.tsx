import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Container } from "@/components/platform/layout/PageShell";
import { PublicShell } from "@/components/platform/layout/PublicShell";
import { Badge } from "@/components/ui/Badge";
import { getLatestPosts, getPostBySlug } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return buildMetadata({
    path: `/blog/${slug}`,
    seo: post?.seo,
    title: post?.title ?? "مقاله",
    description: post?.excerpt,
    image: post?.coverImage,
  });
}

export default async function BlogDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = searchParams ? await searchParams : {};
  const [post, posts] = await Promise.all([
    getPostBySlug(slug, { includeDrafts: preview === "1" }),
    getLatestPosts(4),
  ]);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <PublicShell>
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Badge>{post.category}</Badge>
        <h1 className="mt-5 text-4xl font-black leading-[1.35] text-foreground">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          <span>{post.publishedAt}</span>
          <span>{post.readTime}</span>
          <span>نویسنده: تیم حقوقی موسسه</span>
        </div>
        <div className="article-thumb mt-8 min-h-80 rounded-3xl border border-border shadow-card" />
        <div className="mt-8 space-y-6 whitespace-pre-line text-base leading-9 text-muted">
          <p>{post.content || post.excerpt}</p>
        </div>
      </article>
      <section className="pb-16">
        <Container>
          <h2 className="mb-6 text-2xl font-black text-foreground">
            مقالات مرتبط
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard
                href={`/blog/${item.slug}`}
                item={item}
                key={item.slug}
              />
            ))}
          </div>
        </Container>
      </section>
    </PublicShell>
  );
}
