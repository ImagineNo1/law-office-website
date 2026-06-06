export function MessagesPanel() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-xl font-black">پیام‌ها و یادداشت‌ها</h2>
      <div className="mt-4 grid gap-3">
        {["مدارک دریافت شد.", "پرونده به وکیل ارجاع شد.", "پیش‌نویس در حال آماده‌سازی است."].map((message) => (
          <p className="rounded-xl bg-[#fbf7ef] p-3 text-sm font-bold" key={message}>{message}</p>
        ))}
      </div>
    </section>
  );
}
