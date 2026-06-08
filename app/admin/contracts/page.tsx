import type { Metadata } from "next";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDataTable, AdminEmptyState, AdminPageHeader, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { SeoFields } from "@/components/admin/SeoFields";
import { archiveContractAction, deleteContractAction, saveContractAction } from "@/lib/admin-actions";
import { getAdminContracts } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت قراردادها" };

type ContractRow = Awaited<ReturnType<typeof getAdminContracts>>[number];
const lines = (items?: string[]) => (items ?? []).join("\n");
const faqLines = (items?: { question: string; answer: string }[]) => (items ?? []).map((item) => `${item.question} | ${item.answer}`).join("\n");

function Input({ defaultValue, label, name, required = false, type = "text" }: { defaultValue?: string | number; label: string; name: string; required?: boolean; type?: string }) {
  return <label className="grid gap-2 text-sm font-black text-navy"><span>{label}</span><input className="service-input" defaultValue={defaultValue} name={name} required={required} type={type} /></label>;
}
function Area({ defaultValue, label, name, required = false }: { defaultValue?: string; label: string; name: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-black text-navy"><span>{label}</span><textarea className="service-input min-h-28 py-3" defaultValue={defaultValue} name={name} required={required} /></label>;
}
function ContractForm({ contract }: { contract?: ContractRow }) {
  return <form action={saveContractAction} className="grid gap-4"><input name="id" type="hidden" value={contract?.id ?? ""} /><Input defaultValue={contract?.title} label="عنوان" name="title" required /><div className="grid gap-4 md:grid-cols-3"><Input defaultValue={contract?.slug} label="اسلاگ" name="slug" /><Input defaultValue={contract?.category} label="دسته‌بندی" name="category" required /><Input defaultValue={contract?.order} label="ترتیب" name="order" type="number" /></div><div className="grid gap-4 md:grid-cols-3"><Input defaultValue={contract?.priceLabel} label="قیمت" name="priceLabel" /><Input defaultValue={contract?.sampleFileUrl} label="فایل نمونه" name="sampleFileUrl" /><label className="grid gap-2 text-sm font-black text-navy"><span>وضعیت</span><select className="service-input" defaultValue={contract?.status ?? "draft"} name="status"><option value="published">منتشر شده</option><option value="draft">پیش‌نویس</option></select></label></div><Area defaultValue={contract?.excerpt} label="خلاصه" name="excerpt" required /><Area defaultValue={contract?.content} label="محتوا" name="content" /><Area defaultValue={lines(contract?.benefits)} label="مزایا؛ هر خط یک مورد" name="benefits" /><Area defaultValue={lines(contract?.useCases)} label="موارد کاربرد؛ هر خط یک مورد" name="useCases" /><Area defaultValue={lines(contract?.requiredDocuments)} label="مدارک مورد نیاز؛ هر خط یک مورد" name="requiredDocuments" /><Area defaultValue={faqLines(contract?.faqItems)} label="سوالات متداول؛ سوال | پاسخ" name="faqItems" /><SeoFields seo={contract?.seo} title={String(contract?.title ?? "")} /><button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ذخیره</button></form>;
}

export default async function AdminContractsPage() {
  const contracts = await getAdminContracts();
  return <AdminShell title="قراردادها" description="مدیریت بانک قراردادها"><div className="grid gap-6"><AdminPageHeader title="قراردادها" description="مدیریت قراردادهای ثبت‌شده و قابل انتشار در سایت." action={<AdminModal buttonLabel="افزودن قرارداد" title="افزودن قرارداد"><ContractForm /></AdminModal>} />{contracts.length ? <AdminDataTable headers={["عنوان", "دسته", "وضعیت", "قیمت", "به‌روزرسانی", "عملیات"]}>{contracts.map((contract) => <tr className="border-t border-border" key={contract.id}><td className="px-5 py-4 font-black text-navy">{contract.title}</td><td className="px-5 py-4 font-bold text-muted">{contract.category}</td><td className="px-5 py-4"><AdminStatusBadge status={contract.status} /></td><td className="px-5 py-4 font-bold text-muted">{contract.priceLabel || "ثبت نشده"}</td><td className="px-5 py-4 font-bold text-muted">{contract.updatedAtText}</td><td className="px-5 py-4"><div className="flex flex-wrap gap-2"><AdminModal buttonLabel="ویرایش" title={`ویرایش ${contract.title}`}><ContractForm contract={contract} /></AdminModal><AdminConfirmDialog buttonLabel="آرشیو" action={<form action={archiveContractAction}><input name="id" type="hidden" value={contract.id} /><button className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-black text-white">آرشیو</button></form>} /><AdminConfirmDialog action={<form action={deleteContractAction}><input name="id" type="hidden" value={contract.id} /><button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">حذف</button></form>} /></div></td></tr>)}</AdminDataTable> : <AdminEmptyState title="هنوز قراردادی ثبت نشده است" description="اولین قرارداد را از دکمه افزودن قرارداد ایجاد کنید." />}</div></AdminShell>;
}
