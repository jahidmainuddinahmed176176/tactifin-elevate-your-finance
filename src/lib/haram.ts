export const HARAM_KEYWORDS = [
  "interest",
  "riba",
  "alcohol",
  "beer",
  "wine",
  "liquor",
  "casino",
  "gambling",
  "lottery",
  "bet",
  "pork",
  "ham ",
  "bacon",
];

export function detectHaram(text: string): { isHaram: boolean; reason?: string } {
  const lower = text.toLowerCase();
  for (const kw of HARAM_KEYWORDS) {
    if (lower.includes(kw)) {
      return { isHaram: true, reason: `Contains "${kw.trim()}" — may not be Shariah-compliant` };
    }
  }
  return { isHaram: false };
}

export const CATEGORIES = [
  "Food",
  "Rent",
  "Business",
  "Taxi",
  "Salary",
  "Investment",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];