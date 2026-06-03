import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/ArticleCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { getLatestPosts, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "وبلاگ",
};

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([
    getSiteSettings(),
    getLatestPosts(),
  ]);
  const categories = ["همه", ...new Set(posts.map((post) => post.category))];

  return (
    <main>
      <SiteHeader settings={settings} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-sm font-bold text-gold">وبلاگ و مقاله</p>
            <h1 className="mt-3 text-4xl font-black text-foreground">
              مقالات حقوقی موسسه
            </h1>
          </div>
          <Input placeholder="جستجو در مقالات" />
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} tone={category === "همه" ? "gold" : "muted"}>
              {category}
            </Badge>
          ))}
        </div>
        {posts.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard href={`/blog/${post.slug}`} item={post} key={post.slug} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gold/15 p-8 text-muted">
            مقاله ای برای نمایش وجود ندارد.
          </div>
        )}
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}
