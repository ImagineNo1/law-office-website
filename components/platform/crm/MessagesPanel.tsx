import type { ServiceRequestData } from "@/types";

export function MessagesPanel({
  messages = [],
}: {
  messages?: ServiceRequestData["messages"];
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-xl font-black">پیام‌ها و یادداشت‌ها</h2>
      <div className="mt-4 grid gap-3">
        {messages.length ? (
          messages.map((item) => (
            <p
              className="rounded-xl bg-slate-50 p-3 text-sm font-bold leading-7"
              key={item.id}
            >
              {item.message}
            </p>
          ))
        ) : (
          <p className="rounded-xl bg-slate-50 p-3 text-sm font-bold leading-7 text-slate-500">
            هنوز پیامی برای این درخواست ثبت نشده است.
          </p>
        )}
      </div>
    </section>
  );
}
