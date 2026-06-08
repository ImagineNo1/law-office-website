import Link from "next/link";
import { Plus } from "lucide-react";

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
  description?: string;
  title: string;
}) {
  return (
    <div className="panel-card flex flex-col gap-4 rounded-lg p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="font-heading text-2xl font-extrabold text-primary">{title}</h2>
        {description ? <p className="mt-2 text-sm font-medium leading-8 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function AdminStatusBadge({ status }: { status: string }) {
  const tone =
    status === "published" || status === "active" || status === "completed" || status === "read"
      ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15"
      : status === "archived" || status === "disabled" || status === "blocked" || status === "cancelled"
        ? "bg-red-500/10 text-red-700 ring-1 ring-red-500/15"
        : status === "draft" || status === "pending"
          ? "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/15"
          : "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/15";

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${tone}`}>{adminStatusLabels[status] ?? status}</span>;
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
    <div className="rounded-lg border border-dashed border-border bg-white p-8 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-lg bg-card text-accent shadow-sm">
        <Plus aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 font-heading text-lg font-extrabold text-primary">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-8 text-muted-foreground">{description}</p>
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
    <section className="panel-card overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <table className="admin-table w-full min-w-[860px] text-sm">
          <thead className="bg-white text-muted-foreground">
            <tr>{headers.map((header) => <th className="px-5 py-4 text-right font-extrabold" key={header}>{header}</th>)}</tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  );
}

export function AdminActionLink({ children, href }: { children: React.ReactNode; href: string }) {
  return <Link className="rounded-lg border border-border px-3 py-2 text-xs font-extrabold text-primary transition hover:border-accent hover:text-accent" href={href}>{children}</Link>;
}
