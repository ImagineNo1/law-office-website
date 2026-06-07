import Link from "next/link";
import { sendClientMessageAction } from "@/app/dashboard/actions";
import type {
  ClientContractRecord,
  ClientFileRecord,
  ClientMessageRecord,
  ClientPaymentRecord,
  ClientProfileData,
} from "@/lib/client-portal-db";
import { formatRequestDate, requestPriorityLabels, requestStatusLabels, requestStatuses } from "@/lib/service-requests";
import type { RequestStatus, ServiceRequestData } from "@/types";

const statusColors: Record<string, string> = {
  new: "bg-slate-100 text-slate-700",
  reviewing: "bg-blue-50 text-blue-700",
  quoted: "bg-purple-50 text-purple-700",
  in_progress: "bg-[#FFF8EA] text-amber-700",
  waiting_for_client: "bg-violet-50 text-violet-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
  ready: "bg-emerald-50 text-emerald-700",
  active: "bg-blue-50 text-blue-700",
  draft: "bg-[#FFF8EA] text-amber-700",
  expired: "bg-red-50 text-red-700",
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-[#FFF8EA] text-amber-700",
  failed: "bg-red-50 text-red-700",
  refunded: "bg-slate-100 text-slate-700",
  cancelledPayment: "bg-red-50 text-red-700",
};

export const contractStatusLabels: Record<ClientContractRecord["status"], string> = {
  active: "فعال",
  ready: "آماده دانلود",
  expired: "منقضی شده",
  draft: "در حال آماده‌سازی",
};

export const paymentStatusLabels: Record<ClientPaymentRecord["status"], string> = {
  paid: "پرداخت شده",
  pending: "در انتظار پرداخت",
  failed: "ناموفق",
  refunded: "بازگشت داده شده",
  cancelled: "لغو شده",
};

export function PortalCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-border bg-white shadow-card ${className}`}>{children}</section>;
}

export function EmptyState({
  ctaHref,
  ctaLabel,
  description,
  icon = "□",
  title,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  description: string;
  icon?: string;
  title: string;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-slate-50 px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-white text-2xl text-gold shadow-sm">{icon}</span>
      <h3 className="mt-5 text-lg font-black text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm font-bold leading-8 text-muted">{description}</p>
      {ctaHref && ctaLabel ? (
        <Link className="mt-5 rounded-xl bg-gold px-5 py-3 text-sm font-black text-white transition hover:bg-gold/90" href={ctaHref}>
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function ClientKpiCards({ kpis }: { kpis: { label: string; value: number; hint: string; icon: string }[] }) {
  const iconMap: Record<string, string> = { briefcase: "□", clock: "◷", check: "✓", document: "▤", folder: "▥" };
  const colors = ["bg-blue-50 text-blue-700", "bg-[#FFF8EA] text-amber-700", "bg-emerald-50 text-emerald-700", "bg-violet-50 text-violet-700", "bg-slate-100 text-slate-700"];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {kpis.map((kpi, index) => (
        <PortalCard className="p-5" key={kpi.label}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-navy">{kpi.label}</p>
              <strong className="mt-4 block text-4xl font-black tabular-nums text-navy">{new Intl.NumberFormat("fa-IR").format(kpi.value)}</strong>
              <span className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-muted"><span className="size-2 rounded-full bg-emerald-400" />{kpi.hint}</span>
            </div>
            <span className={`grid size-14 place-items-center rounded-2xl text-2xl ${colors[index % colors.length]}`}>{iconMap[kpi.icon]}</span>
          </div>
        </PortalCard>
      ))}
    </div>
  );
}

export function ProfileCard({ profile }: { profile: ClientProfileData }) {
  return (
    <PortalCard className="p-6 text-center">
      <h2 className="mb-5 text-right text-lg font-black text-navy">اطلاعات کاربری</h2>
      <div className="mx-auto grid size-28 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-100 text-4xl font-black text-navy shadow-inner">
        {profile.fullName.slice(0, 1)}
      </div>
      <h3 className="mt-4 text-xl font-black text-navy">{profile.fullName}</h3>
      <p className="mt-3 text-sm font-bold text-muted">{profile.phone}</p>
      <p className="mt-2 text-sm font-bold text-muted">{profile.email || "ایمیل ثبت نشده"}</p>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-right">
        <div className="mb-2 flex items-center justify-between text-xs font-black text-muted"><span>تکمیل پروفایل</span><span>{profile.completion}٪</span></div>
        <span className="block h-2 overflow-hidden rounded-full bg-white"><span className="block h-full rounded-full bg-gold" style={{ width: `${profile.completion}%` }} /></span>
      </div>
      <Link className="mt-5 inline-flex w-full justify-center rounded-xl border border-border px-5 py-3 text-sm font-black text-navy transition hover:border-gold hover:text-gold" href="/dashboard/profile">ویرایش پروفایل</Link>
    </PortalCard>
  );
}

export function RequestStatusDonut({ data }: { data: { status: RequestStatus; value: number }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const colors: Record<RequestStatus, string> = {
    new: "#94A3B8",
    reviewing: "#3B82F6",
    waiting_for_client: "#8B5CF6",
    quoted: "#A855F7",
    in_progress: "#F59E0B",
    completed: "#22C55E",
    cancelled: "#EF4444",
  };
  const arcs = data.map((item, index) => {
    const dash = (item.value / total) * 100;
    const previous = data.slice(0, index).reduce((sum, current) => sum + (current.value / total) * 100, 0);
    return { ...item, dash, offset: 25 - previous };
  });

  return (
    <PortalCard className="p-6">
      <h2 className="mb-5 text-lg font-black text-navy">وضعیت درخواست‌های من</h2>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_220px]">
        <div className="rounded-2xl border border-border p-4">
          <div className="grid gap-4">
            {data.map((item) => (
              <div className="grid grid-cols-[1fr_42px] items-center gap-3" key={item.status}>
                <span className="flex items-center gap-2 text-sm font-bold text-muted"><span className="size-2.5 rounded-full" style={{ backgroundColor: colors[item.status] }} />{requestStatusLabels[item.status]}</span>
                <strong className="text-sm tabular-nums text-navy">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 42 42" className="mx-auto size-56 rotate-[-90deg]">
          <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#F1E8D8" strokeWidth="7" />
          {arcs.map((item) => <circle key={item.status} cx="21" cy="21" r="15.9" fill="transparent" stroke={colors[item.status]} strokeDasharray={`${item.dash} ${100 - item.dash}`} strokeDashoffset={item.offset} strokeWidth="7" />)}
          <text x="21" y="20" rotate="90 21 21" textAnchor="middle" className="fill-navy text-[6px] font-black">{total}</text>
          <text x="21" y="25" rotate="90 21 21" textAnchor="middle" className="fill-muted text-[3px] font-bold">درخواست</text>
        </svg>
      </div>
    </PortalCard>
  );
}

export function RequestsTable({
  requests,
  search = "",
  status = "",
}: {
  requests: ServiceRequestData[];
  search?: string;
  status?: string;
}) {
  return (
    <PortalCard className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-black text-navy">درخواست‌های اخیر</h2>
        <form className="flex flex-col gap-2 sm:flex-row">
          <input className="service-input" defaultValue={search} name="q" placeholder="جستجو..." />
          <select className="service-input" defaultValue={status} name="status">
            <option value="">همه وضعیت‌ها</option>
            {requestStatuses.map((item) => <option key={item} value={item}>{requestStatusLabels[item]}</option>)}
          </select>
          <button className="rounded-xl bg-navy px-4 py-2 text-sm font-black text-white" type="submit">اعمال</button>
        </form>
      </div>
      {requests.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-50 text-muted"><tr>{["شماره درخواست", "خدمت", "وضعیت", "اولویت", "تاریخ ثبت", "عملیات"].map((item) => <th className="px-5 py-4 text-right font-black" key={item}>{item}</th>)}</tr></thead>
            <tbody>
              {requests.map((request) => (
                <tr className="border-t border-border hover:bg-slate-50" key={request.id}><td className="px-5 py-4 font-black text-navy">{request.requestNumber}</td><td className="px-5 py-4 font-bold text-muted">{request.serviceTitle}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${statusColors[request.status]}`}>{requestStatusLabels[request.status]}</span></td><td className="px-5 py-4 font-bold text-muted">{requestPriorityLabels[request.priority]}</td><td className="px-5 py-4 font-bold text-muted">{formatRequestDate(request.createdAt)}</td><td className="px-5 py-4"><Link className="rounded-lg border border-border px-3 py-2 text-xs font-black text-navy hover:border-gold hover:text-gold" href={`/dashboard/requests/${request.id}`}>مشاهده جزئیات</Link></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5">
          <EmptyState ctaHref="/requests/new" ctaLabel="ثبت درخواست جدید" description="برای شروع، درخواست حقوقی جدیدی ثبت کنید تا روند بررسی و پیگیری آن در همین بخش نمایش داده شود." icon="◷" title="هنوز درخواستی ثبت نکرده‌اید" />
        </div>
      )}
    </PortalCard>
  );
}

