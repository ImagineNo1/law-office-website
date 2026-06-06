import Link from "next/link";
import { MegaMenu } from "@/components/platform/layout/MegaMenu";

const nav = [
  ["خدمات حقوقی", "/services"],
  ["بانک قرارداد", "/contracts"],
  ["فرم های حقوقی", "/legal-forms"],
  ["ثبت درخواست", "/requests/new"],
  ["داشبورد", "/dashboard"],
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-[min(1280px,calc(100%-32px))] items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center rounded-xl bg-[#0B172A] text-base text-[#F8E7BF]">
            ⚖
          </span>
          <span>
            <strong className="block text-lg font-black text-slate-950">وکیل یار</strong>
            <span className="-mt-1 block text-[10px] font-bold text-slate-500">سامانه خدمات، قرارداد و امضا</span>
          </span>
        </Link>
        <div className="group relative hidden lg:block">
          <nav className="flex items-center gap-7">
            {nav.map(([label, href]) => (
              <Link className="text-sm font-bold text-slate-500 transition hover:text-slate-950" href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
          <MegaMenu />
        </div>
        <div className="flex items-center gap-2">
          <Link className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:inline-flex" href="/login">
            ورود
          </Link>
          <Link className="hidden rounded-full bg-[#C9973F] px-5 py-2.5 text-sm font-black text-[#0B172A] shadow-[0_14px_32px_rgba(201,151,63,.22)] transition hover:bg-[#D4A64A] md:inline-flex" href="/signup">
            شروع رایگان
          </Link>
          <Link className="rounded-full bg-[#0B172A] px-5 py-2.5 text-sm font-black text-white shadow-[0_14px_35px_rgba(11,23,42,.16)] transition hover:bg-[#111827]" href="/requests/new">
            ثبت درخواست
          </Link>
        </div>
      </div>
    </header>
  );
}
