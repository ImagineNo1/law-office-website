export function ContractTabs() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {["پیش‌نمایش", "مدارک", "سوالات"].map((tab) => (
        <button className="rounded-xl border border-[#eadfce] bg-white px-4 py-3 text-sm font-black" key={tab}>
          {tab}
        </button>
      ))}
    </div>
  );
}
