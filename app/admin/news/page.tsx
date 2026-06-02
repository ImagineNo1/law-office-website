import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { adminRows } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "مدیریت اخبار",
};

export default function AdminNewsPage() {
  return (
    <AdminShell title="مدیریت اخبار" description="افزودن، ویرایش و حذف خبرهای موسسه">
      <Card className="p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-foreground">مدیریت اخبار</h1>
          <p className="mt-2 text-sm text-muted">افزودن، ویرایش و حذف خبرهای موسسه</p>
        </div>
        <Button>افزودن خبر</Button>
      </div>
      <AdminTable rows={adminRows.map((row) => ({ ...row, category: "خبر موسسه" }))} />
      </Card>
    </AdminShell>
  );
}
