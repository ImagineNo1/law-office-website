"use client";

import { useState } from "react";
import type { Service } from "@/types";

export function ServiceFaq({
  items,
}: {
  items: NonNullable<Service["faqItems"]>;
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="rounded-[8px] border border-border bg-white p-5 shadow-card">
      <h2 className="mb-4 text-center text-xl font-black text-navy">
        سوالات متداول
      </h2>
      <div className="grid gap-2">
        {items.map((item, index) => {
          const open = index === openIndex;

          return (
            <div
              className="overflow-hidden rounded-xl border border-border bg-white"
              key={item.question}
            >
              <button
                aria-expanded={open}
                className="flex min-h-12 w-full items-center justify-between gap-4 px-4 text-right text-sm font-black text-navy transition hover:bg-soft-gray"
                onClick={() => setOpenIndex(open ? -1 : index)}
                type="button"
              >
                {item.question}
                <svg
                  aria-hidden="true"
                  className={`size-4 shrink-0 text-navy transition ${open ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-border px-4 py-4 text-sm font-bold leading-8 text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
