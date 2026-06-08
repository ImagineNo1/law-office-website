"use client";

import { createContext, useContext } from "react";
import type { TourKind, TourStep } from "@/components/onboarding/tour-steps";

export type GuidedTourState = {
  kind: TourKind;
  steps: TourStep[];
  isOpen: boolean;
  currentStepIndex: number;
  startTour: () => void;
  closeTour: (mode: "completed" | "skipped") => void;
  nextStep: () => void;
  previousStep: () => void;
};

export const GuidedTourContext = createContext<GuidedTourState | null>(null);

export function useGuidedTour() {
  const context = useContext(GuidedTourContext);
  if (!context) {
    throw new Error("useGuidedTour must be used inside TourProvider.");
  }
  return context;
}
