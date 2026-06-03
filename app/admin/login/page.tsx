import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { loginAction } from "@/lib/admin-actions";
import { ensureDefaultAdmin } from "@/lib/ensure-default-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ورود مدیریت",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await ensureDefaultAdmin();

  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-lg border border-gold/40 text-gold">
            عد
          </div>
          <h1 className="text-2xl font-black text-foreground">
            ورود به پنل مدیریت
          </h1>
          {error ? (
            <p className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">
              ایمیل یا رمز عبور معتبر نیست.
            </p>
          ) : null}
        </div>
        <form action={loginAction} className="grid gap-4">
          <Input label="ایمیل" name="email" required type="email" />
          <Input label="رمز عبور" name="password" required type="password" />
          <Button type="submit">ورود</Button>
        </form>
      </Card>
    </main>
  );
}
