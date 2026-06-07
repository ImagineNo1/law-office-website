import type { Metadata } from "next";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminDataTable, AdminEmptyState, AdminPageHeader, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteNewsAction, saveNewsAction } from "@/lib/admin-actions";
import { getAdminNews } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "مدیریت اخبار" };
type NewsRow = Awaited<ReturnType<typeof getAdminNews>>[number];

function NewsForm({ item }: { item?: NewsRow }) {
  return <form action={saveNewsAction} className="grid gap-4"><input name="id" type="hidden" value={item?.id ?? ""} /><label className="grid gap-2 text-sm font-black text-navy"><span>عنوان</span><input className="service-input" defaultValue={item?.title} name="title" required /></label><div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2 text-sm font-black text-navy"><span>اسلاگ</span><input className="service-input" defaultValue={item?.slug} name="slug" /></label><label className="grid gap-2 text-sm font-black text-navy"><span>وضعیت</span><select className="service-input" defaultValue={item?.status ?? "draft"} name="status"><option value="published">منتشر شده</option><option value="draft">پیش‌نویس</option></select></label></div><label className="grid gap-2 text-sm font-black text-navy"><span>تصویر</span><input className="service-input" defaultValue={item?.coverImage ?? ""} name="coverImage" /></label><label className="grid gap-2 text-sm font-black text-navy"><span>خلاصه</span><textarea className="service-input min-h-24 py-3" defaultValue={item?.excerpt} name="excerpt" required /></label><label className="grid gap-2 text-sm font-black text-navy"><span>محتوا</span><textarea className="service-input min-h-40 py-3" defaultValue={item?.content} name="content" required /></label><button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" type="submit">ذخیره</button></form>;
}

export default async function AdminNewsPage() {
  const news = await getAdminNews();
  return <AdminShell title="اخبار" description="مدیریت اخبار موسسه"><div className="grid gap-6"><AdminPageHeader title="اخبار" description="خبرها از مدل News خوانده می‌شوند." action={<AdminModal buttonLabel="افزودن خبر" title="افزودن خبر"><NewsForm /></AdminModal>} />{news.length ? <AdminDataTable headers={["عنوان", "وضعیت", "انتشار", "به‌روزرسانی", "عملیات"]}>{news.map((item) => <tr className="border-t border-border" key={item.id}><td className="px-5 py-4 font-black text-navy">{item.title}</td><td className="px-5 py-4"><AdminStatusBadge status={item.status} /></td><td className="px-5 py-4 font-bold text-muted">{item.publishedAtText}</td><td className="px-5 py-4 font-bold text-muted">{item.updatedAtText}</td><td className="px-5 py-4"><div className="flex flex-wrap gap-2"><AdminModal buttonLabel="ویرایش" title={`ویرایش ${item.title}`}><NewsForm item={item} /></AdminModal><AdminConfirmDialog action={<form action={deleteNewsAction}><input name="id" type="hidden" value={item.id} /><button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white">حذف</button></form>} /></div></td></tr>)}</AdminDataTable> : <AdminEmptyState title="هنوز خبری ثبت نشده است" description="اولین خبر موسسه را ایجاد کنید." />}</div></AdminShell>;
}
