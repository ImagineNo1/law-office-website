import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { submitContactMessageAction } from "@/lib/admin-actions";
import { getPageContent, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ارتباط با ما",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const [{ sent }, settings, page] = await Promise.all([
    searchParams,
    getSiteSettings(),
    getPageContent("contact"),
  ]);
  const contactRows = [
    ["تلفن", settings.phone],
    ["ایمیل", settings.email],
    ["نشانی", settings.address],
    ["ساعات کاری", settings.workingHours],
  ];

  return (
    <main>
      <SiteHeader settings={settings} />
      <section className="container-shell grid gap-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold text-gold">ارتباط با ما</p>
          <h1 className="mt-3 text-4xl font-black text-foreground">
            {page?.title ?? "ثبت درخواست مشاوره"}
          </h1>
          {page?.content ? (
            <p className="mt-5 whitespace-pre-line leading-8 text-muted">
              {page.content}
            </p>
          ) : null}
          <div className="mt-8 grid gap-4">
            {contactRows.map(([label, value]) => (
              <Card className="p-5" key={label}>
                <p className="text-sm text-gold">{label}</p>
                <p className="mt-2 text-foreground">{value}</p>
              </Card>
            ))}
            <div className="min-h-56 rounded-2xl border border-border bg-[linear-gradient(135deg,rgba(200,155,60,0.12),rgba(247,248,250,0.9))] p-5 text-muted dark:bg-[linear-gradient(135deg,rgba(200,155,60,0.12),rgba(17,24,39,0.9))]">
              محدوده نقشه دفتر موسسه
            </div>
          </div>
        </div>
        <Card className="p-6">
          {sent ? (
            <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-700 dark:text-emerald-300">
              پیام شما ثبت شد و برای پیگیری به تیم موسسه ارسال شد.
            </div>
          ) : null}
          <form action={submitContactMessageAction} className="grid gap-4">
            <Input label="نام و نام خانوادگی" name="fullName" placeholder="نام شما" required />
            <Input label="شماره تماس" name="phone" placeholder="۰۹۱۲..." required />
            <Input label="ایمیل" name="email" placeholder="name@example.com" type="email" />
            <Input label="موضوع" name="subject" placeholder="موضوع درخواست" required />
            <Textarea
              label="شرح درخواست"
              name="message"
              placeholder="خلاصه موضوع حقوقی خود را بنویسید"
              required
            />
            <Button type="submit">ارسال پیام</Button>
          </form>
        </Card>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}
