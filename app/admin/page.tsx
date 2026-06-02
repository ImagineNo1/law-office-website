import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatCard } from "@/components/admin/StatCard";
import { Card } from "@/components/ui/Card";
import { adminRows, dashboardMetrics, messagePreviews } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "داشبورد مدیریت",
};

export default function AdminDashboardPage() {
  return (
    <AdminShell title="داشبورد" description="نمای کلی عملکرد سایت، محتوا و پیام های دریافتی">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-foreground">بازدید سایت</h2>
              <span className="text-sm font-bold text-muted">۷ روز اخیر</span>
            </div>
            <div className="flex h-72 items-end gap-3 rounded-2xl bg-surface p-5">
              {[42, 64, 52, 78, 61, 88, 82].map((height, index) => (
                <div className="flex flex-1 flex-col items-center gap-3" key={height}>
                  <div className="w-full rounded-t-xl bg-gold/85" style={{ height: `${height}%` }} />
                  <span className="text-xs text-muted">{index + 1}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-5 text-xl font-black text-foreground">آخرین مطالب</h2>
            <div className="grid gap-4">
              {adminRows.slice(0, 4).map((row) => (
                <div className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0" key={row.title}>
                  <div>
                    <p className="font-bold text-foreground">{row.title}</p>
                    <p className="mt-1 text-sm text-muted">{row.category}</p>
                  </div>
                  <span className="text-xs text-muted">{row.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">آخرین پیام ها</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="px-4 py-3 text-right">نام</th>
                  <th className="px-4 py-3 text-right">ایمیل</th>
                  <th className="px-4 py-3 text-right">موضوع</th>
                  <th className="px-4 py-3 text-right">تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {messagePreviews.map((message) => (
                  <tr className="border-t border-border" key={message.email}>
                    <td className="px-4 py-4 font-bold">{message.name}</td>
                    <td className="px-4 py-4 text-muted">{message.email}</td>
                    <td className="px-4 py-4 text-muted">{message.subject}</td>
                    <td className="px-4 py-4 text-muted">{message.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">محتوای اخیر</h2>
          <AdminTable rows={adminRows} />
        </Card>
      </div>
    </AdminShell>
  );
}
