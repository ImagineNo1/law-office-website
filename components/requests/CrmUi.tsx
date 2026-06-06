import Link from "next/link";
import type { RequestPriority, RequestStatus, ServiceRequestData } from "@/types";
import {
  formatRequestDate,
  requestPriorityLabels,
  requestStatusLabels,
} from "@/lib/service-requests";

const statusClass: Record<RequestStatus, string> = {
  new: "bg-slate-100 text-slate-700 ring-slate-200",
  reviewing: "bg-[#FFF8EA] text-amber-700 ring-amber-200",
  waiting_for_client: "bg-[#FFF8EA] text-orange-700 ring-orange-200",
  quoted: "bg-purple-50 text-purple-700 ring-purple-200",
  in_progress: "bg-blue-50 text-blue-700 ring-blue-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
};

const priorityClass: Record<RequestPriority, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-emerald-50 text-emerald-700",
  high: "bg-red-50 text-red-700",
  urgent: "bg-rose-600 text-white",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${statusClass[status]}`}>
      {requestStatusLabels[status]}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: RequestPriority }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${priorityClass[priority]}`}>
      {requestPriorityLabels[priority]}
    </span>
  );
}

export function MiniLineChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const points = data
    .map((item, index) => `${(index / Math.max(data.length - 1, 1)) * 100},${100 - (item.value / max) * 78 - 10}`)
    .join(" ");

  return (
    <div className="h-56 rounded-2xl border border-border bg-white p-4">
      <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="goldLine" x1="0" x2="1">
            <stop stopColor="#C9973F" />
            <stop offset="1" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#E7DFD0" strokeWidth="0.5" />
        ))}
        <polyline fill="none" points={points} stroke="url(#goldLine)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        {data.map((item, index) => (
          <circle key={item.label} cx={(index / Math.max(data.length - 1, 1)) * 100} cy={100 - (item.value / max) * 78 - 10} r="1.6" fill="#C9973F" />
        ))}
      </svg>
    </div>
  );
}

export function DonutChart({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const colors = ["#C9973F", "#60A5FA", "#34D399", "#F97316", "#F43F5E", "#8B5CF6"];
  const arcs = data.map((item, index) => {
    const dash = (item.value / total) * 100;
    const previous = data.slice(0, index).reduce((sum, current) => sum + (current.value / total) * 100, 0);
    return { ...item, dash, offset: 25 - previous };
  });

  return (
    <div className="grid items-center gap-4 rounded-2xl border border-border bg-white p-4 sm:grid-cols-[180px_1fr]">
      <svg viewBox="0 0 42 42" className="mx-auto size-40 rotate-[-90deg]">
        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#F1E8D8" strokeWidth="7" />
        {arcs.map((item, index) => (
          <circle key={item.label} cx="21" cy="21" r="15.9" fill="transparent" stroke={colors[index % colors.length]} strokeDasharray={`${item.dash} ${100 - item.dash}`} strokeDashoffset={item.offset} strokeWidth="7" />
        ))}
        <text x="21" y="20" rotate="90 21 21" textAnchor="middle" className="fill-navy text-[5px] font-black">
          {total}
        </text>
        <text x="21" y="25" rotate="90 21 21" textAnchor="middle" className="fill-muted text-[3px] font-bold">
          درخواست
        </text>
      </svg>
      <div className="grid gap-2">
        {data.slice(0, 6).map((item, index) => (
          <div className="flex items-center justify-between gap-3 text-sm" key={item.label}>
            <span className="flex items-center gap-2 font-bold text-muted"><span className="size-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />{item.label}</span>
            <strong className="text-navy">{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RequestTimeline({ request, compact = false }: { request: ServiceRequestData; compact?: boolean }) {
  const steps = [
    "ثبت درخواست",
    "بررسی اولیه",
    "تخصیص کارشناس",
    "در حال انجام",
    "تکمیل و تحویل",
    "بسته شدن درخواست",
  ];
  const progressByStatus: Record<RequestStatus, number> = {
    new: 1,
    reviewing: 2,
    waiting_for_client: 3,
    quoted: 3,
    in_progress: 4,
    completed: 5,
    cancelled: 2,
  };
  const progress = progressByStatus[request.status];

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
      <h3 className="text-lg font-black text-navy">وضعیت درخواست</h3>
      <div className="mt-6 grid gap-5">
        {steps.map((step, index) => {
          const done = index < progress;
          const current = index === progress;
          return (
            <div className="grid grid-cols-[34px_1fr] gap-3" key={step}>
              <div className="relative flex justify-center">
                {index < steps.length - 1 ? <span className={`absolute top-8 h-10 w-px ${done ? "bg-emerald-400" : "bg-slate-200"}`} /> : null}
                <span className={`relative z-10 grid size-7 place-items-center rounded-full text-xs font-black ${done ? "bg-emerald-500 text-white" : current ? "bg-gold text-white" : "bg-slate-200 text-slate-500"}`}>{done ? "✓" : index + 1}</span>
              </div>
              <div>
                <p className="font-black text-navy">{step}</p>
                <p className="mt-1 text-xs font-bold text-muted">{done || current ? formatRequestDate(request.updatedAt) : "در انتظار"}</p>
                {!compact && current ? <p className="mt-2 text-xs leading-6 text-muted">پرونده در این مرحله توسط تیم حقوقی پیگیری می‌شود.</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RequestTable({ requests }: { requests: ServiceRequestData[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-black text-navy">همه درخواست‌ها</h2>
        <div className="grid gap-2 sm:grid-cols-5">
          <input className="service-input sm:col-span-2" placeholder="جستجو در درخواست‌ها..." />
          <select className="service-input"><option>همه وضعیت‌ها</option></select>
          <select className="service-input"><option>همه اولویت‌ها</option></select>
          <select className="service-input"><option>همه خدمات</option></select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-slate-50 text-xs text-muted">
            <tr>
              {["شماره درخواست", "خدمت", "مشتری", "وضعیت", "اولویت", "تاریخ ثبت", "عملیات"].map((heading) => (
                <th className="px-5 py-4 text-right font-black" key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.slice(0, 10).map((request) => (
              <tr className="border-t border-border/70 hover:bg-slate-50" key={request.id}>
                <td className="px-5 py-4 font-black text-navy">{request.requestNumber}</td>
                <td className="px-5 py-4 font-bold text-muted">{request.serviceTitle}</td>
                <td className="px-5 py-4 font-bold text-navy">{request.fullName}</td>
                <td className="px-5 py-4"><StatusBadge status={request.status} /></td>
                <td className="px-5 py-4"><PriorityBadge priority={request.priority} /></td>
                <td className="px-5 py-4 font-bold text-muted">{formatRequestDate(request.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link className="rounded-lg border border-border px-3 py-2 font-black text-navy hover:border-gold hover:text-gold" href={`/admin/requests/${request.id}`}>مشاهده</Link>
                    <button className="rounded-lg border border-border px-3 py-2 font-black text-muted">ویرایش</button>
                    <button className="rounded-lg border border-border px-3 py-2 font-black text-muted">ارجاع</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4 text-sm font-bold text-muted">
        <span>نمایش ۱ تا ۱۰ از {requests.length} مورد</span>
        <div className="flex gap-2"><button className="rounded-lg border border-border px-3 py-2">قبلی</button><button className="rounded-lg bg-gold px-3 py-2 text-white">۱</button><button className="rounded-lg border border-border px-3 py-2">بعدی</button></div>
      </div>
    </div>
  );
}
