"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

type Errors = Partial<Record<"fullName" | "phone" | "subject" | "description", string>>;

export function ServiceRequestForm({
  service,
  services,
}: {
  service: Service;
  services: Service[];
}) {
  const [errors, setErrors] = useState<Errors>({});
  const serviceOptions = useMemo(
    () => services.map((item) => item.title),
    [services],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors: Errors = {};

    if (!String(formData.get("fullName") ?? "").trim()) {
      nextErrors.fullName = "نام و نام خانوادگی الزامی است.";
    }
    if (!/^09\d{9}$/.test(String(formData.get("phone") ?? "").trim())) {
      nextErrors.phone = "شماره تماس را با فرمت 09123456789 وارد کنید.";
    }
    if (!String(formData.get("subject") ?? "").trim()) {
      nextErrors.subject = "موضوع درخواست الزامی است.";
    }
    if (!String(formData.get("description") ?? "").trim()) {
      nextErrors.description = "توضیحات درخواست الزامی است.";
    }

    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) {
      event.currentTarget.reset();
    }
  }

  return (
    <aside className="sticky top-24 rounded-[8px] border border-border bg-white shadow-card">
      <form className="grid gap-4 p-6" onSubmit={handleSubmit}>
        <div className="text-center">
          <h2 className="text-2xl font-black text-navy">
            درخواست {service.title === "تنظیم قرارداد" ? "تنظیم قرارداد تخصصی" : service.title}
          </h2>
          <p className="mt-3 text-sm font-bold leading-7 text-muted">
            اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.
          </p>
        </div>

        <Field error={errors.fullName} label="نام و نام خانوادگی" required>
          <input className="service-input" name="fullName" placeholder="نام و نام خانوادگی خود را وارد کنید" />
        </Field>
        <Field error={errors.phone} label="شماره تماس" required>
          <input className="service-input" inputMode="tel" name="phone" placeholder="0912 345 6789" />
        </Field>
        <Field label="ایمیل">
          <input className="service-input" name="email" placeholder="email@example.com" type="email" />
        </Field>
        <Field label="نوع خدمت" required>
          <select className="service-input" defaultValue={service.title} name="serviceType">
            {serviceOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </Field>
        <Field error={errors.subject} label="موضوع درخواست" required>
          <input className="service-input" name="subject" placeholder="موضوع درخواست خود را وارد کنید" />
        </Field>
        <Field error={errors.description} label="توضیحات" required>
          <textarea className="service-input min-h-28 resize-none py-3" name="description" placeholder="توضیحات خود را بنویسید..." />
        </Field>
        <Field label="فایل پیوست (اختیاری)">
          <input className="service-input file:ml-3 file:rounded-lg file:border-0 file:bg-soft-gray file:px-3 file:py-2 file:text-sm file:font-black file:text-navy" name="attachment" type="file" />
          <span className="text-xs font-bold text-muted">حداکثر حجم فایل: ۵ مگابایت</span>
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
  error,
  label,
  required,
}: {
  children: React.ReactNode;
  error?: string;
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
      {error ? <span className="text-xs font-bold text-red-600">{error}</span> : null}
    </label>
  );
}
