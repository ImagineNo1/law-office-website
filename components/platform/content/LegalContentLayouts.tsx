import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageCircleQuestion,
  PenLine,
} from "lucide-react";
import { Container } from "@/components/platform/layout/PageShell";
import type { Article, NewsItem } from "@/types";

type ContentItem = Article | NewsItem;

type ArchiveProps = {
  emptyDescription: string;
  emptyTitle: string;
  items: ContentItem[];
  itemHref: (item: ContentItem) => string;
  kicker: string;
  title: string;
};

type DetailProps = {
  backHref: string;
  backLabel: string;
  item: ContentItem;
  itemHref: (item: ContentItem) => string;
  related: ContentItem[];
  relatedTitle: string;
  sectionLabel: string;
};

function itemCategory(item: ContentItem, fallback = "خبر حقوقی") {
  return "category" in item ? item.category : fallback;
}

function itemReadTime(item: ContentItem) {
  return "readTime" in item && item.readTime ? item.readTime : "۵ دقیقه مطالعه";
}

function ContentImage({
  className = "",
  item,
  priority = false,
}: {
  className?: string;
  item: ContentItem;
  priority?: boolean;
}) {
  if (item.coverImage) {
    return (
      <Image
        alt={item.title}
        className={`h-full w-full object-cover ${className}`}
        height={520}
        priority={priority}
        src={item.coverImage}
        width={760}
      />
    );
  }

  return (
    <div
      className={`article-thumb flex h-full min-h-48 items-center justify-center text-emerald-700 ${className}`}
    >
      <FileText className="size-14" strokeWidth={1.4} />
    </div>
  );
}

