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
    <aside className="bg-[#071225] p-5 text-white lg:min-h-screen lg:w-[290px]">
      <h2 className="text-2xl font-black">Legal CRM</h2>
      <p className="mt-2 text-xs font-bold text-slate-300">کارتابل عملیات حقوقی</p>
      <nav className="mt-8 grid gap-2">
        {items.map(([label, href]) => (
          <Link className="rounded-xl px-4 py-3 text-sm font-black hover:bg-white/10" href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
