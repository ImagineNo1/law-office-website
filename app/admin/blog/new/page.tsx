import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { PostEditorForm } from "@/components/admin/editor/PostEditorForm";
import { getAdminPosts } from "@/lib/admin-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "افزودن مقاله" };

export default async function NewBlogPostPage() {
  const categories = (await getAdminPosts()).map(
    (post) => post.category ?? "عمومی",
  );
  return (
    <AdminShell title="افزودن مقاله" description="ویرایشگر پیشرفته وبلاگ">
      <AdminPageHeader
        title="افزودن مقاله"
        description="با ابزار ویرایش متن، تیترها، لیست‌ها و قالب‌بندی محتوا را تنظیم کنید."
      />
      <PostEditorForm categories={categories} type="post" />
    </AdminShell>
  );
}
