export function ContractDetailHero({ title }: { title: string }) {
  return (
    <section className="rounded-2xl bg-[#0B172A] p-7 text-white">
      <span className="text-sm font-black text-[#D4A64A]">جزئیات قرارداد</span>
      <h1 className="mt-3 text-3xl font-black">{title}</h1>
    </section>
  );
}
