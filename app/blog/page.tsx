import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Container } from "@/components/platform/layout/PageShell";
import {
  PublicPageHero,
  PublicShell,
} from "@/components/platform/layout/PublicShell";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { getLatestPosts } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/blog");
  return buildMetadata({
    path: "/blog",
    seo: page?.seo,
    title: page?.title ?? "وبلاگ",
  });
}

export default async function BlogPage() {
  const posts = await getLatestPosts();
  const categories = ["همه", ...new Set(posts.map((post) => post.category))];

  return (
    <PublicShell>
      <PublicPageHero
        description="مقالات حقوقی منتشرشده را بر اساس موضوع مرور کنید و برای تصمیم‌گیری بهتر از محتوای آموزشی استفاده کنید."
        eyebrow="مرکز دانش"
        title="مرکز دانش حقوقی"
      />
      <section className="py-12">
        <Container>
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h2 className="text-2xl font-black text-foreground">
                مقالات حقوقی موسسه
              </h2>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-600">
                فقط محتوای منتشرشده از پایگاه داده نمایش داده می‌شود.
              </p>
            </div>
            <Input placeholder="جستجو در مقالات" />
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                tone={category === "همه" ? "green" : "muted"}
              >
                {category}
              </Badge>
            ))}
          </div>
          {posts.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard
                  href={`/blog/${post.slug}`}
                  item={post}
                  key={post.slug}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.04)]">
              <h2 className="text-2xl font-black text-[#0B172A]">
                مقاله‌ای منتشر نشده است
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-500">
                پس از انتشار مقالات در پنل مدیریت، این بخش با محتوای واقعی تکمیل
                می‌شود.
              </p>
            </div>
          )}
        </Container>
      </section>
    </PublicShell>
  );
}
