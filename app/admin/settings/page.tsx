import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  saveHomeContentAction,
  saveSettingsAction,
} from "@/lib/admin-actions";
import { getHomeContent, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تنظیمات سایت",
};

function featureLines(
  items: { title: string; excerpt: string; icon?: string; order?: number }[],
) {
  return items
    .map(
      (item, index) =>
        `${item.title}|${item.excerpt}|${item.icon ?? "shield"}|${item.order ?? index}`,
    )
    .join("\n");
}

function statLines(
  items: { value: string; label: string; icon?: string; order?: number }[],
) {
  return items
    .map(
      (item, index) =>
        `${item.value}|${item.label}|${item.icon ?? "scale"}|${item.order ?? index}`,
    )
    .join("\n");
}

export default async function AdminSettingsPage() {
  const [settings, home] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
  ]);

  return (
    <AdminShell
      title="تنظیمات سایت"
      description="اطلاعات عمومی، برند، محتوای صفحه اصلی، فوتر و سئو"
    >
      <div className="grid gap-6">
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">
            تنظیمات برند، عنوان و فوتر
          </h2>
          <form
            action={saveSettingsAction}
            className="grid gap-4"
            encType="multipart/form-data"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                defaultValue={settings.siteTitle}
                label="عنوان سایت در تگ head title"
                name="siteTitle"
                required
              />
              <Input
                defaultValue={settings.logoText}
                label="نام موسسه / عنوان برند"
                name="logoText"
              />
            </div>
            <Textarea
              defaultValue={settings.siteDescription}
              label="توضیحات سایت / تیتر اصلی صفحه اول"
              name="siteDescription"
            />
            <Textarea
              defaultValue={settings.detailedDescription}
              label="توضیحات جزئی صفحه اول"
              name="detailedDescription"
            />
            <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
              <Input
                defaultValue={settings.siteIcon}
                label="آدرس آیکون فعلی سایت"
                name="siteIcon"
                placeholder="در صورت آپلود، خودکار پر می‌شود"
              />
              <Input
                accept="image/*"
                label="آپلود آیکون سایت"
                name="siteIconFile"
                type="file"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input defaultValue={settings.phone} label="تلفن" name="phone" />
              <Input defaultValue={settings.email} label="ایمیل" name="email" />
            </div>
            <Textarea
              defaultValue={settings.address}
              label="نشانی"
              name="address"
            />
            <Input
              defaultValue={settings.workingHours}
              label="ساعات کاری"
              name="workingHours"
            />
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                defaultValue={settings.socialLinks.instagram}
                label="اینستاگرام"
                name="instagram"
              />
              <Input
                defaultValue={settings.socialLinks.linkedin}
                label="لینکدین"
                name="linkedin"
              />
              <Input
                defaultValue={settings.socialLinks.telegram}
                label="تلگرام"
                name="telegram"
              />
            </div>
            <Textarea
              defaultValue={settings.footerDescription}
              label="متن توضیحی فوتر"
              name="footerDescription"
            />
            <Input
              defaultValue={settings.footerCopyright}
              label="متن کپی‌رایت فوتر"
              name="footerCopyright"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                defaultValue={settings.seoTitle}
                label="SEO title"
                name="seoTitle"
              />
              <Input
                defaultValue={settings.seoDescription}
                label="SEO description"
                name="seoDescription"
              />
            </div>
            <Button type="submit">ذخیره تنظیمات برند</Button>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">
            تنظیمات محتوای صفحه اصلی
          </h2>
          <form action={saveHomeContentAction} className="grid gap-5">
            <div className="rounded-2xl border border-border p-4">
              <h3 className="mb-4 font-black text-foreground">
                ۵ مرحله از ثبت درخواست تا نتیجه نهایی
              </h3>
              <Textarea
                defaultValue={featureLines(home.processSteps)}
                label="هر خط: عنوان مرحله|توضیح مرحله|آیکون|ترتیب"
                name="processSteps"
              />
            </div>

            <div className="rounded-2xl border border-border p-4">
              <h3 className="mb-4 font-black text-foreground">
                همراهی تیم حقوقی در مسیر پرونده شما
              </h3>
              <Input
                defaultValue={home.legalSupport.eyebrow}
                label="برچسب بالای بخش"
                name="legalSupportEyebrow"
              />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  defaultValue={home.legalSupport.title}
                  label="عنوان بخش"
                  name="legalSupportTitle"
                />
                <Textarea
                  defaultValue={home.legalSupport.description}
                  label="متن زیر عنوان"
                  name="legalSupportDescription"
                />
              </div>
              <Textarea
                defaultValue={featureLines(home.legalSupportCards)}
                label="۴ کارت بخش: عنوان|توضیح|آیکون|ترتیب"
                name="legalSupportCards"
              />
            </div>

            <div className="rounded-2xl border border-border p-4">
              <h3 className="mb-4 font-black text-foreground">
                شروع شفاف و قابل پیگیری
              </h3>
              <Input
                defaultValue={home.finalCta.eyebrow}
                label="برچسب بخش"
                name="finalCtaEyebrow"
              />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  defaultValue={home.finalCta.title}
                  label="عنوان بخش"
                  name="finalCtaTitle"
                />
                <Textarea
                  defaultValue={home.finalCta.description}
                  label="متن زیر عنوان"
                  name="finalCtaDescription"
                />
              </div>
            </div>

            <input name="heroEyebrow" type="hidden" value={home.hero.eyebrow} />
            <input name="heroTitle" type="hidden" value={home.hero.title} />
            <input
              name="heroDescription"
              type="hidden"
              value={home.hero.description}
            />
            <input
              name="primaryCtaLabel"
              type="hidden"
              value={home.hero.primaryCtaLabel}
            />
            <input
              name="primaryCtaHref"
              type="hidden"
              value={home.hero.primaryCtaHref}
            />
            <input
              name="secondaryCtaLabel"
              type="hidden"
              value={home.hero.secondaryCtaLabel}
            />
            <input
              name="secondaryCtaHref"
              type="hidden"
              value={home.hero.secondaryCtaHref}
            />
            <input
              name="consultationTitle"
              type="hidden"
              value={home.hero.consultationTitle}
            />
            <input
              name="consultationText"
              type="hidden"
              value={home.hero.consultationText}
            />
            <input
              name="trustFeatures"
              type="hidden"
              value={featureLines(home.trustFeatures)}
            />
            <input name="stats" type="hidden" value={statLines(home.stats)} />
            <input
              name="contactEyebrow"
              type="hidden"
              value={home.contactCta.eyebrow}
            />
            <input
              name="contactTitle"
              type="hidden"
              value={home.contactCta.title}
            />
            <input
              name="contactDescription"
              type="hidden"
              value={home.contactCta.description}
            />
            <input
              name="contactPrimaryLabel"
              type="hidden"
              value={home.contactCta.primaryLabel}
            />
            <input
              name="contactPrimaryHref"
              type="hidden"
              value={home.contactCta.primaryHref}
            />
            <input
              name="contactSecondaryLabel"
              type="hidden"
              value={home.contactCta.secondaryLabel}
            />
            <input
              name="contactSecondaryHref"
              type="hidden"
              value={home.contactCta.secondaryHref}
            />

            <Button type="submit">ذخیره تنظیمات صفحه اصلی</Button>
          </form>
        </Card>
      </div>
    </AdminShell>
  );
}
