"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardData, LegalDocumentRecord, SignatureRequestRecord } from "@/lib/dashboard-db";

const toFaNumber = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const categoryFa: Record<LegalDocumentRecord["category"], string> = {
  Contracts: "قراردادها",
  Petitions: "دادخواست ها",
  Complaints: "شکواییه ها",
  Notices: "اظهارنامه ها",
  Statements: "لوایح",
  "Attorney Documents": "وکالت نامه ها",
  "Corporate Documents": "اسناد شرکتی",
  "Financial Documents": "اسناد مالی",
  Other: "سایر اسناد",
};

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

const navItems = [
  { label: "پیشخوان", href: "/dashboard", icon: "home" },
  { label: "اسناد و قراردادها", href: "/dashboard/documents", icon: "files" },
  { label: "امضای دیجیتال", href: "/dashboard/signatures", icon: "pen" },
  { label: "بایگانی اسناد", href: "/dashboard/archive", icon: "archive" },
  { label: "قالب ها", href: "/dashboard/templates", icon: "template" },
  { label: "مخاطبین", href: "/dashboard/contacts", icon: "contacts" },
  { label: "ارسال گروهی", href: "/dashboard/bulk-send", icon: "send" },
  { label: "گردش کار", href: "/dashboard/workflows", icon: "workflow" },
  { label: "سطوح دسترسی", href: "/dashboard/permissions", icon: "lock" },
  { label: "گزارش ها", href: "/dashboard/reports", icon: "chart" },
];

const statusLabels: Record<string, string> = {
  draft: "پیش نویس",
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
  waiting_signature: "bg-[#FFF8EA] text-amber-700",
  signed: "bg-emerald-50 text-emerald-700",
  archived: "bg-stone-100 text-stone-700",
  cancelled: "bg-red-50 text-red-700",
  pending: "bg-[#FFF8EA] text-amber-700",
  rejected: "bg-red-50 text-red-700",
  expired: "bg-slate-100 text-slate-700",
  active: "bg-emerald-50 text-emerald-700",
  paused: "bg-[#FFF8EA] text-amber-700",
  completed: "bg-emerald-50 text-emerald-700",
};

function Icon({ name, className = "size-5" }: { name: string; className?: string }) {
  const paths: Record<string, string> = {
    home: "M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9.5Z",
    files: "M7 3h7l5 5v13H7V3Zm7 0v6h6M10 13h7M10 17h5",
    pen: "M4 20h4l11-11-4-4L4 16v4Zm11-15 4 4",
    archive: "M4 7h16M5 7l1 13h12l1-13M8 4h8l1 3H7l1-3Zm4 7v5",
    template: "M5 4h14v16H5V4Zm4 4h6M9 12h6M9 16h4",
    contacts: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0M19 8v6M16 11h6",
    send: "M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z",
    workflow: "M6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 7v4a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3",
    lock: "M7 10V8a5 5 0 0 1 10 0v2M5 10h14v11H5V10Zm7 4v3",
    chart: "M4 19V5M4 19h17M8 16v-5M13 16V8M18 16v-9",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm6-2 4 4",
    download: "M12 3v12M7 10l5 5 5-5M5 21h14",
    share: "M18 8a3 3 0 1 0-2.83-4M6 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12-1a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.6 15.4l6.8-3.8M8.6 18.6l6.8 3.8",
    trash: "M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    plus: "M12 5v14M5 12h14",
  };
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d={paths[name] ?? paths.files} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>;
}

function EmptyState({ title, href = "/admin", action = "مدیریت داده ها" }: { title: string; href?: string; action?: string }) {
  return (
    <Card className="p-8 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-50 text-[#C9973F]"><Icon name="files" /></span>
      <h2 className="mt-4 text-xl font-black">{title}</h2>
      <p className="mt-2 text-sm font-bold leading-7 text-[#66758A]">هنوز داده عملیاتی برای نمایش وجود ندارد.</p>
      <Link className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#0B172A] px-5 text-sm font-black text-white" href={href}>{action}</Link>
    </Card>
  );
}

