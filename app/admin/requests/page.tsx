import type { Metadata } from "next";
import { AdminActionLink, AdminDataTable, AdminEmptyState, AdminPageHeader, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminRequests } from "@/lib/admin-db";
import { requestPriorityLabels, requestStatusLabels, requestPriorities, requestStatuses } from "@/lib/service-requests";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "درخواست‌ها" };

export default async function AdminRequestsPage({ searchParams }: { searchParams?: Promise<{ priority?: string; q?: string; status?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const requests = await getAdminRequests(params);
  return <AdminShell title="درخواست‌ها" description="مدیریت درخواست‌های واقعی ثبت‌شده توسط کاربران"><div className="grid gap-6"><AdminPageHeader title="درخواست‌ها" /><form className="flex flex-wrap gap-3 rounded-2xl border border-border bg-white p-4 shadow-card"><input className="service-input max-w-72" defaultValue={params.q ?? ""} name="q" placeholder="جستجو شماره، نام، تماس یا خدمت" /><select className="service-input max-w-52" defaultValue={params.status ?? ""} name="status"><option value="">همه وضعیت‌ها</option>{requestStatuses.map((status) => <option key={status} value={status}>{requestStatusLabels[status]}</option>)}</select><select className="service-input max-w-52" defaultValue={params.priority ?? ""} name="priority"><option value="">همه اولویت‌ها</option>{requestPriorities.map((priority) => <option key={priority} value={priority}>{requestPriorityLabels[priority]}</option>)}</select><button className="rounded-xl bg-navy px-5 py-2 text-sm font-black text-white">فیلتر</button></form>{requests.length ? <AdminDataTable headers={["شماره", "مشتری", "تماس", "خدمت", "وضعیت", "اولویت", "عملیات"]}>{requests.map((request) => <tr className="border-t border-border" key={request.id}><td className="px-5 py-4 font-black text-navy">{request.requestNumber}</td><td className="px-5 py-4 font-bold text-muted">{request.fullName}</td><td className="px-5 py-4 font-bold text-muted">{request.phone}</td><td className="px-5 py-4 font-bold text-muted">{request.serviceTitle}</td><td className="px-5 py-4"><AdminStatusBadge status={request.status} /></td><td className="px-5 py-4 font-bold text-muted">{requestPriorityLabels[request.priority]}</td><td className="px-5 py-4"><AdminActionLink href={`/admin/requests/${request.id}`}>مشاهده</AdminActionLink></td></tr>)}</AdminDataTable> : <AdminEmptyState title="درخواستی ثبت نشده است" description="پس از ثبت درخواست توسط مشتری، رکورد واقعی در این بخش نمایش داده می‌شود." />}</div></AdminShell>;
}
