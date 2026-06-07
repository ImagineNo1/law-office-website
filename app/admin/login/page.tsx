import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginAction } from "@/lib/admin-actions";
import { ensureDefaultAdmin } from "@/lib/ensure-default-admin";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ورود مدیر",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  await ensureDefaultAdmin();
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  const { error } = searchParams ? await searchParams : {};

  return (
    <main className="grid min-h-screen bg-background px-4 py-10 lg:grid-cols-[1fr_0.9fr]" dir="rtl">
      <section className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-border/50 bg-white p-8 shadow-xl shadow-primary/5">
          <div className="mb-8 text-center">
            <span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent">
              <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
                <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Zm0 5v8M8 12h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </span>
            <h1 className="text-2xl font-black text-navy">ورود مدیر</h1>
            <p className="mt-2 text-sm font-bold text-muted">ورود به پنل مدیریت موسسه</p>
          </div>
          {error ? (
            <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700">
              ایمیل یا رمز عبور معتبر نیست.
            </p>
          ) : null}
          <form action={loginAction} className="grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-navy">
              <span>ایمیل</span>
              <input className="h-12 rounded-lg border border-border bg-white px-4 text-sm font-bold outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" name="email" required type="email" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-navy">
              <span>رمز عبور</span>
              <input className="h-12 rounded-lg border border-border bg-white px-4 text-sm font-bold outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" name="password" required type="password" />
            </label>
            <button className="h-12 rounded-lg bg-primary text-sm font-black text-primary-foreground transition hover:bg-primary/90" type="submit">
              ورود به پنل مدیریت
            </button>
          </form>
        </div>
      </section>
      <aside className="mt-8 hidden rounded-[24px] bg-[#071326] p-10 text-white shadow-soft lg:grid lg:content-center">
        <p className="text-sm font-black text-gold">پنل امن مدیریت</p>
        <h2 className="mt-4 text-4xl font-black leading-[1.5]">مدیریت یکپارچه محتوا، درخواست‌ها و کاربران</h2>
        <p className="mt-5 max-w-lg text-sm font-bold leading-8 text-slate-300">
          ورود مدیر فقط برای کاربران تاییدشده فعال است و پس از ورود، نشست مدیریت در کوکی امن ذخیره می‌شود.
        </p>
      </aside>
    </main>
  );
}
