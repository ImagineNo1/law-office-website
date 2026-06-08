import Link from "next/link";
import { ServiceIcon } from "@/components/services/ServiceIcons";
import type { Service } from "@/types";

export function ServiceHero({ service }: { service: Service }) {
  const features = service.heroFeatures?.length
    ? service.heroFeatures
    : ["سرعت بالا در انجام", "گارانتی اصالت خدمت", "مشاوره قبل از شروع"];

  return (
    <section className="overflow-hidden rounded-[8px] bg-navy text-white shadow-soft">
      <div className="grid min-h-[330px] lg:grid-cols-[0.95fr_1.4fr]" dir="ltr">
        <div className="legal-photo relative min-h-[260px] lg:min-h-full">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,42,0.05),rgba(11,23,42,0.72))]" />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10" dir="rtl">
          <nav className="mb-8 text-xs font-black text-white/70">
            <Link className="hover:text-emerald-700" href="/">
              خانه
            </Link>
            <span className="px-2 text-emerald-700">‹</span>
            <Link className="hover:text-emerald-700" href="/services">
              خدمات حقوقی
            </Link>
            <span className="px-2 text-emerald-700">‹</span>
            <span>{service.title}</span>
          </nav>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid size-20 place-items-center rounded-full bg-emerald-700/15 text-emerald-700">
              <ServiceIcon className="size-10" name={service.icon} />
            </span>
            <div>
              <h1 className="text-balance text-3xl font-black leading-[1.35] text-white sm:text-4xl lg:text-5xl">
                {service.title === "تنظیم قرارداد"
                  ? "تنظیم قرارداد تخصصی"
                  : service.title}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base font-bold leading-8 text-white/82">
                {service.heroDescription || service.excerpt}
              </p>
            </div>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {features.map((feature, index) => (
              <div
                className="flex items-center gap-3 text-sm font-black text-white"
                key={feature}
              >
                <span className="text-emerald-700">
                  <ServiceIcon
                    className="size-5"
                    name={
                      index === 0 ? "bolt" : index === 1 ? "shield" : "scale"
                    }
                  />
                </span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
