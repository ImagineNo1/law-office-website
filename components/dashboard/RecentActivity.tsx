import { dashboardEvents } from "@/lib/platform-recovery-data";

export function RecentActivity() {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-xl font-black">فعالیت‌های اخیر</h2>
      <div className="mt-4 grid gap-3">
        {dashboardEvents.slice(0, 6).map((event) => (
          <div className="rounded-xl bg-[#fbf7ef] p-3 text-sm font-black" key={event.id}>{event.title}</div>
        ))}
      </div>
    </section>
  );
}
