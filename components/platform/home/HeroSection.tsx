import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";
import { HeroDashboardPreview } from "@/components/platform/home/HeroDashboardPreview";

export function HeroSection() {
  return (
    <section className="bg-[radial-gradient(circle_at_20%_10%,rgba(212,166,74,.22),transparent_34rem),linear-gradient(135deg,#071225,#0B172A_48%,#17213A)] py-10 lg:py-16">
      <Container className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-[#C9973F]/40 bg-[#C9973F]/15 px-4 py-2 text-sm font-black text-[#D4A64A]">
            VakilBashi + Daftarkhoone + DocuSign
          </span>
          <h1 className="mt-6 text-balance text-4xl font-black leading-[1.25] text-white md:text-6xl">
            پلتفرم کامل خدمات حقوقی، بانک قرارداد و امضای دیجیتال
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-bold leading-9 text-slate-200">
            از انتخاب خدمت تا تنظیم قرارداد، ثبت درخواست، مدیریت CRM، پورتال موکل، آرشیو اسناد و ارسال گروهی امضا در یک سامانه حرفه‌ای و فارسی.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-[#C9973F] px-6 py-4 text-sm font-black text-white shadow-[0_18px_44px_rgba(201,151,63,.28)]" href="/requests/new">
              ثبت درخواست جدید
            </Link>
            <Link className="rounded-xl border border-white/20 px-6 py-4 text-sm font-black text-white" href="/dashboard">
              ورود به داشبورد
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["۸ خدمت تخصصی", "۲۴ قرارداد آماده", "۵۰ درخواست CRM"].map((item) => (
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-black text-slate-100" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <HeroDashboardPreview />
      </Container>
    </section>
  );
}
