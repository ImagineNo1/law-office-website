import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";

export function PublicFooter() {
  return (
    <footer id="footer" className="bg-[#071225] py-16 text-white">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#C9973F] text-[#0B172A]">⚖</span>
            <h2 className="text-xl font-black">وکیل یار</h2>
          </div>
          <p className="mt-4 max-w-sm text-sm font-bold leading-7 text-slate-400">
            پلتفرم فارسی خدمات حقوقی، بانک قرارداد، CRM، پرتال موکل و امضای دیجیتال.
          </p>
        </div>
        <div className="grid gap-2 text-sm font-bold text-slate-300">
          <h3 className="mb-2 text-sm font-black text-white">خدمات حقوقی</h3>
          <Link href="/services">مشاوره حقوقی</Link>
          <Link href="/services">تنظیم قرارداد</Link>
          <Link href="/requests/new">ثبت درخواست</Link>
        </div>
        <div className="grid gap-2 text-sm font-bold text-slate-300">
          <h3 className="mb-2 text-sm font-black text-white">بانک قرارداد</h3>
          <Link href="/contracts">قراردادهای ملکی</Link>
          <Link href="/contracts">قراردادهای استخدامی</Link>
          <Link href="/legal-forms">فرم های حقوقی</Link>
        </div>
        <div className="rounded-2xl border border-[#C9973F]/25 bg-[#C9973F]/10 p-5">
          <p className="font-black text-[#D4A64A]">پشتیبانی سریع</p>
          <p className="mt-2 text-sm font-bold leading-7 text-slate-300">ثبت و پیگیری درخواست در داشبورد اختصاصی.</p>
        </div>
      </Container>
    </footer>
  );
}
