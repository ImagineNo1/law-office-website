"use client";

export type SpotlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
} | null;

export function TourSpotlight({ rect }: { rect: SpotlightRect }) {
  if (!rect) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[90] rounded-2xl border-2 border-emerald-500 bg-white/5 shadow-[0_0_0_9999px_rgba(8,15,32,0.72),0_18px_50px_rgba(15,23,42,0.28)] transition-all duration-200"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
}
