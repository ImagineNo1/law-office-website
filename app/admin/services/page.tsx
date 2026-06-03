import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { deleteServiceAction, saveServiceAction } from "@/lib/admin-actions";
import { getAllServices } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت خدمات",
};

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <AdminShell title="مدیریت خدمات" description="افزودن، ویرایش، حذف و مرتب سازی خدمات حقوقی">
      <div className="grid gap-6">
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">افزودن خدمت</h2>
          <form action={saveServiceAction} className="grid gap-4">
            <Input label="عنوان خدمت" name="title" required />
            <div className="grid gap-4 md:grid-cols-4">
              <Input label="اسلاگ" name="slug" />
              <Input label="آیکن" name="icon" placeholder="scale" />
              <Input label="ترتیب" name="order" type="number" />
              <label className="grid gap-2 text-sm font-medium text-foreground">
                <span>وضعیت</span>
                <select className="h-11 rounded-xl border border-border bg-background px-3" name="status">
                  <option value="published">منتشر شده</option>
                  <option value="draft">پیش نویس</option>
                </select>
              </label>
            </div>
            <Textarea label="خلاصه" name="excerpt" required />
            <Textarea label="محتوا" name="content" />
            <Button type="submit">ذخیره خدمت</Button>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">فهرست خدمات</h2>
          <div className="grid gap-4">
            {services.map((service) => (
              <details className="rounded-2xl border border-border bg-surface p-4" key={service.id}>
                <summary className="cursor-pointer font-black text-foreground">
                  {service.order}. {service.title} <span className="text-sm text-muted">({service.status})</span>
                </summary>
                <form action={saveServiceAction} className="mt-4 grid gap-4">
                  <input name="id" type="hidden" value={service.id} />
                  <Input defaultValue={service.title} label="عنوان" name="title" required />
                  <div className="grid gap-4 md:grid-cols-4">
                    <Input defaultValue={service.slug} label="اسلاگ" name="slug" />
                    <Input defaultValue={service.icon} label="آیکن" name="icon" />
                    <Input defaultValue={service.order} label="ترتیب" name="order" type="number" />
                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      <span>وضعیت</span>
                      <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={service.status} name="status">
                        <option value="published">منتشر شده</option>
                        <option value="draft">پیش نویس</option>
                      </select>
                    </label>
                  </div>
                  <Textarea defaultValue={service.excerpt} label="خلاصه" name="excerpt" required />
                  <Textarea defaultValue={service.content} label="محتوا" name="content" />
                  <Button type="submit">ذخیره تغییرات</Button>
                </form>
                <form action={deleteServiceAction} className="mt-3">
                  <input name="id" type="hidden" value={service.id} />
                  <Button type="submit" variant="outline">حذف خدمت</Button>
                </form>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
