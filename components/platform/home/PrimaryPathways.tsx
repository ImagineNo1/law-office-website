import { IconBox } from "@/components/platform/layout/PageShell";

export function PrimaryPathways() {
  const items = ["خدمات حقوقی", "بانک قرارداد", "فرم‌های حقوقی", "امضای دیجیتال", "پورتال موکل"];
  return (
    <aside className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.07)]">
      <h2 className="text-lg font-black">مسیرهای اصلی</h2>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <span className="flex items-center gap-3 rounded-xl border border-[#eadfce] px-4 py-3 text-sm font-black" key={item}>
            <IconBox>§</IconBox>
            {item}
          </span>
        ))}
      </div>
    </aside>
  );
}
