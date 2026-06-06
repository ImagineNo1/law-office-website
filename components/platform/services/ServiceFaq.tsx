import { recoveryFaqs } from "@/lib/platform-recovery-data";

export function ServiceFaq() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-2xl font-black">سوالات متداول</h2>
      <div className="mt-5 grid gap-3">
        {recoveryFaqs.map(([question, answer]) => (
          <details className="rounded-xl border border-[#eadfce] p-4" key={question}>
            <summary className="cursor-pointer font-black">{question}</summary>
            <p className="mt-3 text-sm font-bold leading-7 text-[#66758A]">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
