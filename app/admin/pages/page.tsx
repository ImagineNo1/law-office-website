import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "مدیریت صفحات",
};

export default function AdminPagesPage() {
  const pages = ["معرفی موسسه", "درباره ما", "ارتباط با ما", "بنر صفحه اصلی"];

  return (
    <AdminShell title="مدیریت صفحات" description="مدیریت متن بخش های ثابت سایت">
      <div className="grid gap-4 md:grid-cols-2">
      {pages.map((page) => (
        <Card className="p-5" key={page}>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-black text-foreground">{page}</h1>
            <Badge>فعال</Badge>
          </div>
          <p className="mt-4 leading-8 text-muted">ویرایش عنوان، زیرعنوان، متن اصلی و اطلاعات تکمیلی این بخش از سایت.</p>
          <button className="mt-5 rounded-lg border border-gold/35 px-4 py-2 text-sm font-bold text-gold">ویرایش محتوا</button>
        </Card>
      ))}
      </div>
    </AdminShell>
  );
}
