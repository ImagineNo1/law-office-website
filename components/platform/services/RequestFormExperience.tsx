import { createServiceRequestAction } from "@/app/requests/actions";
import { Container } from "@/components/platform/layout/PageShell";
import {
  PublicPageHero,
  PublicShell,
} from "@/components/platform/layout/PublicShell";
import { fa, fallbackServices, type PlatformService } from "@/lib/platform-db";

export function RequestFormExperience({
  services = fallbackServices,
}: {
  services?: PlatformService[];
}) {
  return (
    <PublicShell>
      <PublicPageHero
        description="موضوع حقوقی، نوع خدمت و فوریت را ثبت کنید تا درخواست وارد مسیر بررسی و پیگیری شود."
        eyebrow="شروع همکاری"
        title="ثبت درخواست حقوقی"
      />
      <section className="py-10">
        <Container className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-2xl bg-[#0B172A] p-6 text-white">
            <h2 className="text-2xl font-black">مسیر پیگیری درخواست</h2>
            <p className="mt-4 text-sm font-bold leading-8 text-slate-300">
              پس از ثبت، درخواست شما در داشبورد قابل پیگیری است و پیام‌های بعدی
              همان‌جا ثبت می‌شود.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "بررسی اولیه",
                "تخصیص وکیل",
                "پیگیری در داشبورد",
                "تحویل سند",
              ].map((step, i) => (
                <div
                  className="flex items-center gap-3 rounded-xl bg-white/10 p-3"
                  key={step}
                >
                  <span className="grid size-8 place-items-center rounded-full bg-[#0F766E] text-xs font-black">
                    {fa(i + 1)}
                  </span>
                  <span className="font-black">{step}</span>
                </div>
              ))}
            </div>
          </aside>
          <form
            action={createServiceRequestAction}
            className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-black">
                نام و نام خانوادگی
                <input
                  className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-[#0F766E]"
                  name="fullName"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-black">
                شماره تماس
                <input
                  className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-[#0F766E]"
                  name="phone"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-black">
                ایمیل
                <input
                  className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-[#0F766E]"
                  name="email"
                  type="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-black">
                موضوع درخواست
                <input
                  className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-[#0F766E]"
                  name="subject"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-black">
                <span>نوع خدمت</span>
                <select
                  className="h-12 rounded-xl border border-slate-200 px-4"
                  name="serviceSlug"
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black">
                <span>فوریت</span>
                <select
                  className="h-12 rounded-xl border border-slate-200 px-4"
                  name="priority"
                >
                  <option value="medium">عادی</option>
                  <option value="urgent">فوری</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black md:col-span-2">
                شرح درخواست
                <textarea
                  className="min-h-36 rounded-xl border border-slate-200 p-4 outline-none focus:border-[#0F766E]"
                  name="description"
                  required
                />
              </label>
            </div>
            <button className="mt-6 h-12 rounded-xl bg-[#0F766E] px-8 text-sm font-black text-white">
              ارسال درخواست
            </button>
          </form>
        </Container>
      </section>
    </PublicShell>
  );
}
