import Link from "next/link";
import { formatRequestDate, requestPriorityLabels, requestStatusLabels } from "@/lib/service-requests";
import type { ServiceRequestData } from "@/types";
import { RequestStatusBadge } from "@/components/platform/crm/RequestStatusBadge";

export function RequestTable({ requests = [] }: { requests?: ServiceRequestData[] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <div className="flex flex-col gap-3 border-b border-[#eadfce] p-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-black">جدول درخواست ها</h2>
        <div className="flex gap-2">
          <input className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold" placeholder="جستجو..." />
          <select className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold">
            <option>همه وضعیت ها</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-[#fbf7ef] text-[#66758A]">
            <tr>{["شماره", "موکل", "خدمت", "وضعیت", "اولویت", "تاریخ", "عملیات"].map((h) => <th className="px-5 py-4 text-right font-black" key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {requests.slice(0, 14).map((request) => (
              <tr className="border-t border-[#eadfce]" key={request.id}>
                <td className="px-5 py-4 font-black">{request.requestNumber}</td>
                <td className="px-5 py-4 font-bold">{request.fullName}</td>
                <td className="px-5 py-4 text-[#66758A]">{request.serviceTitle}</td>
                <td className="px-5 py-4"><RequestStatusBadge status={requestStatusLabels[request.status]} /></td>
                <td className="px-5 py-4">{requestPriorityLabels[request.priority]}</td>
                <td className="px-5 py-4">{formatRequestDate(request.createdAt)}</td>
                <td className="px-5 py-4"><Link className="rounded-lg border border-[#eadfce] px-3 py-2 font-black" href={`/admin/requests/${request.id}`}>مشاهده</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
