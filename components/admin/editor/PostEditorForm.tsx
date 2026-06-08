import {
  AdminSubmitButton,
  CategoryField,
  SlugField,
  UploadField,
} from "@/components/admin/AdminFormFields";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SeoFields } from "@/components/admin/SeoFields";
import { saveNewsAction, savePostAction } from "@/lib/admin-actions";
import type { SeoData } from "@/lib/seo";

type ContentRow = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  category?: string;
  status?: string;
  publishedAt?: Date | string | null;
  seo?: Partial<SeoData>;
};

function dateTimeValue(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

export function PostEditorForm({
  categories = [],
  item,
  type,
}: {
  categories?: string[];
  item?: ContentRow;
  type: "post" | "news";
}) {
  const action = type === "post" ? savePostAction : saveNewsAction;
  return (
    <form action={action} className="grid gap-5">
      <input name="id" type="hidden" value={item?.id ?? ""} />
      <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-card md:grid-cols-3">
        <label className="grid gap-2 text-sm font-black text-navy md:col-span-2">
          <span>عنوان</span>
          <input
            className="service-input"
            defaultValue={item?.title}
            name="title"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-black text-navy">
          <span>وضعیت</span>
          <select
            className="service-input"
            defaultValue={item?.status ?? "published"}
            name="status"
          >
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </label>
        <SlugField defaultValue={item?.slug} />
        <CategoryField
          categories={categories}
          defaultValue={item?.category ?? "عمومی"}
        />
        <label className="grid gap-2 text-sm font-black text-navy">
          <span>زمان انتشار</span>
          <input
            className="service-input"
            defaultValue={dateTimeValue(item?.publishedAt)}
            name="publishedAt"
            type="datetime-local"
          />
          <span className="text-xs font-bold leading-6 text-muted">
            اگر خالی بماند، زمان ذخیره به‌عنوان زمان انتشار ثبت می‌شود.
          </span>
        </label>
        <div className="md:col-span-3">
          <UploadField
            defaultValue={item?.coverImage}
            fileName="coverImageFile"
            label="تصویر کاور"
            name="coverImage"
          />
        </div>
        <label className="grid gap-2 text-sm font-black text-navy md:col-span-3">
          <span>خلاصه</span>
          <textarea
            className="service-input min-h-24 py-3"
            defaultValue={item?.excerpt}
            name="excerpt"
            required
          />
        </label>
      </div>
      <RichTextEditor defaultValue={item?.content ?? ""} />
      <SeoFields seo={item?.seo} title={String(item?.title ?? "")} />
      <AdminSubmitButton>ذخیره محتوا</AdminSubmitButton>
    </form>
  );
}
