import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { deleteServiceAction, saveServiceAction } from "@/lib/admin-actions";
import { getAllServices } from "@/lib/cms";
import { serviceCategories } from "@/lib/service-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت خدمات",
};

function listValue(items?: string[]) {
  return (items ?? []).join("\n");
}

function faqValue(items?: { question: string; answer: string }[]) {
  return (items ?? [])
    .map((item) => `${item.question} | ${item.answer}`)
    .join("\n");
}

function ServiceFields({ service }: { service?: Awaited<ReturnType<typeof getAllServices>>[number] }) {
  return (
    <>
      <Input defaultValue={service?.title} label="عنوان خدمت" name="title" required />
      <div className="grid gap-4 md:grid-cols-4">
        <Input defaultValue={service?.slug} label="اسلاگ" name="slug" />
        <Input defaultValue={service?.icon ?? "scale"} label="آیکن" name="icon" placeholder="scale" />
        <Input defaultValue={service?.order} label="ترتیب" name="order" type="number" />
        <label className="grid gap-2 text-sm font-medium text-foreground">
          <span>وضعیت</span>
          <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={service?.status ?? "published"} name="status">
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        <span>دسته‌بندی</span>
        <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={service?.category ?? "همه خدمات"} name="category">
          {serviceCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <Textarea defaultValue={service?.excerpt} label="خلاصه کارت" name="excerpt" required />
      <Textarea defaultValue={service?.heroDescription} label="توضیح هیرو" name="heroDescription" />
      <Input defaultValue={service?.priceLabel} label="برچسب قیمت" name="priceLabel" />
      <Textarea defaultValue={listValue(service?.heroFeatures)} label="ویژگی‌های هیرو، هر خط یک مورد" name="heroFeatures" />
      <Textarea defaultValue={service?.content} label="محتوا" name="content" />
      <Textarea defaultValue={listValue(service?.benefits)} label="مزایا، هر خط یک مورد" name="benefits" />
      <Textarea defaultValue={listValue(service?.processSteps)} label="مراحل انجام کار، هر خط یک مورد" name="processSteps" />
      <Textarea defaultValue={listValue(service?.requiredDocuments)} label="مدارک مورد نیاز، هر خط یک مورد" name="requiredDocuments" />
      <Textarea defaultValue={faqValue(service?.faqItems)} label="سوالات متداول، فرمت هر خط: سوال | پاسخ" name="faqItems" />
    </>
  );
}

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <AdminShell title="مدیریت خدمات" description="افزودن، ویرایش و تکمیل اطلاعات خدمات حقوقی">
      <div className="grid gap-6">
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">افزودن خدمت</h2>
          <form action={saveServiceAction} className="grid gap-4">
            <ServiceFields />
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
                  <ServiceFields service={service} />
                  <Button type="submit">ذخیره تغییرات</Button>
                </form>
                <form action={deleteServiceAction} className="mt-3">
                  <input name="id" type="hidden" value={service.id} />
                  <Button type="submit" variant="outline">
                    حذف خدمت
                  </Button>
                </form>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
