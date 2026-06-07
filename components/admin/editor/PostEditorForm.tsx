import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { savePostAction, saveNewsAction } from "@/lib/admin-actions";

type ContentRow = { id?: string; title?: string; slug?: string; excerpt?: string; content?: string; coverImage?: string | null; category?: string; status?: string };

export function PostEditorForm({ item, type }: { item?: ContentRow; type: "post" | "news" }) {
  const action = type === "post" ? savePostAction : saveNewsAction;
  return (
    <form action={action} className="grid gap-5">
      <input name="id" type="hidden" value={item?.id ?? ""} />
      <div className="grid gap-4 rounded-2xl border border-border bg-white p-5 shadow-card md:grid-cols-3">
        <label className="grid gap-2 text-sm font-black text-navy md:col-span-2"><span>عنوان</span><input className="service-input" defaultValue={item?.title} name="title" required /></label>
        <label className="grid gap-2 text-sm font-black text-navy"><span>وضعیت</span><select className="service-input" defaultValue={item?.status ?? "draft"} name="status"><option value="published">منتشر شده</option><option value="draft">پیش‌نویس</option></select></label>
        <label className="grid gap-2 text-sm font-black text-navy"><span>اسلاگ</span><input className="service-input" defaultValue={item?.slug} name="slug" /></label>
        {type === "post" ? <label className="grid gap-2 text-sm font-black text-navy"><span>دسته‌بندی</span><input className="service-input" defaultValue={item?.category ?? "عمومی"} name="category" required /></label> : null}
        <label className="grid gap-2 text-sm font-black text-navy"><span>تصویر کاور</span><input className="service-input" defaultValue={item?.coverImage ?? ""} name="coverImage" /></label>
        <label className="grid gap-2 text-sm font-black text-navy md:col-span-3"><span>خلاصه</span><textarea className="service-input min-h-24 py-3" defaultValue={item?.excerpt} name="excerpt" required /></label>
      </div>
      <RichTextEditor defaultValue={item?.content ?? ""} />
      <button className="rounded-xl bg-gold px-6 py-4 text-sm font-black text-white shadow-card" type="submit">ذخیره محتوا</button>
    </form>
  );
}
