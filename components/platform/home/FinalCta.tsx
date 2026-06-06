import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-[linear-gradient(135deg,#071225,#0B172A)] py-20 text-center text-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-black leading-[1.45] md:text-4xl">پرونده حقوقی خود را ساختاریافته شروع کنید</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-8 text-slate-300">
          درخواست، مدارک، قراردادها، امضا و پیام ها در یک کارتابل امن و قابل پیگیری.
        </p>
        <Link className="mt-8 inline-flex rounded-full bg-[#C9973F] px-9 py-4 text-sm font-black text-[#0B172A] shadow-[0_18px_44px_rgba(201,151,63,.24)]" href="/requests/new">
          شروع کنید
        </Link>
      </div>
    </section>
  );
}
