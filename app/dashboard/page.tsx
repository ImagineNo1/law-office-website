import type { Metadata } from "next";
import Link from "next/link";
import { ActivityTimeline, ClientKpiCards, ProfileCard, QuickActions, RequestStatusDonut, RequestsTable, ContractsList, PortalCard } from "@/components/dashboard/ClientPortalUi";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { getClientDashboardData } from "@/lib/client-portal";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "داشبورد مشتری" };

export default function DashboardPage() {
  const data = getClientDashboardData();

  return (
    <ClientPortalShell title="داشبورد مشتری">
      <div className="grid gap-6">
        <div className="grid gap-6 xl:grid-cols-[300px_1fr]" dir="ltr">
          <aside className="grid gap-6" dir="rtl">
            <div className="legal-hero-visual rounded-2xl p-6 text-white shadow-card">
              <h2 className="text-xl font-black">نیاز به مشاوره حقوقی دارید؟</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-200">تیم وکلای ما آماده پاسخگویی به سوالات شما هستند.</p>
              <Link className="mt-6 inline-flex rounded-xl bg-gold px-5 py-3 text-sm font-black text-white" href="/requests/new">درخواست مشاوره</Link>
            </div>
            <QuickActions />
            <PortalCard className="p-6">
              <h2 className="text-lg font-black text-navy">اطلاعات شما در امنیت است</h2>
              <div className="mt-5 grid gap-4 text-sm font-bold text-muted">
                <span className="flex items-center gap-3"><span className="text-gold">♢</span>رمزنگاری اطلاعات</span>
                <span className="flex items-center gap-3"><span className="text-gold">♢</span>دسترسی محدود و امن</span>
                <span className="flex items-center gap-3"><span className="text-gold">♢</span>پشتیبان‌گیری منظم</span>
              </div>
            </PortalCard>
          </aside>
          <div className="grid min-w-0 gap-6" dir="rtl">
            <ClientKpiCards kpis={data.kpis} />
            <div className="grid gap-6 xl:grid-cols-[1fr_290px]">
              <ActivityTimeline activities={data.activities} />
              <ProfileCard profile={data.profile} />
            </div>
            <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
              <RequestStatusDonut data={data.requestStatus} />
              <PortalCard className="p-6">
                <h2 className="mb-5 text-lg font-black text-navy">روند فعالیت ماهانه</h2>
                <div className="grid h-64 grid-cols-6 items-end gap-3 rounded-2xl bg-[#fbf7ef] p-4">
                  {[34, 48, 42, 58, 76, 66].map((height, index) => <div className="grid gap-2 text-center" key={height}><span className="mx-auto w-6 rounded-t-xl bg-gradient-to-t from-gold to-gold-light" style={{ height }} /><span className="text-xs font-black text-muted">ماه {index + 1}</span></div>)}
                </div>
              </PortalCard>
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
              <RequestsTable requests={data.requests.slice(0, 5)} />
              <PortalCard className="p-5"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black text-navy">قراردادهای اخیر</h2><Link className="text-xs font-black text-gold" href="/dashboard/contracts">مشاهده همه</Link></div><ContractsList contracts={data.contracts.slice(0, 4)} /></PortalCard>
            </div>
          </div>
        </div>
      </div>
    </ClientPortalShell>
  );
}
