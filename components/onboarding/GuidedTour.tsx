"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TourSpotlight,
  type SpotlightRect,
} from "@/components/onboarding/TourSpotlight";
import { TourStepCard } from "@/components/onboarding/TourStepCard";
import type { TourStep } from "@/components/onboarding/tour-steps";

type CardPosition = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  transform?: string;
};

const CARD_WIDTH = 410;
const GAP = 18;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTarget(selector?: string) {
  if (!selector) return null;
  return document.querySelector<HTMLElement>(selector);
}

function rectFromElement(element: HTMLElement | null): SpotlightRect {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  const padding = 8;
  return {
    top: clamp(rect.top - padding, 8, window.innerHeight - 32),
    left: clamp(rect.left - padding, 8, window.innerWidth - 32),
    width: Math.min(rect.width + padding * 2, window.innerWidth - 16),
    height: Math.min(rect.height + padding * 2, window.innerHeight - 16),
  };
}

function positionCard(rect: SpotlightRect): CardPosition {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    return { bottom: 16, left: 16, right: 16 };
  }

  if (!rect) {
    return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }

  const fitsLeft = rect.left - CARD_WIDTH - GAP > 16;
  const fitsRight =
    rect.left + rect.width + CARD_WIDTH + GAP < window.innerWidth - 16;
  const top = clamp(
    rect.top + rect.height / 2 - 190,
    16,
    window.innerHeight - 430,
  );

  if (fitsLeft) {
    return { top, left: rect.left - CARD_WIDTH - GAP };
  }
  if (fitsRight) {
    return { top, left: rect.left + rect.width + GAP };
  }

  return {
    top: clamp(rect.top + rect.height + GAP, 16, window.innerHeight - 430),
    left: clamp(rect.left, 16, window.innerWidth - CARD_WIDTH - 16),
  };
}

export function GuidedTour({
  currentStepIndex,
  isOpen,
  nextStep,
  previousStep,
  closeTour,
  steps,
}: {
  currentStepIndex: number;
  isOpen: boolean;
  nextStep: () => void;
  previousStep: () => void;
  closeTour: (mode: "completed" | "skipped") => void;
  steps: TourStep[];
}) {
  const [rect, setRect] = useState<SpotlightRect>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const step = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const updateTarget = useCallback(() => {
    if (!step) return;
    const target = getTarget(step.selector);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      window.setTimeout(() => setRect(rectFromElement(target)), 220);
      return;
    }
    window.setTimeout(() => setRect(null), 0);
  }, [step]);

  useEffect(() => {
    if (!isOpen) return;
    const initialTimer = window.setTimeout(updateTarget, 0);
    const onResize = () => updateTarget();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [isOpen, updateTarget]);

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    window.setTimeout(() => cardRef.current?.focus(), 0);
    return () => previousActive?.focus?.();
  }, [isOpen, currentStepIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeTour("skipped");
      }
      if (event.key === "Enter" && !isLast) {
        event.preventDefault();
        nextStep();
      }
      if (event.key === "ArrowLeft" && !isLast) {
        event.preventDefault();
        nextStep();
      }
      if (event.key === "ArrowRight" && !isFirst) {
        event.preventDefault();
        previousStep();
      }
      if (event.key === "Tab") {
        const focusable = cardRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeTour, isFirst, isLast, isOpen, nextStep, previousStep]);

  const cardPosition = useMemo(() => {
    if (typeof window === "undefined") return {};
    return positionCard(rect);
  }, [rect]);

  if (!isOpen || !step) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[80] bg-slate-950/65 backdrop-blur-[1px]"
      />
      <TourSpotlight rect={rect} />
      <TourStepCard
        cardRef={cardRef}
        current={currentStepIndex + 1}
        isFirst={isFirst}
        isLast={isLast}
        onFinish={() => closeTour("completed")}
        onNext={nextStep}
        onPrevious={previousStep}
        onSkip={() => closeTour("skipped")}
        position={cardPosition}
        step={step}
        total={steps.length}
      />
    </>
  );
}
