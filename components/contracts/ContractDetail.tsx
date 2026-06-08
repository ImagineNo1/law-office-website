"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  categoryIcon,
  ContractIcon,
} from "@/components/contracts/ContractIcons";
import type { ContractTemplate } from "@/types";

const tabs = [
  { key: "intro", label: "معرفی قرارداد" },
  { key: "uses", label: "موارد کاربرد" },
  { key: "documents", label: "مدارک مورد نیاز" },
  { key: "faq", label: "سوالات متداول" },
  { key: "sample", label: "نمونه قرارداد" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ContractDetail({
  contract,
  related,
}: {
  contract: ContractTemplate;
  related: ContractTemplate[];
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("intro");
  const updated = contract.updatedAt || "۱۴۰۵/۰۳/۱۱";

  const tabContent = useMemo(() => {
    if (activeTab === "uses") {
      return <BulletGrid items={contract.useCases ?? []} icon="check" />;
    }
    if (activeTab === "documents") {
      return (
        <BulletGrid items={contract.requiredDocuments ?? []} icon="document" />
      );
    }
    if (activeTab === "faq") {
      return (
        <div className="grid gap-3">
          {(contract.faqItems ?? []).map((item) => (
            <details
              className="rounded-2xl border border-[#e8decf] bg-[#F8F5EF] p-4"
              key={item.question}
            >
              <summary className="cursor-pointer text-sm font-black text-navy">
                {item.question}
              </summary>
              <p className="mt-3 text-sm font-bold leading-7 text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      );
    }
    if (activeTab === "sample") {
      return (
        <div className="rounded-[24px] border border-dashed border-emerald-500/45 bg-emerald-700/8 p-6">
          <h3 className="text-xl font-black text-navy">
            نمونه قرارداد آماده بررسی
          </h3>
          <p className="mt-3 text-sm font-bold leading-7 text-muted">
            نسخه نمونه برای مشاهده ساختار بندها و سرفصل‌های قرارداد در دسترس
            است. فایل نهایی پس از دریافت، کامل‌تر و قابل ویرایش خواهد بود.
          </p>
          <a
            className="mt-5 inline-flex rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-black text-[#ffffff]"
            href={contract.sampleFileUrl || "#"}
          >
            مشاهده نمونه قرارداد
          </a>
        </div>
      );
    }
    return (
      <div className="text-sm font-bold leading-8 text-muted">
        <p>{contract.content}</p>
        <p className="mt-4">
          این قرارداد با تمرکز بر شفافیت تعهدات، کاهش اختلافات آتی و قابلیت
          استفاده در فرایندهای اجرایی طراحی شده است. ساختار بندها به گونه‌ای است
          که هم برای اشخاص حقیقی و هم کسب‌وکارها قابل استفاده باشد.
        </p>
      </div>
    );
  }, [activeTab, contract]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]" dir="rtl">
      <main className="min-w-0 space-y-6">
        <section className="overflow-hidden rounded-[34px] border border-[#e5dac7] bg-white shadow-[0_28px_80px_rgba(11,23,42,0.1)]">
          <div className="relative min-h-[320px] bg-[linear-gradient(135deg,#0B172A,#17213A)] p-7 text-white sm:p-9">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(212,166,74,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(212,166,74,.18)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
              <div>
                <span className="inline-flex rounded-full border border-emerald-500/35 bg-emerald-700/15 px-4 py-2 text-xs font-black text-emerald-500">
                  {contract.category}
                </span>
                <h1 className="mt-5 text-balance text-4xl font-black leading-[1.35] sm:text-5xl">
                  {contract.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-slate-200">
                  {contract.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-black text-slate-200">
                  <span className="rounded-full bg-white/10 px-4 py-2">
                    آخرین بروزرسانی: {updated}
                  </span>
                  <span className="rounded-full bg-white/10 px-4 py-2">
                    مطابق قوانین روز
                  </span>
                  <span className="rounded-full bg-white/10 px-4 py-2">
                    پشتیبانی حقوقی
                  </span>
                </div>
              </div>
              <div className="relative mx-auto grid aspect-[4/3] w-full max-w-[290px] place-items-center rounded-[30px] border border-emerald-500/30 bg-white/10 shadow-[0_28px_70px_rgba(0,0,0,0.28)] backdrop-blur">
                <div className="grid size-28 place-items-center rounded-[34px] bg-emerald-700 text-navy">
                  <ContractIcon
                    className="size-14"
                    name={categoryIcon(contract.category)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-[#e5dac7] bg-white p-4 shadow-[0_20px_60px_rgba(11,23,42,0.08)] sm:p-6">
          <div className="flex gap-2 overflow-x-auto rounded-[24px] bg-[#F8F5EF] p-2">
            {tabs.map((tab) => (
              <button
                className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-black transition ${activeTab === tab.key ? "bg-navy text-white shadow-[0_12px_26px_rgba(11,23,42,0.16)]" : "text-muted hover:bg-white hover:text-emerald-700"}`}
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-6">{tabContent}</div>
        </section>

        <BenefitsSection benefits={contract.benefits ?? []} />
        <RelatedContracts contracts={related} />
        <ProcessSection />
      </main>

      <aside className="xl:sticky xl:top-28 xl:self-start">
        <div className="rounded-[30px] border border-[#e5dac7] bg-white p-5 shadow-[0_24px_70px_rgba(11,23,42,0.11)]">
          <p className="text-sm font-black text-muted">قیمت قرارداد</p>
          <p className="mt-2 text-3xl font-black text-navy">
            {contract.priceLabel}
          </p>
          <div className="my-5 h-px bg-[#efe7d8]" />
          <div className="grid gap-3">
            <InfoRow icon="clock" label="آخرین بروزرسانی" value={updated} />
            <InfoRow
              icon="shield"
              label="اعتبار حقوقی"
              value="بررسی وکیل متخصص"
            />
            <InfoRow
              icon="support"
              label="پشتیبانی"
              value="راهنمای تکمیل قرارداد"
            />
          </div>
          <Link
            className="mt-6 flex min-h-14 items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-black text-[#ffffff] shadow-[0_18px_36px_rgba(15,118,110,0.24)] transition hover:bg-emerald-600"
            href="/contact"
          >
            دریافت قرارداد
          </Link>
          <Link
            className="mt-3 flex min-h-14 items-center justify-center rounded-2xl border border-navy/15 bg-[#F8F5EF] px-5 py-3 text-sm font-black text-navy transition hover:border-emerald-500 hover:text-emerald-700"
            href="/contact"
          >
            درخواست تنظیم اختصاصی
          </Link>
        </div>
      </aside>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#F8F5EF] p-3">
      <span className="grid size-10 place-items-center rounded-xl bg-white text-emerald-700">
        <ContractIcon className="size-5" name={icon} />
      </span>
      <span>
        <span className="block text-xs font-black text-muted">{label}</span>
        <span className="mt-1 block text-sm font-black text-navy">{value}</span>
      </span>
    </div>
  );
}

function BulletGrid({ items, icon }: { items: string[]; icon: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          className="flex items-start gap-3 rounded-2xl border border-[#e8decf] bg-[#F8F5EF] p-4"
          key={item}
        >
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-700">
            <ContractIcon className="size-5" name={icon} />
          </span>
          <p className="text-sm font-bold leading-7 text-navy">{item}</p>
        </div>
      ))}
    </div>
  );
}

function BenefitsSection({ benefits }: { benefits: string[] }) {
  return (
    <section className="rounded-[30px] border border-[#e5dac7] bg-white p-6 shadow-[0_20px_60px_rgba(11,23,42,0.08)]">
      <h2 className="text-2xl font-black text-navy">مزایای این قرارداد</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            className="rounded-[24px] border border-emerald-500/20 bg-[linear-gradient(180deg,#fff,#FCF7ED)] p-5"
            key={benefit}
          >
            <span className="grid size-11 place-items-center rounded-2xl bg-emerald-500/12 text-emerald-700">
              <ContractIcon name="check" />
            </span>
            <p className="mt-4 text-sm font-black leading-7 text-navy">
              {benefit}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedContracts({ contracts }: { contracts: ContractTemplate[] }) {
  if (!contracts.length) return null;
  return (
    <section className="rounded-[30px] border border-[#e5dac7] bg-white p-6 shadow-[0_20px_60px_rgba(11,23,42,0.08)]">
      <h2 className="text-2xl font-black text-navy">قراردادهای مرتبط</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contracts.map((contract) => (
          <Link
            className="rounded-[24px] border border-[#e8decf] bg-[#F8F5EF] p-4 transition hover:-translate-y-1 hover:border-emerald-500 hover:bg-white"
            href={`/contracts/${contract.category}/${contract.slug}`}
            key={contract.slug}
          >
            <span className="text-xs font-black text-emerald-700">
              {contract.category}
            </span>
            <h3 className="mt-2 text-base font-black leading-7 text-navy">
              {contract.title}
            </h3>
            <p className="mt-2 text-xs font-bold leading-6 text-muted">
              {contract.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    "انتخاب قرارداد",
    "پرداخت آنلاین",
    "دریافت فوری",
    "استفاده و ویرایش",
  ];
  return (
    <section className="rounded-[32px] bg-[linear-gradient(135deg,#0B172A,#17213A)] p-6 text-white shadow-[0_28px_80px_rgba(11,23,42,0.18)]">
      <h2 className="text-2xl font-black">فرآیند دریافت قرارداد</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            className="relative rounded-[24px] border border-white/10 bg-white/8 p-5"
            key={step}
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-emerald-700 text-xl font-black text-navy">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-black">{step}</h3>
            <p className="mt-2 text-sm font-bold leading-7 text-slate-300">
              مرحله {index + 1} مسیر دریافت امن و سریع قرارداد.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