export function ContractsList({ contracts }: { contracts: ClientContractRecord[] }) {
  if (!contracts.length) {
    return <EmptyState ctaHref="/contracts" ctaLabel="مشاهده بانک قراردادها" description="پس از خرید یا تخصیص قرارداد، نسخه‌های آماده دانلود شما در این بخش قرار می‌گیرد." icon="▤" title="هنوز قراردادی برای شما ثبت نشده است" />;
  }

  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{contracts.map((contract) => <PortalCard className="p-5" key={contract.id}><div className="flex items-start justify-between gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">▤</span><span className={`rounded-full px-3 py-1 text-xs font-black ${statusColors[contract.status]}`}>{contractStatusLabels[contract.status]}</span></div><h3 className="mt-5 text-lg font-black text-navy">{contract.title}</h3><p className="mt-2 text-sm font-bold text-muted">{contract.category} · تاریخ خرید: {contract.purchaseDate}</p>{contract.fileUrl ? <a className="mt-5 inline-flex rounded-xl border border-border px-5 py-3 text-sm font-black text-navy hover:border-gold hover:text-gold" href={contract.fileUrl}>دانلود</a> : <span className="mt-5 inline-flex rounded-xl bg-slate-100 px-5 py-3 text-sm font-black text-muted">فایل هنوز آماده نیست</span>}</PortalCard>)}</div>;
}

