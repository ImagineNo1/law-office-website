import type { Metadata } from "next";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDataTable, AdminEmptyState, AdminPageHeader, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { deletePostAction, savePostAction } from "@/lib/admin-actions";
import { getAdminPosts } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت وبلاگ" };
type PostRow = Awaited<ReturnType<typeof getAdminPosts>>[number];

function PostForm({ post }: { post?: PostRow }) {
  return <form action={savePostAction} className="grid gap-4"><input name="id" type="hidden" value={post?.id ?? ""} /><label className="grid gap-2 text-sm font-black text-navy"><span>عنوان</span><input className="service-input" defaultValue={post?.title} name="title" required /></label><div className="grid gap-4 md:grid-cols-3"><label className="grid gap-2 text-sm font-black text-navy"><span>اسلاگ</span><input className="service-input" defaultValue={post?.slug} name="slug" /></label><label className="grid gap-2 text-sm font-black text-navy"><span>دسته‌بندی</span><input className="service-input" defaultValue={post?.category} name="category" required /></label><label className="grid gap-2 text-sm font-black text-navy"><span>وضعیت</span><select className="service-input" defaultValue={post?.status ?? "draft"} name="status"><option value="published">منتشر شده</option><option value="draft">پیش‌نویس</option></select></label></div><label className="grid gap-2 text-sm font-black text-navy"><span>تصویر</span><input className="service-input" defaultValue={post?.coverImage ?? ""} name="coverImage" /></label><label className="grid gap-2 text-sm font-black text-navy"><span>خلاصه</span><textarea className="service-input min-h-24 py-3" defaultValue={post?.excerpt} name="excerpt" required /></label><label className="grid gap-2 text-sm font-black text-navy"><span>محتوا</span><textarea className="service-input min-h-40 py-3" defaultValue={post?.content} name="content" required /></label><button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ذخیره</button></form>;
}

export default async function AdminBlogPage() {
  const posts = await getAdminPosts();
  return <AdminShell title="وبلاگ" description="مدیریت مقاله‌ها"><div className="grid gap-6"><AdminPageHeader title="وبلاگ" description="مقاله‌ها از مدل Post خوانده می‌شوند." action={<AdminModal buttonLabel="افزودن مقاله" title="افزودن مقاله"><PostForm /></AdminModal>} />{posts.length ? <AdminDataTable headers={["عنوان", "دسته", "وضعیت", "انتشار", "به‌روزرسانی", "عملیات"]}>{posts.map((post) => <tr className="border-t border-border" key={post.id}><td className="px-5 py-4 font-black text-navy">{post.title}</td><td className="px-5 py-4 font-bold text-muted">{post.category}</td><td className="px-5 py-4"><AdminStatusBadge status={post.status} /></td><td className="px-5 py-4 font-bold text-muted">{post.publishedAtText}</td><td className="px-5 py-4 font-bold text-muted">{post.updatedAtText}</td><td className="px-5 py-4"><div className="flex flex-wrap gap-2"><AdminModal buttonLabel="ویرایش" title={`ویرایش ${post.title}`}><PostForm post={post} /></AdminModal><AdminConfirmDialog action={<form action={deletePostAction}><input name="id" type="hidden" value={post.id} /><button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">حذف</button></form>} /></div></td></tr>)}</AdminDataTable> : <AdminEmptyState title="هنوز مقاله‌ای ثبت نشده است" description="اولین مقاله وبلاگ را ایجاد کنید." />}</div></AdminShell>;
}
