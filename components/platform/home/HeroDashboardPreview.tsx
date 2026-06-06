import { fa } from "@/lib/platform-db";

export function HeroDashboardPreview() {
  return (
    <div className="relative rounded-[30px] border border-white/10 bg-white/10 p-4 shadow-[0_34px_100px_rgba(0,0,0,.32)] backdrop-blur">
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-[#0B172A]">
        <strong className="text-sm">داشبورد اسناد و امضا</strong>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">عملیاتی</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {["اسناد فعال", "در انتظار امضا", "درخواست‌های CRM"].map((label, index) => (
          <div className="rounded-2xl bg-white p-4 text-[#0B172A]" key={label}>
            <p className="text-xs font-black text-[#66758A]">{label}</p>
            <strong className="mt-3 block text-3xl font-black">{fa([854, 23, 50][index])}</strong>
            <span className="mt-2 block text-xs font-bold text-emerald-600">+{fa(12 + index)}٪ این ماه</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-white p-4 text-[#0B172A]">
        <div className="mb-3 flex items-center justify-between">
          <strong>اسناد اخیر</strong>
          <span className="text-xs font-black text-[#C9973F]">مشاهده همه</span>
        </div>
        {["قرارداد اجاره ملک تجاری", "قرارداد استخدام کارمند", "اظهارنامه رسمی مالیاتی", "وکالت‌نامه کاری"].map((item, index) => (
          <div className="grid grid-cols-[1fr_92px_86px] gap-3 border-t border-[#eadfce] py-3 text-sm" key={item}>
            <span className="font-black">{item}</span>
            <span className="font-bold text-[#66758A]">۱۴۰۳/۰۳/{fa(20 + index)}</span>
            <span className="rounded-lg bg-emerald-50 px-2 py-1 text-center text-xs font-black text-emerald-700">امضا شده</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_150px]">
        <div className="rounded-2xl bg-[#0B172A] p-4">
          <p className="text-sm font-black text-white">گردش کار قرارداد</p>
          <div className="mt-3 h-2 rounded-full bg-white/15">
            <span className="block h-full w-[76%] rounded-full bg-[#C9973F]" />
          </div>
        </div>
        <div className="rounded-2xl bg-[#C9973F] p-4 text-center font-black text-white">ارسال گروهی</div>
      </div>
    </div>
  );
}
