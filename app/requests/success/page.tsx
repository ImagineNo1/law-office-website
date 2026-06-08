import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "ثبت موفق درخواست" };

export default async function RequestSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ requestNumber?: string }>;
}) {
  const { requestNumber = "REQ-1405-000001" } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <section className="w-full max-w-xl rounded-3xl border border-border bg-white p-8 text-center shadow-soft">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-3xl text-emerald-600">
          ✓
        </span>
        <h1 className="mt-5 text-3xl font-black text-navy">
          درخواست شما با موفقیت ثبت شد
        </h1>
        <p className="mt-4 text-sm font-bold leading-7 text-muted">
          شماره درخواست خود را برای پیگیری نزد خود نگه دارید.
        </p>
        <div className="mt-6 rounded-2xl border border-dashed border-emerald-500 bg-slate-50 p-5">
          <p className="text-xs font-black text-muted">شماره درخواست</p>
          <strong
            className="mt-2 block text-2xl font-black text-navy"
            dir="ltr"
          >
            {requestNumber}
          </strong>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white"
            href={`/requests/${requestNumber}`}
          >
            پیگیری درخواست
          </Link>
          <Link
            className="rounded-xl border border-border px-5 py-3 text-sm font-black text-navy"
            href="/"
          >
            بازگشت به سایت
          </Link>
        </div>
      </section>
    </main>
  );
}
