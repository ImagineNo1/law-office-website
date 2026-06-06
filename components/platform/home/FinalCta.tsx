import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-[#071225] py-12 text-center text-white">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-black">پرونده حقوقی خود را ساختاریافته شروع کنید</h2>
        <p className="mt-4 text-sm font-bold leading-8 text-slate-300">
          درخواست، مدارک، قراردادها، امضا و پیام‌ها در یک کارتابل امن و قابل پیگیری.
        </p>
        <Link className="mt-7 inline-flex rounded-xl bg-[#C9973F] px-7 py-4 text-sm font-black text-white" href="/requests/new">
          شروع کنید
        </Link>
      </div>
    </section>
  );
}
