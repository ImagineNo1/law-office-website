import { fa } from "@/lib/platform-db";

export function HeroDashboardPreview() {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(135deg,rgba(11,23,42,.14),rgba(201,151,63,.12),transparent)] blur-2xl" />
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,.14)]">
        <div className="mb-5 flex items-center justify-between">
          <strong className="text-lg font-black text-slate-950">داشبورد اسناد و امضا</strong>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">عملیاتی</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["اسناد فعال", 854],
            ["در انتظار امضا", 23],
            ["درخواست های CRM", 50],
          ].map(([label, value]) => (
            <div className="rounded-xl bg-slate-50 p-4 text-center" key={String(label)}>
              <p className="text-xs font-black text-slate-500">{label}</p>
              <strong className="mt-3 block text-3xl font-black text-slate-950">{fa(value)}</strong>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <strong className="text-sm font-black">اسناد اخیر</strong>
            <span className="text-xs font-black text-[#C9973F]">مشاهده همه</span>
          </div>
          {["قرارداد اجاره ملک تجاری", "قرارداد استخدام کارمند", "اظهارنامه رسمی مالیاتی"].map((item, index) => (
            <div className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50" key={item}>
              <div>
                <p className="text-sm font-black text-slate-900">{item}</p>
                <p className="text-xs font-bold text-slate-500">۱۴۰۳/۰۳/{fa(20 + index)}</p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">امضا شده</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
