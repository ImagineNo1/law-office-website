import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/platform/layout/PageShell";

function ArrowLeft() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5m6 7-7-7 7-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
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

function ScaleMiniIcon() {
  return (
    <svg aria-hidden="true" className="size-4 text-muted-foreground" viewBox="0 0 24 24" fill="none">
      <path d="m16 16 3-7 3 7M2 16l3-7 3 7M12 3v18M5 9h14M4 16h5M15 16h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg aria-hidden="true" className="size-4 text-muted-foreground" viewBox="0 0 24 24" fill="none">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white" dir="rtl">
      <Container className="max-w-[1540px] py-14 sm:py-18 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:[direction:ltr]">
          <div className="order-2 lg:order-none">
            <div className="relative mx-auto max-w-[680px]">
              <div className="absolute -left-14 top-16 hidden grid-cols-4 gap-4 md:grid">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span className="size-1.5 rounded-full bg-accent/60" key={index} />
                ))}
              </div>
              <Image
                alt="پرونده حقوقی، قرارداد امضا شده و مهر دفترخانه روی میز"
                className="relative aspect-[1.27/1] w-full rounded-[24px] border border-border object-cover shadow-[0_30px_90px_rgba(11,23,42,0.14)]"
                height={992}
                priority
                sizes="(min-width: 1024px) 48vw, 92vw"
                src="/home-legal-desk-hero.png"
                width={1586}
              />
            </div>
          </div>

          <div className="order-1 text-center lg:order-none lg:[direction:rtl] lg:text-right">
            <span className="mb-6 inline-flex rounded-full border border-accent/20 bg-[#fbf7ee] px-5 py-2 text-sm font-bold text-accent">
              VakilBashi + Daftarkhoone + DocuSign
            </span>
            <h1 className="text-4xl font-black leading-[1.45] text-foreground sm:text-5xl lg:text-[58px] xl:text-[64px]">
              پلتفرم کامل
              <br />
              <span className="text-accent">خدمات حقوقی،</span>
              <br />
              بانک قراردادها و امضای
              <br />
              دیجیتال
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-9 text-muted-foreground lg:mx-0">
              از انتخاب خدمت تا تنظیم قرارداد، ثبت درخواست، مدیریت CRM، ارسال اسناد و دریافت امضای دیجیتال در یک سامانه حرفه‌ای و فارسی.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link className="inline-flex min-h-16 items-center gap-3 rounded-full bg-accent px-8 text-base font-black text-accent-foreground shadow-[0_20px_50px_rgba(212,168,67,0.28)] transition hover:bg-accent/90" href="/requests/new">
                ثبت درخواست جدید
                <ArrowLeft />
              </Link>
              <Link className="inline-flex min-h-16 items-center gap-3 rounded-full border border-border bg-white px-8 text-base font-black text-foreground shadow-sm transition hover:border-accent hover:text-accent" href="/login">
                ورود به داشبورد
                <UserIcon />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm font-bold text-muted-foreground lg:justify-start">
              <div className="flex items-center gap-2">
                <ShieldIcon />
                <span>امنیت بانکی</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <ScaleMiniIcon />
                <span>۸ خدمت تخصصی</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <FileIcon />
                <span>۲۴ قرارداد نمونه</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
