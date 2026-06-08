import type { Metadata } from "next";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import {
  AdminSubmitButton,
  CategoryField,
  OrderField,
  SlugField,
  UploadField,
} from "@/components/admin/AdminFormFields";
import { AdminModal } from "@/components/admin/AdminModal";
import { PriceInput } from "@/components/admin/PriceInput";
import {
  AdminDataTable,
  AdminEmptyState,
  AdminPageHeader,
  AdminStatusBadge,
} from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { SeoFields } from "@/components/admin/SeoFields";
import {
  archiveServiceAction,
  deleteServiceAction,
  saveServiceAction,
} from "@/lib/admin-actions";
import { getAdminServices } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت خدمات" };

type ServiceRow = Awaited<ReturnType<typeof getAdminServices>>[number];

function lines(items?: string[]) {
  return (items ?? []).join("\n");
}

function faqLines(items?: { question: string; answer: string }[]) {
  return (items ?? [])
    .map((item) => `${item.question} | ${item.answer}`)
    .join("\n");
}

function TextInput({
  defaultValue,
  label,
  name,
  required = false,
  type = "text",
}: {
  defaultValue?: string | number;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>{label}</span>
      <input
        className="service-input"
        defaultValue={defaultValue}
        name={name}
        required={required}
        type={type}
      />
    </label>
  );
}

function TextArea({
  defaultValue,
  label,
  name,
  required = false,
}: {
  defaultValue?: string;
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>{label}</span>
      <textarea
        className="service-input min-h-28 py-3"
        defaultValue={defaultValue}
        name={name}
        required={required}
      />
    </label>
  );
}

function ServiceForm({
  categories,
  service,
}: {
  categories: string[];
  service?: ServiceRow;
}) {
  return (
    <form action={saveServiceAction} className="grid gap-4">
      <input name="id" type="hidden" value={service?.id ?? ""} />
      <TextInput
        defaultValue={service?.title}
        label="عنوان"
        name="title"
        required
      />
      <div className="grid gap-4 md:grid-cols-3">
        <SlugField defaultValue={service?.slug} />
        <OrderField defaultValue={service?.order} />
        <label className="grid gap-2 text-sm font-black text-navy">
          <span>وضعیت</span>
          <select
            className="service-input"
            defaultValue={service?.status ?? "draft"}
            name="status"
          >
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <CategoryField
          categories={categories}
          defaultValue={service?.category}
        />
        <UploadField
          defaultValue={service?.icon}
          fileName="iconFile"
          label="آیکن / تصویر کوچک"
          name="icon"
        />
        <PriceInput
          defaultValue={service?.priceLabel}
          label="برچسب قیمت"
          name="priceLabel"
        />
      </div>
      <TextArea
        defaultValue={service?.excerpt}
        label="خلاصه"
        name="excerpt"
        required
      />
      <TextArea defaultValue={service?.content} label="محتوا" name="content" />
      <TextArea
        defaultValue={service?.heroDescription}
        label="توضیح هیرو"
        name="heroDescription"
      />
      <TextArea
        defaultValue={lines(service?.benefits)}
        label="مزایا؛ هر خط یک مورد"
        name="benefits"
      />
      <TextArea
        defaultValue={lines(service?.processSteps)}
        label="مراحل انجام؛ هر خط یک مورد"
        name="processSteps"
      />
      <TextArea
        defaultValue={lines(service?.requiredDocuments)}
        label="مدارک مورد نیاز؛ هر خط یک مورد"
        name="requiredDocuments"
      />
      <TextArea
        defaultValue={lines(service?.heroFeatures)}
        label="ویژگی‌های هیرو؛ هر خط یک مورد"
        name="heroFeatures"
      />
      <TextArea
        defaultValue={faqLines(service?.faqItems)}
        label="سوالات متداول؛ سوال | پاسخ"
        name="faqItems"
      />
      <SeoFields seo={service?.seo} title={String(service?.title ?? "")} />
      <AdminSubmitButton />
    </form>
  );
}

export default async function AdminServicesPage() {
  const services = await getAdminServices();
  const categories = services.map((service) => service.category ?? "همه خدمات");

  return (
    <AdminShell title="خدمات" description="مدیریت خدمات حقوقی سایت">
      <div className="grid gap-6">
        <AdminPageHeader
          title="خدمات"
          action={
            <AdminModal buttonLabel="افزودن خدمت" title="افزودن خدمت">
              <ServiceForm categories={categories} />
            </AdminModal>
          }
        />
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-8 text-emerald-900">
          برای نمایش بهتر در گوگل، بخش تنظیمات سئو را در صورت نیاز باز و کامل
          کنید.
        </div>
        {services.length ? (
          <AdminDataTable
            headers={[
              "عنوان",
              "دسته",
              "وضعیت",
              "اولویت",
              "به‌روزرسانی",
              "عملیات",
            ]}
          >
            {services.map((service) => (
              <tr className="border-t border-border" key={service.id}>
                <td className="px-5 py-4 font-black text-navy">
                  {service.title}
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {service.category}
                </td>
                <td className="px-5 py-4">
                  <AdminStatusBadge status={service.status} />
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {service.order}
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {service.updatedAtText}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <AdminModal
                      buttonLabel="ویرایش"
                      title={`ویرایش ${service.title}`}
                    >
                      <ServiceForm categories={categories} service={service} />
                    </AdminModal>
                    <AdminConfirmDialog
                      buttonLabel="آرشیو"
                      action={
                        <form action={archiveServiceAction}>
                          <input name="id" type="hidden" value={service.id} />
                          <button className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white">
                            آرشیو
                          </button>
                        </form>
                      }
                    />
                    <AdminConfirmDialog
                      action={
                        <form action={deleteServiceAction}>
                          <input name="id" type="hidden" value={service.id} />
                          <button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">
                            حذف
                          </button>
                        </form>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </AdminDataTable>
        ) : (
          <AdminEmptyState
            title="هنوز خدمتی ثبت نشده است"
            description="اولین خدمت را از دکمه افزودن خدمت ایجاد کنید."
          />
        )}
      </div>
    </AdminShell>
  );
}
