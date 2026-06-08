"use client";

import { Plus, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { createDashboardRequestAction } from "@/app/dashboard/actions";
import type { PlatformService } from "@/lib/platform-db";

export function RequestCreateModal({
  openOnMount = false,
  services,
}: {
  openOnMount?: boolean;
  services: PlatformService[];
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openOnMount && ref.current && !ref.current.open) {
      ref.current.showModal();
    }
  }, [openOnMount]);

  return (
    <>
      <button
        data-tour="client-new-request"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-extrabold text-accent-foreground shadow-sm transition hover:bg-accent/90"
        onClick={() => ref.current?.showModal()}
        type="button"
      >
        <Plus aria-hidden="true" className="size-4" />
        ثبت درخواست جدید
      </button>
      <dialog
        className="m-auto w-[min(720px,calc(100vw-32px))] rounded-2xl border border-border bg-card p-0 text-right shadow-soft backdrop:bg-slate-950/45"
        ref={ref}
      >
        <div className="bg-gradient-to-l from-primary to-slate-800 px-6 py-5 text-primary-foreground">
          <h3 className="font-heading text-2xl font-extrabold">
            ثبت درخواست حقوقی
          </h3>
          <p className="mt-2 text-sm font-bold text-primary-foreground/75">
            درخواست شما داخل همین داشبورد ثبت و قابل پیگیری می‌شود.
          </p>
        </div>
        <form
          action={createDashboardRequestAction}
          className="grid gap-4 p-6"
          onSubmit={() => ref.current?.close()}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-extrabold text-primary">
              موضوع درخواست
              <input className="service-input" name="subject" required />
            </label>
            <label className="grid gap-2 text-sm font-extrabold text-primary">
              نوع خدمت
              <select className="service-input" name="serviceSlug">
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-extrabold text-primary">
            شرح درخواست
            <textarea
              className="service-input min-h-36 py-3"
              name="description"
              required
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <button
              className="rounded-lg border border-border px-5 py-3 text-sm font-extrabold text-muted-foreground"
              onClick={() => ref.current?.close()}
              type="button"
            >
              انصراف
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-extrabold text-accent-foreground"
              type="submit"
            >
              <Send aria-hidden="true" className="size-4" />
              ارسال درخواست
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
