import { Badge } from "@/components/ui/Badge";
import type { AdminContentRow } from "@/types";

export function AdminTable({ rows }: { rows: AdminContentRow[] }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-surface-strong/86 shadow-card backdrop-blur">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead className="bg-surface/80 text-muted">
          <tr>
            <th className="px-5 py-4 text-right font-bold">عنوان</th>
            <th className="px-5 py-4 text-right font-bold">دسته بندی</th>
            <th className="px-5 py-4 text-right font-bold">تاریخ</th>
            <th className="px-5 py-4 text-right font-bold">وضعیت</th>
            <th className="px-5 py-4 text-right font-bold">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-t border-border text-foreground transition hover:bg-gold/5" key={`${row.title}-${row.date}`}>
              <td className="px-5 py-4 font-bold">{row.title}</td>
              <td className="px-5 py-4 text-muted">{row.category}</td>
              <td className="px-5 py-4 text-muted">{row.date}</td>
              <td className="px-5 py-4">
                <Badge tone={row.status === "منتشر شده" ? "green" : "muted"}>{row.status}</Badge>
              </td>
              <td className="px-5 py-4 text-sm font-bold text-gold">ویرایش</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
