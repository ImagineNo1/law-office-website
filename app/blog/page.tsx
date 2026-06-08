import type { Metadata } from "next";
import { LegalArchivePage } from "@/components/platform/content/LegalContentLayouts";
import { PublicShell } from "@/components/platform/layout/PublicShell";
import { getLatestPosts } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/blog");
  return buildMetadata({
    path: "/blog",
    seo: page?.seo,
    title: page?.title ?? "وبلاگ حقوقی",
  });
}

export default async function BlogPage() {
  const posts = await getLatestPosts();

  return (
    <PublicShell>
      <LegalArchivePage
        emptyDescription="پس از انتشار مقاله‌ها در پنل مدیریت، این بخش با محتوای واقعی تکمیل می‌شود."
        emptyTitle="مقاله‌ای منتشر نشده است"
        itemHref={(item) => `/blog/${item.slug}`}
        items={posts}
        kicker="وبلاگ"
        title="وبلاگ حقوقی"
      />
    </PublicShell>
  );
}
