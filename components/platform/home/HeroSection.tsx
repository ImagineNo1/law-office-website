import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";
import { HeroDashboardPreview } from "@/components/platform/home/HeroDashboardPreview";

function ArrowLeft() {
  return (
    <svg aria-hidden="true" className="mr-2 size-4" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5m6 7-7-7 7-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-4 text-accent" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 20 6v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6l8-3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-background to-accent/5" />
      <div className="absolute left-10 top-20 size-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 size-96 rounded-full bg-primary/5 blur-3xl" />

      <Container className="relative py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              VakilBashi + Daftarkhoone + DocuSign
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              پلتفرم کامل
              <br />
              <span className="text-accent">خدمات حقوقی،</span>
              <br />
              بانک قرارداد و امضای دیجیتال
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              از انتخاب خدمت تا تنظیم قرارداد، ثبت درخواست، مدیریت CRM، پورتال موکل، آرشیو اسناد و ارسال گروهی امضا در یک سامانه حرفه‌ای و فارسی.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition hover:bg-accent/90" href="/signup">
                ثبت درخواست جدید
                <ArrowLeft />
              </Link>
              <Link className="inline-flex items-center rounded-full border border-border bg-white px-8 py-3.5 text-base font-semibold text-foreground transition hover:bg-muted/50" href="/login">
                ورود به داشبورد
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldIcon />
                <span>امنیت بانکی</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span>۸ خدمت تخصصی</span>
              <div className="h-4 w-px bg-border" />
              <span>۲۴ قرارداد نمونه</span>
            </div>
          </div>

          <HeroDashboardPreview />
        </div>
      </Container>
    </section>
  );
}
