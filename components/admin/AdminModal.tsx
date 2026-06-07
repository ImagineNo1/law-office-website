"use client";

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

  return (
    <>
      <button className="rounded-xl bg-gold px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-gold/90" onClick={() => ref.current?.showModal()} type="button">
        {buttonLabel}
      </button>
      <dialog className="w-[min(760px,calc(100vw-32px))] rounded-2xl border border-border bg-white p-0 text-right shadow-soft backdrop:bg-slate-950/40" ref={ref}>
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-xl font-black text-navy">{title}</h3>
        </div>
        <div className="max-h-[78vh] overflow-y-auto p-5">{children}</div>
        <form method="dialog" className="border-t border-border p-4">
          <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-black text-muted hover:text-navy" type="submit">بستن</button>
        </form>
      </dialog>
    </>
  );
}
