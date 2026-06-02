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
            <div className="relative h-72 overflow-hidden rounded-2xl bg-surface p-5">
              <div className="absolute inset-5 grid grid-rows-4">
                {[0, 1, 2, 3].map((line) => (
                  <span className="border-t border-border" key={line} />
                ))}
              </div>
              <svg className="relative h-full w-full" viewBox="0 0 640 250" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="visitsFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="#C89B3C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M20 170 C80 90 120 74 178 126 C232 176 280 82 328 116 C382 156 418 92 470 76 C528 60 572 108 620 84 L620 235 L20 235 Z" fill="url(#visitsFill)" />
                <path d="M20 170 C80 90 120 74 178 126 C232 176 280 82 328 116 C382 156 418 92 470 76 C528 60 572 108 620 84" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
                {[20, 178, 328, 470, 620].map((x, index) => (
                  <circle cx={x} cy={[170, 126, 116, 76, 84][index]} fill="#ffffff" key={x} r="7" stroke="#2563EB" strokeWidth="4" />
                ))}
              </svg>
              <div className="relative mt-2 flex justify-between text-xs text-muted">
                <span>۱۴۰۳/۳/۱۶</span>
                <span>۱۴۰۳/۳/۱۸</span>
                <span>۱۴۰۳/۳/۲۰</span>
                <span>۱۴۰۳/۳/۲۲</span>
              </div>
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
