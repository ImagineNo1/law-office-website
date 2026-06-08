import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SeoFields } from "@/components/admin/SeoFields";
import { Textarea } from "@/components/ui/Textarea";
import {
  saveHomeContentAction,
  savePageContentAction,
} from "@/lib/admin-actions";
import { getAllPageContent, getHomeContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت صفحات",
};

const pageLabels: Record<string, string> = {
  about: "درباره ما",
  institute: "معرفی موسسه",
  contact: "ارتباط با ما",
};

export default async function AdminPagesPage() {
  const [home, pages] = await Promise.all([
    getHomeContent(),
    getAllPageContent(),
  ]);
  const trustLines = home.trustFeatures
    .map(
      (item, index) =>
        `${item.title}|${item.excerpt}|${item.icon ?? "shield"}|${item.order ?? index}`,
    )
    .join("\n");
  const statLines = home.stats
    .map(
      (item, index) =>
        `${item.value}|${item.label}|${item.icon ?? "scale"}|${item.order ?? index}`,
    )
    .join("\n");

  return (
    <AdminShell
      title="مدیریت صفحات"
      description="مدیریت محتوای صفحه اصلی و صفحات ثابت سایت"
    >
      <div className="grid gap-6">
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">صفحه اصلی</h2>
          <form action={saveHomeContentAction} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                defaultValue={home.hero.eyebrow}
                label="Hero eyebrow"
                name="heroEyebrow"
              />
              <Input
                defaultValue={home.hero.title}
                label="Hero title"
                name="heroTitle"
              />
            </div>
            <Textarea
              defaultValue={home.hero.description}
              label="Hero description"
              name="heroDescription"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                defaultValue={home.hero.primaryCtaLabel}
                label="Primary CTA label"
                name="primaryCtaLabel"
              />
              <Input
                defaultValue={home.hero.primaryCtaHref}
                label="Primary CTA URL"
                name="primaryCtaHref"
              />
              <Input
                defaultValue={home.hero.secondaryCtaLabel}
                label="Secondary CTA label"
                name="secondaryCtaLabel"
              />
              <Input
                defaultValue={home.hero.secondaryCtaHref}
                label="Secondary CTA URL"
                name="secondaryCtaHref"
              />
            </div>
            <Input
              defaultValue={home.hero.consultationTitle}
              label="Consultation card title"
              name="consultationTitle"
            />
            <Textarea
              defaultValue={home.hero.consultationText}
              label="Consultation card text"
              name="consultationText"
            />
            <Textarea
              defaultValue={trustLines}
              label="Trust features: title|excerpt|icon|order"
              name="trustFeatures"
            />
            <Textarea
              defaultValue={statLines}
              label="Stats: value|label|icon|order"
              name="stats"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                defaultValue={home.contactCta.eyebrow}
                label="CTA eyebrow"
                name="contactEyebrow"
              />
              <Input
                defaultValue={home.contactCta.title}
                label="CTA title"
                name="contactTitle"
              />
            </div>
            <Textarea
              defaultValue={home.contactCta.description}
              label="CTA description"
              name="contactDescription"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                defaultValue={home.contactCta.primaryLabel}
                label="CTA primary label"
                name="contactPrimaryLabel"
              />
              <Input
                defaultValue={home.contactCta.primaryHref}
                label="CTA primary URL"
                name="contactPrimaryHref"
              />
              <Input
                defaultValue={home.contactCta.secondaryLabel}
                label="CTA secondary label"
                name="contactSecondaryLabel"
              />
              <Input
                defaultValue={home.contactCta.secondaryHref}
                label="CTA secondary URL"
                name="contactSecondaryHref"
              />
            </div>
            <Button type="submit">ذخیره صفحه اصلی</Button>
          </form>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {["about", "institute", "contact"].map((key) => {
            const page = pages.find((item) => item.key === key);

            return (
              <Card className="p-5" key={key}>
                <h2 className="mb-5 text-xl font-black text-foreground">
                  {pageLabels[key]}
                </h2>
                <form action={savePageContentAction} className="grid gap-4">
                  <input name="key" type="hidden" value={key} />
                  <Input
                    defaultValue={page?.title}
                    label="عنوان"
                    name="title"
                    required
                  />
                  <Input
                    defaultValue={page?.subtitle}
                    label="زیرعنوان"
                    name="subtitle"
                  />
                  <Textarea
                    defaultValue={page?.content}
                    label="محتوا"
                    name="content"
                  />
                  <SeoFields
                    seo={page?.seo}
                    title={String(page?.title ?? pageLabels[key])}
                  />
                  <Button type="submit">ذخیره محتوا</Button>
                </form>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
