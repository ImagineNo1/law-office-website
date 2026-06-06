import { Container } from "@/components/platform/layout/PageShell";

export function ServiceHero({
  title,
  description,
  detail = false,
}: {
  title: string;
  description: string;
  detail?: boolean;
}) {
  return (
    <section className="bg-[#0B172A] py-10 text-white">
      <Container className="grid gap-6 lg:grid-cols-[1fr_370px]">
        <div>
          <span className="text-sm font-black text-[#D4A64A]">مرکز خدمات حقوقی</span>
          <h1 className="mt-3 text-4xl font-black leading-tight">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-slate-200">{description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/8 p-5">
          <h2 className="font-black">{detail ? "خلاصه اجرای خدمت" : "وضعیت ظرفیت امروز"}</h2>
          <div className="mt-4 grid gap-3">
            {["وکلای آماده پاسخ", "پرونده‌های در صف", "میانگین پاسخ"].map((x, i) => (
              <div className="flex justify-between rounded-xl bg-white/10 p-3 text-sm font-black" key={x}>
                <span>{x}</span>
                <span className="text-[#D4A64A]">{[12, 34, "۲۴ ساعت"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
