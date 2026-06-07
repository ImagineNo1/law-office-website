import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";
import { getAdminPostById } from "@/lib/admin-db";

export const metadata: Metadata = { title: "ویرایش مقاله" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getAdminPostById(id);
  if (!post) notFound();
  return <AdminShell title="ویرایش مقاله" description={post.title}><AdminPageHeader title={post.title} description="ویرایش کامل محتوا با ابزار متنی پیشرفته" /><PostEditorForm item={post} type="post" /></AdminShell>;
}
