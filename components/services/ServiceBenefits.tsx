import { ServiceIcon } from "@/components/services/ServiceIcons";
import type { Service } from "@/types";

export function ServiceBenefits({ service }: { service: Service }) {
  const benefits = service.benefits?.length
    ? service.benefits
    : [
        "صرفه‌جویی در زمان",
        "جلوگیری از اختلافات آینده",
        "حفظ حقوق قانونی",
        "کاهش ریسک‌های حقوقی",
      ];

  return (
    <section className="rounded-[8px] border border-border bg-white p-6 shadow-card">
      <h2 className="mb-7 text-center text-xl font-black text-navy">
        مزایای استفاده از خدمت {service.title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.slice(0, 4).map((benefit, index) => (
          <div className="flex flex-col items-center text-center" key={benefit}>
            <span className="grid size-16 place-items-center rounded-full bg-[#FBF4E8] text-emerald-700">
              <ServiceIcon
                className="size-7"
                name={
                  index === 0
                    ? "bolt"
                    : index === 1
                      ? "case"
                      : index === 2
                        ? "shield"
                        : "scale"
                }
              />
            </span>
            <h3 className="mt-4 text-sm font-black leading-7 text-navy">
              {benefit}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
