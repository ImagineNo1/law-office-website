export function ServiceDetailPanels({ title }: { title: string }) {
  const steps = ["ثبت درخواست", "بررسی مدارک", "تهیه پیش‌نویس", "بازبینی موکل", "تحویل و بایگانی"];
  return (
    <div className="grid gap-6">
      <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
        <h2 className="text-2xl font-black">فرآیند اجرای {title}</h2>
        <div className="mt-6 grid gap-4">
          {steps.map((step, index) => (
            <div className="grid grid-cols-[42px_1fr] gap-3" key={step}>
              <span className="grid size-10 place-items-center rounded-full bg-[#C9973F] text-sm font-black text-white">{index + 1}</span>
              <div className="border-b border-[#eadfce] pb-4">
                <h3 className="font-black">{step}</h3>
                <p className="mt-1 text-sm font-bold text-[#66758A]">با ثبت وضعیت در کارتابل و اعلان به موکل.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {["مدارک لازم", "مزایا"].map((title) => (
          <div className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={title}>
            <h3 className="text-xl font-black">{title}</h3>
            <div className="mt-4 grid gap-3">
              {["کارت ملی", "شرح موضوع", "مستندات مرتبط", "اطلاعات طرف مقابل"].map((item) => (
                <span className="rounded-xl bg-[#fbf7ef] px-4 py-3 text-sm font-black" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
