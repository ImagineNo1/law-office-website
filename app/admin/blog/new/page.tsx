import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";

export const metadata: Metadata = { title: "افزودن مقاله" };

export default function NewBlogPostPage() {
  return <AdminShell title="افزودن مقاله" description="ویرایشگر پیشرفته وبلاگ"><AdminPageHeader title="افزودن مقاله" description="با ابزار ویرایش متن، تیترها، لیست‌ها و قالب‌بندی محتوا را تنظیم کنید." /><PostEditorForm type="post" /></AdminShell>;
}
