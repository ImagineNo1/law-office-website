import Link from "next/link";
import { Container } from "@/components/platform/layout/PageShell";

export function PublicFooter() {
  return (
    <footer className="bg-[#071225] py-10 text-white">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-black">وکیل یار</h2>
          <p className="mt-3 max-w-sm text-sm font-bold leading-7 text-slate-300">
            پلتفرم فارسی خدمات حقوقی، بانک قرارداد، CRM، پورتال موکل و امضای دیجیتال.
          </p>
        </div>
        <div className="grid gap-2 text-sm font-black text-slate-200">
          <Link href="/services">خدمات حقوقی</Link>
          <Link href="/contracts">بانک قرارداد</Link>
          <Link href="/legal-forms">فرم‌های حقوقی</Link>
        </div>
        <div className="rounded-2xl border border-[#C9973F]/25 bg-[#C9973F]/10 p-5">
          <p className="font-black text-[#D4A64A]">پشتیبانی سریع</p>
          <p className="mt-2 text-sm font-bold text-slate-300">ثبت و پیگیری درخواست در داشبورد اختصاصی.</p>
        </div>
      </Container>
    </footer>
  );
}
