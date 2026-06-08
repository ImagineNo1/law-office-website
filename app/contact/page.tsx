import type { Metadata } from "next";
import { Container } from "@/components/platform/layout/PageShell";
import { PublicShell } from "@/components/platform/layout/PublicShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { submitContactMessageAction } from "@/lib/admin-actions";
import { getSiteSettings } from "@/lib/cms";
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
  const [{ sent }, settings] = await Promise.all([
    searchParams,
    getSiteSettings(),
  ]);
  const contactRows = [
    ["تلفن", settings.phone],
    ["ایمیل", settings.email],
    ["نشانی", settings.address],
    ["ساعات کاری", settings.workingHours],
  ];

  return (
    <PublicShell>
      <section
        className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.22),transparent_28%),linear-gradient(135deg,#ECFDF5_0%,#FFFFFF_48%,#F0FDFA_100%)] py-14 sm:py-18"
        dir="rtl"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[2rem] border border-emerald-100 bg-white/78 p-6 shadow-[0_24px_70px_rgba(15,118,110,0.12)] backdrop-blur sm:p-8">
              <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-700">
                راه‌های ارتباطی
              </span>
              <h1 className="mt-5 text-3xl font-black leading-[1.45] text-[#064E3B] sm:text-5xl">
                پیام خود را برای تیم حقوقی ارسال کنید
              </h1>
              <p className="mt-5 text-base font-bold leading-9 text-emerald-900/70">
                اطلاعات تماس موسسه و فرم پیام در همین صفحه قرار دارد تا سریع‌تر
                موضوع شما بررسی و پاسخ داده شود.
              </p>
              <div className="mt-8 grid gap-4">
                {contactRows.map(([label, value]) => (
                  <Card
                    className="border-emerald-100 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,118,110,0.08)]"
                    key={label}
                  >
                    <p className="text-sm font-black text-emerald-700">
                      {label}
                    </p>
                    <p className="mt-2 font-bold text-emerald-950">
                      {value || "ثبت نشده"}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border-emerald-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,118,110,0.10)] sm:p-8">
              <h2 className="text-2xl font-black text-[#064E3B]">
                فرم ارسال پیام
              </h2>
              <p className="mt-2 text-sm font-bold leading-7 text-emerald-900/60">
                جزئیات اولیه را بنویسید تا همکاران ما برای هماهنگی بعدی با شما
                تماس بگیرند.
              </p>
              {sent ? (
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  پیام شما ثبت شد و برای پیگیری به تیم موسسه ارسال شد.
                </div>
              ) : null}
              <form
                action={submitContactMessageAction}
                className="mt-6 grid gap-4"
              >
                <Input
                  label="نام و نام خانوادگی"
                  name="fullName"
                  placeholder="نام شما"
                  required
                />
                <Input
                  label="شماره تماس"
                  name="phone"
                  placeholder="۰۹۱۲..."
                  required
                />
                <Input
                  label="ایمیل"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                />
                <Input
                  label="موضوع"
                  name="subject"
                  placeholder="موضوع پیام"
                  required
                />
                <Textarea
                  label="شرح پیام"
                  name="message"
                  placeholder="خلاصه موضوع خود را بنویسید"
                  required
                />
                <Button
                  className="bg-emerald-700 text-white hover:bg-emerald-800"
                  type="submit"
                >
                  ارسال پیام
                </Button>
              </form>
            </Card>
          </div>
        </Container>
      </section>
    </PublicShell>
  );
}
