"use client";

import { Edit, Eye, Plus } from "lucide-react";
import { useRef } from "react";

export function AdminModal({
  buttonLabel,
  children,
  title,
}: {
  buttonLabel: string;
  children: React.ReactNode;
  title: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const ButtonIcon = buttonLabel.includes("ویرایش")
    ? Edit
    : buttonLabel.includes("مشاهده")
      ? Eye
      : Plus;

  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-800"
        onClick={() => ref.current?.showModal()}
        type="button"
      >
        <ButtonIcon aria-hidden="true" className="size-4" />
        <span>{buttonLabel}</span>
      </button>
      <dialog
        className="m-auto w-[min(860px,calc(100vw-32px))] rounded-lg border border-emerald-100 bg-card p-0 text-right shadow-soft backdrop:bg-slate-950/40"
        ref={ref}
      >
        <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-4">
          <h3 className="font-heading text-xl font-extrabold text-emerald-950">
            {title}
          </h3>
        </div>
        <div
          className="max-h-[78vh] overflow-y-auto p-5"
          onSubmit={() => setTimeout(() => ref.current?.close(), 120)}
        >
          {children}
        </div>
        <form method="dialog" className="border-t border-border p-4">
          <button
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-extrabold text-muted-foreground hover:text-primary"
            type="submit"
          >
            بستن
          </button>
        </form>
      </dialog>
    </>
  );
}
