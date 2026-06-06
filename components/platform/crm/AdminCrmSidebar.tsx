import Link from "next/link";

export function AdminCrmSidebar() {
  const items = [
    ["درخواست‌ها", "/admin/requests"],
    ["قراردادها", "/admin/contracts"],
    ["فرم‌ها", "/admin/legal-forms"],
    ["سوالات متداول", "/admin/faqs"],
    ["گزارش‌ها", "/admin"],
  ];
  return (
    <aside className="border-l border-slate-200 bg-white p-5 shadow-sm lg:min-h-screen lg:w-[290px]">
      <div className="rounded-2xl bg-[#071326] p-5 text-white">
        <h2 className="text-2xl font-black">Legal CRM</h2>
        <p className="mt-2 text-xs font-bold text-slate-300">کارتابل عملیات حقوقی</p>
      </div>
      <nav className="mt-6 grid gap-2">
        {items.map(([label, href]) => (
          <Link
            className="rounded-2xl px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
