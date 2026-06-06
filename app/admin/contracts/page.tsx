import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { deleteContractAction, saveContractAction } from "@/lib/admin-actions";
import { contractCategories } from "@/lib/contract-data";
import { getAllContracts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت قراردادها",
};

function listValue(items?: string[]) {
  return (items ?? []).join("\n");
}

function faqValue(items?: { question: string; answer: string }[]) {
  return (items ?? []).map((item) => `${item.question} | ${item.answer}`).join("\n");
}

function ContractFields({ contract }: { contract?: Awaited<ReturnType<typeof getAllContracts>>[number] }) {
  return (
    <>
      <Input defaultValue={contract?.title} label="عنوان قرارداد" name="title" required />
      <div className="grid gap-4 md:grid-cols-4">
        <Input defaultValue={contract?.slug} label="اسلاگ" name="slug" />
        <Input defaultValue={contract?.order} label="ترتیب" name="order" type="number" />
        <Input defaultValue={contract?.priceLabel} label="قیمت" name="priceLabel" placeholder="۱,۹۰۰,۰۰۰ تومان" />
        <label className="grid gap-2 text-sm font-medium text-foreground">
          <span>وضعیت</span>
          <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={contract?.status ?? "published"} name="status">
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        <span>دسته‌بندی</span>
        <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={contract?.category ?? "ملکی"} name="category">
          {contractCategories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <Textarea defaultValue={contract?.excerpt} label="خلاصه کارت" name="excerpt" required />
      <Textarea defaultValue={contract?.content} label="محتوای معرفی" name="content" />
      <div className="grid gap-4 md:grid-cols-2">
        <Input defaultValue={contract?.heroImage} label="آدرس تصویر" name="heroImage" placeholder="/contracts/sample.jpg" />
        <Input defaultValue={contract?.sampleFileUrl} label="آدرس فایل نمونه" name="sampleFileUrl" placeholder="/samples/sample.pdf" />
      </div>
      <Textarea defaultValue={listValue(contract?.useCases)} label="موارد کاربرد، هر خط یک مورد" name="useCases" />
      <Textarea defaultValue={listValue(contract?.benefits)} label="مزایا، هر خط یک مورد" name="benefits" />
      <Textarea defaultValue={listValue(contract?.requiredDocuments)} label="مدارک مورد نیاز، هر خط یک مورد" name="requiredDocuments" />
      <Textarea defaultValue={faqValue(contract?.faqItems)} label="سوالات متداول، فرمت هر خط: سوال | پاسخ" name="faqItems" />
      <Textarea defaultValue={listValue(contract?.relatedContracts)} label="قراردادهای مرتبط، اسلاگ هر قرارداد در یک خط" name="relatedContracts" />
      <div className="grid gap-4 md:grid-cols-2">
        <Input defaultValue={contract?.seoTitle} label="عنوان سئو" name="seoTitle" />
        <Input defaultValue={contract?.seoDescription} label="توضیحات سئو" name="seoDescription" />
      </div>
    </>
  );
}

export default async function AdminContractsPage() {
  const contracts = await getAllContracts();

  return (
    <AdminShell title="مدیریت قراردادها" description="افزودن، ویرایش، انتشار و مدیریت بانک قراردادها">
      <div className="grid gap-6">
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">افزودن قرارداد</h2>
          <form action={saveContractAction} className="grid gap-4">
            <ContractFields />
            <Button type="submit">ذخیره قرارداد</Button>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">فهرست قراردادها</h2>
          <div className="grid gap-4">
            {contracts.length ? contracts.map((contract) => (
              <details className="rounded-2xl border border-border bg-surface p-4" key={contract.id || contract.slug}>
                <summary className="cursor-pointer font-black text-foreground">{contract.order}. {contract.title} <span className="text-sm text-muted">({contract.category} / {contract.status})</span></summary>
                <form action={saveContractAction} className="mt-4 grid gap-4">
                  <input name="id" type="hidden" value={contract.id} />
                  <ContractFields contract={contract} />
                  <Button type="submit">ذخیره تغییرات</Button>
                </form>
                <form action={deleteContractAction} className="mt-3">
                  <input name="id" type="hidden" value={contract.id} />
                  <Button type="submit" variant="outline">حذف قرارداد</Button>
                </form>
              </details>
            )) : <p className="rounded-2xl bg-soft-gray p-4 text-sm font-bold text-muted">هنوز قراردادی در پایگاه داده ثبت نشده است. محتوای نمونه در سایت نمایش داده می‌شود.</p>}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
