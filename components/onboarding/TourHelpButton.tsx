"use client";

import { CircleHelp } from "lucide-react";
import { useGuidedTour } from "@/components/onboarding/useGuidedTour";

export function TourHelpButton({
  className = "",
  label,
  tourId,
}: {
  className?: string;
  label: string;
  tourId: string;
}) {
  const { startTour } = useGuidedTour();

  return (
    <button
      className={className}
      data-tour={tourId}
      onClick={startTour}
      type="button"
    >
      <CircleHelp aria-hidden="true" className="size-4" />
      <span>{label}</span>
    </button>
  );
}
