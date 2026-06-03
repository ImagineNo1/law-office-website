export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\u0640]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function slugFromTitle(title: string, fallback = "item") {
  return normalizeSlug(title) || fallback;
}
