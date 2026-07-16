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
  "Sales",
  "Service",
  "Revenue",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Food: ["grocery", "groceries", "food", "restaurant", "cafe", "coffee", "lunch", "dinner", "breakfast", "snack", "meal", "takeout", "delivery", "pizza", "burger", "supermarket", "market", "bakery"],
  Rent: ["rent", "lease", "landlord", "apartment", "housing", "mortgage", "property"],
  Business: ["business", "office", "supplies", "equipment", "inventory", "supplier", "wholesale", "b2b", "invoice", "client"],
  Taxi: ["taxi", "uber", "lyft", "cab", "ride", "transport", "bus", "train", "metro", "subway", "fuel", "gas", "parking", "transit"],
  Salary: ["salary", "paycheck", "wage", "payroll", "stipend", "bonus", "commission", "earnings"],
  Investment: ["investment", "stock", "stocks", "dividend", "bond", "etf", "mutual fund", "crypto", "bitcoin", "shares", "portfolio", "trading"],
  Utilities: ["utility", "utilities", "electric", "electricity", "water", "gas bill", "internet", "phone", "broadband", "heating", "sewage"],
  Shopping: ["shopping", "amazon", "store", "clothes", "clothing", "shoes", "electronics", "gadget", "mall", "retail", "purchase", "order"],
  Entertainment: ["entertainment", "movie", "cinema", "netflix", "spotify", "game", "gaming", "concert", "ticket", "show", "streaming", "subscription", "hobby"],
  Sales: ["sale", "sales", "sold", "revenue from sale", "product sale", "goods sold", "merchandise sold"],
  Service: ["service", "consulting", "freelance", "professional fee", "service fee", "service income", "services rendered"],
  Revenue: ["revenue", "income", "proceeds", "receipts", "turnover", "gross income"],
};

export function autoCategorize(description: string): string {
  const lower = description.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category;
    }
  }
  return "Other";
}
