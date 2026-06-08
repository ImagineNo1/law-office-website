import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-white py-16" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_18%_30%,rgba(15,118,110,0.45),transparent_28%),linear-gradient(135deg,#071527_0%,#10233B_58%,#071527_100%)] px-6 py-14 text-center shadow-[0_32px_90px_rgba(7,21,39,0.22)] sm:px-10">
          <div className="absolute -left-20 top-8 size-64 rounded-full bg-[#0F766E]/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-40 w-72 rounded-tl-full bg-[#D6A23A]/10" />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#99F6E4]">
              شروع شفاف و قابل پیگیری
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl">
              پرونده حقوقی خود را شفاف شروع کنید
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-8 text-white/70">
              درخواست، مدارک، پیام‌ها، قراردادها و خروجی نهایی را در یک مسیر امن
              و مرحله‌به‌مرحله مدیریت کنید.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="inline-flex min-h-13 items-center rounded-2xl bg-[#0F766E] px-8 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,118,110,0.30)] transition hover:bg-[#0b625c]"
                href="/dashboard/requests?new=1"
              >
                ثبت درخواست
              </Link>
              <Link
                className="inline-flex min-h-13 items-center rounded-2xl border border-white/20 bg-white/10 px-8 text-sm font-black text-white transition hover:bg-white/15"
                href="/contact"
              >
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
