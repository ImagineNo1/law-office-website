import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";
import { getAdminNews, getAdminNewsById } from "@/lib/admin-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "ویرایش خبر" };

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, news] = await Promise.all([
    getAdminNewsById(id),
    getAdminNews(),
  ]);
  if (!item) notFound();
  const categories = news.map((newsItem) => newsItem.category ?? "عمومی");
  return (
    <AdminShell title="ویرایش خبر" description={item.title}>
      <AdminPageHeader
        title={item.title}
        description="ویرایش کامل خبر با ابزار متنی پیشرفته"
      />
      <PostEditorForm categories={categories} item={item} type="news" />
    </AdminShell>
  );
}
