import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";
import { getAdminPostById, getAdminPosts } from "@/lib/admin-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "ویرایش مقاله" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, posts] = await Promise.all([
    getAdminPostById(id),
    getAdminPosts(),
  ]);
  if (!post) notFound();
  const categories = posts.map((item) => item.category ?? "عمومی");
  return (
    <AdminShell title="ویرایش مقاله" description={post.title}>
      <AdminPageHeader
        title={post.title}
        description="ویرایش کامل محتوا با ابزار متنی پیشرفته"
      />
      <PostEditorForm categories={categories} item={post} type="post" />
    </AdminShell>
  );
}
