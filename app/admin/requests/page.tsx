import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { DonutChart, MiniLineChart, RequestTable } from "@/components/requests/CrmUi";
import { getRequestAnalytics, getServiceRequests } from "@/lib/service-requests";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "مدیریت درخواست‌ها" };

const cardStyles = [
  "from-slate-900 to-slate-700 text-white",
  "from-amber-50 to-white text-navy",
  "from-blue-50 to-white text-navy",
  "from-emerald-50 to-white text-navy",
  "from-red-50 to-white text-navy",
];

export default async function AdminRequestsPage() {
  const requests = await getServiceRequests();
  const analytics = getRequestAnalytics(requests);
  const stats = [
    { label: "کل درخواست‌ها", value: requests.length, hint: "تمام کارتابل CRM" },
    { label: "در حال بررسی", value: requests.filter((item) => item.status === "reviewing").length, hint: "نیازمند اقدام اولیه" },
    { label: "در حال انجام", value: requests.filter((item) => item.status === "in_progress").length, hint: "پرونده‌های فعال" },
    { label: "تکمیل شده", value: requests.filter((item) => item.status === "completed").length, hint: "تحویل موفق" },
    { label: "لغو شده", value: requests.filter((item) => item.status === "cancelled").length, hint: "بسته بدون اقدام" },
  ];

  return (
    <AdminShell title="همه درخواست‌ها" description="مدیریت چرخه کامل درخواست‌های حقوقی، پیام‌ها، فایل‌ها و ارجاع کارشناسی">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <article className={`rounded-2xl border border-border bg-gradient-to-br p-5 shadow-card ${cardStyles[index]}`} key={stat.label}>
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-white/20 text-xl">{["₪", "◷", "↻", "✓", "×"][index]}</span>
                <span className="text-xs font-black opacity-70">CRM</span>
              </div>
              <strong className="mt-5 block text-4xl font-black">{stat.value}</strong>
              <p className="mt-2 font-black">{stat.label}</p>
              <p className="mt-1 text-xs font-bold opacity-70">{stat.hint}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-navy">نمودار درخواست‌ها</h2>
              <select className="service-input max-w-36"><option>ماه گذشته</option></select>
            </div>
            <MiniLineChart data={analytics.overTime} />
          </section>
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h2 className="mb-4 text-xl font-black text-navy">بر اساس وضعیت</h2>
            <DonutChart data={analytics.byStatus} />
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h2 className="mb-4 text-xl font-black text-navy">درخواست‌ها بر اساس خدمت</h2>
            <div className="grid gap-3">
              {analytics.byService.map((item) => (
                <div className="grid grid-cols-[120px_1fr_36px] items-center gap-3" key={item.label}>
                  <span className="text-sm font-black text-navy">{item.label}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-gold" style={{ width: `${Math.min(100, item.value * 12)}%` }} /></span>
                  <strong className="text-left text-sm text-muted">{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h2 className="mb-4 text-xl font-black text-navy">روند ماهانه</h2>
            <div className="grid h-64 grid-cols-6 items-end gap-3 rounded-2xl bg-[#fbf7ef] p-4">
              {analytics.monthlyTrends.map((item) => (
                <div className="grid h-full content-end gap-2 text-center" key={item.label}>
                  <div className="mx-auto flex h-44 items-end gap-1">
                    <span className="w-2 rounded-t bg-amber-400" style={{ height: `${item.reviewing * 4}px` }} />
                    <span className="w-2 rounded-t bg-blue-400" style={{ height: `${item.progress * 4}px` }} />
                    <span className="w-2 rounded-t bg-emerald-400" style={{ height: `${item.completed * 4}px` }} />
                  </div>
                  <span className="text-xs font-black text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <RequestTable requests={requests} />
      </div>
    </AdminShell>
  );
}
