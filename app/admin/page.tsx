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

function AdminEmptyState({ title, description, cta }: { title: string; description: string; cta: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-2xl text-[#C9973F] shadow-sm">+</span>
      <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm font-bold leading-7 text-slate-500">{description}</p>
      <span className="mt-5 inline-flex rounded-2xl bg-[#071326] px-5 py-3 text-sm font-black text-white">{cta}</span>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const dashboard = await getDashboardData();
  const hasRecentContent = dashboard.recentContent.length > 0;
  const hasRecentMessages = dashboard.recentMessages.length > 0;

  return (
    <AdminShell
      title="داشبورد"
      description="نمای کلی محتوای سایت، درخواست‌های حقوقی و پیام‌های دریافتی"
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          {dashboard.metrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-950">وضعیت محتوا</h2>
              <span className="text-sm font-bold text-slate-500">داده‌های واقعی CMS</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {dashboard.metrics.map((metric) => (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5" key={metric.label}>
                  <strong className="text-3xl text-[#C9973F]">{metric.value}</strong>
                  <p className="mt-2 font-bold text-slate-950">{metric.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{metric.change}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-black text-slate-950">آخرین مطالب</h2>
            <div className="grid gap-4">
              {hasRecentContent ? dashboard.recentContent.slice(0, 4).map((row) => (
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0" key={`${row.title}-${row.date}`}>
                  <div>
                    <p className="font-bold text-slate-950">{row.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{row.category}</p>
                  </div>
                  <span className="text-xs text-slate-500">{row.date}</span>
                </div>
              )) : (
                <AdminEmptyState title="هنوز محتوایی ثبت نشده است" description="برای شروع، یک خدمت یا مقاله جدید ایجاد کنید تا این بخش از حالت خالی خارج شود." cta="ایجاد محتوای جدید" />
              )}
            </div>
          </Card>
        </div>

        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-slate-950">آخرین پیام‌ها</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-right">نام</th>
                  <th className="px-4 py-3 text-right">ایمیل</th>
                  <th className="px-4 py-3 text-right">موضوع</th>
                  <th className="px-4 py-3 text-right">تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {hasRecentMessages ? dashboard.recentMessages.map((message) => (
                  <tr className="border-t border-slate-100" key={`${message.email}-${message.subject}`}>
                    <td className="px-4 py-4 font-bold text-slate-950">{message.name}</td>
                    <td className="px-4 py-4 text-slate-500">{message.email}</td>
                    <td className="px-4 py-4 text-slate-500">{message.subject}</td>
                    <td className="px-4 py-4 text-slate-500">{message.date}</td>
                  </tr>
                )) : (
                  <tr className="border-t border-slate-100">
                    <td className="px-4 py-4" colSpan={4}>
                      <AdminEmptyState title="هنوز پیامی دریافت نشده است" description="پیام‌های فرم تماس و درخواست‌های جدید پس از ثبت کاربران در این جدول دیده می‌شوند." cta="بررسی صندوق پیام‌ها" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-slate-950">محتوای اخیر</h2>
          {hasRecentContent ? <AdminTable rows={dashboard.recentContent} /> : <AdminEmptyState title="محتوای اخیر خالی است" description="برای شروع، یک خدمت، قرارداد یا مقاله جدید ایجاد کنید." cta="رفتن به مدیریت محتوا" />}
        </Card>
      </div>
    </AdminShell>
  );
}
