import type { Metadata } from "next";
import { AdminCrmShell } from "@/components/platform/crm/AdminCrmShell";
import { recoveryFaqs, fa } from "@/lib/platform-recovery-data";

export const metadata: Metadata = { title: "مدیریت سوالات متداول" };

export default function AdminFaqsPage() {
  return (
    <AdminCrmShell>
      <h1 className="text-3xl font-black">مدیریت سوالات متداول</h1>
      <div className="mt-6 grid gap-4">
        {recoveryFaqs.map(([q, a], index) => (
          <div className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={q}>
            <div className="flex items-center justify-between">
              <h2 className="font-black">{q}</h2>
              <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">منتشر شده</span>
            </div>
            <p className="mt-3 text-sm font-bold leading-7 text-[#66758A]">{a}</p>
            <p className="mt-3 text-xs font-black text-[#C9973F]">ترتیب نمایش: {fa(index + 1)}</p>
          </div>
        ))}
      </div>
    </AdminCrmShell>
  );
}