function Ring({ value, label, sublabel, size = "size-36" }: { value: number; label: number | string; sublabel: string; size?: string }) {
  return (
    <div className={`relative grid ${size} place-items-center text-center`}>
      <svg viewBox="0 0 42 42" className="absolute inset-0 size-full -rotate-90">
        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#C9973F" strokeDasharray={`${value} ${100 - value}`} strokeLinecap="round" strokeWidth="4" />
      </svg>
      <span className="relative grid gap-1">
        <strong className="text-2xl font-black text-[#0B172A]">{toFaNumber(label)}</strong>
        {sublabel ? <span className="text-[11px] font-bold text-[#4f5f75]">{sublabel}</span> : null}
      </span>
    </div>
  );
}

function Shell({ children, title, data }: { children: React.ReactNode; title: string; data: DashboardData }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B172A] lg:flex lg:flex-row-reverse" dir="rtl">
      <aside className="bg-[#071326] px-4 py-6 text-white lg:sticky lg:top-0 lg:min-h-screen lg:w-[292px]">
        <Link className="mb-8 flex items-center gap-3 px-2" href="/dashboard">
          <span className="grid size-12 place-items-center rounded-2xl border border-[#C9973F]/40 bg-white/8 text-[#D4A64A]"><Icon name="pen" /></span>
          <span><span className="block text-2xl font-black">وکیل یار</span><span className="text-sm text-slate-300">سامانه اسناد و امضا</span></span>
        </Link>
        <nav className="grid gap-1.5">
          {navItems.map((item) => {
            const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black transition ${active ? "bg-white/10 text-[#D4A64A] ring-1 ring-[#C9973F]/40" : "text-slate-200 hover:bg-white/8"}`} href={item.href} key={item.href}>
                <span className="flex items-center gap-3"><Icon name={item.icon} />{item.label}</span>
                {item.href === "/dashboard/documents" ? <span className="rounded-full bg-[#C9973F] px-2 py-0.5 text-[10px] text-white">{toFaNumber(data.documents.length)}</span> : null}
              </Link>
            );
          })}
        </nav>
        <Card className="mt-10 border-white/10 bg-white/8 p-5 text-white">
          <p className="text-sm font-black">فضای ذخیره سازی</p>
          <div className="mt-4 flex items-center gap-4">
            <Ring value={data.storageStats.percent} label={`${data.storageStats.percent}%`} sublabel="" size="size-20" />
            <p className="text-xs font-bold text-slate-300">{toFaNumber(data.storageStats.usedGb)} از {toFaNumber(data.storageStats.availableGb)} گیگابایت</p>
          </div>
        </Card>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="grid gap-4 xl:grid-cols-[1fr_420px_1fr] xl:items-center">
            <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-[#0B172A] text-sm font-black text-white ring-2 ring-[#D4A64A]/40">ع م</span><div><p className="text-sm font-black">علی محمدی</p><p className="text-xs font-bold text-[#66758A]">مدیر حساب</p></div></div>
            <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#66758A]"><Icon name="search" className="size-4" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="جستجو در اسناد، قراردادها، مخاطبین..." /></label>
            <div className="xl:text-left"><h1 className="text-2xl font-black">{title}</h1><p className="mt-1 text-xs font-bold text-[#66758A]">خوش آمدید، علی محمدی</p></div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function KpiGrid({ data }: { data: DashboardData }) {
  const items = [
    ["اسناد کل", data.stats.totalDocuments, "فایل های ثبت شده", "files"],
    ["در انتظار امضا", data.stats.pendingSignatures, "نیازمند اقدام", "pen"],
    ["امضا شده", data.stats.signedDocuments, "تکمیل شده", "archive"],
    ["مخاطبین", data.stats.contacts, "در دفترچه", "contacts"],
    ["قالب ها", data.stats.templates, "قالب فعال", "template"],
  ];
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{items.map(([label, value, hint, icon]) => <Card className="p-5" key={String(label)}><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black text-[#4f5f75]">{label}</p><strong className="mt-3 block text-4xl font-black">{toFaNumber(value as number)}</strong><span className="mt-2 block text-xs font-bold text-emerald-600">{hint}</span></div><span className="grid size-14 place-items-center rounded-2xl bg-slate-50 text-[#C9973F]"><Icon name={String(icon)} /></span></div></Card>)}</div>;
}

function DocumentsTable({ documents, compact = false }: { documents: LegalDocumentRecord[]; compact?: boolean }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-black">{compact ? "اسناد اخیر" : "مرکز اسناد"}</h2>
        <div className="flex flex-col gap-2 sm:flex-row"><input className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#C9973F]" placeholder="جستجو..." /><select className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#C9973F]"><option>همه دسته بندی ها</option></select></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-slate-50 text-[#4f5f75]"><tr>{["نام سند", "دسته بندی", "آخرین تغییر", "وضعیت", "عملیات"].map((item) => <th className="px-5 py-4 text-right font-black" key={item}>{item}</th>)}</tr></thead>
          <tbody>{documents.length ? documents.map((document) => <tr className="border-t border-slate-200 hover:bg-slate-50" key={document.id}><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-red-50 text-red-600"><Icon name="files" className="size-4" /></span><div><p className="font-black">{document.title}</p><p className="mt-1 text-xs font-bold text-[#66758A]">{document.description}</p></div></div></td><td className="px-5 py-4 font-bold text-[#4f5f75]">{categoryFa[document.category]}</td><td className="px-5 py-4 font-bold text-[#4f5f75]">{document.updatedAt}</td><td className="px-5 py-4"><span className={`rounded-lg px-3 py-1 text-xs font-black ${statusClass[document.status]}`}>{statusLabels[document.status]}</span></td><td className="px-5 py-4"><div className="flex items-center gap-2">{["eye", "download", "share", "archive", "trash"].map((icon) => <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-[#0B172A] hover:border-[#C9973F] hover:text-[#C9973F]" key={icon} title={icon}><Icon name={icon} className="size-4" /></button>)}</div></td></tr>) : <tr className="border-t border-slate-200"><td className="px-5 py-8 text-center text-sm font-black text-[#66758A]" colSpan={5}>سندی برای نمایش وجود ندارد.</td></tr>}</tbody>
        </table>
      </div>
      {!compact ? <div className="flex items-center justify-between border-t border-slate-200 p-4 text-xs font-black text-[#66758A]"><span>نمایش {toFaNumber(documents.length)} سند</span><span>صفحه ۱</span></div> : null}
    </Card>
  );
}

function SignatureRequestsList({ rows, status }: { rows: SignatureRequestRecord[]; status?: SignatureRequestRecord["status"] }) {
  const filtered = rows.filter((item) => !status || item.status === status).slice(0, 8);
  if (!filtered.length) return <EmptyState title="درخواست امضایی برای نمایش وجود ندارد" href="/dashboard/signatures" action="ارسال برای امضا" />;
  return <Card className="overflow-hidden"><div className="border-b border-slate-200 p-5"><h2 className="text-xl font-black">درخواست های امضا</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="bg-slate-50 text-[#4f5f75]"><tr>{["سند", "امضاکننده", "ارسال", "مهلت", "وضعیت"].map((item) => <th className="px-5 py-4 text-right font-black" key={item}>{item}</th>)}</tr></thead><tbody>{filtered.map((request) => <tr className="border-t border-slate-200" key={request.id}><td className="px-5 py-4 font-black">{request.documentTitle}</td><td className="px-5 py-4 font-bold text-[#4f5f75]">{request.signer}</td><td className="px-5 py-4 font-bold text-[#4f5f75]">{request.sentAt}</td><td className="px-5 py-4 font-bold text-[#4f5f75]">{request.dueAt}</td><td className="px-5 py-4"><span className={`rounded-lg px-3 py-1 text-xs font-black ${statusClass[request.status]}`}>{statusLabels[request.status] ?? request.status}</span></td></tr>)}</tbody></table></div></Card>;
}

function SignaturePanel({ data }: { data: DashboardData }) {
  return <Card className="p-6"><h2 className="text-xl font-black">امضای دیجیتال</h2><div className="mt-5 grid place-items-center"><Ring value={data.stats.completionRate} label={data.stats.todaySignatures} sublabel={`از ${toFaNumber(data.signatureRequests.length)} امضا`} size="size-44" /></div><Link className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0B172A] px-4 text-sm font-black text-white" href="/dashboard/signatures"><Icon name="pen" className="size-4" /><span>امضای سند جدید</span></Link></Card>;
}

function WorkflowTimeline({ data }: { data: DashboardData }) {
  const steps = data.workflows[0]?.steps ?? [];
  if (!steps.length) return <EmptyState title="گردش کاری تعریف نشده است" href="/dashboard/workflows" action="ایجاد گردش کار" />;
  return <Card className="p-5"><h2 className="text-lg font-black">گردش کار اسناد</h2><div className="mt-5 grid gap-4">{steps.map((step, index) => <div className="grid grid-cols-[34px_1fr] gap-3" key={step.title}><span className={`grid size-8 place-items-center rounded-full text-xs font-black ${step.status === "completed" ? "bg-emerald-600 text-white" : step.status === "active" ? "bg-blue-600 text-white" : "bg-white text-[#9AA5B1] ring-1 ring-[#d8d1c6]"}`}>{step.status === "completed" ? "✓" : toFaNumber(index + 1)}</span><div className="border-b border-slate-200 pb-4 last:border-0"><p className="font-black">{step.title}</p><p className="mt-1 text-xs font-bold text-[#66758A]">وضعیت: {statusLabels[step.status] ?? step.status}</p></div></div>)}</div></Card>;
}

function ContactsWidget({ data }: { data: DashboardData }) {
  if (!data.contacts.length) return <EmptyState title="مخاطبی ثبت نشده است" href="/dashboard/contacts" action="افزودن مخاطب" />;
  return <Card className="p-5"><h2 className="text-lg font-black">مخاطبین اخیر</h2><div className="mt-4 grid gap-3">{data.contacts.slice(0, 5).map((contact) => <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3" key={contact.id}><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#EEF4FF] text-xs font-black text-blue-700">{contact.fullName.slice(0, 1)}</span><div><p className="text-sm font-black">{contact.fullName}</p><p className="text-xs font-bold text-[#66758A]">{contact.role}</p></div></div><button className="text-[#66758A]">⋮</button></div>)}</div></Card>;
}

function TemplatesWidget({ data }: { data: DashboardData }) {
  if (!data.templates.length) return <EmptyState title="قالب سندی ثبت نشده است" href="/dashboard/templates" action="ایجاد قالب" />;
  return <Card className="p-5"><h2 className="text-lg font-black">قالب های پرتکرار</h2><div className="mt-4 grid gap-3">{data.templates.slice(0, 5).map((template) => <div className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-0" key={template.id}><div><p className="text-sm font-black">{template.title}</p><p className="text-xs font-bold text-[#66758A]">استفاده: {toFaNumber(template.usageCount)} بار</p></div><span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon name="template" className="size-4" /></span></div>)}</div></Card>;
}

function StorageWidget({ data }: { data: DashboardData }) {
  return <Card className="p-5"><h2 className="text-lg font-black">وضعیت فضای ذخیره سازی</h2><p className="mt-3 text-xs font-bold text-[#66758A]">{toFaNumber(data.storageStats.usedGb)} گیگابایت از {toFaNumber(data.storageStats.availableGb)} گیگابایت استفاده شده</p><div className="mt-4 h-2 rounded-full bg-[#F0E7D8]"><span className="block h-full rounded-full bg-[#C9973F]" style={{ width: `${data.storageStats.percent}%` }} /></div><div className="mt-4 grid gap-2">{data.storageStats.breakdown.slice(0, 5).map((item) => <div className="flex justify-between text-xs font-black" key={item.label}><span>{item.label}</span><span>{toFaNumber(item.count)}</span></div>)}</div></Card>;
}

function ActivityWidget({ data }: { data: DashboardData }) {
  if (!data.activityFeed.length) return <EmptyState title="فعالیتی ثبت نشده است" href="/dashboard" action="مشاهده داشبورد" />;
  return <Card className="p-5"><h2 className="text-lg font-black">فعالیت های اخیر</h2><div className="mt-4 grid gap-3">{data.activityFeed.slice(0, 6).map((item, index) => <div className="flex items-center gap-3" key={`${item}-${index}`}><span className="grid size-8 place-items-center rounded-full bg-blue-50 text-blue-700">{index % 2 ? "↗" : "✓"}</span><div><p className="text-sm font-black">{item}</p><p className="text-xs font-bold text-[#66758A]">{toFaNumber(index + 1)} ساعت پیش</p></div></div>)}</div></Card>;
}

function SecurityWidget({ data }: { data: DashboardData }) {
  return <Card className="p-5"><h2 className="text-lg font-black">امنیت و هشدارها</h2><div className="mt-4 grid gap-3">{data.securityEvents.map((event) => <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3" key={event.label}><div><p className="text-sm font-black">{event.label}</p><p className="mt-1 text-xs font-bold text-[#66758A]">{event.detail}</p></div><span className={`grid size-8 place-items-center rounded-full text-white ${event.status === "success" ? "bg-emerald-600" : "bg-[#FFF8EA]0"}`}>{event.status === "success" ? "✓" : "!"}</span></div>)}</div></Card>;
}

function DashboardContent({ data }: { data: DashboardData }) {
  return <div className="grid gap-6"><KpiGrid data={data} /><div className="grid gap-6 xl:grid-cols-[280px_1fr_280px]"><div className="grid gap-6"><QuickActionsPanel /><StorageWidget data={data} /></div><div className="grid gap-6"><DocumentsTable documents={data.documents.slice(0, 6)} compact /><div className="grid gap-6 lg:grid-cols-2"><WorkflowTimeline data={data} /><TemplatesWidget data={data} /></div></div><div className="grid gap-6"><SignaturePanel data={data} /><ContactsWidget data={data} /></div></div><div className="grid gap-6 xl:grid-cols-3"><BulkSendWidget data={data} /><ActivityWidget data={data} /><SecurityWidget data={data} /></div></div>;
}

function QuickActionsPanel() {
  const actions = [["ایجاد سند جدید", "/dashboard/documents", "files"], ["بارگذاری سند", "/dashboard/documents", "archive"], ["ارسال برای امضا", "/dashboard/signatures", "pen"], ["ایجاد قالب", "/dashboard/templates", "template"], ["افزودن مخاطب", "/dashboard/contacts", "contacts"], ["ارسال گروهی", "/dashboard/bulk-send", "send"]];
  return <Card className="p-5"><h2 className="text-lg font-black">اقدامات سریع</h2><div className="mt-4 grid overflow-hidden rounded-xl border border-slate-200">{actions.map(([label, href, icon]) => <Link className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm font-black last:border-b-0 hover:bg-slate-50" href={href} key={label}><span>{label}</span><Icon name={icon} className="size-4 text-[#C9973F]" /></Link>)}</div></Card>;
}

function BulkSendWidget({ data }: { data: DashboardData }) {
  const total = data.contacts.length || 1;
  const sent = data.signatureRequests.length;
  const percent = Math.min(100, Math.round((sent / total) * 100));
  return <Card className="p-5"><h2 className="text-lg font-black">ارسال گروهی</h2><p className="mt-2 text-sm font-bold text-[#66758A]">پیگیری ارسال درخواست های امضا</p><div className="mt-4 space-y-3 text-sm font-bold text-[#4f5f75]"><div className="flex justify-between"><span>مخاطبین</span><span>{toFaNumber(data.contacts.length)} نفر</span></div><div className="flex justify-between"><span>ارسال شده</span><span>{toFaNumber(percent)}٪</span></div><div className="h-2 rounded-full bg-[#F0E7D8]"><span className="block h-full rounded-full bg-emerald-600" style={{ width: `${percent}%` }} /></div></div></Card>;
}

function ArchiveContent({ data }: { data: DashboardData }) {
  return <div className="grid gap-6 xl:grid-cols-[1fr_320px]"><div className="grid gap-6"><DocumentsTable documents={data.archivedDocuments} /><Card className="p-5"><h2 className="text-lg font-black">تاریخچه آرشیو و بازیابی</h2><div className="mt-4 grid gap-3">{data.archivedDocuments.slice(0, 5).map((doc) => <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3" key={doc.id}><span className="font-black">{doc.title}</span><button className="rounded-lg bg-[#0B172A] px-3 py-2 text-xs font-black text-white">بازیابی</button></div>)}</div></Card></div><StorageWidget data={data} /></div>;
}

function ContactsContent({ data }: { data: DashboardData }) {
  if (!data.contacts.length) return <EmptyState title="مخاطبی ثبت نشده است" href="/dashboard/contacts" action="افزودن مخاطب" />;
  return <div className="grid gap-6"><Card className="p-5"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><h2 className="text-xl font-black">مدیریت مخاطبین</h2><div className="flex gap-2"><input className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" placeholder="جستجوی مخاطب" /><button className="rounded-xl bg-[#0B172A] px-4 text-sm font-black text-white">افزودن مخاطب</button></div></div></Card><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{data.contacts.slice(0, 12).map((contact) => <Card className="p-5" key={contact.id}><div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full bg-blue-50 text-lg font-black text-blue-700">{contact.fullName.slice(0, 1)}</span><div><h3 className="font-black">{contact.fullName}</h3><p className="text-xs font-bold text-[#66758A]">{contact.role}</p></div></div><p className="mt-4 text-sm font-bold text-[#4f5f75]">{contact.organization}</p><p className="mt-2 text-xs font-bold text-[#66758A]">{contact.email}</p><div className="mt-4 flex flex-wrap gap-2">{contact.tags.map((tag) => <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-black" key={tag}>{tag}</span>)}</div></Card>)}</div></div>;
}

function TemplatesContent({ data }: { data: DashboardData }) {
  if (!data.templates.length) return <EmptyState title="قالب سندی ثبت نشده است" href="/dashboard/templates" action="ایجاد قالب" />;
  return <div className="grid gap-6"><div className="grid gap-4 md:grid-cols-3">{data.templates.slice(0, 3).map((template) => <Card className="p-5" key={template.id}><span className="text-xs font-black text-[#C9973F]">قالب محبوب</span><h2 className="mt-3 text-xl font-black">{template.title}</h2><p className="mt-2 text-sm font-bold leading-7 text-[#66758A]">{template.description}</p></Card>)}</div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{data.templates.map((template) => <Card className="p-5" key={template.id}><div className="flex items-center justify-between"><Icon name="template" className="size-6 text-[#C9973F]" /><span className={`rounded-lg px-3 py-1 text-xs font-black ${statusClass[template.status]}`}>{statusLabels[template.status] ?? template.status}</span></div><h3 className="mt-5 font-black">{template.title}</h3><p className="mt-2 text-sm font-bold text-[#66758A]">{template.category}</p><p className="mt-3 text-xs font-bold text-[#66758A]">استفاده: {toFaNumber(template.usageCount)} | آخرین استفاده: {template.lastUsed}</p></Card>)}</div></div>;
}

function WorkflowsContent({ data }: { data: DashboardData }) {
  if (!data.workflows.length) return <EmptyState title="گردش کاری تعریف نشده است" href="/dashboard/workflows" action="ایجاد گردش کار" />;
  return <div className="grid gap-6"><Card className="p-5"><h2 className="text-xl font-black">مدیریت گردش کار</h2><p className="mt-2 text-sm font-bold text-[#66758A]">سازنده گردش کار با نقش ها، مراحل و وضعیت پیشرفت.</p></Card><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{data.workflows.map((workflow) => <Card className="p-5" key={workflow.id}><div className="flex items-center justify-between"><h3 className="font-black">{workflow.name}</h3><span className={`rounded-lg px-3 py-1 text-xs font-black ${statusClass[workflow.status]}`}>{statusLabels[workflow.status] ?? workflow.status}</span></div><div className="mt-4 h-2 rounded-full bg-[#F0E7D8]"><span className="block h-full rounded-full bg-[#C9973F]" style={{ width: `${workflow.progress}%` }} /></div><p className="mt-3 text-xs font-bold text-[#66758A]">نقش ها: {workflow.assignedRoles.join("، ")}</p><div className="mt-4 grid gap-2">{workflow.steps.slice(0, 3).map((step) => <span className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-black" key={step.title}>{step.title}</span>)}</div></Card>)}</div></div>;
}

function SignatureStats({ data }: { data: DashboardData }) {
  const items = [["امضاهای امروز", data.stats.todaySignatures, 72], ["امضاهای این ماه", data.stats.monthSignatures, 84], ["در انتظار", data.stats.pendingSignatures, 46], ["نرخ تکمیل", `${data.stats.completionRate}%`, data.stats.completionRate]];
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map(([label, value, percent]) => <Card className="p-5" key={String(label)}><Ring value={Number(percent)} label={value} sublabel={String(label)} /></Card>)}</div>;
}

function ReportsContent({ data }: { data: DashboardData }) {
  return <div className="grid gap-6"><Card className="p-5"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><h2 className="text-xl font-black">مرکز گزارش ها</h2><div className="flex gap-2"><select className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold"><option>۶ ماه اخیر</option></select><button className="rounded-xl bg-[#0B172A] px-4 text-sm font-black text-white">خروجی Excel</button></div></div></Card><div className="grid gap-6 xl:grid-cols-2"><Card className="p-5"><h3 className="mb-4 font-black">اسناد ایجاد شده و تکمیل امضا</h3><ResponsiveContainer height={300} width="100%"><AreaChart data={data.reportSeries}><CartesianGrid stroke="#E2E8F0" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Area dataKey="documents" name="اسناد" stroke="#C9973F" fill="#C9973F" fillOpacity={0.22} /><Area dataKey="signatures" name="امضاها" stroke="#0B172A" fill="#0B172A" fillOpacity={0.14} /></AreaChart></ResponsiveContainer></Card><Card className="p-5"><h3 className="mb-4 font-black">دانلود قرارداد و فعالیت موکل</h3><ResponsiveContainer height={300} width="100%"><BarChart data={data.reportSeries}><CartesianGrid stroke="#E2E8F0" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="downloads" name="دانلود" fill="#C9973F" radius={[8, 8, 0, 0]} /><Bar dataKey="clients" name="موکل" fill="#17213A" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></Card></div></div>;
}

function BulkSendContent({ data }: { data: DashboardData }) {
  return <div className="grid gap-6 xl:grid-cols-[1fr_340px]"><Card className="p-6"><h2 className="text-xl font-black">ارسال گروهی امضا</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><select className="min-h-12 rounded-xl border border-slate-200 px-4 font-bold"><option>انتخاب قالب</option>{data.templates.map((template) => <option key={template.id}>{template.title}</option>)}</select><select className="min-h-12 rounded-xl border border-slate-200 px-4 font-bold"><option>انتخاب گروه مخاطبین</option>{data.contacts.slice(0, 6).map((contact) => <option key={contact.id}>{contact.group}</option>)}</select></div><div className="mt-6 grid gap-3">{["انتخاب قالب", "انتخاب مخاطبین", "ایجاد گروه دریافت کنندگان", "ارسال درخواست ها", "پیگیری تحویل"].map((step, index) => <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4" key={step}><span className="font-black">{step}</span><span className="grid size-8 place-items-center rounded-full bg-[#C9973F] text-xs font-black text-white">{toFaNumber(index + 1)}</span></div>)}</div></Card><div className="grid gap-6"><BulkSendWidget data={data} /><SignatureRequestsList rows={data.signatureRequests} status="pending" /></div></div>;
}

function PermissionsContent({ data }: { data: DashboardData }) {
  return <div className="grid gap-6"><Card className="p-5"><h2 className="text-xl font-black">سطوح دسترسی و ممیزی</h2><p className="mt-2 text-sm font-bold text-[#66758A]">تخصیص نقش، ویرایش مجوزها و ثبت تغییرات امنیتی.</p></Card><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{data.roles.map((role) => <Card className="p-5" key={role.id}><div className="flex items-center justify-between"><Icon name="lock" className="size-6 text-[#C9973F]" /><span className="text-xs font-bold text-[#66758A]">{toFaNumber(role.members)} عضو</span></div><h3 className="mt-4 text-xl font-black">{role.name}</h3><div className="mt-4 grid gap-2">{role.permissions.map((permission) => <span className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-black" key={permission}>{permission}</span>)}</div><p className="mt-4 text-xs font-bold text-[#66758A]">آخرین ممیزی: {role.lastAudit}</p></Card>)}</div><SecurityWidget data={data} /></div>;
}

export function LegalTechPlatform({ data, page }: { data: DashboardData; page: PageKind }) {
  const titles: Record<PageKind, string> = {
    dashboard: "داشبورد پیشرفته",
    documents: "مرکز اسناد",
    signatures: "مرکز امضای دیجیتال",
    archive: "بایگانی اسناد",
    contacts: "مدیریت مخاطبین",
    templates: "قالب های اسناد",
    "bulk-send": "ارسال گروهی",
    workflows: "مدیریت گردش کار",
    permissions: "سطوح دسترسی",
    reports: "گزارش ها",
  };

  return (
    <Shell data={data} title={titles[page]}>
      {page === "dashboard" ? <DashboardContent data={data} /> : null}
      {page === "documents" ? <div className="grid gap-6"><KpiGrid data={data} /><DocumentsTable documents={data.documents} /></div> : null}
      {page === "signatures" ? <div className="grid gap-6"><SignatureStats data={data} /><div className="grid gap-6 xl:grid-cols-[1fr_320px]"><SignatureRequestsList rows={data.signatureRequests} /><div className="grid gap-6"><SignaturePanel data={data} /><WorkflowTimeline data={data} /></div></div></div> : null}
      {page === "archive" ? <ArchiveContent data={data} /> : null}
      {page === "contacts" ? <ContactsContent data={data} /> : null}
      {page === "templates" ? <TemplatesContent data={data} /> : null}
      {page === "bulk-send" ? <BulkSendContent data={data} /> : null}
      {page === "workflows" ? <WorkflowsContent data={data} /> : null}
      {page === "permissions" ? <PermissionsContent data={data} /> : null}
      {page === "reports" ? <ReportsContent data={data} /> : null}
    </Shell>
  );
}
