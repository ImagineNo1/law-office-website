import Link from "next/link";
import { loginClientAction, signupClientAction } from "@/components/auth/AuthActions";

type AuthMode = "login" | "signup";

const benefits = [
  "پیگیری درخواست ها، پیام ها و پرداخت ها در یک داشبورد امن",
  "دسترسی سریع به قراردادها، فایل ها و امضاهای دیجیتال",
  "تجربه LegalTech سفید، تمیز و مناسب کاربران فارسی زبان",
];

function Field({ label, name, type = "text", required = true, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C9973F] focus:ring-4 focus:ring-[#C9973F]/15"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

export function ClientAuthPage({ mode, next = "/dashboard" }: { mode: AuthMode; next?: string }) {
  const isLogin = mode === "login";
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950" dir="rtl">
      <div className="mx-auto grid min-h-screen w-[min(1120px,calc(100%-32px))] items-center gap-8 py-10 lg:grid-cols-[.9fr_1.1fr]">
        <section className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#071326,#0B172A_58%,#111827)] p-8 text-white shadow-[0_28px_80px_rgba(11,23,42,.22)] lg:min-h-[620px] lg:p-10">
          <div className="absolute -left-20 top-16 size-64 rounded-full bg-[#C9973F]/20 blur-3xl" />
          <div className="absolute bottom-8 right-8 size-40 rounded-full border border-white/10" />
          <Link className="relative inline-flex items-center gap-3" href="/">
            <span className="grid size-11 place-items-center rounded-xl bg-white text-[#0B172A]">⚖</span>
            <span className="text-xl font-black">وکیل یار</span>
          </Link>
          <div className="relative mt-14 max-w-md">
            <span className="rounded-full border border-[#C9973F]/40 bg-[#C9973F]/10 px-4 py-2 text-xs font-black text-[#F8E7BF]">پرتال مشتریان حقوقی</span>
            <h1 className="mt-6 text-4xl font-black leading-[1.45] lg:text-5xl">
              ورود امن به داشبورد خدمات و قراردادها
            </h1>
            <p className="mt-5 text-base font-bold leading-8 text-slate-300">
              حساب مشتری از احراز هویت ادمین جداست و برای دسترسی به پرتال مشتری، اسناد و پیام ها استفاده می شود.
            </p>
          </div>
          <div className="relative mt-10 grid gap-3">
            {benefits.map((item) => (
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 p-4" key={item}>
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-[#C9973F] text-xs font-black text-[#0B172A]">✓</span>
                <p className="text-sm font-bold leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.08)] sm:p-8 lg:p-10">
          <div className="mb-8 text-center">
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-[#C9973F]/10 text-[#A87522]">✦</span>
            <p className="mt-4 text-sm font-black text-[#C9973F]">{isLogin ? "ورود مشتری" : "ثبت نام مشتری"}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">{isLogin ? "ورود به داشبورد" : "ساخت حساب کاربری"}</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-slate-500">
              {isLogin ? "برای مشاهده درخواست ها و اسناد، وارد حساب مشتری شوید." : "اطلاعات اولیه را وارد کنید تا پرتال مشتری برای شما فعال شود."}
            </p>
          </div>
          <form action={isLogin ? loginClientAction : signupClientAction} className="grid gap-4">
            <input name="next" type="hidden" value={next} />
            {isLogin ? (
              <>
                <Field label="موبایل یا ایمیل" name="identifier" placeholder="example@email.com یا 0912..." />
                <Field label="رمز عبور" name="password" type="password" />
                <div className="flex items-center justify-between gap-3 text-sm font-bold text-slate-600">
                  <label className="flex items-center gap-2">
                    <input className="size-4 rounded border-slate-300 accent-[#0B172A]" name="remember" type="checkbox" />
                    مرا به خاطر بسپار
                  </label>
                  <Link className="text-xs font-black text-[#A87522] hover:underline" href="/forgot-password">فراموشی رمز؟</Link>
                </div>
              </>
            ) : (
              <>
                <Field label="نام و نام خانوادگی" name="fullName" />
                <Field label="شماره موبایل" name="phone" type="tel" />
                <Field label="ایمیل" name="email" type="email" required={false} />
                <Field label="رمز عبور" name="password" type="password" />
                <Field label="تکرار رمز عبور" name="confirmPassword" type="password" />
              </>
            )}
            <button className="mt-2 h-12 rounded-xl bg-[#0B172A] px-5 text-sm font-black text-white shadow-[0_16px_40px_rgba(11,23,42,.18)] transition hover:bg-[#111827]" type="submit">
              {isLogin ? "ورود به داشبورد" : "ساخت حساب کاربری"}
            </button>
          </form>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-bold text-slate-600">
            {isLogin ? "حساب ندارید؟ " : "حساب دارید؟ "}
            <Link className="font-black text-[#0B172A] underline decoration-[#C9973F] decoration-2 underline-offset-4" href={`${isLogin ? "/signup" : "/login"}?next=${encodeURIComponent(next)}`}>
              {isLogin ? "ثبت نام" : "ورود"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
