import { ServiceIcon } from "@/components/services/ServiceIcons";
import type { Service } from "@/types";

const needItems = [
  "برای استفاده از قراردادهای جدید",
  "برای اصلاح یا بازنگری متن موجود",
  "برای جلوگیری از اختلافات آینده",
  "وقتی قصد همکاری با افراد یا شرکت‌ها را دارید",
];

export function ServiceInfoCards({ service }: { service: Service }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <article className="rounded-[8px] border border-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-navy">چه زمانی به این خدمت نیاز دارید؟</h2>
          <span className="grid size-14 place-items-center rounded-full bg-[#FBF4E8] text-gold">
            <ServiceIcon name="calendar" />
          </span>
        </div>
        <ul className="grid gap-3">
          {needItems.map((item) => (
            <li className="flex items-center gap-2 text-sm font-bold leading-7 text-muted" key={item}>
              <span className="size-1.5 rounded-full bg-navy" />
              {item}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[8px] border border-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-navy">مدارک مورد نیاز</h2>
          <span className="grid size-14 place-items-center rounded-full bg-[#FBF4E8] text-gold">
            <ServiceIcon name="folder" />
          </span>
        </div>
        <ul className="grid gap-3">
          {(service.requiredDocuments ?? []).slice(0, 5).map((item) => (
            <li className="flex items-center gap-2 text-sm font-bold leading-7 text-muted" key={item}>
              <span className="size-1.5 rounded-full bg-navy" />
              {item}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[8px] border border-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-navy">مراحل انجام کار</h2>
          <span className="grid size-14 place-items-center rounded-full bg-[#FBF4E8] text-gold">
            <ServiceIcon name="document" />
          </span>
        </div>
        <ol className="grid gap-3">
          {(service.processSteps ?? []).slice(0, 5).map((step, index) => (
            <li className="grid grid-cols-[30px_1fr] items-center gap-3 text-sm font-bold leading-7 text-muted" key={step}>
              <span className="grid size-7 place-items-center rounded-full bg-gold/15 text-xs font-black text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
