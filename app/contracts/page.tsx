import type { Metadata } from "next";
import { ContractBankClient } from "@/components/contracts/ContractBankClient";
import { ContractIcon } from "@/components/contracts/ContractIcons";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Container } from "@/components/ui/Foundation";
import { contractCategories } from "@/lib/contract-data";
import { getPublishedContracts, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "بانک قراردادها",
  description: "بانک نمونه قراردادهای حقوقی قابل دریافت، جستجو و تنظیم اختصاصی",
};

export default async function ContractsPage() {
  const [settings, contracts] = await Promise.all([getSiteSettings(), getPublishedContracts()]);

  return (
    <main className="min-h-screen bg-[#F7F3EA]">
      <SiteHeader settings={settings} />
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0B172A,#17213A)] py-14 text-white sm:py-18">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(212,166,74,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(212,166,74,.15)_1px,transparent_1px)] [background-size:44px_44px]" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-gold/35 bg-gold/15 px-4 py-2 text-xs font-black text-gold-light">Contract Bank Platform</span>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-black leading-[1.3] sm:text-5xl lg:text-6xl">بانک قراردادهای حقوقی آماده و قابل تنظیم</h1>
              <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-slate-200">قراردادهای تخصصی فارسی با طراحی ممتاز، ساختار حرفه‌ای و پشتیبانی حقوقی برای معاملات ملکی، استخدامی، شراکت، پیمانکاری و کسب‌وکار.</p>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-white/8 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
              <div className="grid grid-cols-2 gap-3 text-center">
                <Stat value="۲۰+" label="قرارداد آماده" />
                <Stat value="۸" label="دسته تخصصی" />
                <Stat value="۲۴/۷" label="دریافت فوری" />
                <Stat value="وکیل" label="بازبینی تخصصی" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container>
          <ContractBankClient categories={[...contractCategories]} contracts={contracts} />
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="rounded-[34px] border border-[#e5dac7] bg-white p-6 shadow-[0_24px_70px_rgba(11,23,42,0.08)] sm:p-8">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-sm font-black text-gold">چرا بانک قراردادهای ما؟</span>
                <h2 className="mt-2 text-3xl font-black text-navy">چرا از بانک قراردادهای ما استفاده کنید؟</h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {["صرفه‌جویی در زمان", "پشتیبانی حقوقی", "بروزرسانی رایگان", "تضمین کیفیت"].map((item, index) => (
                <div className="rounded-[26px] border border-gold/20 bg-[linear-gradient(180deg,#fff,#FCF7ED)] p-5 shadow-[0_14px_40px_rgba(11,23,42,0.05)]" key={item}>
                  <span className="grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold"><ContractIcon name={["clock", "support", "download", "shield"][index]} /></span>
                  <h3 className="mt-5 text-lg font-black text-navy">{item}</h3>
                  <p className="mt-2 text-sm font-bold leading-7 text-muted">تجربه‌ای سریع، امن و حرفه‌ای برای انتخاب و دریافت قرارداد حقوقی.</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black text-gold-light">{value}</p><p className="mt-1 text-xs font-black text-slate-300">{label}</p></div>;
}
