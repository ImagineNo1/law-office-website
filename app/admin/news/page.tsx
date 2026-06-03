import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { deleteNewsAction, saveNewsAction } from "@/lib/admin-actions";
import { getAllNews } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت اخبار",
};

export default async function AdminNewsPage() {
  const newsItems = await getAllNews();

  return (
    <AdminShell title="مدیریت اخبار" description="افزودن، ویرایش و حذف خبرهای موسسه">
      <div className="grid gap-6">
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">افزودن خبر</h2>
          <form action={saveNewsAction} className="grid gap-4">
            <Input label="عنوان خبر" name="title" required />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="اسلاگ" name="slug" />
              <label className="grid gap-2 text-sm font-medium text-foreground">
                <span>وضعیت</span>
                <select className="h-11 rounded-xl border border-border bg-background px-3" name="status">
                  <option value="published">منتشر شده</option>
                  <option value="draft">پیش نویس</option>
                </select>
              </label>
            </div>
            <Input label="تصویر کاور" name="coverImage" />
            <Textarea label="خلاصه" name="excerpt" required />
            <Textarea label="محتوا" name="content" required />
            <Button type="submit">ذخیره خبر</Button>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">فهرست خبرها</h2>
          <div className="grid gap-4">
            {newsItems.map((item) => (
              <details className="rounded-2xl border border-border bg-surface p-4" key={item.id}>
                <summary className="cursor-pointer font-black text-foreground">
                  {item.title} <span className="text-sm text-muted">({item.status})</span>
                </summary>
                <form action={saveNewsAction} className="mt-4 grid gap-4">
                  <input name="id" type="hidden" value={item.id} />
                  <Input defaultValue={item.title} label="عنوان" name="title" required />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input defaultValue={item.slug} label="اسلاگ" name="slug" />
                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      <span>وضعیت</span>
                      <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={item.status} name="status">
                        <option value="published">منتشر شده</option>
                        <option value="draft">پیش نویس</option>
                      </select>
                    </label>
                  </div>
                  <Input defaultValue={item.coverImage} label="تصویر کاور" name="coverImage" />
                  <Textarea defaultValue={item.excerpt} label="خلاصه" name="excerpt" required />
                  <Textarea defaultValue={item.content} label="محتوا" name="content" required />
                  <Button type="submit">ذخیره تغییرات</Button>
                </form>
                <form action={deleteNewsAction} className="mt-3">
                  <input name="id" type="hidden" value={item.id} />
                  <Button type="submit" variant="outline">حذف خبر</Button>
                </form>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
