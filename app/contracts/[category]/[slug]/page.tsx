import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/platform/RecoveryUi";
import { recoveryContracts } from "@/lib/platform-recovery-data";

export const metadata: Metadata = { title: "جزئیات قرارداد" };

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contract = recoveryContracts.find((item) => item.slug === slug) ?? recoveryContracts[0];

  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#0B172A]" dir="rtl">
      <PublicHeader />
      <section className="bg-[#0B172A] py-10 text-white">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <span className="text-sm font-black text-[#D4A64A]">{contract.category}</span>
            <h1 className="mt-3 text-4xl font-black">{contract.title}</h1>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-slate-200">{contract.description}</p>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-white/8 p-5">
            <p className="text-sm font-black text-slate-300">قیمت</p>
            <strong className="mt-2 block text-3xl font-black text-[#D4A64A]">{contract.price}</strong>
            <Link className="mt-5 flex h-12 items-center justify-center rounded-xl bg-[#C9973F] text-sm font-black" href="/requests/new">درخواست تنظیم اختصاصی</Link>
          </aside>
        </div>
      </section>
      <section className="py-8">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
            <h2 className="text-2xl font-black">تب‌های قرارداد</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {["پیش‌نمایش", "مدارک لازم", "سوالات متداول"].map((tab) => (
                <div className="rounded-xl border border-[#eadfce] bg-[#fbf7ef] p-4" key={tab}>
                  <h3 className="font-black">{tab}</h3>
                  <p className="mt-2 text-sm font-bold leading-7 text-[#66758A]">محتوای route-backed برای بررسی، دانلود و ارسال جهت امضا.</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
            <h2 className="text-xl font-black">پنل قیمت و امضا</h2>
            <div className="mt-4 grid gap-3 text-sm font-black">
              <span className="rounded-xl bg-[#F7F3EA] p-3">دانلود: {contract.downloads}</span>
              <span className="rounded-xl bg-[#F7F3EA] p-3">امتیاز کاربران: {contract.rating}</span>
              <span className="rounded-xl bg-[#F7F3EA] p-3">آماده ارسال برای امضا</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
