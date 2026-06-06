"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardData, LegalDocumentRecord, SignatureRequestRecord } from "@/lib/dashboard-db";

type PageKind =
  | "dashboard"
  | "documents"
  | "signatures"
  | "archive"
  | "contacts"
  | "templates"
  | "bulk-send"
  | "workflows"
  | "permissions"
  | "reports";

const faDigits = "۰۱۲۳۴۵۶۷۸۹";
const toFaNumber = (value: number | string) => String(value).replace(/\d/g, (digit) => faDigits[Number(digit)]);

const categoryFa: Record<LegalDocumentRecord["category"], string> = {
  Contracts: "قراردادها",
  Petitions: "دادخواست‌ها",
  Complaints: "شکواییه‌ها",
  Notices: "اظهارنامه‌ها",
  Statements: "لوایح",
  "Attorney Documents": "اسناد وکالتی",
  "Corporate Documents": "اسناد شرکتی",
  "Financial Documents": "اسناد مالی",
  Other: "سایر اسناد",
};

const statusLabels: Record<string, string> = {
  draft: "پیش‌نویس",
  reviewing: "در حال بررسی",
  waiting_signature: "در انتظار امضا",
  signed: "امضا شده",
  archived: "بایگانی شده",
  cancelled: "لغو شده",
  pending: "در انتظار",
  rejected: "رد شده",
  expired: "منقضی",
  active: "فعال",
  paused: "متوقف",
  completed: "تکمیل شده",
};

const statusClass: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700",
  reviewing: "bg-blue-50 text-blue-700",
  waiting_signature: "bg-amber-50 text-amber-700",
  signed: "bg-emerald-50 text-emerald-700",
  archived: "bg-stone-100 text-stone-700",
  cancelled: "bg-rose-50 text-rose-700",
  pending: "bg-amber-50 text-amber-700",
  rejected: "bg-rose-50 text-rose-700",
  expired: "bg-slate-100 text-slate-600",
  active: "bg-emerald-50 text-emerald-700",
  paused: "bg-amber-50 text-amber-700",
  completed: "bg-blue-50 text-blue-700",
};

const navItems = [
  { label: "پیشخوان", href: "/dashboard", icon: "home" },
  { label: "اسناد", href: "/dashboard/documents", icon: "files" },
  { label: "امضای دیجیتال", href: "/dashboard/signatures", icon: "pen" },
  { label: "بایگانی", href: "/dashboard/archive", icon: "archive" },
  { label: "قالب‌ها", href: "/dashboard/templates", icon: "template" },
  { label: "مخاطبین", href: "/dashboard/contacts", icon: "contacts" },
  { label: "ارسال گروهی", href: "/dashboard/bulk-send", icon: "send" },
  { label: "گردش کار", href: "/dashboard/workflows", icon: "workflow" },
  { label: "دسترسی‌ها", href: "/dashboard/permissions", icon: "lock" },
  { label: "گزارش‌ها", href: "/dashboard/reports", icon: "chart" },
];

const iconPaths: Record<string, string> = {
  home: "M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3v-9.5Z",
  files: "M7 3h7l5 5v13H7V3Zm7 0v6h6M4 7h2v13h11v2H4V7Z",
  pen: "M16.8 3.6 20.4 7.2 9.6 18H6v-3.6L16.8 3.6ZM14 6.4l3.6 3.6",
  archive: "M4 7h16M6 7v13h12V7M8 4h8l2 3H6l2-3Zm2 7h4",
  template: "M5 4h14v16H5V4Zm3 4h8M8 12h8M8 16h5",
  contacts: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 10v-2.5a3.5 3.5 0 0 0-2.3-3.3",
  send: "M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z",
  workflow: "M6 6h.01M18 6h.01M6 18h.01M18 18h.01M6 6h12M6 6v12M18 6v12M6 18h12",
  lock: "M7 10V8a5 5 0 0 1 10 0v2M6 10h12v10H6V10Zm6 4v3",
  chart: "M5 19V9m7 10V5m7 14v-7M4 21h17",
  plus: "M12 5v14M5 12h14",
  search: "m21 21-4.2-4.2M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
};

