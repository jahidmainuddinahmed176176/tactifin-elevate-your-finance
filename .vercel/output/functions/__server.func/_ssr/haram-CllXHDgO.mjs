const HARAM_KEYWORDS = [
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
  "bacon"
];
function detectHaram(text) {
  const lower = text.toLowerCase();
  for (const kw of HARAM_KEYWORDS) {
    if (lower.includes(kw)) {
      return { isHaram: true, reason: `Contains "${kw.trim()}" — may not be Shariah-compliant` };
    }
  }
  return { isHaram: false };
}
const CATEGORIES = [
  "Food",
  "Rent",
  "Business",
  "Taxi",
  "Salary",
  "Investment",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Other"
];
export {
  CATEGORIES as C,
  HARAM_KEYWORDS as H,
  detectHaram as d
};
