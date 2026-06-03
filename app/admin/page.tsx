import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatCard } from "@/components/admin/StatCard";
import { Card } from "@/components/ui/Card";
import { getDashboardData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "داشبورد مدیریت",
};

export default async function AdminDashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <AdminShell
      title="داشبورد"
      description="نمای کلی محتوای سایت و پیام های دریافتی"
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          {dashboard.metrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-foreground">وضعیت محتوا</h2>
              <span className="text-sm font-bold text-muted">داده های واقعی CMS</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {dashboard.metrics.map((metric) => (
                <div className="rounded-2xl border border-border bg-surface p-5" key={metric.label}>
                  <strong className="text-3xl text-gold">{metric.value}</strong>
                  <p className="mt-2 font-bold text-foreground">{metric.label}</p>
                  <p className="mt-1 text-sm text-muted">{metric.change}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-5 text-xl font-black text-foreground">آخرین مطالب</h2>
            <div className="grid gap-4">
              {dashboard.recentContent.slice(0, 4).map((row) => (
                <div className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0" key={`${row.title}-${row.date}`}>
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
                {dashboard.recentMessages.map((message) => (
                  <tr className="border-t border-border" key={`${message.email}-${message.subject}`}>
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
          <AdminTable rows={dashboard.recentContent} />
        </Card>
      </div>
    </AdminShell>
  );
}
