import type { Metadata } from "next";
import { AdminCrmSidebar } from "@/components/platform/RecoveryUi";
import { crmRequests } from "@/lib/platform-recovery-data";

export const metadata: Metadata = { title: "جزئیات درخواست CRM" };

export default async function AdminRequestDetailPage() {
  const request = crmRequests[0];
  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#0B172A]" dir="rtl">
      <div className="lg:flex lg:flex-row-reverse">
        <AdminCrmSidebar />
        <section className="min-w-0 flex-1 p-5 lg:p-8">
          <h1 className="text-3xl font-black">پرونده درخواست {request.number}</h1>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
              <h2 className="text-xl font-black">پنل جزئیات درخواست</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {Object.entries({ موکل: request.client, خدمت: request.service, وضعیت: request.status, اولویت: request.priority, تاریخ: request.date }).map(([key, value]) => (
                  <div className="rounded-xl bg-[#fbf7ef] p-4" key={key}>
                    <p className="text-xs font-black text-[#66758A]">{key}</p>
                    <strong className="mt-2 block">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
              <h2 className="text-xl font-black">تایم‌لاین</h2>
              <div className="mt-4 grid gap-3">{["ثبت", "بررسی", "ارجاع", "پیگیری"].map((item) => <span className="rounded-xl border border-[#eadfce] p-3 text-sm font-black" key={item}>{item}</span>)}</div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
