import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";
import { PublicPageHero, PublicShell } from "@/components/platform/layout/PublicShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { submitContactMessageAction } from "@/lib/admin-actions";
import { getPageContent, getSiteSettings } from "@/lib/cms";
import { buildMetadata, getSeoForPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSeoForPath("/contact");
  return buildMetadata({
    path: "/contact",
    seo: page?.seo,
    title: page?.title ?? "ارتباط با ما",
  });
}

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
  const hasCleanContent = page?.content && !/تست|test|lorem|placeholder/i.test(page.content);

  return (
    <PublicShell>
      <PublicPageHero
        actions={<Link className="inline-flex h-12 items-center rounded-xl bg-[#0B172A] px-6 text-sm font-black text-white" href="/requests/new">ثبت درخواست حقوقی</Link>}
        description={hasCleanContent ? page.content ?? "" : "برای دریافت راهنمایی، ثبت پیام یا شروع درخواست حقوقی، از فرم تماس یا اطلاعات ارتباطی موسسه استفاده کنید."}
        eyebrow="ارتباط"
        title={page?.title && !/تست|test|lorem|placeholder/i.test(page.title) ? page.title : "تماس با ما"}
      />
      <section className="py-12">
        <Container className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-2xl font-black text-[#0B172A]">راه‌های ارتباطی</h2>
          <div className="mt-5 grid gap-4">
            {contactRows.map(([label, value]) => (
              <Card className="p-5" key={label}>
                <p className="text-sm text-gold">{label}</p>
                <p className="mt-2 font-bold text-foreground">{value || "ثبت نشده"}</p>
              </Card>
            ))}
            <div className="rounded-2xl border border-accent/20 bg-accent/10 p-5 text-sm font-bold leading-8 text-slate-700">
              برای شروع سریع‌تر، می‌توانید درخواست حقوقی خود را مستقیم ثبت کنید تا مسیر بررسی و پیگیری آن در داشبورد شما قابل مشاهده باشد.
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
        </Container>
      </section>
    </PublicShell>
  );
}
