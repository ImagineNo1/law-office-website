export function DashboardKpiCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <p className="text-sm font-black text-[#66758A]">{label}</p>
      <strong className="mt-3 block text-3xl font-black">{value}</strong>
    </article>
  );
}
