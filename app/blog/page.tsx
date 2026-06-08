import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Gavel,
  Grid2X2,
  Home,
  MessageCircleQuestion,
  Search,
  Users,
} from "lucide-react";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Container } from "@/components/platform/layout/PageShell";
import { PublicShell } from "@/components/platform/layout/PublicShell";
import { getLatestPosts } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

const categoryIcons = [Grid2X2, FileText, Users, Home, Gavel, BriefcaseBusiness, BookOpen];
const fallbackCategories = [
  "همه موضوعات",
  "قراردادها",
  "خانواده",
  "ملکی",
  "کیفری",
  "تجاری",
  "مقالات آموزشی",
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/blog");
  return buildMetadata({
    path: "/blog",
    seo: page?.seo,
    title: page?.title ?? "مرکز دانش حقوقی",
  });
}

export default async function BlogPage() {
  const posts = await getLatestPosts();
  const categories = [
    "همه موضوعات",
    ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean))),
  ];
  const visibleCategories = categories.length > 1 ? categories : fallbackCategories;
  const categoryStats = visibleCategories.map((category) => ({
    label: category,
    count:
      category === "همه موضوعات"
        ? posts.length
        : posts.filter((post) => post.category === category).length,
  }));
  const featuredPosts = posts.slice(0, 3);

  return (
    <PublicShell>
      <section className="relative overflow-hidden border-b border-emerald-950/5 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4FBF8_100%)] pb-9 pt-12 sm:pt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-80 bg-[radial-gradient(circle_at_12px_12px,rgba(16,185,129,.16)_2px,transparent_2px)] bg-[length:34px_34px] opacity-60 lg:block" />
        <div className="pointer-events-none absolute right-0 top-10 hidden h-64 w-96 opacity-30 lg:block">
          <div className="absolute bottom-6 right-20 h-24 w-40 rounded-lg border border-emerald-700/20 bg-emerald-100/70 shadow-[0_18px_50px_rgba(15,118,110,.12)]" />
          <div className="absolute bottom-20 right-28 h-24 w-48 -rotate-6 rounded-lg border border-emerald-700/20 bg-white/80 shadow-[0_18px_50px_rgba(15,118,110,.12)]" />
          <Gavel className="absolute left-14 top-6 size-32 rotate-12 text-emerald-700/30" strokeWidth={1.1} />
        </div>
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-emerald-700/10 bg-emerald-700/7 px-5 py-2 text-sm font-black text-[#0B172A] shadow-sm">
              مرکز دانش
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.35] text-[#0B172A] sm:text-5xl">
              مرکز دانش <span className="text-emerald-700">حقوقی</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-8 text-slate-500">
              مقالات حقوقی منتخب شده را بر اساس موضوع مرور کنید و با دانش تصمیم‌گیری بهتر از محتوای آموزشی معتبر بهره‌مند شوید.
            </p>
            <div className="mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-right shadow-[0_18px_50px_rgba(15,23,42,.08)]">
              <Search className="size-6 shrink-0 text-emerald-700" />
              <span className="text-sm font-bold text-slate-400">
                جستجو در مقالات، موضوعات و کلیدواژه‌ها...
              </span>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
            {visibleCategories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              const active = index === 0;
              return (
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-black shadow-sm ${
                    active
                      ? "border-emerald-700 bg-emerald-700 text-white shadow-emerald-700/20"
                      : "border-slate-200 bg-white text-[#10233B]"
                  }`}
                  key={category}
                >
                  <Icon className="size-4" />
                  {category}
                </span>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <aside className="order-2 space-y-5 lg:order-1">
              <div className="rounded-2xl border border-emerald-900/5 bg-[linear-gradient(135deg,#F2FBF7_0%,#FFFFFF_100%)] p-7 shadow-[0_18px_45px_rgba(15,23,42,.05)]">
                <h2 className="text-lg font-black text-[#0B172A]">دسته‌بندی‌ها</h2>
                <div className="mt-5 space-y-3">
                  {categoryStats.map((category) => (
                    <div
                      className="flex items-center justify-between gap-4 text-sm font-bold text-[#10233B]"
                      key={category.label}
                    >
                      <span>{category.label}</span>
                      <span className="grid min-w-8 place-items-center rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#047857_0%,#0F766E_55%,#0B5F59_100%)] p-6 text-white shadow-[0_18px_45px_rgba(15,118,110,.22)]">
                <div className="absolute -left-8 -top-8 size-28 rounded-full bg-white/10" />
                <div className="absolute -bottom-10 right-8 size-32 rounded-full bg-white/10" />
                <h2 className="relative text-lg font-black">سوال حقوقی دارید؟</h2>
                <p className="relative mt-2 text-sm font-bold leading-7 text-emerald-50/85">
                  پرسش خود را برای دریافت پاسخ محرمانه مطرح کنید.
                </p>
                <div className="relative mt-5 flex items-center justify-between gap-3">
                  <Link
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-emerald-800"
                    href="/requests/new"
                  >
                    ثبت سوال
                    <MessageCircleQuestion className="size-4" />
                  </Link>
                  <MessageCircleQuestion className="size-16 text-white/80" />
                </div>
              </div>
            </aside>

            <div className="order-1 lg:order-2">
              <div className="mb-7 text-right">
                <h2 className="inline-flex items-center gap-3 text-xl font-black text-[#0B172A]">
                  <span className="h-1.5 w-8 rounded-full bg-emerald-600" />
                  مقالات ویژه
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  منتخب بهترین و پرکاربردترین مقالات حقوقی
                </p>
              </div>
              {posts.length ? (
                <>
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {featuredPosts.map((post) => (
                      <ArticleCard href={`/blog/${post.slug}`} item={post} key={post.slug} />
                    ))}
                  </div>
                  {posts.length > 3 ? (
                    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {posts.slice(3).map((post) => (
                        <ArticleCard href={`/blog/${post.slug}`} item={post} key={post.slug} />
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.04)]">
                  <h2 className="text-2xl font-black text-[#0B172A]">مقاله‌ای منتشر نشده است</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-500">
                    پس از انتشار مقالات در پنل مدیریت، این بخش با محتوای واقعی تکمیل می‌شود.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PublicShell>
  );
}
