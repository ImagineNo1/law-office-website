import type { LawyerLicenseType } from "@/types";

export const lawyerLicenseLabels: Record<LawyerLicenseType, string> = {
  paye_one: "وکیل پایه یک دادگستری",
  paye_two: "وکیل پایه دو دادگستری",
  trainee: "کارآموز وکالت",
  article_187: "وکیل/مشاور ماده ۱۸۷",
  judicial_advisor: "مشاور حقوقی",
  taskhiri: "وکیل تسخیری",
  moazadati: "وکیل معاضدتی",
  taeini: "وکیل تعیینی",
  ettefaghi: "وکیل اتفاقی",
};

export const lawyerLicenseTypes = Object.keys(
  lawyerLicenseLabels,
) as LawyerLicenseType[];

export function lawyerLicenseType(value: string): LawyerLicenseType {
  return lawyerLicenseTypes.includes(value as LawyerLicenseType)
    ? (value as LawyerLicenseType)
    : "paye_one";
}
