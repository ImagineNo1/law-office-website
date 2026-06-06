import type { Metadata } from "next";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { getPlatformLegalForms } from "@/lib/platform-db";
import { connectDb } from "@/lib/db";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { archiveLegalFormAction, deleteLegalFormAction, saveLegalFormAction } from "@/app/admin/legal-forms/actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت فرم های حقوقی" };

type AdminForm = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  fields: string[];
  usageCount: number;
  status: "draft" | "published" | "archived";
};

async function getAdminLegalForms(): Promise<AdminForm[]> {
  if (!process.env.MONGODB_URI) {
    const forms = await getPlatformLegalForms();
    return forms.map((form) => ({ ...form, fields: Array.from({ length: form.fields }, (_, index) => `field-${index + 1}`), usageCount: form.usage, status: "published" }));
  }
  await connectDb();
  const docs = await LegalFormTemplate.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    title: String(doc.title),
    slug: String(doc.slug),
    category: String(doc.category),
    description: String(doc.description || ""),
    fields: doc.fields ?? [],
    usageCount: Number(doc.usageCount || 0),
    status: doc.status,
  }));
}

function Fields({ form }: { form?: AdminForm }) {
  return (
    <>
      <input name="id" type="hidden" value={form?.id ?? ""} />
      <div className="grid gap-3 md:grid-cols-3">
        <input className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold" defaultValue={form?.title} name="title" placeholder="عنوان فرم" required />
        <input className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold" defaultValue={form?.slug} name="slug" placeholder="slug" required />
        <input className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold" defaultValue={form?.category} name="category" placeholder="دسته بندی" required />
      </div>
      <textarea className="min-h-24 rounded-xl border border-[#eadfce] p-4 text-sm font-bold" defaultValue={form?.description} name="description" placeholder="توضیحات" />
      <textarea className="min-h-24 rounded-xl border border-[#eadfce] p-4 text-sm font-bold" defaultValue={form?.fields.join("\n")} name="fields" placeholder="فیلدها، هر خط یک مورد" />
      <div className="grid gap-3 md:grid-cols-2">
        <input className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold" defaultValue={form?.usageCount ?? 0} name="usageCount" placeholder="تعداد استفاده" type="number" />
        <select className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold" defaultValue={form?.status ?? "published"} name="status">
          <option value="published">منتشر شده</option>
          <option value="draft">پیش نویس</option>
          <option value="archived">آرشیو شده</option>
        </select>
      </div>
    </>
  );
}

export default async function AdminLegalFormsPage() {
  const forms = await getAdminLegalForms();
  return (
    <AdminCrmShell>
      <h1 className="text-3xl font-black">مدیریت فرم های حقوقی</h1>
      <div className="mt-6 grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["کل فرم ها", forms.length],
            ["منتشر شده", forms.filter((form) => form.status === "published").length],
            ["آرشیو شده", forms.filter((form) => form.status === "archived").length],
          ].map(([label, value]) => (
            <section className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={String(label)}>
              <p className="text-sm font-black text-[#66758A]">{label}</p>
              <strong className="mt-3 block text-3xl font-black">{value}</strong>
            </section>
          ))}
        </div>
        <section className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
          <h2 className="mb-4 text-xl font-black">افزودن فرم</h2>
          <form action={saveLegalFormAction} className="grid gap-4">
            <Fields />
            <button className="h-11 rounded-xl bg-[#0B172A] px-5 text-sm font-black text-white">ذخیره فرم</button>
          </form>
        </section>
        <section className="grid gap-4">
          {forms.length ? forms.map((form) => (
            <details className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={form.id}>
              <summary className="cursor-pointer font-black">{form.title} <span className="text-xs text-[#66758A]">({form.status})</span></summary>
              <form action={saveLegalFormAction} className="mt-4 grid gap-4">
                <Fields form={form} />
                <button className="h-11 rounded-xl bg-[#C9973F] px-5 text-sm font-black text-white">ذخیره تغییرات</button>
              </form>
              <div className="mt-3 flex gap-2">
                <form action={archiveLegalFormAction}><input name="id" type="hidden" value={form.id} /><button className="h-10 rounded-xl border border-[#eadfce] px-4 text-sm font-black">آرشیو</button></form>
                <form action={deleteLegalFormAction}><input name="id" type="hidden" value={form.id} /><button className="h-10 rounded-xl border border-red-200 px-4 text-sm font-black text-red-600">حذف</button></form>
              </div>
            </details>
          )) : <section className="rounded-2xl bg-white p-8 text-center shadow-[0_18px_45px_rgba(11,23,42,.06)]"><h2 className="text-xl font-black">فرمی ثبت نشده است</h2><p className="mt-2 text-sm font-bold text-[#66758A]">از فرم بالا اولین قالب حقوقی را ایجاد کنید.</p></section>}
        </section>
      </div>
    </AdminCrmShell>
  );
}
