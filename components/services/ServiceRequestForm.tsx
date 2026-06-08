import { createServiceRequestAction } from "@/app/requests/actions";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

export function ServiceRequestForm({
  service,
  services,
}: {
  service: Service;
  services: Service[];
}) {
  return (
    <aside className="sticky top-24 rounded-[8px] border border-border bg-white shadow-card">
      <form action={createServiceRequestAction} className="grid gap-4 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-navy">
            درخواست{" "}
            {service.title === "تنظیم قرارداد"
              ? "تنظیم قرارداد تخصصی"
              : service.title}
          </h2>
          <p className="mt-3 text-sm font-bold leading-7 text-muted">
            اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.
          </p>
        </div>

        <input
          type="hidden"
          name="serviceSlug"
          value={service.slug ?? "general"}
        />
        <input type="hidden" name="serviceTitle" value={service.title} />

        <Field label="نام و نام خانوادگی" required>
          <input
            className="service-input"
            name="fullName"
            required
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
        </Field>
        <Field label="شماره تماس" required>
          <input
            className="service-input"
            inputMode="tel"
            name="phone"
            required
            placeholder="0912 345 6789"
          />
        </Field>
        <Field label="ایمیل">
          <input
            className="service-input"
            name="email"
            placeholder="email@example.com"
            type="email"
          />
        </Field>
        <Field label="نوع خدمت" required>
          <select
            className="service-input"
            defaultValue={service.title}
            name="serviceType"
          >
            {services.map((item) => (
              <option key={item.slug ?? item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="موضوع درخواست" required>
          <input
            className="service-input"
            name="subject"
            required
            placeholder="موضوع درخواست خود را وارد کنید"
          />
        </Field>
        <Field label="توضیحات" required>
          <textarea
            className="service-input min-h-28 resize-none py-3"
            name="description"
            required
            placeholder="توضیحات خود را بنویسید..."
          />
        </Field>
        <Field label="فایل پیوست (اختیاری)">
          <input
            className="service-input file:ml-3 file:rounded-lg file:border-0 file:bg-soft-gray file:px-3 file:py-2 file:text-sm file:font-black file:text-navy"
            name="attachment"
            type="file"
          />
          <span className="text-xs font-bold text-muted">
            حداکثر حجم فایل: ۵ مگابایت
          </span>
        </Field>

        <Button className="h-12 w-full" type="submit">
          ارسال درخواست
        </Button>
      </form>

      <div className="border-t border-border px-6 py-4 text-center text-sm font-bold leading-7 text-muted">
        کارشناسان ما در کمتر از ۲۴ ساعت با شما تماس خواهند گرفت.
      </div>
    </aside>
  );
}

function Field({
  children,
  label,
  required,
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>
        {label}
        {required ? <span className="mr-1 text-red-600">*</span> : null}
      </span>
      {children}
    </label>
  );
}
