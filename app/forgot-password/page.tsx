import Link from "next/link";

export const metadata = {
  title: "بازیابی رمز عبور",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10" dir="rtl">
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-[#071326] p-8 text-white lg:p-12">
          <Link className="inline-flex items-center gap-3 text-lg font-black" href="/">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#C9973F] text-[#1b1305]">و</span>
            وکیل‌یار
          </Link>
          <div className="mt-20">
            <p className="text-sm font-black text-[#D4A64A]">Secure recovery</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.35]">بازیابی امن دسترسی حساب</h1>
            <p className="mt-5 text-sm leading-8 text-slate-300">
              برای حفظ امنیت پرونده‌ها، درخواست بازیابی پس از تایید ایمیل و سیاست‌های احراز هویت فعلی سامانه انجام می‌شود.
            </p>
          </div>
        </div>
        <div className="flex items-center p-8 lg:p-12">
          <div className="w-full">
            <p className="text-xs font-black text-[#C9973F]">فراموشی رمز</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">درخواست بازیابی</h2>
            <form className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                ایمیل حساب
                <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-[#C9973F] focus:bg-white" name="email" placeholder="name@example.com" type="email" />
              </label>
              <button className="h-12 rounded-2xl bg-[#071326] text-sm font-black text-white shadow-lg shadow-slate-900/10" type="button">
                ارسال لینک بازیابی
              </button>
            </form>
            <p className="mt-6 text-sm text-slate-500">
              این صفحه با معماری احراز هویت فعلی آماده شده و تا اتصال اکشن بازیابی، عملیات ارسال ایمیل را اجرا نمی‌کند.
            </p>
            <Link className="mt-5 inline-flex text-sm font-black text-[#9A6A19]" href="/login">
              بازگشت به ورود
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
