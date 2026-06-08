import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { saveSettingsAction } from "@/lib/admin-actions";
import { getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تنظیمات سایت",
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell title="تنظیمات سایت" description="اطلاعات عمومی، تماس، شبکه های اجتماعی و سئو">
      <Card className="p-5">
        <h2 className="mb-5 text-xl font-black text-foreground">تنظیمات سایت</h2>
        <form action={saveSettingsAction} className="grid gap-4">
          <Input defaultValue={settings.siteTitle} label="عنوان سایت" name="siteTitle" required />
          <Input defaultValue={settings.logoText} label="متن لوگو / نام موسسه" name="logoText" />
          <Textarea defaultValue={settings.siteDescription} label="توضیحات سایت" name="siteDescription" />
          <div className="grid gap-4 md:grid-cols-2">
            <Input defaultValue={settings.phone} label="تلفن" name="phone" />
            <Input defaultValue={settings.email} label="ایمیل" name="email" />
          </div>
          <Textarea defaultValue={settings.address} label="نشانی" name="address" />
          <Input defaultValue={settings.workingHours} label="ساعات کاری" name="workingHours" />
          <div className="grid gap-4 md:grid-cols-3">
            <Input defaultValue={settings.socialLinks.instagram} label="اینستاگرام" name="instagram" />
            <Input defaultValue={settings.socialLinks.linkedin} label="لینکدین" name="linkedin" />
            <Input defaultValue={settings.socialLinks.telegram} label="تلگرام" name="telegram" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input defaultValue={settings.seoTitle} label="SEO title" name="seoTitle" />
            <Input defaultValue={settings.seoDescription} label="SEO description" name="seoDescription" />
          </div>
          <Button type="submit">ذخیره تنظیمات</Button>
        </form>
      </Card>
    </AdminShell>
  );
}
