import type { Metadata } from "next";
import { updateClientProfileAction } from "@/app/dashboard/actions";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { PortalCard, ProfileCard } from "@/components/dashboard/ClientPortalUi";
import { getClientProfileData } from "@/lib/client-portal-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پروفایل کاربری" };

export default async function DashboardProfilePage({ searchParams }: { searchParams?: Promise<{ error?: string; saved?: string }> }) {
  const emptyParams: { error?: string; saved?: string } = {};
  const [profile, params] = await Promise.all([
    getClientProfileData(),
    searchParams ? searchParams : Promise.resolve(emptyParams),
  ]);

  return (
    <ClientPortalShell title="پروفایل کاربری">
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <ProfileCard profile={profile} />
        <PortalCard className="p-6">
          <h2 className="text-xl font-black text-navy">اطلاعات شخصی</h2>
          {params.error ? <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700">{params.error}</p> : null}
          {params.saved ? <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">تغییرات پروفایل ذخیره شد.</p> : null}
          <form action={updateClientProfileAction} className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="نام و نام خانوادگی" name="fullName" value={profile.fullName} />
            <Field label="شماره تماس" name="phone" value={profile.phone} />
            <Field label="ایمیل" name="email" type="email" value={profile.email} />
            <Field label="کد ملی" name="nationalCode" value={profile.nationalCode} />
            <Field className="md:col-span-2" label="آدرس" name="address" value={profile.address} />
            <div className="md:col-span-2">
              <button className="rounded-xl bg-gold px-6 py-3 text-sm font-black text-white" type="submit">ذخیره تغییرات</button>
            </div>
          </form>
        </PortalCard>
      </div>
    </ClientPortalShell>
  );
}

function Field({ className = "", label, name, type = "text", value }: { className?: string; label: string; name: string; type?: string; value: string }) {
  return <label className={`grid gap-2 text-sm font-black text-navy ${className}`}><span>{label}</span><input className="service-input" defaultValue={value} name={name} type={type} /></label>;
}