export function FilesTable({ files }: { files: ClientFileRecord[] }) {
  return <PortalCard className="overflow-hidden"><div className="border-b border-border p-5"><h2 className="text-xl font-black text-navy">فایل‌های من</h2></div>{files.length ? <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><thead className="bg-slate-50 text-muted"><tr>{["نام فایل", "نوع", "تاریخ آپلود", "حجم", "عملیات"].map((item) => <th className="px-5 py-4 text-right font-black" key={item}>{item}</th>)}</tr></thead><tbody>{files.map((file) => <tr className="border-t border-border" key={file.id}><td className="px-5 py-4 font-black text-navy">{file.filename}</td><td className="px-5 py-4 font-bold text-muted">{file.type}</td><td className="px-5 py-4 font-bold text-muted">{file.uploadDate}</td><td className="px-5 py-4 font-bold text-muted">{file.size || "ثبت نشده"}</td><td className="px-5 py-4"><div className="flex gap-2">{file.previewUrl ? <a className="rounded-lg border border-border px-3 py-2 text-xs font-black" href={file.previewUrl}>پیش‌نمایش</a> : <span className="rounded-lg border border-border px-3 py-2 text-xs font-black text-muted">پیش‌نمایش ندارد</span>}{file.fileUrl ? <a className="rounded-lg bg-gold px-3 py-2 text-xs font-black text-white" href={file.fileUrl}>دانلود</a> : <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-muted">دانلود ندارد</span>}</div></td></tr>)}</tbody></table></div> : <div className="p-5"><EmptyState description="هر فایلی که توسط شما یا تیم حقوقی برای پرونده‌ها ثبت شود اینجا قابل مشاهده خواهد بود." icon="▥" title="هنوز فایلی برای شما ثبت نشده است" /></div>}</PortalCard>;
}

export function PaymentsTable({ payments }: { payments: ClientPaymentRecord[] }) {
  return <PortalCard className="overflow-hidden"><div className="border-b border-border p-5"><h2 className="text-xl font-black text-navy">سوابق پرداخت</h2></div>{payments.length ? <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><thead className="bg-slate-50 text-muted"><tr>{["شماره فاکتور", "تاریخ", "مبلغ", "وضعیت", "عملیات"].map((item) => <th className="px-5 py-4 text-right font-black" key={item}>{item}</th>)}</tr></thead><tbody>{payments.map((payment) => <tr className="border-t border-border" key={payment.id}><td className="px-5 py-4 font-black text-navy">{payment.invoiceNumber}</td><td className="px-5 py-4 font-bold text-muted">{payment.date}</td><td className="px-5 py-4 font-bold tabular-nums text-muted">{payment.amount}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${statusColors[payment.status]}`}>{paymentStatusLabels[payment.status]}</span></td><td className="px-5 py-4"><button className="rounded-lg border border-border px-3 py-2 text-xs font-black">مشاهده</button></td></tr>)}</tbody></table></div> : <div className="p-5"><EmptyState description="فاکتورها و پرداخت‌های ثبت‌شده شما پس از صدور در این بخش نمایش داده می‌شوند." icon="✓" title="هنوز پرداختی ثبت نشده است" /></div>}</PortalCard>;
}

export function MessagingCenter({ messages }: { messages: ClientMessageRecord[] }) {
  return <PortalCard className="p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-navy">مرکز پیام‌ها</h2><span className="rounded-full bg-gold px-3 py-1 text-xs font-black text-white">پشتیبانی فعال</span></div>{messages.length ? <div className="grid max-h-[560px] gap-4 overflow-y-auto rounded-2xl bg-slate-50 p-4">{messages.map((message) => <div className={`flex ${message.sender === "client" ? "justify-start" : "justify-end"}`} key={message.id}><div className={`max-w-[78%] rounded-2xl border border-border bg-white p-4 shadow-sm ${message.sender === "admin" ? "border-gold/40" : ""}`}><div className="mb-2 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-full bg-navy text-xs font-black text-white">{message.senderName.slice(0, 1)}</span><strong className="text-xs text-navy">{message.senderName}</strong><span className="text-xs font-bold text-muted">{message.timestamp}</span></div><p className="text-sm font-bold leading-8 text-muted">{message.message}</p></div></div>)}</div> : <EmptyState description="پیام‌های شما و پاسخ‌های تیم حقوقی پس از ارسال در همین بخش ثبت می‌شود." icon="✉" title="هنوز پیامی ثبت نشده است" />}<form action={sendClientMessageAction} className="mt-4 flex gap-2 rounded-2xl border border-border p-3"><input className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" name="message" placeholder="ارسال پیام..." /><button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ارسال</button></form></PortalCard>;
}
