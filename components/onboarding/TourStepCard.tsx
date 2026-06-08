"use client";

import { TourProgress } from "@/components/onboarding/TourProgress";
import type { TourStep } from "@/components/onboarding/tour-steps";

type CardPosition = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  transform?: string;
};

export function TourStepCard({
  cardRef,
  current,
  isFirst,
  isLast,
  onFinish,
  onNext,
  onPrevious,
  onSkip,
  position,
  step,
  total,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  current: number;
  isFirst: boolean;
  isLast: boolean;
  onFinish: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  position: CardPosition;
  step: TourStep;
  total: number;
}) {
  return (
    <div
      aria-describedby="guided-tour-body"
      aria-labelledby="guided-tour-title"
      aria-modal="true"
      className="fixed z-[100] w-[min(92vw,410px)] rounded-2xl border border-slate-200 bg-white p-5 text-right font-body text-primary shadow-[0_24px_80px_rgba(15,23,42,0.25)] outline-none"
      dir="rtl"
      ref={cardRef}
      role="dialog"
      style={position}
      tabIndex={-1}
    >
      <TourProgress current={current} total={total} />
      <div className="mt-5">
        <h2 className="font-heading text-xl font-extrabold text-navy" id="guided-tour-title">{step.title}</h2>
        <p className="mt-3 text-sm font-bold leading-8 text-muted-foreground" id="guided-tour-body">{step.body}</p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <button className="rounded-xl border border-border px-4 py-3 text-sm font-extrabold text-muted-foreground transition hover:border-gold hover:text-gold" onClick={onSkip} type="button">
          رد کردن
        </button>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <button className="rounded-xl border border-border px-4 py-3 text-sm font-extrabold text-navy transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-45" disabled={isFirst} onClick={onPrevious} type="button">
            قبلی
          </button>
          {isLast ? (
            <button className="rounded-xl bg-gold px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-gold/90" onClick={onFinish} type="button">
              پایان راهنما
            </button>
          ) : (
            <button className="rounded-xl bg-navy px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-navy/90" onClick={onNext} type="button">
              بعدی
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
