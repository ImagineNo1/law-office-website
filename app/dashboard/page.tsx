import type { Metadata } from "next";
import Link from "next/link";
import { ClientPortalShell } from "@/components/dashboard/ClientPortalShell";
import { ClientKpiCards, ContractsList, FilesTable, PortalCard, RequestsTable } from "@/components/dashboard/ClientPortalUi";
import { getClientDashboardData } from "@/lib/client-portal";

export const metadata: Metadata = { title: "پیشخوان" };

export default function DashboardPage() {
  const { contracts, files, messages, payments, requests } = getClientDashboardData();
  const kpis = [
    { label: "درخواست‌های من", value: requests.length, hint: "در کل", icon: "briefcase" },
    { label: "قراردادهای من", value: contracts.length, hint: "در کل", icon: "document" },
    { label: "فایل‌های من", value: files.length, hint: "در کل", icon: "folder" },
    { label: "پیام‌ها", value: messages.length, hint: "خوانده و خوانده‌نشده", icon: "document" },
    { label: "پرداخت‌ها", value: payments.length, hint: "صورتحساب‌ها", icon: "check" },
  ];

  return (
    <ClientPortalShell title="پیشخوان">
      <div className="grid gap-6">
        <ClientKpiCards kpis={kpis} />
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-6">
            <RequestsTable requests={requests.slice(0, 6)} />
            <ContractsList contracts={contracts.slice(0, 6)} />
          </div>
          <div className="grid gap-6">
            <PortalCard className="p-5">
              <h2 className="text-lg font-black text-navy">دسترسی سریع</h2>
              <div className="mt-4 grid gap-3">
                {[
                  ["ثبت درخواست جدید", "/requests/new"],
                  ["مشاهده درخواست‌ها", "/dashboard/requests"],
                  ["قراردادهای من", "/dashboard/contracts"],
                  ["پیام‌ها", "/dashboard/messages"],
                ].map(([label, href]) => (
                  <Link className="rounded-xl border border-border px-4 py-3 text-sm font-black text-navy transition hover:border-gold hover:text-gold" href={href} key={href}>
                    {label}
                  </Link>
                ))}
              </div>
            </PortalCard>
            <FilesTable files={files.slice(0, 5)} />
          </div>
        </div>
      </div>
    </ClientPortalShell>
  );
}
