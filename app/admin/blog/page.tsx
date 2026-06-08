import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import {
  AdminDataTable,
  AdminEmptyState,
  AdminPageHeader,
  AdminStatusBadge,
} from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { deletePostAction } from "@/lib/admin-actions";
import { getAdminPosts } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت وبلاگ" };

export default async function AdminBlogPage() {
  const posts = await getAdminPosts();
  return (
    <AdminShell title="وبلاگ" description="مدیریت مقاله‌ها">
      <div className="grid gap-6">
        <AdminPageHeader
          title="وبلاگ"
          description="افزودن و ویرایش مقاله‌ها در صفحه اختصاصی با ویرایشگر پیشرفته انجام می‌شود."
          action={
            <Link
              className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white"
              href="/admin/blog/new"
            >
              افزودن مقاله
            </Link>
          }
        />
        {posts.length ? (
          <AdminDataTable
            headers={[
              "عنوان",
              "دسته",
              "وضعیت",
              "انتشار",
              "به‌روزرسانی",
              "عملیات",
            ]}
          >
            {posts.map((post) => (
              <tr className="border-t border-border" key={post.id}>
                <td className="px-5 py-4 font-black text-navy">{post.title}</td>
                <td className="px-5 py-4 font-bold text-muted">
                  {post.category}
                </td>
                <td className="px-5 py-4">
                  <AdminStatusBadge status={post.status} />
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {post.publishedAtText}
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {post.updatedAtText}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-50"
                      href={`/blog/${post.slug}?preview=1`}
                      target="_blank"
                    >
                      <Eye aria-hidden="true" className="size-4" />
                      مشاهده مقاله
                    </Link>
                    <Link
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-black text-navy"
                      href={`/admin/blog/edit/${post.id}`}
                    >
                      <Pencil aria-hidden="true" className="size-4" />
                      ویرایش
                    </Link>
                    <AdminConfirmDialog
                      action={
                        <form action={deletePostAction}>
                          <input name="id" type="hidden" value={post.id} />
                          <button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">
                            حذف
                          </button>
                        </form>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </AdminDataTable>
        ) : (
          <AdminEmptyState
            title="مقاله‌ای ثبت نشده است"
            description="اولین مقاله را از صفحه افزودن مقاله ایجاد کنید."
          />
        )}
      </div>
    </AdminShell>
  );
}
