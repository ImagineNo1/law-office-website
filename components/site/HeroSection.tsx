import { Button } from "@/components/ui/Button";
import { siteStats, trustFeatures } from "@/lib/mockData";

function StatIcon({ index }: { index: number }) {
  const paths = [
    "M12 3v18M6 8h12M7.5 8 5 15h5L7.5 8Zm9 0L14 15h5l-2.5-7Z",
    "M12 6v6l4 2M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "M6 20V7a2 2 0 0 1 2-2h8l4 4v11H6Zm8-15v5h5",
    "M7 11l3 3 7-7M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  ];

  return (
    <svg
      aria-hidden="true"
      className="size-8 text-white/18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d={paths[index] ?? paths[0]}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_22%_18%,rgba(200,155,60,0.16),transparent_23rem),radial-gradient(circle_at_78%_4%,rgba(15,23,42,0.055),transparent_26rem),linear-gradient(180deg,#fff,rgba(247,248,250,0.76))] dark:bg-[radial-gradient(circle_at_22%_18%,rgba(200,155,60,0.18),transparent_24rem),linear-gradient(180deg,#0f172a,#111827)]" />

      <div className="container-shell relative grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[0.94fr_1.06fr] lg:pt-14 lg:pb-20">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-5 -z-10 rounded-[2.75rem] bg-gold/10 blur-3xl" />
          <div className="legal-photo min-h-[300px] rounded-[2rem] border border-border shadow-soft sm:min-h-[390px] lg:min-h-[450px]" />

          <div className="absolute bottom-6 right-6 hidden max-w-[280px] rounded-3xl border border-border bg-surface-strong/90 p-5 shadow-soft backdrop-blur md:block">
            <p className="text-sm font-black text-gold">مشاوره محرمانه</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              بررسی اولیه مدارک، تشخیص مسیر حقوقی و اعلام مراحل اجرایی پرونده.
            </p>
          </div>
        </div>

        <div className="relative z-10 order-1 text-center lg:order-2 lg:text-right">
          <p className="mb-4 text-sm font-black text-gold">تخصص، تجربه، تعهد</p>

          <h1 className="mx-auto max-w-3xl text-4xl font-black leading-[1.22] tracking-[-0.02em] text-foreground sm:text-5xl lg:mx-0 lg:text-6xl">
            راهکارهای حقوقی هوشمند برای آرامش و موفقیت شما
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-9 text-muted sm:text-lg lg:mx-0">
            ما در موسسه عدالت گستر با تکیه بر تجربه و دانش تخصصی، بهترین
            راهکارهای حقوقی را برای افراد و کسب و کارها ارائه می دهیم.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href="/contact">درخواست مشاوره</Button>
            <Button href="/institute" variant="outline">
              درباره موسسه
            </Button>
          </div>
        </div>
      </div>

      <div className="container-shell relative z-10 -mt-9">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-border bg-surface-strong/96 shadow-soft backdrop-blur md:grid-cols-4">
          {trustFeatures.map((item) => (
            <div
              className="border-b border-border p-5 md:border-b-0 md:border-l last:md:border-l-0"
              key={item.title}
            >
              <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-gold/10 text-gold">
                <svg
                  aria-hidden="true"
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3 20 7v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V7l8-4Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m8.5 12 2.4 2.4L15.8 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="font-black text-foreground">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="-mt-10 bg-admin-nav pt-16 text-white">
        <div className="container-shell grid gap-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {siteStats.map((stat, index) => (
            <div
              className="flex items-center justify-between gap-4 border-white/10 py-2 lg:border-l lg:pl-8 last:lg:border-l-0"
              key={stat.label}
            >
              <div>
                <strong className="block text-3xl text-gold">
                  {stat.value}
                </strong>
                <span className="mt-1 block text-sm text-slate-300">
                  {stat.label}
                </span>
              </div>
              <StatIcon index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
