import { type PlatformFaq } from "@/lib/platform-db";

export function ServiceFaq({ faqs = [] }: { faqs?: PlatformFaq[] }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-2xl font-black">سوالات متداول</h2>
      <div className="mt-5 grid gap-3">
        {faqs.map((faq) => (
          <details
            className="rounded-xl border border-slate-200 p-4"
            key={faq.id}
          >
            <summary className="cursor-pointer font-black">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm font-bold leading-7 text-[#66758A]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
