import Link from "next/link";

export const adminStatusLabels: Record<string, string> = {
  published: "منتشر شده",
  draft: "پیش‌نویس",
  archived: "آرشیو شده",
  active: "فعال",
  disabled: "غیرفعال",
  blocked: "مسدود",
  unread: "خوانده نشده",
  read: "خوانده شده",
  new: "جدید",
  reviewing: "در بررسی",
  waiting_for_client: "منتظر مشتری",
  quoted: "اعلام قیمت شده",
  in_progress: "در حال انجام",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
  low: "پایین",
  medium: "متوسط",
  high: "بالا",
  urgent: "فوری",
};

export function AdminPageHeader({
  action,
  description,
  title,
}: {
  action?: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-card lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-black text-navy">{title}</h2>
        <p className="mt-2 text-sm font-bold leading-8 text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function AdminStatusBadge({ status }: { status: string }) {
  const tone =
    status === "published" || status === "active" || status === "completed" || status === "read"
      ? "bg-emerald-50 text-emerald-700"
      : status === "archived" || status === "disabled" || status === "blocked" || status === "cancelled"
        ? "bg-red-50 text-red-700"
        : status === "draft" || status === "pending"
          ? "bg-amber-50 text-amber-700"
          : "bg-blue-50 text-blue-700";

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${tone}`}>{adminStatusLabels[status] ?? status}</span>;
}

export function AdminEmptyState({
  action,
  description,
  title,
}: {
  action?: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-slate-50 p-8 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-2xl text-gold shadow-sm">+</span>
      <h3 className="mt-4 text-lg font-black text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm font-bold leading-8 text-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function AdminDataTable({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers: string[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-slate-50 text-muted">
            <tr>{headers.map((header) => <th className="px-5 py-4 text-right font-black" key={header}>{header}</th>)}</tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  );
}

export function AdminActionLink({ children, href }: { children: React.ReactNode; href: string }) {
  return <Link className="rounded-lg border border-border px-3 py-2 text-xs font-black text-navy hover:border-gold hover:text-gold" href={href}>{children}</Link>;
}
