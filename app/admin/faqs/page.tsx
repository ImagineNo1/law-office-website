import type { Metadata } from "next";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { archiveFaqAction, deleteFaqAction, saveFaqAction } from "@/app/admin/faqs/actions";
import { connectDb } from "@/lib/db";
import { getPlatformFaqs } from "@/lib/platform-db";
import { FAQ } from "@/models/FAQ";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت سوالات متداول" };

type AdminFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  pageType: "general" | "service" | "contract" | "legal-form";
  pageSlug: string;
  status: "draft" | "published" | "archived";
  order: number;
};

async function getAdminFaqs(): Promise<AdminFaq[]> {
  if (!process.env.MONGODB_URI) {
    const faqs = await getPlatformFaqs();
    return faqs.map((faq, index) => ({ ...faq, status: "published", order: index + 1 }));
  }
  await connectDb();
  const docs = await FAQ.find().sort({ pageType: 1, order: 1, createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    question: String(doc.question),
    answer: String(doc.answer),
    category: String(doc.category || "عمومی"),
    pageType: doc.pageType,
    pageSlug: String(doc.pageSlug || ""),
    status: doc.status,
    order: Number(doc.order || 0),
  }));
}

function Fields({ faq }: { faq?: AdminFaq }) {
  return (
    <>
      <input name="id" type="hidden" value={faq?.id ?? ""} />
      <div className="grid gap-3 md:grid-cols-4">
        <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold md:col-span-2" defaultValue={faq?.question} name="question" placeholder="سوال" required />
        <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" defaultValue={faq?.category} name="category" placeholder="دسته" />
        <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" defaultValue={faq?.order ?? 0} name="order" type="number" />
      </div>
      <textarea className="min-h-24 rounded-xl border border-slate-200 p-4 text-sm font-bold" defaultValue={faq?.answer} name="answer" placeholder="پاسخ" required />
      <div className="grid gap-3 md:grid-cols-3">
        <select className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" defaultValue={faq?.pageType ?? "general"} name="pageType">
          <option value="general">عمومی</option>
          <option value="service">خدمت</option>
          <option value="contract">قرارداد</option>
          <option value="legal-form">فرم حقوقی</option>
        </select>
        <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" defaultValue={faq?.pageSlug} name="pageSlug" placeholder="page slug" />
        <select className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" defaultValue={faq?.status ?? "published"} name="status">
          <option value="published">منتشر شده</option>
          <option value="draft">پیش نویس</option>
          <option value="archived">آرشیو شده</option>
        </select>
      </div>
    </>
  );
}

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams?: Promise<{ pageType?: string; pageSlug?: string }>;
}) {
  const params = await searchParams;
  const allFaqs = await getAdminFaqs();
  const faqs = allFaqs.filter((faq) => {
    if (params?.pageType && faq.pageType !== params.pageType) return false;
    if (params?.pageSlug && faq.pageSlug !== params.pageSlug) return false;
    return true;
  });
  return (
    <AdminCrmShell>
      <h1 className="text-3xl font-black">مدیریت سوالات متداول</h1>
      <form className="mt-6 flex flex-wrap gap-3 rounded-2xl bg-white p-4 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
        <select className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" defaultValue={params?.pageType ?? ""} name="pageType">
          <option value="">همه pageType ها</option>
          <option value="general">عمومی</option>
          <option value="service">خدمت</option>
          <option value="contract">قرارداد</option>
          <option value="legal-form">فرم حقوقی</option>
        </select>
        <input className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold" defaultValue={params?.pageSlug ?? ""} name="pageSlug" placeholder="pageSlug" />
        <button className="h-11 rounded-xl bg-[#0B172A] px-5 text-sm font-black text-white">فیلتر</button>
      </form>
      <div className="mt-6 grid gap-6">
        <section className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
          <h2 className="mb-4 text-xl font-black">افزودن سوال</h2>
          <form action={saveFaqAction} className="grid gap-4">
            <Fields />
            <button className="h-11 rounded-xl bg-[#0B172A] px-5 text-sm font-black text-white">ذخیره سوال</button>
          </form>
        </section>
        <section className="grid gap-4">
          {faqs.length ? faqs.map((faq) => (
            <details className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={faq.id}>
              <summary className="cursor-pointer font-black">{faq.question} <span className="text-xs text-[#66758A]">({faq.pageType}/{faq.status})</span></summary>
              <form action={saveFaqAction} className="mt-4 grid gap-4"><Fields faq={faq} /><button className="h-11 rounded-xl bg-[#C9973F] px-5 text-sm font-black text-white">ذخیره تغییرات</button></form>
              <div className="mt-3 flex gap-2">
                <form action={archiveFaqAction}><input name="id" type="hidden" value={faq.id} /><button className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-black">آرشیو</button></form>
                <form action={deleteFaqAction}><input name="id" type="hidden" value={faq.id} /><button className="h-10 rounded-xl border border-red-200 px-4 text-sm font-black text-red-600">حذف</button></form>
              </div>
            </details>
          )) : <section className="rounded-2xl bg-white p-8 text-center shadow-[0_18px_45px_rgba(11,23,42,.06)]"><h2 className="text-xl font-black">سوالی ثبت نشده است</h2><p className="mt-2 text-sm font-bold text-[#66758A]">از فرم بالا اولین FAQ را ایجاد کنید.</p></section>}
        </section>
      </div>
    </AdminCrmShell>
  );
}
