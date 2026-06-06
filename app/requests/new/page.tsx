import type { Metadata } from "next";
import { createServiceRequestAction } from "@/app/requests/actions";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getPublishedServices, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "ثبت درخواست حقوقی" };

export default async function NewRequestPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getPublishedServices()]);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader settings={settings} />
      <section className="soft-page-bg py-10 sm:py-14">
        <div className="container-shell">
          <div className="mb-8 text-center">
            <p className="text-sm font-black text-gold">CRM حقوقی عدالت گستر</p>
            <h1 className="mt-3 text-4xl font-black text-navy">ثبت درخواست جدید</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-7 text-muted">درخواست خود را ثبت کنید تا تیم حقوقی، مدارک و مسیر اقدام را در کارتابل اختصاصی پیگیری کند.</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[300px_1fr]" dir="ltr">
            <aside className="rounded-2xl bg-navy p-6 text-white shadow-soft" dir="rtl">
              <div className="legal-hero-visual min-h-64 rounded-2xl p-5 shadow-inner" />
              <h2 className="mt-6 text-2xl font-black">نیاز به کمک حقوقی دارید؟</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-300">فرم مقابل را تکمیل کنید تا کارشناس ما در کمتر از ۲۴ ساعت با شما تماس بگیرد.</p>
              <div className="mt-6 grid gap-3 text-sm font-black">
                {["پاسخ سریع", "مشاوره تخصصی", "حفظ اطلاعات شما"].map((item) => <span className="flex items-center gap-2" key={item}><span className="grid size-6 place-items-center rounded-full border border-gold text-gold">✓</span>{item}</span>)}
              </div>
              <div className="mt-8 rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-300">پشتیبانی ۲۴ ساعته</p><strong className="mt-2 block text-xl text-gold">۰۲۱-۱۲۳۴۵۶۷۸</strong></div>
            </aside>

            <form action={createServiceRequestAction} className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8" dir="rtl">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="نام و نام خانوادگی" required><input className="service-input" name="fullName" placeholder="نام و نام خانوادگی خود را وارد کنید" required /></Field>
                <Field label="شماره تماس" required><input className="service-input" name="phone" inputMode="tel" placeholder="09123456789" required /></Field>
                <Field label="ایمیل"><input className="service-input" name="email" type="email" placeholder="example@email.com" /></Field>
                <Field label="نوع خدمت" required>
                  <select className="service-input" name="serviceSlug" required>
                    {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
                  </select>
                </Field>
                <Field label="موضوع درخواست" required className="md:col-span-2"><input className="service-input" name="subject" placeholder="موضوع درخواست خود را وارد کنید" required /></Field>
                <Field label="توضیحات" required className="md:col-span-2"><textarea className="service-input min-h-36 resize-none py-3" name="description" placeholder="شرح کامل درخواست، مدارک موجود و فوریت موضوع را بنویسید..." required /></Field>
                <Field label="فایل پیوست" className="md:col-span-2"><input className="service-input file:ml-3 file:rounded-lg file:border-0 file:bg-soft-gray file:px-3 file:py-2 file:text-sm file:font-black file:text-navy" name="attachment" type="file" /></Field>
              </div>
              <button className="mt-6 h-12 w-full rounded-xl bg-gold text-sm font-black text-white shadow-[0_16px_34px_rgba(201,151,63,0.28)]" type="submit">ارسال درخواست</button>
              <p className="mt-4 text-center text-xs font-bold text-muted">اطلاعات شما کاملا محرمانه حفظ می‌شود.</p>
            </form>
          </div>
        </div>
      </section>
      <SiteFooter settings={settings} />
    </main>
  );
}

function Field({ children, className = "", label, required }: { children: React.ReactNode; className?: string; label: string; required?: boolean }) {
  return <label className={`grid gap-2 text-sm font-black text-navy ${className}`}><span>{label}{required ? <span className="mr-1 text-red-600">*</span> : null}</span>{children}</label>;
}
