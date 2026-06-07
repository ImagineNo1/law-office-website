import type { Metadata } from "next";
import Link from "next/link";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import { AdminDataTable, AdminEmptyState, AdminPageHeader, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { deletePostAction } from "@/lib/admin-actions";
import { getAdminPosts } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت وبلاگ" };

export default async function AdminBlogPage() {
  const posts = await getAdminPosts();
  return <AdminShell title="وبلاگ" description="مدیریت مقاله‌ها"><div className="grid gap-6"><AdminPageHeader title="وبلاگ" description="افزودن و ویرایش مقاله‌ها در صفحه اختصاصی با ویرایشگر پیشرفته انجام می‌شود." action={<Link className="rounded-lg bg-accent px-5 py-3 text-sm font-extrabold text-accent-foreground" href="/admin/blog/new">افزودن مقاله</Link>} />{posts.length ? <AdminDataTable headers={["عنوان", "دسته", "وضعیت", "انتشار", "به‌روزرسانی", "عملیات"]}>{posts.map((post) => <tr className="border-t border-border" key={post.id}><td className="px-5 py-4 font-black text-navy">{post.title}</td><td className="px-5 py-4 font-bold text-muted">{post.category}</td><td className="px-5 py-4"><AdminStatusBadge status={post.status} /></td><td className="px-5 py-4 font-bold text-muted">{post.publishedAtText}</td><td className="px-5 py-4 font-bold text-muted">{post.updatedAtText}</td><td className="px-5 py-4"><div className="flex flex-wrap gap-2"><Link className="rounded-lg border border-border px-4 py-2 text-xs font-black text-navy" href={`/admin/blog/edit/${post.id}`}>ویرایش</Link><AdminConfirmDialog action={<form action={deletePostAction}><input name="id" type="hidden" value={post.id} /><button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">حذف</button></form>} /></div></td></tr>)}</AdminDataTable> : <AdminEmptyState title="مقاله‌ای ثبت نشده است" description="اولین مقاله را از صفحه افزودن مقاله ایجاد کنید." />}</div></AdminShell>;
}
