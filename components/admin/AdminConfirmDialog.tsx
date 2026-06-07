"use client";

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
      <button className="rounded-lg border border-red-200 px-3 py-2 text-xs font-black text-red-600 hover:bg-red-50" onClick={() => ref.current?.showModal()} type="button">
        {buttonLabel}
      </button>
      <dialog className="w-[min(440px,calc(100vw-32px))] rounded-2xl border border-border bg-white p-0 text-right shadow-soft backdrop:bg-slate-950/40" ref={ref}>
        <div className="p-5">
          <h3 className="text-lg font-black text-navy">{title}</h3>
          <p className="mt-2 text-sm font-bold leading-8 text-muted">این عملیات بدون تایید شما انجام نمی‌شود.</p>
          {children}
          <div className="mt-5 flex flex-wrap gap-3">
            {action}
            <form method="dialog">
              <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-black text-muted" type="submit">انصراف</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
