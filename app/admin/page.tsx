import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { adminRows } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "داشبورد مدیریت",
};

export default function AdminDashboardPage() {
  const stats = [
    { label: "تعداد مقالات", value: "۲۴" },
    { label: "تعداد اخبار", value: "۱۲" },
    { label: "پیام های دریافتی", value: "۸" },
    { label: "بازدیدهای امروز", value: "۵۶" },
  ];

  return (
    <AdminShell title="داشبورد" description="نمای کلی محتوا، پیام ها و وضعیت سایت">
      <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="p-5">
          <h2 className="mb-4 text-xl font-black text-foreground">محتوای اخیر</h2>
          <AdminTable rows={adminRows} />
        </Card>
        <Card className="p-5">
          <h2 className="text-xl font-black text-foreground">دسترسی سریع</h2>
          <div className="mt-5 grid gap-3">
            <Button href="/admin/blog" variant="outline">افزودن مقاله جدید</Button>
            <Button href="/admin/news" variant="outline">افزودن خبر جدید</Button>
            <Button href="/admin/messages" variant="outline">مشاهده پیام ها</Button>
            <Button href="/admin/settings" variant="outline">تنظیمات سایت</Button>
          </div>
        </Card>
      </div>
      </div>
    </AdminShell>
  );
}
