export type BDInputs = {
  ay?: string;
  category?: string;
  resident?: boolean;
  employmentIncome?: number;
  rent?: number;
  agriculture?: number;
  business?: number;
  financial?: number;
  dividend?: number;
  other?: number;
  capGainGold?: number;
  capGainOtherGT5?: number;
  capGainOtherLT5?: number;
  eligibleInvestments?: number;
  disabledChildren?: number;
  vehicles?: {
    upTo1500?: number;
    v1501_2000?: number;
    v2001_2500?: number;
    v2501_3000?: number;
    v3001_3500?: number;
    above3500?: number;
  };
  netWealth?: number;
  minTaxFloor?: number;
};

export type BDBreakdown = {
  slabTaxable: number;
  basicExemption: number;
  slabTax: number;
  investmentCredit: number;
  taxAfterCredit: number;
  regularTaxPayable: number;
  dividendTax: number;
  capGainGoldTax: number;
  capGainOtherGTTax: number;
  environmentalSurcharge: number;
  wealthSurcharge: number;
  totalTaxLiability: number;
};

const RULES = {
  basicExemptions: {
    General: 400_000,
    WomanOrSenior: 450_000,
    ThirdGenderOrPH: 525_000,
    WarWounded: 550_000,
  },
  slabs: [
    { cap: 300_000, rate: 0.10 },
    { cap: 400_000, rate: 0.15 },
    { cap: 500_000, rate: 0.20 },
    { cap: 2_000_000, rate: 0.25 },
    { cap: Infinity, rate: 0.30 },
  ],
  standardEmploymentExemptionCap: 500_000,
  investmentCredit: { capAmount: 750_000, percentOfIncome: 0.03, percentOfInvest: 0.10 },
  dividendRate: 0.15,
  capGainGoldRate: 0.05,
  capGainOtherGT5Rate: 0.15,
  environmentalSurchargeRates: {
    upTo1500: 25_000,
    v1501_2000: 50_000,
    v2001_2500: 75_000,
    v2501_3000: 150_000,
    v3001_3500: 200_000,
    above3500: 350_000,
  },
  defaultMinTaxFloor: 5_000,
};

function applySlabs(amount: number) {
  let remaining = amount;
  let tax = 0;
  for (const slab of RULES.slabs) {
    const cap = slab.cap === Infinity ? Infinity : slab.cap;
    const slice = Math.min(remaining, cap === Infinity ? remaining : cap);
    if (slice <= 0) break;
    tax += slice * slab.rate;
    remaining -= slice;
    if (remaining <= 0) break;
  }
  return tax;
}

export function computeTaxBD(input: BDInputs): BDBreakdown {
  const ay = input.ay ?? "AY 2026-27";
  const category = input.category ?? "General";
  const resident = input.resident ?? true;

  const employment = Number(input.employmentIncome ?? 0);
  const rent = Number(input.rent ?? 0);
  const agri = Number(input.agriculture ?? 0);
  const business = Number(input.business ?? 0);
  const financial = Number(input.financial ?? 0);
  const other = Number(input.other ?? 0);
  const dividend = Number(input.dividend ?? 0);
  const capGold = Number(input.capGainGold ?? 0);
  const capOtherGT5 = Number(input.capGainOtherGT5 ?? 0);
  const capOtherLT5 = Number(input.capGainOtherLT5 ?? 0);
  const eligibleInvestments = Number(input.eligibleInvestments ?? 0);
  const disabledChildren = Number(input.disabledChildren ?? 0);
  const vehicles = input.vehicles ?? {};
  const netWealth = Number(input.netWealth ?? 0);
  const minTaxFloor = input.minTaxFloor ?? RULES.defaultMinTaxFloor;

  if (!resident) {
    // Non-resident foreigners: flat 30% on gross income
    const gross = employment + rent + agri + business + financial + dividend + other + capGold + capOtherGT5 + capOtherLT5;
    const flat = gross * 0.30;
    return {
      slabTaxable: 0,
      basicExemption: 0,
      slabTax: 0,
      investmentCredit: 0,
      taxAfterCredit: 0,
      regularTaxPayable: flat,
      dividendTax: 0,
      capGainGoldTax: 0,
      capGainOtherGTTax: 0,
      environmentalSurcharge: 0,
      wealthSurcharge: 0,
      totalTaxLiability: flat,
    };
  }

  // Standard employment exemption: lower of 1/3 of employment income or BDT 500,000
  const standardEmploymentExemption = Math.min(employment / 3, RULES.standardEmploymentExemptionCap);
  const netEmployment = Math.max(0, employment - standardEmploymentExemption);

  // Slab-taxed income: net employment + rent + agriculture + business + financial + other + capital gain (within 5 yrs)
  const slabTaxable = netEmployment + rent + agri + business + financial + other + capOtherLT5;

  // Basic exemption by category
  const basicExemption = RULES.basicExemptions.General; // default
  if (category === "WomanOrSenior") basicExemption = RULES.basicExemptions.WomanOrSenior; // Note: TypeScript won't allow reassign to const - will adjust below

  // To keep typing simple, compute basicExemption properly:
}
