import { crmRequests } from "@/lib/platform-recovery-data";

export function RequestDetailPanel({ request = crmRequests[0] }: { request?: (typeof crmRequests)[number] }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]">
      <h2 className="text-xl font-black">پنل جزئیات درخواست</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {Object.entries({ موکل: request.client, خدمت: request.service, وضعیت: request.status, اولویت: request.priority, تاریخ: request.date }).map(([key, value]) => (
          <div className="rounded-xl bg-[#fbf7ef] p-4" key={key}>
            <p className="text-xs font-black text-[#66758A]">{key}</p>
            <strong className="mt-2 block">{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
