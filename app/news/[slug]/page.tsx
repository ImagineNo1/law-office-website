import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContentDetailPage } from "@/components/platform/content/LegalContentLayouts";
import { PublicShell } from "@/components/platform/layout/PublicShell";
import { getLatestNews, getNewsBySlug } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ preview?: string }>;
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

export default async function NewsDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = searchParams ? await searchParams : {};
  const [item, newsItems] = await Promise.all([
    getNewsBySlug(slug, { includeDrafts: preview === "1" }),
    getLatestNews(5),
  ]);

  if (!item) {
    notFound();
  }

  const related = newsItems.filter((news) => news.slug !== item.slug).slice(0, 4);

  return (
    <PublicShell>
      <LegalContentDetailPage
        backHref="/news"
        backLabel="بازگشت به اخبار"
        item={item}
        itemHref={(news) => `/news/${news.slug}`}
        related={related}
        relatedTitle="اخبار مرتبط"
        sectionLabel="اخبار حقوقی"
      />
    </PublicShell>
  );
}
