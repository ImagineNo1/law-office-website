import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";
import { getAdminNewsById } from "@/lib/admin-db";

export const metadata: Metadata = { title: "ویرایش خبر" };

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getAdminNewsById(id);
  if (!item) notFound();
  return <AdminShell title="ویرایش خبر" description={item.title}><AdminPageHeader title={item.title} description="ویرایش کامل خبر با ابزار متنی پیشرفته" /><PostEditorForm item={item} type="news" /></AdminShell>;
}
