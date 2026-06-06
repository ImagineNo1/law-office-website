export function RequestDetailPanel({ title = "جزئیات درخواست" }: { title?: string }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-2 text-sm font-bold text-[#66758A]">اطلاعات موکل، خدمت، وضعیت، پیام‌ها و فایل‌های پیوست.</p>
    </section>
  );
}