function CategoryPanel({ items }: { items: ContentItem[] }) {
  const categories = ["همه موضوعات", ...Array.from(new Set(items.map((item) => itemCategory(item)).filter(Boolean)))];

  return (
    <aside className="rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#F2FBF7_0%,#FFFFFF_100%)] p-6 shadow-[0_18px_45px_rgba(15,23,42,.05)]">
      <h2 className="text-lg font-black text-[#0B172A]">دسته‌بندی‌ها</h2>
      <div className="mt-5 space-y-3">
        {categories.map((category) => {
          const count =
            category === "همه موضوعات"
              ? items.length
              : items.filter((item) => itemCategory(item) === category).length;
          return (
            <div
              className="flex items-center justify-between gap-4 text-sm font-bold text-[#10233B]"
              key={category}
            >
              <span>{category}</span>
              <span className="grid min-w-8 place-items-center rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function QuestionCta() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#047857_0%,#0F766E_55%,#0B5F59_100%)] p-6 text-white shadow-[0_18px_45px_rgba(15,118,110,.22)]">
      <div className="absolute -left-8 -top-8 size-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 right-8 size-32 rounded-full bg-white/10" />
      <h2 className="relative text-lg font-black">سوال حقوقی دارید؟</h2>
      <p className="relative mt-2 text-sm font-bold leading-7 text-emerald-50/85">
        پرسش خود را با وکیل متخصص مطرح کنید.
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
  );
}

function ContractCta() {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-[linear-gradient(180deg,#F2FBF7_0%,#FFFFFF_100%)] p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,.05)]">
      <h2 className="text-lg font-black text-emerald-900">
        نیاز به تنظیم قرارداد دارید؟
      </h2>
      <p className="mx-auto mt-3 max-w-56 text-sm font-bold leading-7 text-slate-500">
        ما قرارداد موردنظر شما را توسط وکیل تنظیم می‌کنیم.
      </p>
      <Link
        className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,118,110,.18)]"
        href="/contracts"
      >
        ثبت درخواست تنظیم قرارداد
      </Link>
      <div className="mx-auto mt-7 grid size-28 place-items-center rounded-full bg-emerald-50 text-emerald-700">
        <FileText className="size-12" strokeWidth={1.4} />
      </div>
    </div>
  );
}

function RelatedList({
  itemHref,
  items,
  title = "مطالب مرتبط",
}: {
  itemHref: (item: ContentItem) => string;
  items: ContentItem[];
  title?: string;
}) {
  if (!items.length) return null;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,.05)]">
      <h2 className="text-lg font-black text-[#0B172A]">{title}</h2>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <Link
            className="grid grid-cols-[82px_1fr] gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
            href={itemHref(item)}
            key={item.slug}
          >
            <div className="h-20 overflow-hidden rounded-xl border border-slate-100">
              <ContentImage item={item} />
            </div>
            <div>
              <h3 className="line-clamp-2 text-sm font-black leading-7 text-[#10233B]">
                {item.title}
              </h3>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Clock3 className="size-3.5 text-emerald-700" />
                {itemReadTime(item)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export function LegalArchivePage({
  emptyDescription,
  emptyTitle,
  items,
  itemHref,
  kicker,
  title,
}: ArchiveProps) {
  const [featured, ...rest] = items;

  return (
    <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] py-12 sm:py-16">
      <Container>
        <div className="mb-8 text-right">
          <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-800">
            {kicker}
          </span>
          <h1 className="mt-4 text-3xl font-black leading-[1.45] text-[#0B172A] sm:text-5xl">
            {title}
          </h1>
        </div>
        <div className="grid gap-7 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            {featured ? (
              <Link
                className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_65px_rgba(15,23,42,.07)] transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,.10)] lg:grid-cols-[1fr_0.9fr]"
                href={itemHref(featured)}
              >
                <div className="min-h-72 overflow-hidden rounded-xl">
                  <ContentImage item={featured} priority />
                </div>
                <div className="flex flex-col justify-center p-5 lg:p-8">
                  <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
                    {itemCategory(featured)}
                  </span>
                  <h2 className="mt-5 text-2xl font-black leading-[1.65] text-[#0B172A] sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm font-bold leading-8 text-slate-500">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-emerald-700" />
                      {featured.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-4 text-emerald-700" />
                      {itemReadTime(featured)}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.04)]">
                <h2 className="text-2xl font-black text-[#0B172A]">
                  {emptyTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-500">
                  {emptyDescription}
                </p>
              </div>
            )}

            {rest.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {rest.map((item) => (
                  <Link
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.05)] transition hover:-translate-y-1 hover:border-emerald-500/30"
                    href={itemHref(item)}
                    key={item.slug}
                  >
                    <div className="h-52 overflow-hidden rounded-xl">
                      <ContentImage item={item} />
                    </div>
                    <div className="p-3">
                      <span className="text-xs font-black text-emerald-700">
                        {itemCategory(item)}
                      </span>
                      <h2 className="mt-2 text-lg font-black leading-8 text-[#10233B] transition group-hover:text-emerald-700">
                        {item.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm font-bold leading-7 text-slate-500">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <CategoryPanel items={items} />
            <RelatedList itemHref={itemHref} items={items.slice(0, 3)} />
            <QuestionCta />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function LegalContentDetailPage({
  backHref,
  backLabel,
  item,
  itemHref,
  related,
  relatedTitle,
  sectionLabel,
}: DetailProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] py-10 sm:py-14">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <Link className="text-slate-500 transition hover:text-emerald-700" href="/">
              خانه
            </Link>
            <span>/</span>
            <Link className="text-emerald-700" href={backHref}>
              {sectionLabel}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 max-w-80">{item.title}</span>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-emerald-700 shadow-sm"
            href={backHref}
          >
            <ArrowLeft className="size-4" />
            {backLabel}
          </Link>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_300px]">
          <main className="space-y-6">
            <header className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_65px_rgba(15,23,42,.07)] lg:grid-cols-[1fr_0.9fr]">
              <div className="min-h-72 overflow-hidden rounded-xl">
                <ContentImage item={item} priority />
              </div>
              <div className="flex flex-col justify-center p-5 lg:p-8">
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
                  {itemCategory(item)}
                </span>
                <h1 className="mt-5 text-2xl font-black leading-[1.65] text-[#0B172A] sm:text-4xl">
                  {item.title}
                </h1>
                <p className="mt-4 text-sm font-bold leading-8 text-slate-500">
                  {item.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <PenLine className="size-4 text-emerald-700" />
                    تیم تحریریه وکیل‌یار
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-emerald-700" />
                    {item.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-4 text-emerald-700" />
                    {itemReadTime(item)}
                  </span>
                </div>
              </div>
            </header>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_65px_rgba(15,23,42,.06)] sm:p-8">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-black text-slate-600">
                    اشتراک:
                  </span>
                  {["x", "tg", "wa", "in"].map((label) => (
                    <span
                      className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-xs font-black text-emerald-700"
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-emerald-700"
                  type="button"
                >
                  <Bookmark className="size-4" />
                  ذخیره مقاله
                </button>
              </div>

              {item.content ? (
                <div
                  className="legal-article-content"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              ) : (
                <div className="legal-article-content">
                  <p>{item.excerpt}</p>
                </div>
              )}

              <div className="mt-10 rounded-xl border border-emerald-100 bg-emerald-50/70 p-5 text-emerald-900">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-8 shrink-0" strokeWidth={1.6} />
                  <div>
                    <h2 className="text-base font-black">نکته مهم</h2>
                    <p className="mt-1 text-sm font-bold leading-7 text-emerald-900/75">
                      برای جلوگیری از مشکلات حقوقی، قبل از اقدام نهایی با یک مشاور حقوقی مشورت کنید.
                    </p>
                  </div>
                </div>
              </div>

              {related.length ? (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {related.slice(0, 2).map((relatedItem) => (
                    <Link
                      className="flex min-h-28 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 text-sm font-black text-[#10233B] shadow-[0_12px_30px_rgba(15,23,42,.04)]"
                      href={itemHref(relatedItem)}
                      key={relatedItem.slug}
                    >
                      <span className="line-clamp-2">{relatedItem.title}</span>
                      <ArrowLeft className="size-5 shrink-0 text-emerald-700" />
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          </main>

          <aside className="space-y-5">
            <CategoryPanel items={[item, ...related]} />
            <RelatedList
              itemHref={itemHref}
              items={related.slice(0, 3)}
              title={relatedTitle}
            />
            <QuestionCta />
            <ContractCta />
          </aside>
        </div>
      </Container>
    </section>
  );
}
