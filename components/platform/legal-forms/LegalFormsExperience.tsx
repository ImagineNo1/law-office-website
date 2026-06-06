import { PageShell } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { fa, fallbackLegalForms, type PlatformLegalForm } from "@/lib/platform-db";

export function LegalFormsExperience({
  admin = false,
  forms = fallbackLegalForms,
}: {
  admin?: boolean;
  forms?: PlatformLegalForm[];
}) {
  const content = (
    <section className="py-8">
      <div className="mx-auto w-[min(1440px,calc(100%-32px))]">
        <div className="rounded-2xl bg-[#0B172A] p-7 text-white">
          <h1 className="text-3xl font-black">{admin ? "مدیریت فرم های حقوقی" : "فرم های حقوقی آماده"}</h1>
          <p className="mt-3 text-sm font-bold text-slate-300">
            فرم های CMS-backed برای تکمیل، امضا، آرشیو و مدیریت در سامانه.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {forms.map((form) => (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={form.id}>
              <span className="grid size-11 place-items-center rounded-2xl bg-[#FFF8EA] text-sm font-black text-[#C9973F]">F</span>
              <h2 className="mt-5 font-black">{form.title}</h2>
              <p className="mt-2 min-h-14 text-sm font-bold leading-7 text-[#66758A]">{form.description}</p>
              <div className="mt-4 flex justify-between text-xs font-black">
                <span>{fa(form.fields)} فیلد</span>
                <span>{fa(form.usage)} استفاده</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (admin) return content;

  return (
    <PageShell>
      <PublicHeader />
      {content}
      <PublicFooter />
    </PageShell>
  );
}
