import { fa } from "@/lib/platform-db";
import type { ServiceRequestData } from "@/types";

export function RequestKpiCards({ requests = [] }: { requests?: ServiceRequestData[] }) {
  const items = [
    ["کل درخواست ها", requests.length],
    ["در بررسی", requests.filter((item) => item.status === "reviewing").length],
    ["در انجام", requests.filter((item) => item.status === "in_progress").length],
    ["در انتظار موکل", requests.filter((item) => item.status === "waiting_for_client").length],
    ["تکمیل شده", requests.filter((item) => item.status === "completed").length],
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {items.map(([label, value]) => (
        <div className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={label}>
          <p className="text-sm font-black text-[#66758A]">{label}</p>
          <strong className="mt-3 block text-3xl font-black">{fa(value)}</strong>
          <span className="mt-2 block text-xs font-bold text-emerald-600">+۳٪ این هفته</span>
        </div>
      ))}
    </div>
  );
}
