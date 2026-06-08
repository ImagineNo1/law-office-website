import { Container } from "@/components/platform/layout/PageShell";
import { PublicPageHero, PublicShell } from "@/components/platform/layout/PublicShell";
import { fa, fallbackLegalForms, type PlatformLegalForm } from "@/lib/platform-db";

export function LegalFormsExperience({
  admin = false,
  forms = fallbackLegalForms,
}: {
  admin?: boolean;
  forms?: PlatformLegalForm[];
}) {
  const content = (
    <section className="py-10">
      <Container>
        {forms.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {forms.map((form) => (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] transition hover:-translate-y-1 hover:border-accent" key={form.id}>
              <span className="grid size-11 place-items-center rounded-2xl bg-[#FFF8EA] text-sm font-black text-[#C9973F]">فرم</span>
              <h2 className="mt-5 font-black">{form.title}</h2>
              <p className="mt-2 min-h-14 text-sm font-bold leading-7 text-[#66758A]">{form.description}</p>
              <div className="mt-4 flex justify-between text-xs font-black">
                <span>{fa(form.fields)} فیلد</span>
                <span>{fa(form.usage)} استفاده</span>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_18px_45px_rgba(11,23,42,.04)]">
            <h2 className="text-2xl font-black text-[#0B172A]">فرم حقوقی منتشرشده‌ای وجود ندارد</h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-slate-500">پس از انتشار فرم‌ها در پنل مدیریت، این بخش به‌صورت خودکار با داده‌های واقعی تکمیل می‌شود.</p>
          </div>
        )}
      </Container>
    </section>
  );

  if (admin) return content;

  return (
    <PublicShell>
      <PublicPageHero
        description="فرم‌های حقوقی منتشرشده را مشاهده کنید و برای تکمیل یا تنظیم اختصاصی مسیر درخواست را ادامه دهید."
        eyebrow="فرم‌های حقوقی"
        title="فرم‌های حقوقی آماده"
      />
      {content}
    </PublicShell>
  );
}
