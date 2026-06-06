import type { Metadata } from "next";
import { PublicHeader } from "@/components/platform/RecoveryUi";
import { crmRequests } from "@/lib/platform-recovery-data";

export const metadata: Metadata = { title: "پیگیری درخواست" };

export default async function RequestTrackingPage() {
  const request = crmRequests[0];
  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#0B172A]" dir="rtl">
      <PublicHeader />
      <section className="py-8">
        <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
            <h1 className="text-3xl font-black">پیگیری درخواست {request.number}</h1>
            <p className="mt-3 text-sm font-bold text-[#66758A]">{request.service} برای {request.client}</p>
            <div className="mt-6 grid gap-4">
              {["ثبت درخواست", "بررسی اولیه", "تخصیص کارشناس", "در حال انجام", "تحویل نهایی"].map((step, index) => (
                <div className="grid grid-cols-[40px_1fr] gap-3" key={step}>
                  <span className="grid size-9 place-items-center rounded-full bg-[#C9973F] text-xs font-black text-white">{index + 1}</span>
                  <div className="border-b border-[#eadfce] pb-4"><h2 className="font-black">{step}</h2><p className="text-sm font-bold text-[#66758A]">وضعیت در کارتابل ثبت شده است.</p></div>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl bg-[#0B172A] p-6 text-white">
            <h2 className="text-xl font-black">جزئیات درخواست</h2>
            <div className="mt-4 grid gap-3 text-sm font-black">
              <span>وضعیت: {request.status}</span>
              <span>اولویت: {request.priority}</span>
              <span>تاریخ: {request.date}</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
