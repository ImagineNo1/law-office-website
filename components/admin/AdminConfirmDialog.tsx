"use client";

import { Trash2 } from "lucide-react";
import { useRef } from "react";

export function AdminConfirmDialog({
  action,
  buttonLabel = "حذف",
  children,
  title = "تایید عملیات",
}: {
  action: React.ReactNode;
  buttonLabel?: string;
  children?: React.ReactNode;
  title?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-extrabold text-red-600 transition hover:bg-red-50" onClick={() => ref.current?.showModal()} type="button">
        <Trash2 aria-hidden="true" className="size-4" />
        <span>{buttonLabel}</span>
      </button>
      <dialog className="w-[min(440px,calc(100vw-32px))] rounded-lg border border-border bg-card p-0 text-right shadow-soft backdrop:bg-slate-950/40" ref={ref}>
        <div className="p-5">
          <h3 className="font-heading text-lg font-extrabold text-primary">{title}</h3>
          <p className="mt-2 text-sm font-medium leading-8 text-muted-foreground">این عملیات بدون تایید شما انجام نمی‌شود.</p>
          {children}
          <div className="mt-5 flex flex-wrap gap-3">
            {action}
            <form method="dialog">
              <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-extrabold text-muted-foreground" type="submit">انصراف</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
