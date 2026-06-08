import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContentDetailPage } from "@/components/platform/content/LegalContentLayouts";
import { PublicShell } from "@/components/platform/layout/PublicShell";
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
    getLatestPosts(5),
  ]);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 4);

  return (
    <PublicShell>
      <LegalContentDetailPage
        backHref="/blog"
        backLabel="بازگشت به وبلاگ"
        item={post}
        itemHref={(item) => `/blog/${item.slug}`}
        related={related}
        relatedTitle="مقالات مرتبط"
        sectionLabel="وبلاگ"
      />
    </PublicShell>
  );
}