function Icon({ name, className = "size-5" }: { name: string; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path
        d={iconPaths[name] ?? iconPaths.files}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-[#C9973F] shadow-sm">
        <Icon name="files" />
      </span>
      <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusClass[status] ?? "bg-slate-100 text-slate-700"}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

function Shell({ children, data }: { children: React.ReactNode; data: DashboardData }) {
  const pathname = usePathname();
  const usedStorage = data.storageStats.percent;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950" dir="rtl">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-72 bg-[#071326] p-5 text-white shadow-2xl xl:block">
        <Link className="flex items-center gap-3" href="/dashboard">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#C9973F] text-xl font-black text-[#1b1305]">و</span>
          <span>
            <span className="block text-xl font-black">وکیل‌یار</span>
            <span className="text-xs text-slate-300">سامانه اسناد و امضای دیجیتال</span>
          </span>
        </Link>
        <nav className="mt-8 grid gap-1.5">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  active ? "bg-white text-[#071326] shadow-lg" : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                href={item.href}
                key={item.href}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Card className="mt-8 border-white/10 bg-white/8 p-4 text-white shadow-none">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>فضای ذخیره‌سازی</span>
            <span className="text-[#D4A64A]">{toFaNumber(usedStorage)}٪</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/15">
            <div className="h-full rounded-full bg-[#D4A64A]" style={{ width: `${usedStorage}%` }} />
          </div>
          <p className="mt-3 text-xs text-slate-300">
            {toFaNumber(data.storageStats.usedGb)} گیگابایت استفاده شده
          </p>
        </Card>
      </aside>
      <div className="xl:mr-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black text-[#C9973F]">پلتفرم مدیریت اسناد</p>
              <h1 className="mt-1 text-2xl font-black text-slate-950">داشبورد پیشرفته حقوقی</h1>
            </div>
            <div className="flex flex-1 items-center justify-end gap-3">
              <label className="hidden h-11 w-full max-w-sm items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 md:flex">
                <Icon name="search" className="size-4" />
                <input className="w-full bg-transparent outline-none placeholder:text-slate-400" placeholder="جستجو در اسناد، مخاطبین و قالب‌ها..." />
              </label>
              <Link className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#071326] px-5 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#0B172A]" href="/dashboard/documents">
                <Icon name="plus" className="size-4" />
                سند جدید
              </Link>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function KpiGrid({ data }: { data: DashboardData }) {
  const cards = [
    { label: "کل اسناد", value: data.stats.totalDocuments, icon: "files", accent: "text-blue-600 bg-blue-50" },
    { label: "در انتظار امضا", value: data.stats.pendingSignatures, icon: "pen", accent: "text-amber-700 bg-amber-50" },
    { label: "امضا شده", value: data.stats.signedDocuments, icon: "workflow", accent: "text-emerald-700 bg-emerald-50" },
    { label: "مخاطبین", value: data.stats.contacts, icon: "contacts", accent: "text-violet-700 bg-violet-50" },
    { label: "قالب‌ها", value: data.stats.templates, icon: "template", accent: "text-[#9A6A19] bg-[#FFF8EA]" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <Card className="p-5" key={card.label}>
          <div className="flex items-start justify-between gap-4">
            <span className={`grid size-12 place-items-center rounded-2xl ${card.accent}`}>
              <Icon name={card.icon} />
            </span>
            <span className="text-xs font-black text-emerald-600">+{toFaNumber(12)}٪</span>
          </div>
          <strong className="mt-5 block text-3xl font-black text-slate-950">{toFaNumber(card.value)}</strong>
          <p className="mt-1 text-sm font-bold text-slate-500">{card.label}</p>
        </Card>
      ))}
    </div>
  );
}

function DocumentsTable({ documents, title = "اسناد اخیر" }: { documents: LegalDocumentRecord[]; title?: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <h2 className="text-lg font-black text-slate-950">{title}</h2>
        <div className="flex gap-2 text-xs font-black">
          <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">فیلتر</span>
          <span className="rounded-full bg-[#FFF8EA] px-3 py-2 text-[#9A6A19]">خروجی</span>
        </div>
      </div>
      {documents.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-50 text-xs font-black text-slate-500">
              <tr>
                <th className="px-5 py-4 text-right">نام سند</th>
                <th className="px-5 py-4 text-right">دسته‌بندی</th>
                <th className="px-5 py-4 text-right">آخرین تغییر</th>
                <th className="px-5 py-4 text-right">وضعیت</th>
                <th className="px-5 py-4 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((document) => (
                <tr className="transition hover:bg-slate-50" key={document.id}>
                  <td className="px-5 py-4">
                    <p className="font-black text-slate-950">{document.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{document.description}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{categoryFa[document.category]}</td>
                  <td className="px-5 py-4 text-slate-500">{document.updatedAt}</td>
                  <td className="px-5 py-4"><Badge status={document.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-500">
                      <button className="rounded-xl border border-slate-200 px-3 py-2 transition hover:border-[#C9973F] hover:text-[#9A6A19]">نمایش</button>
                      <button className="rounded-xl border border-slate-200 px-3 py-2 transition hover:border-[#C9973F] hover:text-[#9A6A19]">دانلود</button>
                      <button className="rounded-xl border border-slate-200 px-3 py-2 transition hover:border-rose-200 hover:text-rose-600">حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5"><EmptyState title="هنوز سندی ثبت نشده است" description="با ایجاد یا بارگذاری سند، جدول مدیریت اسناد در این بخش فعال می‌شود." /></div>
      )}
    </Card>
  );
}

function SignaturePanel({ data }: { data: DashboardData }) {
  const completion = data.stats.completionRate;
  const pending = data.signatureRequests.filter((item) => item.status === "pending");
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-950">امضای دیجیتال</h2>
        <span className="rounded-full bg-[#FFF8EA] px-3 py-1 text-xs font-black text-[#9A6A19]">DocuSign-ready</span>
      </div>
      <div className="mx-auto mt-6 grid size-44 place-items-center rounded-full border-[14px] border-slate-100" style={{ background: `conic-gradient(#C9973F ${completion * 3.6}deg, transparent 0)` }}>
        <div className="grid size-32 place-items-center rounded-full bg-white shadow-inner">
          <span className="text-center">
            <strong className="block text-4xl font-black text-slate-950">{toFaNumber(completion)}٪</strong>
            <span className="text-xs font-bold text-slate-500">نرخ تکمیل</span>
          </span>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {pending.slice(0, 3).map((request) => (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={request.id}>
            <p className="font-black text-slate-950">{request.documentTitle}</p>
            <p className="mt-1 text-xs text-slate-500">{request.signer} · مهلت {request.dueAt}</p>
          </div>
        ))}
        {!pending.length ? <EmptyState title="امضای معوق وجود ندارد" description="همه درخواست‌های امضا تکمیل یا تعیین‌تکلیف شده‌اند." /> : null}
      </div>
    </Card>
  );
}

function StoragePanel({ data }: { data: DashboardData }) {
  const percent = data.storageStats.percent;
  return (
    <Card className="p-6">
      <h2 className="text-lg font-black text-slate-950">مدیریت فضای ذخیره‌سازی</h2>
      <div className="mt-5 h-3 rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[#C9973F]" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm font-bold text-slate-500">
        <span>{toFaNumber(data.storageStats.usedGb)} گیگابایت استفاده شده</span>
        <span>{toFaNumber(percent)}٪</span>
      </div>
      <div className="mt-5 grid gap-3">
        {data.storageStats.breakdown.slice(0, 5).map((item) => (
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm" key={item.label}>
            <span className="font-bold text-slate-600">{item.label}</span>
            <span className="font-black text-slate-950">{toFaNumber(item.count)} سند</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DashboardHome({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6">
      <KpiGrid data={data} />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <DocumentsTable documents={data.documents.slice(0, 6)} />
        <SignaturePanel data={data} />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <StoragePanel data={data} />
        <Card className="p-6 xl:col-span-2">
          <h2 className="text-lg font-black text-slate-950">گردش کار فعال</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {data.workflows.slice(0, 4).map((workflow) => (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={workflow.id}>
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-slate-950">{workflow.name}</strong>
                  <Badge status={workflow.status} />
                </div>
                <div className="mt-4 h-2 rounded-full bg-white">
                  <div className="h-full rounded-full bg-[#C9973F]" style={{ width: `${workflow.progress}%` }} />
                </div>
                <p className="mt-2 text-xs font-bold text-slate-500">{toFaNumber(workflow.progress)}٪ پیشرفت</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <h2 className="text-lg font-black text-slate-950">فعالیت‌های اخیر و امنیت</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {[
            ...data.activityEvents.slice(0, 4),
            ...data.securityEvents.slice(0, 2).map((event, index) => ({
              id: `security-${index}`,
              title: typeof event === "string" ? event : event.label,
              description: typeof event === "string" ? "رویداد امنیتی" : event.detail,
              createdAt: "",
            })),
          ].map((item) => (
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm" key={item.id}>
              <p className="font-black text-slate-950">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">{item.description || item.createdAt}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SignaturesContent({ data }: { data: DashboardData }) {
  const groups = [
    ["در انتظار امضا", data.signatureRequests.filter((item) => item.status === "pending")],
    ["اسناد امضا شده", data.signatureRequests.filter((item) => item.status === "signed")],
    ["امضاهای رد شده", data.signatureRequests.filter((item) => item.status === "rejected")],
  ] as const;
  return (
    <div className="grid gap-6">
      <KpiGrid data={data} />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SignaturePanel data={data} />
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 p-5"><h2 className="text-lg font-black">درخواست‌های امضا</h2></div>
          <div className="divide-y divide-slate-100">
            {data.signatureRequests.map((request) => (
              <SignatureRow request={request} key={request.id} />
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map(([title, rows]) => (
          <Card className="p-5" key={title}>
            <p className="text-sm font-bold text-slate-500">{title}</p>
            <strong className="mt-3 block text-4xl font-black text-slate-950">{toFaNumber(rows.length)}</strong>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SignatureRow({ request }: { request: SignatureRequestRecord }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-5">
      <div>
        <p className="font-black text-slate-950">{request.documentTitle}</p>
        <p className="mt-1 text-sm text-slate-500">{request.signer} · {request.email}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge status={request.status} />
        <span className="text-xs font-bold text-slate-500">ارسال: {request.sentAt}</span>
      </div>
    </div>
  );
}

function TemplatesContent({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6">
      <PageHeader title="قالب‌های اسناد" cta="ایجاد قالب" href="/dashboard/templates" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.templates.map((template) => (
          <Card className="p-5" key={template.id}>
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#FFF8EA] text-[#9A6A19]"><Icon name="template" /></span>
              <Badge status={template.status} />
            </div>
            <h2 className="mt-5 text-lg font-black text-slate-950">{template.title}</h2>
            <p className="mt-2 min-h-14 text-sm leading-7 text-slate-500">{template.description}</p>
            <div className="mt-5 flex items-center justify-between text-xs font-black text-slate-500">
              <span>{template.category}</span>
              <span>{toFaNumber(template.usageCount)} بار استفاده</span>
            </div>
          </Card>
        ))}
      </div>
      {!data.templates.length ? <EmptyState title="قالبی ثبت نشده است" description="قالب‌های سند پس از ایجاد یا Seed در این بخش دیده می‌شوند." /> : null}
    </div>
  );
}

function ContactsContent({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6">
      <PageHeader title="مدیریت مخاطبین" cta="افزودن مخاطب" href="/dashboard/contacts" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.contacts.map((contact) => (
          <Card className="p-5" key={contact.id}>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-slate-100 font-black text-slate-700">{contact.fullName.slice(0, 1)}</span>
              <div>
                <h2 className="font-black text-slate-950">{contact.fullName}</h2>
                <p className="text-xs text-slate-500">{contact.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold text-slate-600">{contact.organization}</p>
            <p className="mt-1 text-xs text-slate-500">{contact.email}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {contact.tags.slice(0, 3).map((tag) => <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600" key={tag}>{tag}</span>)}
            </div>
          </Card>
        ))}
      </div>
      {!data.contacts.length ? <EmptyState title="مخاطبی ثبت نشده است" description="مخاطبین حقیقی و سازمانی پس از ثبت در این بخش نمایش داده می‌شوند." /> : null}
    </div>
  );
}

function WorkflowsContent({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6">
      <PageHeader title="مدیریت گردش کار" cta="ساخت گردش کار" href="/dashboard/workflows" />
      <div className="grid gap-4 xl:grid-cols-2">
        {data.workflows.map((workflow) => (
          <Card className="p-6" key={workflow.id}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-slate-950">{workflow.name}</h2>
              <Badge status={workflow.status} />
            </div>
            <div className="mt-5 h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#C9973F]" style={{ width: `${workflow.progress}%` }} />
            </div>
            <div className="mt-5 grid gap-3">
              {workflow.steps.map((step, index) => (
                <div className="flex items-center gap-3" key={`${workflow.id}-${step.title}`}>
                  <span className={`grid size-8 place-items-center rounded-full text-xs font-black ${step.status === "completed" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {toFaNumber(index + 1)}
                  </span>
                  <span className="text-sm font-bold text-slate-700">{step.title}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      {!data.workflows.length ? <EmptyState title="گردش کاری ثبت نشده است" description="Workflowهای پایگاه داده پس از ایجاد در این بخش نمایش داده می‌شوند." /> : null}
    </div>
  );
}

function ReportsContent({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6">
      <PageHeader title="مرکز گزارش‌ها" cta="خروجی گزارش" href="/dashboard/reports" />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-black text-slate-950">اسناد ایجاد شده</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.reportSeries}>
                <defs><linearGradient id="goldArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#C9973F" stopOpacity={0.3} /><stop offset="100%" stopColor="#C9973F" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
                <Tooltip />
                <Area dataKey="documents" stroke="#C9973F" fill="url(#goldArea)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-black text-slate-950">تکمیل امضاها</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.reportSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="signatures" fill="#071326" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PageHeader({ title, cta, href }: { title: string; cta: string; href: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-black text-[#C9973F]">LegalTech workspace</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">{title}</h2>
      </div>
      <Link className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#071326] px-5 text-sm font-black text-white" href={href}>
        <Icon name="plus" className="size-4" />
        {cta}
      </Link>
    </div>
  );
}

function SimpleContent({ data, page }: { data: DashboardData; page: PageKind }) {
  if (page === "archive") return <DocumentsTable documents={data.archivedDocuments} title="بایگانی اسناد" />;
  if (page === "bulk-send") {
    return (
      <div className="grid gap-6">
        <PageHeader title="ارسال گروهی" cta="شروع ارسال" href="/dashboard/bulk-send" />
        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {["انتخاب قالب", "انتخاب مخاطبین", "ساخت گروه گیرندگان", "پیگیری ارسال"].map((step, index) => (
              <div className="rounded-2xl bg-slate-50 p-5" key={step}>
                <span className="grid size-10 place-items-center rounded-full bg-[#C9973F] font-black text-white">{toFaNumber(index + 1)}</span>
                <p className="mt-4 font-black text-slate-950">{step}</p>
              </div>
            ))}
          </div>
        </Card>
        <TemplatesContent data={data} />
      </div>
    );
  }
  if (page === "permissions") {
    return (
      <div className="grid gap-6">
        <PageHeader title="مدیریت سطوح دسترسی" cta="افزودن نقش" href="/dashboard/permissions" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {data.roles.map((role) => (
            <Card className="p-5" key={role.name}>
              <h2 className="font-black text-slate-950">{role.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{role.permissions.length ? role.permissions.join("، ") : "بدون دسترسی تعریف‌شده"}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  return <DashboardHome data={data} />;
}

export function LegalTechPlatform({ data, page = "dashboard" }: { data: DashboardData; page?: PageKind }) {
  const content =
    page === "documents" ? <DocumentsTable documents={data.documents} title="مرکز اسناد" /> :
    page === "signatures" ? <SignaturesContent data={data} /> :
    page === "templates" ? <TemplatesContent data={data} /> :
    page === "contacts" ? <ContactsContent data={data} /> :
    page === "workflows" ? <WorkflowsContent data={data} /> :
    page === "reports" ? <ReportsContent data={data} /> :
    <SimpleContent data={data} page={page} />;

  return <Shell data={data}>{content}</Shell>;
}
