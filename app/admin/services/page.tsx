import type { Metadata } from "next";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDataTable, AdminEmptyState, AdminPageHeader, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { archiveServiceAction, deleteServiceAction, saveServiceAction } from "@/lib/admin-actions";
import { getAdminServices } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت خدمات" };

type ServiceRow = Awaited<ReturnType<typeof getAdminServices>>[number];

function lines(items?: string[]) {
  return (items ?? []).join("\n");
}

function faqLines(items?: { question: string; answer: string }[]) {
  return (items ?? []).map((item) => `${item.question} | ${item.answer}`).join("\n");
}

function TextInput({ defaultValue, label, name, required = false, type = "text" }: { defaultValue?: string | number; label: string; name: string; required?: boolean; type?: string }) {
  return <label className="grid gap-2 text-sm font-black text-navy"><span>{label}</span><input className="service-input" defaultValue={defaultValue} name={name} required={required} type={type} /></label>;
}

function TextArea({ defaultValue, label, name, required = false }: { defaultValue?: string; label: string; name: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-black text-navy"><span>{label}</span><textarea className="service-input min-h-28 py-3" defaultValue={defaultValue} name={name} required={required} /></label>;
}

function ServiceForm({ service }: { service?: ServiceRow }) {
  return (
    <form action={saveServiceAction} className="grid gap-4">
      <input name="id" type="hidden" value={service?.id ?? ""} />
      <TextInput defaultValue={service?.title} label="عنوان" name="title" required />
      <div className="grid gap-4 md:grid-cols-3">
        <TextInput defaultValue={service?.slug} label="اسلاگ" name="slug" />
        <TextInput defaultValue={service?.order} label="ترتیب" name="order" type="number" />
        <label className="grid gap-2 text-sm font-black text-navy"><span>وضعیت</span><select className="service-input" defaultValue={service?.status ?? "draft"} name="status"><option value="published">منتشر شده</option><option value="draft">پیش‌نویس</option></select></label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <TextInput defaultValue={service?.category} label="دسته‌بندی" name="category" />
        <TextInput defaultValue={service?.icon} label="آیکن" name="icon" />
        <TextInput defaultValue={service?.priceLabel} label="برچسب قیمت" name="priceLabel" />
      </div>
      <TextArea defaultValue={service?.excerpt} label="خلاصه" name="excerpt" required />
      <TextArea defaultValue={service?.content} label="محتوا" name="content" />
      <TextArea defaultValue={service?.heroDescription} label="توضیح هیرو" name="heroDescription" />
      <TextArea defaultValue={lines(service?.benefits)} label="مزایا؛ هر خط یک مورد" name="benefits" />
      <TextArea defaultValue={lines(service?.processSteps)} label="مراحل انجام؛ هر خط یک مورد" name="processSteps" />
      <TextArea defaultValue={lines(service?.requiredDocuments)} label="مدارک مورد نیاز؛ هر خط یک مورد" name="requiredDocuments" />
      <TextArea defaultValue={lines(service?.heroFeatures)} label="ویژگی‌های هیرو؛ هر خط یک مورد" name="heroFeatures" />
      <TextArea defaultValue={faqLines(service?.faqItems)} label="سوالات متداول؛ سوال | پاسخ" name="faqItems" />
      <button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ذخیره</button>
    </form>
  );
}

export default async function AdminServicesPage() {
  const services = await getAdminServices();

  return (
    <AdminShell title="خدمات" description="مدیریت خدمات حقوقی سایت">
      <div className="grid gap-6">
        <AdminPageHeader title="خدمات" description="خدمات را از پایگاه داده مدیریت کنید؛ اگر رکوردی وجود نداشته باشد، داده نمایشی نمایش داده نمی‌شود." action={<AdminModal buttonLabel="افزودن خدمت" title="افزودن خدمت"><ServiceForm /></AdminModal>} />
        {services.length ? (
          <AdminDataTable headers={["عنوان", "دسته", "وضعیت", "ترتیب", "به‌روزرسانی", "عملیات"]}>
            {services.map((service) => (
              <tr className="border-t border-border" key={service.id}>
                <td className="px-5 py-4 font-black text-navy">{service.title}</td>
                <td className="px-5 py-4 font-bold text-muted">{service.category}</td>
                <td className="px-5 py-4"><AdminStatusBadge status={service.status} /></td>
                <td className="px-5 py-4 font-bold text-muted">{service.order}</td>
                <td className="px-5 py-4 font-bold text-muted">{service.updatedAtText}</td>
                <td className="px-5 py-4"><div className="flex flex-wrap gap-2"><AdminModal buttonLabel="ویرایش" title={`ویرایش ${service.title}`}><ServiceForm service={service} /></AdminModal><AdminConfirmDialog buttonLabel="آرشیو" action={<form action={archiveServiceAction}><input name="id" type="hidden" value={service.id} /><button className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-black text-white">آرشیو</button></form>} /><AdminConfirmDialog action={<form action={deleteServiceAction}><input name="id" type="hidden" value={service.id} /><button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">حذف</button></form>} /></div></td>
              </tr>
            ))}
          </AdminDataTable>
        ) : <AdminEmptyState title="هنوز خدمتی ثبت نشده است" description="اولین خدمت حقوقی را با دکمه افزودن خدمت ایجاد کنید." />}
      </div>
    </AdminShell>
  );
}
