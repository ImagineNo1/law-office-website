import type { Metadata } from "next";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { PortalCard, ProfileCard } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const metadata: Metadata = { title: "پروفایل کاربری" };

export default function DashboardProfilePage() {
  const { profile } = getClientDashboardData();
  return (
    <ClientPortalShell title="پروفایل کاربری">
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <ProfileCard profile={profile} />
        <PortalCard className="p-6">
          <h2 className="text-xl font-black text-navy">اطلاعات شخصی</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="نام و نام خانوادگی" value={profile.fullName} />
            <Field label="شماره تماس" value={profile.phone} />
            <Field label="ایمیل" value={profile.email} />
            <Field label="کد ملی" value={profile.nationalCode} />
            <Field className="md:col-span-2" label="آدرس" value={profile.address} />
          </div>
          <button className="mt-6 rounded-xl bg-gold px-6 py-3 text-sm font-black text-white">ذخیره تغییرات</button>
        </PortalCard>
      </div>
    </ClientPortalShell>
  );
}

function Field({ className = "", label, value }: { className?: string; label: string; value: string }) {
  return <label className={`grid gap-2 text-sm font-black text-navy ${className}`}><span>{label}</span><input className="service-input" defaultValue={value} /></label>;
}
