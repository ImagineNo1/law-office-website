import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";
import { HeroDashboardPreview } from "@/components/platform/home/HeroDashboardPreview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff,#f8fafc_58%,rgba(201,151,63,.08))] py-16 lg:py-24">
      <div className="absolute left-10 top-20 size-72 rounded-full bg-[#C9973F]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 size-96 rounded-full bg-[#0B172A]/5 blur-3xl" />
      <Container className="relative grid gap-14 lg:grid-cols-[1fr_.95fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-[#C9973F]/25 bg-[#C9973F]/10 px-4 py-2 text-sm font-black text-[#A87522]">
            VakilBashi + Daftarkhoone + DocuSign
          </span>
          <h1 className="mt-6 text-balance text-4xl font-black leading-[1.32] text-slate-950 md:text-6xl">
            پلتفرم کامل خدمات حقوقی، بانک قرارداد و امضای دیجیتال
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-bold leading-9 text-slate-500">
            از انتخاب خدمت تا تنظیم قرارداد، ثبت درخواست، مدیریت CRM، پرتال موکل، آرشیو اسناد و ارسال گروهی امضا در یک سامانه حرفه ای و فارسی.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-[#C9973F] px-8 py-4 text-sm font-black text-[#0B172A] shadow-[0_18px_44px_rgba(201,151,63,.26)] transition hover:bg-[#D4A64A]" href="/requests/new">
              ثبت درخواست جدید
            </Link>
            <Link className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50" href="/login">
              ورود به داشبورد
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm font-bold text-slate-500">
            {["امنیت سازمانی", "۸ خدمت تخصصی", "۲۴ قرارداد آماده"].map((item) => (
              <span className="flex items-center gap-2" key={item}>
                <span className="size-1.5 rounded-full bg-[#C9973F]" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <HeroDashboardPreview />
      </Container>
    </section>
  );
}
