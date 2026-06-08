import Link from "next/link";

export const metadata = {
  title: "بازیابی رمز عبور",
};

function MailIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16v12H4V6Zm0 1 8 6 8-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function ForgotPasswordPage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground"
      dir="rtl"
    >
      <section className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-8 shadow-xl shadow-primary/5">
        <Link className="mx-auto mb-8 flex w-fit items-center gap-3" href="/">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          <span>
            <span className="block text-lg font-bold">وکیل‌یار</span>
            <span className="-mt-1 block text-[10px] text-muted-foreground">
              سامانه خدمات، قرارداد و امضا
            </span>
          </span>
        </Link>

        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <MailIcon />
          </span>
          <h1 className="text-2xl font-extrabold">بازیابی رمز عبور</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            لینک بازیابی به ایمیل شما ارسال می‌شود
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="email"
            >
              آدرس ایمیل
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <MailIcon />
              </span>
              <input
                autoComplete="email"
                className="h-12 w-full rounded-lg border border-border bg-white px-4 pl-10 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>
          </div>
          <button
            className="h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            type="button"
          >
            ارسال لینک بازیابی
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link
            className="font-medium text-primary hover:underline"
            href="/login"
          >
            ← بازگشت به صفحه ورود
          </Link>
        </p>
      </section>
    </main>
  );
}
