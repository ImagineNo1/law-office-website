import type { Metadata } from "next";
import { ContactCta } from "@/components/site/ContactCta";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "درباره ما",
};

export default function AboutPage() {
  const values = ["محرمانگی کامل اطلاعات", "تحلیل دقیق مدارک", "گزارش دهی شفاف", "پیگیری مرحله به مرحله"];

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-gold">درباره ما</p>
            <h1 className="mt-3 text-4xl font-black leading-[1.35] text-foreground">موسسه ای برای راهبری حقوقی دقیق و قابل اعتماد</h1>
            <p className="mt-6 leading-9 text-muted">
              هدف موسسه، تبدیل مسائل پیچیده حقوقی به مسیرهای روشن اجرایی است. هر پرونده با ارزیابی مستندات، تشخیص ریسک ها و طراحی برنامه پیگیری آغاز می شود.
            </p>
          </div>
          <Card className="p-6">
            <h2 className="text-2xl font-black text-gold">ماموریت ما</h2>
            <p className="mt-4 leading-8 text-muted">حمایت حقوقی تخصصی از موکلین با حفظ کرامت، شفافیت و انضباط حرفه ای.</p>
          </Card>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {values.map((value) => (
            <Card className="p-5" key={value}>
              <p className="font-bold text-foreground">{value}</p>
            </Card>
          ))}
        </div>
      </section>
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
