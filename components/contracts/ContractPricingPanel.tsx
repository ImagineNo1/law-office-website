export function ContractPricingPanel({ price = "۹۸۰ هزار تومان" }: { price?: string }) {
  return (
    <aside className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <p className="text-sm font-black text-[#66758A]">قیمت قرارداد</p>
      <strong className="mt-2 block text-2xl font-black text-[#C9973F]">{price}</strong>
    </aside>
  );
}
