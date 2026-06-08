import type { Metadata } from "next";
import Link from "next/link";
import { AdminDashboardCharts } from "@/components/admin/AdminDashboardCharts";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminEmptyState, AdminPageHeader } from "@/components/admin/AdminUi";
import { getAdminDashboardData } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "داشبورد مدیریت" };

const cards = [
  ["درخواست‌ها", "requests", "/admin/requests"],
  ["خدمات", "services", "/admin/services"],
  ["قراردادها", "contracts", "/admin/contracts"],
  ["فرم‌های حقوقی", "forms", "/admin/legal-forms"],
  ["سوالات متداول", "faqs", "/admin/faqs"],
  ["وبلاگ", "posts", "/admin/blog"],
  ["اخبار", "news", "/admin/news"],
  ["پیام‌های خوانده‌نشده", "messages", "/admin/messages"],
  ["کاربران", "users", "/admin/users"],
] as const;

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  return (
    <AdminShell
      title="پیشخوان"
      description="نمای کلی داده‌های واقعی پنل مدیریت"
    >
      <div className="grid gap-6">
        <AdminPageHeader
          title="پیشخوان مدیریت"
          description="نمای زنده آمار، روندها و وضعیت بخش‌های اصلی"
        />
        {total ? (
          <>
            <AdminDashboardCharts data={data} />
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
              {cards.map(([label, key, href]) => (
                <Link
                  className="rounded-2xl border border-border bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
                  href={href}
                  key={key}
                >
                  <p className="text-sm font-black text-muted">{label}</p>
                  <strong className="mt-4 block text-4xl font-black tabular-nums text-navy">
                    {new Intl.NumberFormat("fa-IR").format(data[key])}
                  </strong>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <AdminEmptyState
            title="هنوز داده‌ای در پنل ثبت نشده است"
            description="با ایجاد خدمت، قرارداد، مطلب یا دریافت درخواست، آمار واقعی این بخش تکمیل می‌شود."
          />
        )}
      </div>
    </AdminShell>
  );
}
