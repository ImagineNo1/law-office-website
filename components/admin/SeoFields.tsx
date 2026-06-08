"use client";

import { useMemo, useState } from "react";
import type { SeoData } from "@/lib/seo";

type SeoInput = Partial<SeoData> | undefined;

const defaults = {
  robotsIndex: true,
  robotsFollow: true,
  sitemapInclude: true,
  sitemapPriority: 0.7,
  sitemapChangeFrequency: "weekly",
};

function valueOf(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null) return "";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function Counter({
  value,
  min,
  max,
}: {
  value: string;
  min: number;
  max: number;
}) {
  const ok = value.length >= min && value.length <= max;
  return (
    <span
      className={`text-xs font-black ${ok ? "text-emerald-600" : "text-emerald-600"}`}
    >
      {value.length} / {min}-{max}
    </span>
  );
}

function Field({
  help,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  value,
}: {
  help?: string;
  label: string;
  max?: number;
  min?: number;
  name: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {min && max ? <Counter value={value} min={min} max={max} /> : null}
      </span>
      {onChange ? (
        <input
          className="service-input"
          name={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          className="service-input"
          defaultValue={value}
          name={name}
          placeholder={placeholder}
        />
      )}
      {help ? (
        <span className="text-xs font-bold leading-6 text-muted">{help}</span>
      ) : null}
    </label>
  );
}

function Area({
  help,
  label,
  name,
  value,
}: {
  help?: string;
  label: string;
  name: string;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>{label}</span>
      <textarea
        className="service-input min-h-28 py-3 font-mono text-xs"
        defaultValue={value}
        name={name}
      />
      {help ? (
        <span className="text-xs font-bold leading-6 text-muted">{help}</span>
      ) : null}
    </label>
  );
}

export function SeoFields({
  seo,
  title = "",
}: {
  seo?: SeoInput;
  title?: string;
}) {
  const initial = { ...defaults, ...(seo ?? {}) };
  const [metaTitle, setMetaTitle] = useState(valueOf(initial.metaTitle));
  const [metaDescription, setMetaDescription] = useState(
    valueOf(initial.metaDescription),
  );
  const [ogTitle, setOgTitle] = useState(valueOf(initial.ogTitle));
  const [ogDescription, setOgDescription] = useState(
    valueOf(initial.ogDescription),
  );
  const suggested = useMemo(() => {
    const cleanTitle = title || metaTitle || "عنوان صفحه";
    return {
      title: `${cleanTitle} | وکیل‌یار`,
      description: `${cleanTitle} را با راهنمایی حقوقی، توضیحات شفاف و مسیر ثبت درخواست در وکیل‌یار بررسی کنید.`,
    };
  }, [metaTitle, title]);

  return (
    <details className="rounded-2xl border border-border bg-slate-50 p-4">
      <summary className="cursor-pointer text-base font-black text-navy">
        تنظیمات سئو
      </summary>
      <div className="mt-5 grid gap-5">
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-black text-navy">پیش‌نمایش گوگل</h4>
            <button
              className="rounded-lg border border-border px-3 py-2 text-xs font-black text-navy hover:border-emerald-500 hover:text-emerald-700"
              onClick={() => {
                setMetaTitle(suggested.title);
                setMetaDescription(suggested.description);
                setOgTitle(suggested.title);
                setOgDescription(suggested.description);
              }}
              type="button"
            >
              پیشنهاد خودکار
            </button>
          </div>
          <p className="text-sm font-black text-blue-700">
            {metaTitle || suggested.title}
          </p>
          <p className="mt-1 text-xs text-emerald-700">
            https://vakilyar.vercel.app
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {metaDescription || suggested.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            help="حدود ۵۰ تا ۶۰ کاراکتر؛ نام صفحه + نام برند."
            label="عنوانی که در گوگل نمایش داده می‌شود"
            max={60}
            min={40}
            name="seo.metaTitle"
            onChange={setMetaTitle}
            value={metaTitle}
          />
          <Field
            help="انگلیسی، کوتاه، بدون فاصله. مثال: property-lease-contract"
            label="آدرس اصلی این صفحه برای گوگل"
            name="seo.canonicalUrl"
            value={valueOf(initial.canonicalUrl)}
          />
        </div>
        <label className="grid gap-2 text-sm font-black text-navy">
          <span className="flex items-center justify-between gap-3">
            <span>توضیح کوتاه صفحه برای گوگل</span>
            <Counter value={metaDescription} min={120} max={160} />
          </span>
          <textarea
            className="service-input min-h-24 py-3"
            name="seo.metaDescription"
            onChange={(event) => setMetaDescription(event.target.value)}
            value={metaDescription}
          />
          <span className="text-xs font-bold leading-6 text-muted">
            حدود ۱۴۰ تا ۱۶۰ کاراکتر؛ مزیت اصلی + اقدام بعدی.
          </span>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="کلمه کلیدی اصلی"
            name="seo.focusKeyword"
            placeholder="مثلاً قرارداد اجاره ملک"
            value={valueOf(initial.focusKeyword)}
          />
          <Field
            help="با ویرگول جدا کنید."
            label="کلمات کلیدی"
            name="seo.keywords"
            value={valueOf(initial.keywords)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-black text-navy">
            اجازه نمایش در گوگل
            <input
              defaultChecked={initial.robotsIndex !== false}
              name="seo.robotsIndex"
              type="checkbox"
            />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-black text-navy">
            دنبال کردن لینک‌ها
            <input
              defaultChecked={initial.robotsFollow !== false}
              name="seo.robotsFollow"
              type="checkbox"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="عنوان شبکه‌های اجتماعی"
            name="seo.ogTitle"
            onChange={setOgTitle}
            value={ogTitle}
          />
          <Field
            label="تصویر اشتراک‌گذاری"
            name="seo.ogImage"
            value={valueOf(initial.ogImage)}
          />
        </div>
        <label className="grid gap-2 text-sm font-black text-navy">
          <span>توضیح شبکه‌های اجتماعی</span>
          <textarea
            className="service-input min-h-24 py-3"
            name="seo.ogDescription"
            onChange={(event) => setOgDescription(event.target.value)}
            value={ogDescription}
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="عنوان توییتر"
            name="seo.twitterTitle"
            value={valueOf(initial.twitterTitle)}
          />
          <Field
            label="تصویر توییتر"
            name="seo.twitterImage"
            value={valueOf(initial.twitterImage)}
          />
        </div>
        <label className="grid gap-2 text-sm font-black text-navy">
          <span>توضیح توییتر</span>
          <textarea
            className="service-input min-h-24 py-3"
            defaultValue={valueOf(initial.twitterDescription)}
            name="seo.twitterDescription"
          />
        </label>

        <Field
          help="تصویر را برای کسی که نمی‌بیند توضیح دهید."
          label="متن جایگزین تصویر"
          name="seo.imageAlt"
          value={valueOf(initial.imageAlt)}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-black text-navy">
            <span>نوع اسکیما</span>
            <select
              className="service-input"
              defaultValue={valueOf(initial.schemaType)}
              name="seo.schemaType"
            >
              <option value="">انتخاب نشده</option>
              <option value="Organization">Organization</option>
              <option value="LegalService">LegalService</option>
              <option value="Service">Service</option>
              <option value="CreativeWork">CreativeWork</option>
              <option value="Article">Article</option>
              <option value="NewsArticle">NewsArticle</option>
              <option value="FAQPage">FAQPage</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black text-navy">
            <span>اولویت سایت‌مپ</span>
            <input
              className="service-input"
              defaultValue={valueOf(initial.sitemapPriority)}
              max="1"
              min="0"
              name="seo.sitemapPriority"
              step="0.1"
              type="number"
            />
          </label>
          <label className="grid gap-2 text-sm font-black text-navy">
            <span>دوره تغییر سایت‌مپ</span>
            <select
              className="service-input"
              defaultValue={valueOf(initial.sitemapChangeFrequency)}
              name="seo.sitemapChangeFrequency"
            >
              {[
                "always",
                "hourly",
                "daily",
                "weekly",
                "monthly",
                "yearly",
                "never",
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-black text-navy">
          نمایش در سایت‌مپ
          <input
            defaultChecked={initial.sitemapInclude !== false}
            name="seo.sitemapInclude"
            type="checkbox"
          />
        </label>
        <Area
          help="اختیاری است. فقط JSON معتبر وارد کنید."
          label="JSON اسکیما"
          name="seo.schemaJson"
          value={valueOf(initial.schemaJson)}
        />
      </div>
    </details>
  );
}
