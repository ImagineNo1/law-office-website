import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { PortalCard } from "@/components/dashboard/ClientPortalUi";

export const metadata: Metadata = { title: "تنظیمات" };

export default function DashboardSettingsPage() {
  const sections = ["اطلاعات شخصی", "تغییر رمز عبور", "تنظیمات اعلان‌ها", "حریم خصوصی"];
  return (
    <ClientPortalShell title="تنظیمات">
      <div className="grid gap-5">
        {sections.map((section) => <PortalCard className="p-6" key={section}><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-black text-navy">{section}</h2><p className="mt-2 text-sm font-bold text-muted">مدیریت {section} در پنل مشتری وکیل‌یار.</p></div><button className="rounded-xl border border-border px-5 py-3 text-sm font-black text-navy hover:border-gold hover:text-gold">ویرایش</button></div></PortalCard>)}
      </div>
    </ClientPortalShell>
  );
}
