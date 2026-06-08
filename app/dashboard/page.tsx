import type { Metadata } from "next";
import Link from "next/link";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import {
  ClientKpiCards,
  ComingSoonCard,
  PortalCard,
  RequestsTable,
} from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardSummary } from "@/lib/client-portal-db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "پیشخوان" };

export default async function DashboardPage() {
  const { messages, requests } = await getClientDashboardSummary();
  const kpis = [
    {
      label: "درخواست‌های من",
      value: requests.length,
      hint: "در کل",
      icon: "briefcase",
    },
    {
      label: "پیام‌ها",
      value: messages.length,
      hint: "خوانده و خوانده‌نشده",
      icon: "document",
    },
  ];

  return (
    <ClientPortalShell title="پیشخوان">
      <div className="grid gap-6">
        <ClientKpiCards kpis={kpis} />
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-6">
            <RequestsTable requests={requests.slice(0, 6)} />
            <div className="grid gap-4 md:grid-cols-2">
              <ComingSoonCard
                description="نسخه‌های خریداری‌شده و قابل دانلود پس از آماده‌سازی این بخش نمایش داده می‌شوند."
                href="/dashboard/contracts"
                label="مشاهده وضعیت"
                title="قراردادهای من"
              />
              <ComingSoonCard
                description="فاکتورها و رسیدهای پرداخت پس از تکمیل اتصال مالی در این بخش قرار می‌گیرند."
                href="/dashboard/payments"
                label="مشاهده وضعیت"
                title="پرداخت‌ها"
              />
            </div>
          </div>
          <div className="grid gap-6">
            <PortalCard className="p-5">
              <div
                className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-sm font-bold leading-8 text-muted"
                data-tour="client-help"
              >
                برای شروع، اولین درخواست حقوقی خود را ثبت کنید.
              </div>
              <h2 className="text-lg font-black text-navy">دسترسی سریع</h2>
              <div className="mt-4 grid gap-3">
                {[
                  ["ثبت درخواست جدید", "/dashboard/requests?new=1"],
                  ["مشاهده درخواست‌ها", "/dashboard/requests"],
                  ["بانک قراردادها", "/dashboard/contract-bank"],
                  ["قراردادهای من", "/dashboard/contracts"],
                  ["پیام‌ها", "/dashboard/messages"],
                ].map(([label, href]) => (
                  <Link
                    className="rounded-xl border border-border px-4 py-3 text-sm font-black text-navy transition hover:border-emerald-500 hover:text-emerald-700"
                    data-tour={
                      label === "ثبت درخواست جدید"
                        ? "client-new-request"
                        : undefined
                    }
                    href={href}
                    key={href}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </PortalCard>
            <ComingSoonCard
              description="بارگذاری و مدیریت فایل‌ها در مرحله بعدی فعال می‌شود؛ فعلاً مدارک را از طریق درخواست حقوقی ارسال کنید."
              title="فایل‌های من"
            />
          </div>
        </div>
      </div>
    </ClientPortalShell>
  );
}
