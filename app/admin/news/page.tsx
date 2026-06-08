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
import { deleteNewsAction } from "@/lib/admin-actions";
import { getAdminNews } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت اخبار" };

export default async function AdminNewsPage() {
  const news = await getAdminNews();
  return (
    <AdminShell title="اخبار" description="مدیریت خبرها">
      <div className="grid gap-6">
        <AdminPageHeader
          title="اخبار"
          description="افزودن و ویرایش خبرها در صفحه اختصاصی با ویرایشگر پیشرفته انجام می‌شود."
          action={
            <Link
              className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white"
              href="/admin/news/new"
            >
              افزودن خبر
            </Link>
          }
        />
        {news.length ? (
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
            {news.map((item) => (
              <tr className="border-t border-border" key={item.id}>
                <td className="px-5 py-4 font-black text-navy">{item.title}</td>
                <td className="px-5 py-4 font-bold text-muted">
                  {item.category ?? "عمومی"}
                </td>
                <td className="px-5 py-4">
                  <AdminStatusBadge status={item.status} />
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {item.publishedAtText}
                </td>
                <td className="px-5 py-4 font-bold text-muted">
                  {item.updatedAtText}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-50"
                      href={`/news/${item.slug}`}
                      target="_blank"
                    >
                      <Eye aria-hidden="true" className="size-4" />
                      مشاهده خبر
                    </Link>
                    <Link
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-black text-navy"
                      href={`/admin/news/edit/${item.id}`}
                    >
                      <Pencil aria-hidden="true" className="size-4" />
                      ویرایش
                    </Link>
                    <AdminConfirmDialog
                      action={
                        <form action={deleteNewsAction}>
                          <input name="id" type="hidden" value={item.id} />
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
            title="خبری ثبت نشده است"
            description="اولین خبر را از صفحه افزودن خبر ایجاد کنید."
          />
        )}
      </div>
    </AdminShell>
  );
}
