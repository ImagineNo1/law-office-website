export function RequestStatusBadge({ status }: { status: string }) {
  return <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{status}</span>;
}
