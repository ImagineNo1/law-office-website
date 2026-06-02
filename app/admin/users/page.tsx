import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "مدیریت کاربران",
};

export default function AdminUsersPage() {
  const users = [
    { name: "مدیر سیستم", email: "admin@deladgostar.com", role: "admin", status: "فعال" },
    { name: "ویرایشگر محتوا", email: "editor@deladgostar.com", role: "editor", status: "فعال" },
    { name: "مشاور حقوقی", email: "advisor@deladgostar.com", role: "advisor", status: "در انتظار" },
  ];

  return (
    <AdminShell title="کاربران" description="مدیریت دسترسی مدیران، نویسندگان و مشاوران">
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h1 className="text-xl font-black text-foreground">فهرست کاربران</h1>
            <Button>افزودن کاربر</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="px-4 py-3 text-right">نام</th>
                  <th className="px-4 py-3 text-right">ایمیل</th>
                  <th className="px-4 py-3 text-right">نقش</th>
                  <th className="px-4 py-3 text-right">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-t border-border" key={user.email}>
                    <td className="px-4 py-4 font-bold">{user.name}</td>
                    <td className="px-4 py-4 text-muted">{user.email}</td>
                    <td className="px-4 py-4 text-muted">{user.role}</td>
                    <td className="px-4 py-4">
                      <Badge tone={user.status === "فعال" ? "green" : "muted"}>{user.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">دعوت کاربر</h2>
          <form className="grid gap-4">
            <Input label="نام" />
            <Input label="ایمیل" type="email" />
            <Input label="نقش" placeholder="admin / editor / advisor" />
            <Button type="submit">ارسال دعوت نامه</Button>
          </form>
        </Card>
      </div>
    </AdminShell>
  );
}
