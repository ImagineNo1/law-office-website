import { PageShell } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { fa, recoveryServices } from "@/lib/platform-recovery-data";

export function RequestFormExperience() {
  return (
    <PageShell>
      <PublicHeader />
      <section className="py-8">
        <div className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-2xl bg-[#0B172A] p-6 text-white">
            <h1 className="text-3xl font-black">ثبت درخواست حقوقی</h1>
            <p className="mt-4 text-sm font-bold leading-8 text-slate-300">
              اطلاعات اولیه، خدمت، مدارک و فوریت را وارد کنید تا پرونده وارد CRM شود.
            </p>
            <div className="mt-6 grid gap-3">
              {["بررسی اولیه", "تخصیص وکیل", "پیگیری در داشبورد", "تحویل سند"].map((step, i) => (
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3" key={step}>
                  <span className="grid size-8 place-items-center rounded-full bg-[#C9973F] text-xs font-black">{fa(i + 1)}</span>
                  <span className="font-black">{step}</span>
                </div>
              ))}
            </div>
          </aside>
          <form className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
            <div className="grid gap-4 md:grid-cols-2">
              {["نام و نام خانوادگی", "شماره تماس", "ایمیل", "موضوع درخواست"].map((label) => (
                <label className="grid gap-2 text-sm font-black" key={label}>
                  {label}
                  <input className="h-12 rounded-xl border border-[#eadfce] px-4 outline-none focus:border-[#C9973F]" />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-black">
                <span>نوع خدمت</span>
                <select className="h-12 rounded-xl border border-[#eadfce] px-4">
                  {recoveryServices.map(([title, slug]) => <option key={slug}>{title}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black">
                <span>فوریت</span>
                <select className="h-12 rounded-xl border border-[#eadfce] px-4">
                  <option>عادی</option>
                  <option>فوری</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black md:col-span-2">
                شرح درخواست
                <textarea className="min-h-36 rounded-xl border border-[#eadfce] p-4 outline-none focus:border-[#C9973F]" />
              </label>
            </div>
            <button className="mt-6 h-12 rounded-xl bg-[#C9973F] px-8 text-sm font-black text-white">
              ارسال درخواست
            </button>
          </form>
        </div>
      </section>
      <PublicFooter />
    </PageShell>
  );
}
