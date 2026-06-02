import { Badge } from "@/components/ui/Badge";
import type { AdminContentRow } from "@/types";

export function AdminTable({ rows }: { rows: AdminContentRow[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gold/15">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead className="bg-white/[0.04] text-muted">
          <tr>
            <th className="px-4 py-3 text-right font-bold">عنوان</th>
            <th className="px-4 py-3 text-right font-bold">دسته بندی</th>
            <th className="px-4 py-3 text-right font-bold">تاریخ</th>
            <th className="px-4 py-3 text-right font-bold">وضعیت</th>
            <th className="px-4 py-3 text-right font-bold">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-t border-gold/10 text-foreground" key={`${row.title}-${row.date}`}>
              <td className="px-4 py-4 font-bold">{row.title}</td>
              <td className="px-4 py-4 text-muted">{row.category}</td>
              <td className="px-4 py-4 text-muted">{row.date}</td>
              <td className="px-4 py-4">
                <Badge tone={row.status === "منتشر شده" ? "green" : "muted"}>{row.status}</Badge>
              </td>
              <td className="px-4 py-4 text-gold">ویرایش | حذف</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
