import type { Metadata } from "next";
import Link from "next/link";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { SeoFields } from "@/components/admin/SeoFields";
import { AdminDataTable, AdminEmptyState, AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteSeoRedirectAction, saveSeoAction, saveSeoRedirectAction, saveSeoSettingsAction } from "@/lib/admin-actions";
import { getSeoPages, getSeoRedirects, getSeoSettings, scoreLabel, type SeoPage } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت سئو" };

const tabs = [
  ["overview", "نمای کلی"],
  ["pages", "صفحات"],
  ["audit", "بررسی سئو"],
  ["redirects", "ریدایرکت‌ها"],
  ["sitemap", "سایت‌مپ"],
  ["settings", "تنظیمات"],
  ["learn", "آموزش سئو"],
] as const;

function scoreTone(score: number) {
  if (score >= 80) return "bg-emerald-500/10 text-emerald-700";
  if (score >= 50) return "bg-amber-500/10 text-amber-700";
  return "bg-red-500/10 text-red-700";
}

function SeoScoreBadge({ score }: { score: number }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${scoreTone(score)}`}>{score}٪ · {scoreLabel(score)}</span>;
}

function SeoEditModal({ page }: { page: SeoPage }) {
  return (
    <AdminModal buttonLabel="ویرایش سئو" title={`ویرایش سئو ${page.title}`}>
      <form action={saveSeoAction} className="grid gap-4">
        <input name="id" type="hidden" value={page.id} />
        <input name="model" type="hidden" value={page.model} />
        <input name="type" type="hidden" value={page.type} />
        <input name="path" type="hidden" value={page.path} />
        <input name="title" type="hidden" value={page.title} />
        <SeoFields seo={page.seo} title={page.title} />
        <button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ذخیره سئو</button>
      </form>
    </AdminModal>
  );
}

function MetricCard({ hint, label, value }: { hint: string; label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-white p-5 shadow-card">
      <p className="text-sm font-black text-muted">{label}</p>
      <strong className="mt-4 block text-4xl font-black text-navy">{value}</strong>
      <span className="mt-3 block text-xs font-bold text-muted">{hint}</span>
    </div>
  );
}

function Overview({ pages, redirects }: { pages: SeoPage[]; redirects: Awaited<ReturnType<typeof getSeoRedirects>> }) {
  const average = pages.length ? Math.round(pages.reduce((sum, page) => sum + page.score, 0) / pages.length) : 0;
  const indexable = pages.filter((page) => page.seo.robotsIndex).length;
  const missingTitle = pages.filter((page) => !page.seo.metaTitle).length;
  const missingDescription = pages.filter((page) => !page.seo.metaDescription).length;
  const noindex = pages.filter((page) => !page.seo.robotsIndex).length;
  const activeRedirects = redirects.filter((item) => item.enabled).length;
  const needsAttention = pages.filter((page) => page.score < 80).slice(0, 8);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard hint="از ۱۰۰" label="امتیاز میانگین سئو" value={average} />
        <MetricCard hint="صفحه" label="صفحات قابل ایندکس" value={indexable} />
        <MetricCard hint="نیاز به تنظیم" label="بدون عنوان سئو" value={missingTitle} />
        <MetricCard hint="نیاز به تنظیم" label="بدون توضیحات متا" value={missingDescription} />
        <MetricCard hint="صفحه" label="صفحات noindex" value={noindex} />
        <MetricCard hint="فعال" label="ریدایرکت‌ها" value={activeRedirects} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="text-xl font-black text-navy">وضعیت سئو صفحات</h2>
          <div className="mt-6 grid place-items-center">
            <div className="grid size-52 place-items-center rounded-full border-[18px] border-gold/80 bg-white text-center">
              <strong className="block text-4xl font-black text-navy">{average}٪</strong>
              <span className="text-xs font-bold text-muted">میانگین</span>
            </div>
          </div>
        </section>
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="text-xl font-black text-navy">چک‌لیست سئو</h2>
          <div className="mt-4 grid gap-3 text-sm font-bold leading-8 text-muted">
            {[
              "برای هر صفحه یک عنوان سئو بنویسید",
              "توضیحات متا را بین ۱۲۰ تا ۱۶۰ کاراکتر نگه دارید",
              "برای هر صفحه یک کلمه کلیدی اصلی انتخاب کنید",
              "صفحات مهم باید در گوگل نمایش داده شوند",
              "صفحات خصوصی باید noindex باشند",
              "برای صفحات حذف‌شده ریدایرکت ۳۰۱ بسازید",
            ].map((item) => <p className="rounded-xl bg-slate-50 px-4 py-2" key={item}>{item}</p>)}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-border bg-white shadow-card">
        <div className="border-b border-border p-5">
          <h2 className="text-xl font-black text-navy">آخرین صفحات نیازمند بهبود</h2>
        </div>
        {needsAttention.length ? <PagesTable pages={needsAttention} compact /> : <div className="p-5"><AdminEmptyState title="همه چیز مرتب است" description="صفحه‌ای با امتیاز پایین پیدا نشد." /></div>}
      </section>
    </div>
  );
}

function PagesTable({ compact = false, pages }: { compact?: boolean; pages: SeoPage[] }) {
  return (
    <AdminDataTable headers={compact ? ["صفحه", "نوع", "مسیر", "امتیاز", "عملیات"] : ["عنوان صفحه", "نوع صفحه", "مسیر", "وضعیت ایندکس", "عنوان سئو", "توضیحات متا", "کلمه کلیدی", "امتیاز", "عملیات"]}>
      {pages.map((page) => (
        <tr className="border-t border-border" key={`${page.model}-${page.id}-${page.path}`}>
          <td className="px-5 py-4 font-black text-navy">{page.title}</td>
          <td className="px-5 py-4 font-bold text-muted">{page.typeLabel}</td>
          <td className="px-5 py-4 font-bold text-muted ltr:text-left">{page.path}</td>
          {compact ? null : <td className="px-5 py-4 font-bold text-muted">{page.seo.robotsIndex ? "index" : "noindex"}</td>}
          {compact ? null : <td className="max-w-56 px-5 py-4 text-sm font-bold text-muted">{page.seo.metaTitle || "ثبت نشده"}</td>}
          {compact ? null : <td className="max-w-64 px-5 py-4 text-sm font-bold text-muted">{page.seo.metaDescription || "ثبت نشده"}</td>}
          {compact ? null : <td className="px-5 py-4 font-bold text-muted">{page.seo.focusKeyword || "ثبت نشده"}</td>}
          <td className="px-5 py-4"><SeoScoreBadge score={page.score} /></td>
          <td className="px-5 py-4">
            <div className="flex flex-wrap gap-2">
              <SeoEditModal page={page} />
              <Link className="rounded-lg border border-border px-4 py-2 text-xs font-black text-navy" href={page.path}>مشاهده صفحه</Link>
            </div>
          </td>
        </tr>
      ))}
    </AdminDataTable>
  );
}

function RedirectForm({ redirect }: { redirect?: Awaited<ReturnType<typeof getSeoRedirects>>[number] }) {
  return (
    <form action={saveSeoRedirectAction} className="grid gap-4">
      <input name="id" type="hidden" value={redirect?.id ?? ""} />
      <label className="grid gap-2 text-sm font-black text-navy"><span>مسیر مبدا</span><input className="service-input" defaultValue={redirect?.sourcePath} name="sourcePath" required placeholder="/old-page" /></label>
      <label className="grid gap-2 text-sm font-black text-navy"><span>مسیر مقصد</span><input className="service-input" defaultValue={redirect?.targetPath} name="targetPath" required placeholder="/new-page" /></label>
      <label className="grid gap-2 text-sm font-black text-navy"><span>کد وضعیت</span><select className="service-input" defaultValue={redirect?.statusCode ?? 301} name="statusCode"><option value="301">301</option><option value="302">302</option><option value="307">307</option><option value="308">308</option></select></label>
      <label className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-black text-navy">فعال <input defaultChecked={redirect?.enabled ?? true} name="enabled" type="checkbox" /></label>
      <button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ذخیره ریدایرکت</button>
    </form>
  );
}

function RedirectsPanel({ redirects }: { redirects: Awaited<ReturnType<typeof getSeoRedirects>> }) {
  return (
    <div className="grid gap-6">
      <AdminPageHeader title="ریدایرکت‌ها" description="ریدایرکت‌ها ذخیره می‌شوند؛ اعمال آن‌ها در proxy باید با احتیاط و بدون شکستن احراز هویت انجام شود." action={<AdminModal buttonLabel="افزودن ریدایرکت" title="افزودن ریدایرکت"><RedirectForm /></AdminModal>} />
      {redirects.length ? (
        <AdminDataTable headers={["مبدا", "مقصد", "کد", "وضعیت", "بازدید", "عملیات"]}>
          {redirects.map((item) => (
            <tr className="border-t border-border" key={item.id}>
              <td className="px-5 py-4 font-black text-navy">{item.sourcePath}</td>
              <td className="px-5 py-4 font-bold text-muted">{item.targetPath}</td>
              <td className="px-5 py-4 font-bold text-muted">{item.statusCode}</td>
              <td className="px-5 py-4 font-bold text-muted">{item.enabled ? "فعال" : "غیرفعال"}</td>
              <td className="px-5 py-4 font-bold text-muted">{item.hitCount ?? 0}</td>
              <td className="px-5 py-4"><div className="flex gap-2"><AdminModal buttonLabel="ویرایش" title="ویرایش ریدایرکت"><RedirectForm redirect={item} /></AdminModal><AdminConfirmDialog action={<form action={deleteSeoRedirectAction}><input name="id" type="hidden" value={item.id} /><button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">حذف</button></form>} /></div></td>
            </tr>
          ))}
        </AdminDataTable>
      ) : <AdminEmptyState title="ریدایرکتی ثبت نشده است" description="برای آدرس‌های حذف‌شده یا تغییر مسیر داده‌شده، ریدایرکت ۳۰۱ بسازید." />}
    </div>
  );
}

function SettingsPanel({ settings }: { settings: Awaited<ReturnType<typeof getSeoSettings>> }) {
  return (
    <section className="rounded-lg border border-border bg-white p-5 shadow-card">
      <h2 className="text-xl font-black text-navy">تنظیمات پایه سئو</h2>
      <form action={saveSeoSettingsAction} className="mt-5 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-navy"><span>نام سایت</span><input className="service-input" defaultValue={settings.siteName} name="siteName" /></label>
          <label className="grid gap-2 text-sm font-black text-navy"><span>آدرس اصلی سایت</span><input className="service-input" defaultValue={settings.canonicalBaseUrl} name="canonicalBaseUrl" /></label>
        </div>
        <label className="grid gap-2 text-sm font-black text-navy"><span>عنوان پیش‌فرض</span><input className="service-input" defaultValue={settings.defaultMetaTitle} name="defaultMetaTitle" /></label>
        <label className="grid gap-2 text-sm font-black text-navy"><span>توضیح پیش‌فرض</span><textarea className="service-input min-h-24 py-3" defaultValue={settings.defaultMetaDescription} name="defaultMetaDescription" /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-navy"><span>تصویر OG پیش‌فرض</span><input className="service-input" defaultValue={settings.defaultOgImage} name="defaultOgImage" /></label>
          <label className="grid gap-2 text-sm font-black text-navy"><span>کد سرچ کنسول گوگل</span><input className="service-input" name="googleSearchConsoleVerification" /></label>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-black text-navy"><span>نام سازمان</span><input className="service-input" defaultValue={settings.organizationName} name="organizationName" /></label>
          <label className="grid gap-2 text-sm font-black text-navy"><span>تلفن</span><input className="service-input" defaultValue={settings.phone} name="phone" /></label>
          <label className="grid gap-2 text-sm font-black text-navy"><span>لوگو</span><input className="service-input" defaultValue={settings.logo} name="logo" /></label>
        </div>
        <label className="grid gap-2 text-sm font-black text-navy"><span>نشانی</span><textarea className="service-input min-h-20 py-3" defaultValue={settings.address} name="address" /></label>
        <label className="grid gap-2 text-sm font-black text-navy"><span>شبکه‌های اجتماعی؛ هر خط یک مورد</span><textarea className="service-input min-h-20 py-3" defaultValue={settings.socialProfiles.join("\n")} name="socialProfiles" /></label>
        <button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ذخیره تنظیمات سئو</button>
      </form>
    </section>
  );
}

export default async function AdminSeoPage({ searchParams }: { searchParams?: Promise<{ tab?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const active = params.tab ?? "overview";
  const [pages, redirects, settings] = await Promise.all([getSeoPages(), getSeoRedirects(), getSeoSettings()]);

  return (
    <AdminShell title="مدیریت سئو" description="مدیریت و بهینه‌سازی سئوی صفحات و محتوای سایت">
      <div className="grid gap-6">
        <AdminPageHeader title="مدیریت سئو" description="برای هر صفحه عنوان، توضیحات، ایندکس، شبکه‌های اجتماعی، سایت‌مپ و اسکیما را از همین بخش مدیریت کنید." />
        <nav className="flex flex-wrap gap-2 rounded-lg border border-border bg-white p-2 shadow-card">
          {tabs.map(([key, label]) => (
            <Link className={`rounded-lg px-4 py-2 text-sm font-black ${active === key ? "bg-gold text-navy" : "text-muted hover:bg-slate-50 hover:text-navy"}`} href={`/admin/seo?tab=${key}`} key={key}>{label}</Link>
          ))}
        </nav>
        {active === "overview" ? <Overview pages={pages} redirects={redirects} /> : null}
        {active === "pages" ? <PagesTable pages={pages} /> : null}
        {active === "audit" ? <PagesTable pages={pages.filter((page) => page.score < 80)} /> : null}
        {active === "redirects" ? <RedirectsPanel redirects={redirects} /> : null}
        {active === "sitemap" ? <PagesTable pages={pages.filter((page) => page.seo.sitemapInclude && page.seo.robotsIndex)} compact /> : null}
        {active === "settings" ? <SettingsPanel settings={settings} /> : null}
        {active === "learn" ? (
          <section className="rounded-lg border border-border bg-white p-6 shadow-card">
            <h2 className="text-xl font-black text-navy">آموزش سریع سئو</h2>
            <div className="mt-4 grid gap-3 text-sm font-bold leading-8 text-muted">
              <p>عنوان سئو باید کوتاه، دقیق و شامل کلمه کلیدی اصلی باشد.</p>
              <p>توضیحات متا باید به کاربر بگوید صفحه درباره چیست و چرا باید کلیک کند.</p>
              <p>صفحات خصوصی، داشبورد، لاگین و پنل مدیریت همیشه باید از سایت‌مپ خارج باشند.</p>
              <p>برای محتوای حذف‌شده یا تغییر آدرس داده‌شده، ریدایرکت ۳۰۱ بسازید.</p>
            </div>
          </section>
        ) : null}
      </div>
    </AdminShell>
  );
}

