import type { ServiceRequestData } from "@/types";

export function MessagesPanel({ messages = [] }: { messages?: ServiceRequestData["messages"] }) {
  const fallback = ["مدارک دریافت شد.", "پرونده به وکیل ارجاع شد.", "پیش نویس در حال آماده سازی است."];
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-xl font-black">پیام ها و یادداشت ها</h2>
      <div className="mt-4 grid gap-3">
        {(messages.length ? messages.map((item) => item.message) : fallback).map((message) => (
          <p className="rounded-xl bg-[#fbf7ef] p-3 text-sm font-bold" key={message}>{message}</p>
        ))}
      </div>
    </section>
  );
}
