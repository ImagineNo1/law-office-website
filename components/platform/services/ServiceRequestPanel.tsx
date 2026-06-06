import Link from "next/link";

export function ServiceRequestPanel() {
  return (
    <aside className="rounded-2xl bg-[#0B172A] p-6 text-white shadow-[0_24px_70px_rgba(11,23,42,.18)] lg:sticky lg:top-28 lg:self-start">
      <h2 className="text-xl font-black">ثبت سریع درخواست</h2>
      <p className="mt-3 text-sm font-bold leading-7 text-slate-300">
        مدارک را بارگذاری کنید و مسیر پیگیری را در داشبورد ببینید.
      </p>
      <div className="mt-5 grid gap-3">
        {["بررسی اولیه", "تخصیص وکیل", "پیش‌نویس", "تحویل"].map((item, index) => (
          <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 text-sm font-black" key={item}>
            <span className="grid size-7 place-items-center rounded-full bg-[#C9973F] text-xs">{index + 1}</span>
            {item}
          </div>
        ))}
      </div>
      <Link className="mt-6 flex h-12 items-center justify-center rounded-xl bg-[#C9973F] text-sm font-black" href="/requests/new">
        شروع ثبت
      </Link>
    </aside>
  );
}
