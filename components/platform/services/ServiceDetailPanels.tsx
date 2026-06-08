export function ServiceDetailPanels({
  benefits = ["پیگیری تخصصی", "امضای دیجیتال", "آرشیو امن"],
  requiredDocuments = [
    "کارت ملی",
    "شرح موضوع",
    "مستندات مرتبط",
    "اطلاعات طرف مقابل",
  ],
  steps = [
    "ثبت درخواست",
    "بررسی مدارک",
    "تهیه پیش نویس",
    "بازبینی موکل",
    "تحویل و بایگانی",
  ],
  title,
}: {
  benefits?: string[];
  requiredDocuments?: string[];
  steps?: string[];
  title: string;
}) {
  return (
    <div className="grid gap-6">
      <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
        <h2 className="text-2xl font-black">فرآیند اجرای {title}</h2>
        <div className="mt-6 grid gap-4">
          {steps.map((step, index) => (
            <div className="grid grid-cols-[42px_1fr] gap-3" key={step}>
              <span className="grid size-10 place-items-center rounded-full bg-[#0F766E] text-sm font-black text-white">
                {index + 1}
              </span>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-black">{step}</h3>
                <p className="mt-1 text-sm font-bold text-[#66758A]">
                  با ثبت وضعیت در کارتابل و اعلان به موکل.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {[
          ["مدارک لازم", requiredDocuments],
          ["مزایا", benefits],
        ].map(([panelTitle, items]) => (
          <div
            className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]"
            key={String(panelTitle)}
          >
            <h3 className="text-xl font-black">{panelTitle}</h3>
            <div className="mt-4 grid gap-3">
              {(items as string[]).map((item) => (
                <span
                  className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-black"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
