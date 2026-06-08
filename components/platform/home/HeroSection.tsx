import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/platform/layout/PageShell";

function ArrowLeft() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5m6 7-7-7 7-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="m6 12 4 4 8-9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CardIcon({ type }: { type: "check" | "user" | "file" }) {
  const paths = {
    check: "m6 12 4 4 8-9",
    user: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
    file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 15h6",
  };

  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d={paths[type]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

const trustChips = ["محرمانگی اطلاعات", "پاسخگویی مرحله‌ای", "بانک قرارداد قابل ویرایش"];
const floatingCards = [
  { title: "درخواست جدید ثبت شد", meta: "کد پیگیری: VK-1403", icon: "check" as const, className: "right-4 top-12 lg:-right-4" },
  { title: "وکیل تخصیص یافت", meta: "تخصص: قراردادها", icon: "user" as const, className: "left-4 top-1/2 lg:-left-2" },
  { title: "قرارداد آماده امضاست", meta: "قابل ویرایش و ارسال", icon: "file" as const, className: "right-10 bottom-10 lg:right-24" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(15,118,110,0.10),transparent_30%),linear-gradient(180deg,#ffffff_0%,#F8FAFC_100%)]" dir="rtl">
      <Container className="max-w-[1540px] py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16 lg:[direction:ltr]">
          <div className="order-2 lg:order-none">
            <div className="relative mx-auto max-w-[700px]">
              <div className="absolute inset-5 rounded-[2.2rem] bg-emerald-700/10 blur-3xl" />
              <Image
                alt="دفتر حقوقی مدرن و قرارداد روی میز برای خدمات وکیل‌یار"
                className="relative aspect-[1.28/1] w-full rounded-[2rem] border border-[#E2E8F0] object-cover shadow-[0_30px_90px_rgba(7,21,39,0.16)]"
                height={992}
                priority
                sizes="(min-width: 1024px) 48vw, 92vw"
                src="/home-legal-desk-hero.png"
                width={1586}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-l from-white/5 via-transparent to-white/35" />
              {floatingCards.map((card, index) => (
                <div
                  className={`hero-float absolute hidden min-w-56 items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white/90 p-4 text-right shadow-[0_18px_45px_rgba(7,21,39,0.12)] backdrop-blur md:flex ${card.className}`}
                  key={card.title}
                  style={{ animationDelay: `${index * 450}ms` }}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ECFDF5] text-[#0F766E]">
                    <CardIcon type={card.icon} />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-[#071527]">{card.title}</span>
                    <span className="block text-xs font-bold text-[#64748B]">{card.meta}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 text-center lg:order-none lg:[direction:rtl] lg:text-right">
            <span className="mb-5 inline-flex rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-black text-[#0F766E] ring-1 ring-[#0F766E]/10">
              VakilBashi • Daftarkhoone • DocuSign
            </span>
            <h1 className="text-4xl font-black leading-[1.45] tracking-[-0.03em] text-[#071527] sm:text-5xl lg:text-[58px] xl:text-[64px]">
              پلتفرم هوشمند
              <br />
              <span className="text-[#0F766E]">خدمات حقوقی</span>
              <br />
              از مشاوره تا قرارداد
              <br />
              و پیگیری پرونده
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-bold leading-9 text-[#64748B] sm:text-lg lg:mx-0">
              در وکیل‌یار می‌توانید درخواست حقوقی ثبت کنید، مدارک خود را ارسال کنید، با تیم حقوقی گفتگو کنید و روند پرونده را در داشبورد اختصاصی پیگیری کنید.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-[#0F766E] px-7 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,118,110,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0b625c]" href="/requests/new">
                ثبت درخواست حقوقی
                <ArrowLeft />
              </Link>
              <Link className="inline-flex min-h-14 items-center gap-3 rounded-2xl border border-[#0F766E]/25 bg-white px-7 text-sm font-black text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F766E]" href="/services">
                مشاهده خدمات
                <ArrowLeft />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {trustChips.map((chip) => (
                <span className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-black text-[#10233B] shadow-sm" key={chip}>
                  <span className="grid size-7 place-items-center rounded-full bg-[#ECFDF5] text-[#0F766E]"><CheckIcon /></span>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
