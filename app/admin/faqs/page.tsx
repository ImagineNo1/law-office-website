import type { Metadata } from "next";
import {
  archiveFaqAction,
  deleteFaqAction,
  saveFaqAction,
} from "@/app/admin/faqs/actions";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import {
  AdminSubmitButton,
  CategoryField,
  OrderField,
} from "@/components/admin/AdminFormFields";
import { AdminModal } from "@/components/admin/AdminModal";
import {
  AdminDataTable,
  AdminEmptyState,
  AdminPageHeader,
  AdminStatusBadge,
} from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { SeoFields } from "@/components/admin/SeoFields";
import { getAdminFaqs } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت سوالات متداول" };
type FaqRow = Awaited<ReturnType<typeof getAdminFaqs>>[number];
const pageTypeLabels: Record<string, string> = {
  general: "عمومی",
  service: "خدمت",
  contract: "قرارداد",
  "legal-form": "فرم حقوقی",
};

function FaqForm({ categories, faq }: { categories: string[]; faq?: FaqRow }) {
  return (
    <form action={saveFaqAction} className="grid gap-4">
      <input name="id" type="hidden" value={faq?.id ?? ""} />
      <label className="grid gap-2 text-sm font-black text-navy">
        <span>سوال</span>
        <input
          className="service-input"
          defaultValue={faq?.question}
          name="question"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-black text-navy">
        <span>پاسخ</span>
        <textarea
          className="service-input min-h-28 py-3"
          defaultValue={faq?.answer}
          name="answer"
          required
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-navy">
          <span>نوع صفحه</span>
          <select
            className="service-input"
            defaultValue={faq?.pageType ?? "general"}
            name="pageType"
          >
            <option value="general">عمومی</option>
            <option value="service">خدمت</option>
            <option value="contract">قرارداد</option>
            <option value="legal-form">فرم حقوقی</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-navy">
          <span>آدرس صفحه مرتبط</span>
          <input
            className="service-input"
            defaultValue={faq?.pageSlug}
            name="pageSlug"
            placeholder="اختیاری؛ اگر خالی باشد عمومی است"
          />
          <span className="text-xs font-bold leading-6 text-muted">
            اگر سوال برای صفحه خاصی نیست، این بخش را خالی بگذارید.
          </span>
        </label>
        <CategoryField categories={categories} defaultValue={faq?.category} />
        <OrderField defaultValue={faq?.order} />
      </div>
      <label className="grid gap-2 text-sm font-black text-navy">
        <span>وضعیت</span>
        <select
          className="service-input"
          defaultValue={faq?.status ?? "published"}
          name="status"
        >
          <option value="published">منتشر شده</option>
          <option value="draft">پیش‌نویس</option>
          <option value="archived">آرشیو شده</option>
        </select>
      </label>
      <SeoFields seo={faq?.seo} title={String(faq?.question ?? "")} />
      <AdminSubmitButton />
    </form>
  );
}

function FaqPreview({ faq }: { faq: FaqRow }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
      <h3 className="text-lg font-black text-emerald-950">{faq.question}</h3>
      <p className="text-sm font-bold leading-8 text-emerald-900/80">
        {faq.answer}
      </p>
      <div className="flex flex-wrap gap-2 text-xs font-black text-emerald-700">
        <span>{pageTypeLabels[faq.pageType]}</span>
        <span>{faq.pageSlug || "عمومی"}</span>
        <span>{faq.category || "عمومی"}</span>
      </div>
    </div>
  );
}

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams?: Promise<{ pageType?: string; pageSlug?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const faqs = await getAdminFaqs(params);
  const categories = faqs.map((faq) => faq.category ?? "عمومی");
  return (
    <AdminShell title="سوالات متداول" description="مدیریت FAQ">
      <div className="grid gap-6">
        <AdminPageHeader
          title="سوالات متداول"
          action={
            <AdminModal buttonLabel="افزودن سوال" title="افزودن سوال">
              <FaqForm categories={categories} />
            </AdminModal>
          }
        />
        <form className="flex flex-wrap gap-3 rounded-2xl border border-border bg-white p-4 shadow-card">
          <select
            className="service-input max-w-48"
            defaultValue={params.pageType ?? ""}
            name="pageType"
          >
            <option value="">همه نوع‌ها</option>
            <option value="general">عمومی</option>
            <option value="service">خدمت</option>
            <option value="contract">قرارداد</option>
            <option value="legal-form">فرم حقوقی</option>
          </select>
          <input
            className="service-input max-w-64"
            defaultValue={params.pageSlug ?? ""}
            name="pageSlug"
            placeholder="اسلاگ صفحه"
          />
          <button className="rounded-xl bg-emerald-700 px-5 py-2 text-sm font-black text-white">
            فیلتر
          </button>
        </form>
        {faqs.length ? (
          <AdminDataTable
            headers={["سوال", "نوع", "اسلاگ", "وضعیت", "اولویت", "عملیات"]}
          >
            {faqs.map((faq) => (
              <tr className="border-t border-border" key={faq.id}>
                <td className="px-5 py-4 font-black text-navy">
                  {faq.question}
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {pageTypeLabels[faq.pageType]}
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {faq.pageSlug || "عمومی"}
                </td>
                <td className="px-5 py-4">
                  <AdminStatusBadge status={faq.status} />
                </td>
                <td className="px-5 py-4 font-bold text-muted">{faq.order}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <AdminModal buttonLabel="مشاهده" title="مشاهده سوال">
                      <FaqPreview faq={faq} />
                    </AdminModal>
                    <AdminModal buttonLabel="ویرایش" title="ویرایش سوال">
                      <FaqForm categories={categories} faq={faq} />
                    </AdminModal>
                    <AdminConfirmDialog
                      buttonLabel="آرشیو"
                      action={
                        <form action={archiveFaqAction}>
                          <input name="id" type="hidden" value={faq.id} />
                          <button className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-black text-white">
                            آرشیو
                          </button>
                        </form>
                      }
                    />
                    <AdminConfirmDialog
                      action={
                        <form action={deleteFaqAction}>
                          <input name="id" type="hidden" value={faq.id} />
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
            title="سوالی ثبت نشده است"
            description="با دکمه افزودن سوال اولین FAQ را ایجاد کنید."
          />
        )}
      </div>
    </AdminShell>
  );
}
