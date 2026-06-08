import type { Metadata } from "next";
import { LegalArchivePage } from "@/components/platform/content/LegalContentLayouts";
import { PublicShell } from "@/components/platform/layout/PublicShell";
import { getLatestNews } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/news");
  return buildMetadata({
    path: "/news",
    seo: page?.seo,
    title: page?.title ?? "اخبار حقوقی",
  });
}

export default async function NewsPage() {
  const news = await getLatestNews();

  return (
    <PublicShell>
      <LegalArchivePage
        emptyDescription="پس از انتشار اخبار در پنل مدیریت، این صفحه با داده‌های واقعی تکمیل می‌شود."
        emptyTitle="خبری منتشر نشده است"
        itemHref={(item) => `/news/${item.slug}`}
        items={news}
        kicker="اخبار حقوقی"
        title="اخبار حقوقی"
      />
    </PublicShell>
  );
}
