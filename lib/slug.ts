const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

export function localizeDigits(value: string, locale: "fa" | "ar" = "fa") {
  const digits = locale === "fa" ? persianDigits : arabicDigits;
  return value.replace(/[0-9]/g, (digit) => digits[Number(digit)] ?? digit);
}

export function normalizeDigits(value: string) {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = persianDigits.indexOf(digit);
    if (persianIndex >= 0) return String(persianIndex);
    const arabicIndex = arabicDigits.indexOf(digit);
    return arabicIndex >= 0 ? String(arabicIndex) : digit;
  });
}

export function normalizeSlug(value: string) {
  return normalizeDigits(value)
    .trim()
    .toLowerCase()
    .replace(/[\u200c]+/g, "-")
    .replace(/[\u0640]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function slugFromTitle(title: string, fallback = "item") {
  return normalizeSlug(title) || fallback;
}

export function slugLookupVariants(value: string) {
  const decoded = safeDecodeURIComponent(value);
  const variants = [
    value,
    decoded,
    normalizeSlug(value),
    normalizeSlug(decoded),
    normalizeDigits(value),
    normalizeDigits(decoded),
    localizeDigits(normalizeSlug(value), "fa"),
    localizeDigits(normalizeSlug(decoded), "fa"),
    localizeDigits(normalizeSlug(value), "ar"),
    localizeDigits(normalizeSlug(decoded), "ar"),
    decoded.trim().replace(/\s+/g, "-"),
  ];

  return Array.from(new Set(variants.filter(Boolean)));
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
