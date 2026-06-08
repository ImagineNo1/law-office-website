"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { GuidedTour } from "@/components/onboarding/GuidedTour";
import { GuidedTourContext } from "@/components/onboarding/useGuidedTour";
import {
  TOUR_VERSION,
  adminTourSteps,
  clientTourSteps,
  type TourKind,
  type TourStep,
} from "@/components/onboarding/tour-steps";

type InitialTourState = {
  completed: boolean;
  skipped: boolean;
  lastSeenTourVersion: string;
  shouldShow: boolean;
  source: "db" | "fallback";
};

const storageKeys: Record<TourKind, string> = {
  admin: "vakilyar_admin_tour_completed",
  client: "vakilyar_client_tour_completed",
};

function readLocalCompletion(kind: TourKind) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(storageKeys[kind]) === TOUR_VERSION;
}

function writeLocalCompletion(kind: TourKind) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKeys[kind], TOUR_VERSION);
}

export function TourProvider({
  children,
  initialState,
  kind,
  markCompletedAction,
}: {
  children: React.ReactNode;
  initialState: InitialTourState;
  kind: TourKind;
  markCompletedAction: (
    mode?: "completed" | "skipped",
  ) => Promise<{ ok: boolean }>;
}) {
  const steps = kind === "admin" ? adminTourSteps : clientTourSteps;
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [, startTransition] = useTransition();

  const startTour = useCallback(() => {
    setCurrentStepIndex(0);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const shouldSuppressWithLocalFallback = readLocalCompletion(kind);
    if (initialState.shouldShow && !shouldSuppressWithLocalFallback) {
      const timer = window.setTimeout(startTour, 450);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [initialState.shouldShow, kind, startTour]);

  const persistDone = useCallback(
    (mode: "completed" | "skipped") => {
      startTransition(async () => {
        try {
          const result = await markCompletedAction(mode);
          if (!result.ok) writeLocalCompletion(kind);
        } catch {
          writeLocalCompletion(kind);
        }
      });
    },
    [kind, markCompletedAction],
  );

  const closeTour = useCallback(
    (mode: "completed" | "skipped") => {
      setIsOpen(false);
      writeLocalCompletion(kind);
      persistDone(mode);
    },
    [kind, persistDone],
  );

  const nextStep = useCallback(() => {
    setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
  }, [steps.length]);

  const previousStep = useCallback(() => {
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
  }, []);

  const value = useMemo(
    () => ({
      kind,
      steps: steps as TourStep[],
      isOpen,
      currentStepIndex,
      startTour,
      closeTour,
      nextStep,
      previousStep,
    }),
    [
      closeTour,
      currentStepIndex,
      isOpen,
      kind,
      nextStep,
      previousStep,
      startTour,
      steps,
    ],
  );

  return (
    <GuidedTourContext.Provider value={value}>
      {children}
      <GuidedTour
        currentStepIndex={currentStepIndex}
        isOpen={isOpen}
        nextStep={nextStep}
        previousStep={previousStep}
        closeTour={closeTour}
        steps={steps}
      />
    </GuidedTourContext.Provider>
  );
}
