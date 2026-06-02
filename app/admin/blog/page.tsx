import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { adminRows } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "مدیریت وبلاگ",
};

export default function AdminBlogPage() {
  return (
    <AdminShell title="مدیریت وبلاگ" description="افزودن، ویرایش و انتشار مقاله ها">
      <div className="grid gap-6">
      <Card className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-black text-foreground">اخبار و مقالات</h1>
          <Button>افزودن جدید</Button>
        </div>
        <AdminTable rows={adminRows} />
      </Card>
      <Card className="p-5">
        <h2 className="mb-5 text-xl font-black text-foreground">افزودن / ویرایش مقاله</h2>
        <form className="grid gap-4">
          <Input label="عنوان مقاله" />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="دسته بندی" />
            <Input label="وضعیت" placeholder="منتشر شده یا پیش نویس" />
          </div>
          <Textarea label="محتوا" />
          <div className="flex flex-wrap gap-3">
            <Button type="submit">انتشار مقاله</Button>
            <Button variant="outline">ذخیره پیش نویس</Button>
          </div>
        </form>
      </Card>
      </div>
    </AdminShell>
  );
}
