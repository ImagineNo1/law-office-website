import Link from "next/link";
import { type PlatformContract } from "@/lib/platform-db";

export function ContractPricingPanel({
  contract,
}: {
  contract: PlatformContract;
}) {
  return (
    <aside className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)] lg:sticky lg:top-28 lg:self-start">
      <p className="text-sm font-black text-[#66758A]">قیمت قرارداد</p>
      <strong className="mt-2 block text-3xl font-black text-[#0F766E]">
        {contract.price}
      </strong>
      <div className="mt-5 grid gap-3 text-sm font-black">
        <span className="rounded-xl bg-slate-50 p-3">
          دانلود: {contract.downloads}
        </span>
        <span className="rounded-xl bg-slate-50 p-3">
          امتیاز کاربران: {contract.rating}
        </span>
        <span className="rounded-xl bg-slate-50 p-3">
          آماده ارسال برای امضا
        </span>
      </div>
      <Link
        className="mt-5 flex h-12 items-center justify-center rounded-xl bg-[#0F766E] text-sm font-black text-white"
        href="/dashboard/requests?new=1"
      >
        درخواست تنظیم اختصاصی
      </Link>
    </aside>
  );
}
