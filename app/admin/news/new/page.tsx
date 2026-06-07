import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";

export const metadata: Metadata = { title: "افزودن خبر" };

export default function NewNewsPage() {
  return <AdminShell title="افزودن خبر" description="ویرایشگر پیشرفته اخبار"><AdminPageHeader title="افزودن خبر" description="خبر را در صفحه اختصاصی با ابزار ویرایش متن آماده انتشار کنید." /><PostEditorForm type="news" /></AdminShell>;
}
