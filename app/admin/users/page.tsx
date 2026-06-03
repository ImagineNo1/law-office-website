import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { saveUserAction } from "@/lib/admin-actions";
import { getUsers } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت کاربران",
};

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <AdminShell title="کاربران" description="مدیریت دسترسی مدیران و نویسندگان">
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="p-5">
          <h1 className="mb-5 text-xl font-black text-foreground">فهرست کاربران</h1>
          <div className="grid gap-4">
            {users.map((user) => (
              <details className="rounded-2xl border border-border bg-surface p-4" key={user.id}>
                <summary className="cursor-pointer font-black text-foreground">
                  {user.fullName} <span className="text-sm text-muted">({user.email})</span>
                </summary>
                <form action={saveUserAction} className="mt-4 grid gap-4">
                  <input name="id" type="hidden" value={user.id} />
                  <Input defaultValue={user.fullName} label="نام" name="fullName" required />
                  <Input defaultValue={user.email} label="ایمیل" name="email" required type="email" />
                  <Input label="رمز جدید (اختیاری)" name="password" type="password" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      <span>نقش</span>
                      <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={user.role} name="role">
                        <option value="admin">admin</option>
                        <option value="editor">editor</option>
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      <span>وضعیت</span>
                      <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={user.status} name="status">
                        <option value="active">فعال</option>
                        <option value="disabled">غیرفعال</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={user.status === "active" ? "green" : "muted"}>
                      {user.status === "active" ? "فعال" : "غیرفعال"}
                    </Badge>
                    <Button type="submit">ذخیره کاربر</Button>
                  </div>
                </form>
              </details>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">ایجاد کاربر</h2>
          <form action={saveUserAction} className="grid gap-4">
            <Input label="نام" name="fullName" required />
            <Input label="ایمیل" name="email" required type="email" />
            <Input label="رمز عبور" name="password" required type="password" />
            <label className="grid gap-2 text-sm font-medium text-foreground">
              <span>نقش</span>
              <select className="h-11 rounded-xl border border-border bg-background px-3" name="role">
                <option value="editor">editor</option>
                <option value="admin">admin</option>
              </select>
            </label>
            <input name="status" type="hidden" value="active" />
            <Button type="submit">ایجاد کاربر</Button>
          </form>
        </Card>
      </div>
    </AdminShell>
  );
}
