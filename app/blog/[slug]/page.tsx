import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Gavel,
  MessageCircleQuestion,
  PenLine,
  Share2,
} from "lucide-react";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Container } from "@/components/platform/layout/PageShell";
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
    getLatestPosts(4),
  ]);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const coverStyle = post.coverImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.05), rgba(15, 23, 42, 0.3)), url(${post.coverImage})`,
      }
    : undefined;

  return (
    <PublicShell>
      <section className="relative overflow-hidden border-b border-emerald-950/5 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4FBF8_100%)] py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-80 bg-[radial-gradient(circle_at_12px_12px,rgba(16,185,129,.16)_2px,transparent_2px)] bg-[length:34px_34px] opacity-60 lg:block" />
        <div className="pointer-events-none absolute -right-10 top-12 hidden h-52 w-72 opacity-25 lg:block">
          <Gavel className="absolute left-8 top-3 size-32 rotate-12 text-emerald-700" strokeWidth={1.1} />
          <div className="absolute bottom-3 right-10 h-20 w-40 rounded-lg border border-emerald-700/20 bg-white shadow-[0_18px_50px_rgba(15,118,110,.12)]" />
        </div>
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-emerald-700/10 bg-emerald-700/7 px-5 py-2 text-sm font-black text-emerald-800 shadow-sm">
              {post.category}
            </span>
            <h1 className="mt-6 text-3xl font-black leading-[1.45] text-[#0B172A] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-8 text-slate-500">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm font-bold text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <CalendarDays className="size-4 text-emerald-700" />
                {post.publishedAt}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <Clock3 className="size-4 text-emerald-700" />
                {post.readTime ?? "۵ دقیقه مطالعه"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <PenLine className="size-4 text-emerald-700" />
                تیم حقوقی وکیل‌یار
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <aside className="order-2 space-y-5 lg:order-1">
              <div className="rounded-2xl border border-emerald-900/5 bg-[linear-gradient(135deg,#F2FBF7_0%,#FFFFFF_100%)] p-6 shadow-[0_18px_45px_rgba(15,23,42,.05)]">
                <h2 className="text-lg font-black text-[#0B172A]">خلاصه مقاله</h2>
                <p className="mt-3 text-sm font-bold leading-8 text-slate-500">{post.excerpt}</p>
                <div className="mt-5 h-px bg-emerald-900/10" />
                <Link
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-700"
                  href="/blog"
                >
                  <ArrowLeft className="size-4 rotate-180" />
                  بازگشت به مرکز دانش
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#047857_0%,#0F766E_55%,#0B5F59_100%)] p-6 text-white shadow-[0_18px_45px_rgba(15,118,110,.22)]">
                <div className="absolute -left-8 -top-8 size-28 rounded-full bg-white/10" />
                <h2 className="relative text-lg font-black">نیاز به راهنمایی دارید؟</h2>
                <p className="relative mt-2 text-sm font-bold leading-7 text-emerald-50/85">
                  موضوع پرونده خود را با مشاوران حقوقی ما در میان بگذارید.
                </p>
                <Link
                  className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-emerald-800"
                  href="/requests/new"
                >
                  ثبت درخواست
                  <MessageCircleQuestion className="size-4" />
                </Link>
              </div>
            </aside>

            <article className="order-1 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,.08)] lg:order-2">
              <div
                className="article-thumb min-h-[280px] bg-cover bg-center sm:min-h-[420px]"
                style={coverStyle}
              />
              <div className="p-6 sm:p-10">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-6">
                  <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">
                    {post.category}
                  </span>
                  <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-600" type="button">
                    <Share2 className="size-4 text-emerald-700" />
                    اشتراک‌گذاری
                  </button>
                </div>
                {post.content ? (
                  <div
                    className="legal-article-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : (
                  <div className="legal-article-content">
                    <p>{post.excerpt}</p>
                  </div>
                )}
              </div>
            </article>
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FBF9_100%)] pb-16 pt-4">
          <Container>
            <div className="mb-7 text-right">
              <h2 className="inline-flex items-center gap-3 text-xl font-black text-[#0B172A]">
                <span className="h-1.5 w-8 rounded-full bg-emerald-600" />
                مقالات مرتبط
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <ArticleCard href={`/blog/${item.slug}`} item={item} key={item.slug} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </PublicShell>
  );
}
