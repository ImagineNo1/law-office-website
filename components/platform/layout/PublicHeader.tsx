import Link from "next/link";
import { MegaMenu } from "@/components/platform/layout/MegaMenu";

const nav = [
  ["خدمات", "/services"],
  ["بانک قرارداد", "/contracts"],
  ["فرم‌های حقوقی", "/legal-forms"],
  ["ثبت درخواست", "/requests/new"],
  ["داشبورد", "/dashboard"],
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 w-[min(1440px,calc(100%-32px))] items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#0B172A] text-xl text-[#F8E7BF] shadow-[0_12px_30px_rgba(11,23,42,.18)]">
            ⚖
          </span>
          <span>
            <strong className="block text-xl font-black text-[#0B172A]">وکیل یار</strong>
            <span className="text-xs font-bold text-slate-500">سامانه خدمات، قرارداد و امضا</span>
          </span>
        </Link>
        <div className="group relative hidden lg:block">
          <nav className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            {nav.map(([label, href]) => (
              <Link className="rounded-xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-[#0B172A] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[#C9973F]/30" href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
          <MegaMenu />
        </div>
        <div className="flex items-center gap-2">
          <Link className="hidden rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#0B172A] transition hover:bg-slate-50 sm:inline-flex" href="/login">
            ورود
          </Link>
          <Link className="hidden rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#0B172A] transition hover:bg-slate-50 md:inline-flex" href="/signup">
            ثبت نام
          </Link>
          <Link className="rounded-xl bg-[#0B172A] px-5 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(11,23,42,.18)] transition hover:bg-[#111827]" href="/requests/new">
            شروع درخواست
          </Link>
        </div>
      </div>
    </header>
  );
}
