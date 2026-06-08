import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";
import { getAdminNews } from "@/lib/admin-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "افزودن خبر" };

export default async function NewNewsPage() {
  const categories = (await getAdminNews()).map(
    (item) => item.category ?? "عمومی",
  );
  return (
    <AdminShell title="افزودن خبر" description="ویرایشگر پیشرفته اخبار">
      <AdminPageHeader
        title="افزودن خبر"
        description="خبر را در صفحه اختصاصی با ابزار ویرایش متن آماده انتشار کنید."
      />
      <PostEditorForm categories={categories} type="news" />
    </AdminShell>
  );
}
