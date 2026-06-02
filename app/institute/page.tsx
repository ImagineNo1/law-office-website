import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { siteStats, services } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "معرفی موسسه",
};

export default function InstitutePage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-surface-strong p-8 shadow-soft lg:p-10">
          <p className="text-sm font-bold text-gold">معرفی موسسه</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.35] text-foreground">تجربه حقوقی در کنار رویکرد مدیریتی مدرن</h1>
          <p className="mt-6 max-w-4xl leading-9 text-muted">
            عدالت گستر برای پرونده هایی طراحی شده که به تحلیل دقیق، مستندسازی منظم و تصمیم گیری مرحله ای نیاز دارند. تمرکز اصلی موسسه بر دعاوی خانواده، قراردادها، شرکت ها و حل اختلاف است.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {siteStats.map((stat) => (
              <div className="rounded-2xl border border-border bg-surface p-4" key={stat.label}>
                <strong className="block text-2xl text-gold">{stat.value}</strong>
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
