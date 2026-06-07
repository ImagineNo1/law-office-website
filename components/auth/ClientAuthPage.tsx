import Link from "next/link";
import { loginClientAction, signupClientAction } from "@/components/auth/AuthActions";

type AuthMode = "login" | "signup";

function Icon({ name }: { name: "login" | "signup" | "mail" | "lock" }) {
  const paths = {
    login: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
    signup: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-5v6M22 9h-6",
    mail: "M4 6h16v12H4V6Zm0 1 8 6 8-6",
    lock: "M7 10V8a5 5 0 0 1 10 0v2M6 10h12v10H6V10Z",
  };
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d={paths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function Field({
  autoComplete,
  label,
  name,
  placeholder,
  required = true,
  type = "text",
}: {
  autoComplete?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-foreground" htmlFor={name}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name={type === "password" ? "lock" : "mail"} />
        </span>
        <input
          autoComplete={autoComplete}
          className="h-12 w-full rounded-lg border border-border bg-white px-4 pl-10 text-sm font-bold outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
        />
      </div>
    </div>
  );
}

export function ClientAuthPage({
  error,
  mode,
  next = "/dashboard",
}: {
  error?: string;
  mode: AuthMode;
  next?: string;
}) {
  const isLogin = mode === "login";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground" dir="rtl">
      <section className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-8 shadow-xl shadow-primary/5">
        <Link className="mx-auto mb-8 flex w-fit items-center gap-3" href="/">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
              <path d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </span>
          <span>
            <span className="block text-lg font-black">وکیل‌یار</span>
            <span className="-mt-1 block text-[10px] font-bold text-muted-foreground">سامانه خدمات، قرارداد و امضا</span>
          </span>
        </Link>

        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Icon name={isLogin ? "login" : "signup"} />
          </span>
          <h1 className="text-2xl font-black">{isLogin ? "ورود به حساب" : "ساخت حساب کاربری"}</h1>
          <p className="mt-2 text-sm font-bold text-muted-foreground">
            {isLogin ? "برای دسترسی به داشبورد وارد شوید" : "برای استفاده از سامانه ثبت‌نام کنید"}
          </p>
        </div>

        {error ? (
          <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700">
            {error}
          </p>
        ) : null}

        <form action={isLogin ? loginClientAction : signupClientAction} className="space-y-4">
          <input name="next" type="hidden" value={next} />
          {isLogin ? (
            <>
              <Field autoComplete="username" label="ایمیل یا موبایل" name="identifier" placeholder="client@example.com" />
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-foreground" htmlFor="password">رمز عبور</label>
                  <Link className="text-xs font-bold text-primary hover:underline" href="/forgot-password">
                    فراموشی رمز عبور؟
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Icon name="lock" /></span>
                  <input autoComplete="current-password" className="h-12 w-full rounded-lg border border-border bg-white px-4 pl-10 text-sm font-bold outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" id="password" name="password" placeholder="••••••••" required type="password" />
                </div>
              </div>
            </>
          ) : (
            <>
              <Field autoComplete="name" label="نام و نام خانوادگی" name="fullName" placeholder="نام کامل" />
              <Field autoComplete="tel" label="شماره موبایل" name="phone" placeholder="0912..." type="tel" />
              <Field autoComplete="email" label="ایمیل" name="email" placeholder="client@example.com" required={false} type="email" />
              <Field autoComplete="new-password" label="رمز عبور" name="password" placeholder="••••••••" type="password" />
              <Field autoComplete="new-password" label="تکرار رمز عبور" name="confirmPassword" placeholder="••••••••" type="password" />
            </>
          )}
          <button className="h-12 w-full rounded-lg bg-primary text-sm font-black text-primary-foreground transition hover:bg-primary/90" type="submit">
            {isLogin ? "ورود به حساب" : "ساخت حساب کاربری"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-bold text-muted-foreground">
          {isLogin ? "حساب کاربری ندارید؟ " : "قبلاً ثبت‌نام کرده‌اید؟ "}
          <Link className="font-black text-primary hover:underline" href={`${isLogin ? "/signup" : "/login"}?next=${encodeURIComponent(next)}`}>
            {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
          </Link>
        </p>
      </section>
    </main>
  );
}
