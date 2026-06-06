export function RequestStatusBadge({ status }: { status: string }) {
  const color = status.includes("تکمیل")
    ? "bg-emerald-50 text-emerald-700"
    : status.includes("انتظار")
      ? "bg-[#FFF8EA] text-amber-700"
      : "bg-blue-50 text-blue-700";
  return <span className={`rounded-lg px-3 py-1 text-xs font-black ${color}`}>{status}</span>;
}
