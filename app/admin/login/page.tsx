import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "ورود مدیریت",
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-lg border border-gold/40 text-gold">عد</div>
          <h1 className="text-2xl font-black text-foreground">ورود به پنل مدیریت</h1>
        </div>
        <form className="grid gap-4">
          <Input label="ایمیل" type="email" />
          <Input label="رمز عبور" type="password" />
          <Button type="submit">ورود</Button>
        </form>
      </Card>
    </main>
  );
}
