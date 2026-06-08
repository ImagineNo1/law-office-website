"use client";

import { useState } from "react";

function formatPrice(value: string) {
  const normalized = value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/,/g, "");

  return normalized.replace(/\d+/g, (digits) =>
    digits.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  );
}

export function PriceInput({
  defaultValue,
  label,
  name = "priceLabel",
}: {
  defaultValue?: string | number;
  label: string;
  name?: string;
}) {
  const [value, setValue] = useState(formatPrice(String(defaultValue ?? "")));

  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>{label}</span>
      <input
        className="service-input"
        inputMode="numeric"
        name={name}
        onChange={(event) => setValue(formatPrice(event.target.value))}
        value={value}
      />
    </label>
  );
}
