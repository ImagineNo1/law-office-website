import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactInfo } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "تنظیمات سایت",
};

export default function AdminSettingsPage() {
  return (
    <AdminShell title="تنظیمات سایت" description="اطلاعات عمومی، تماس، شبکه های اجتماعی و سئو">
      <Card className="p-5">
      <h1 className="mb-5 text-xl font-black text-foreground">تنظیمات سایت</h1>
      <form className="grid gap-4">
        <Input defaultValue="موسسه حقوقی عدالت گستر" label="عنوان سایت" />
        <Textarea defaultValue="ارائه خدمات حقوقی تخصصی و مشاوره محرمانه" label="توضیحات سایت" />
        <div className="grid gap-4 md:grid-cols-2">
          <Input defaultValue={contactInfo.phone} label="تلفن" />
          <Input defaultValue={contactInfo.email} label="ایمیل" />
        </div>
        <Textarea defaultValue={contactInfo.address} label="نشانی" />
        <Input defaultValue={contactInfo.workingHours} label="ساعات کاری" />
        <div className="grid gap-4 md:grid-cols-3">
          <Input label="اینستاگرام" />
          <Input label="لینکدین" />
          <Input label="تلگرام" />
        </div>
        <Button type="submit">ذخیره تنظیمات</Button>
      </form>
      </Card>
    </AdminShell>
  );
}
