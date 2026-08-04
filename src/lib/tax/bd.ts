// Bangladesh individual income tax calculator
// Rules based on AY 2026-27 & 2027-28 (default), with forward support for AY 2028-29+ and AY 2030-31.

export type AssessmentYear = "AY 2026-27 & 2027-28" | "AY 2028-29 & 2029-30" | "AY 2030-31";
export type TaxpayerCategory = "General" | "Woman or Senior Citizen (65+)" | "Third Gender or Physically Challenged" | "War-Wounded Gazetted Freedom Fighter or July Fighter";

export interface BDTaxInput {
  assessmentYear: AssessmentYear;
  category: TaxpayerCategory;
  isBangladeshiCitizen: boolean;
  isNewTaxpayer: boolean;
  childrenWithDisabilities: number;
  employmentIncome: number;
  rentIncome: number;
  agricultureIncome: number;
  businessIncome: number;
  financialAssetsIncome: number;
  dividendIncome: number;
  otherIncome: number;
  capitalGainGold: number;
  capitalGainOtherLongTerm: number;
  capitalGainOtherShortTerm: number;
  eligibleInvestments: number;
  netWealth: number;
  motorCarsOwned: number;
  housePropertyArea: number;
  vehiclesUpTo1500: number;
  vehicles1501_2000: number;
  vehicles2001_2500: number;
  vehicles2501_3000: number;
  vehicles3001_3500: number;
  vehiclesAbove3500: number;
}

export interface BDTaxBreakdown {
  grossEmploymentIncome: number;
  employmentExemption: number;
  netEmploymentIncome: number;
  otherSlabIncome: number;
  totalSlabTaxedIncome: number;
  basicExemption: number;
  childDisabilityExemption: number;
  totalExemption: number;
  taxableIncome: number;
  slabTax: number;
  investmentCredit: number;
  taxAfterCredit: number;
  minimumTaxFloor: number;
  regularTaxPayable: number;
  dividendTax: number;
  capitalGainGoldTax: number;
  capitalGainOtherLongTermTax: number;
  totalTaxBeforeSurcharge: number;
  surchargeRate: number;
  surchargeAmount: number;
  environmentalSurcharge: number;
  totalTaxLiability: number;
  effectiveRate: number;
}

const EXEMPTIONS: Record<AssessmentYear, Record<TaxpayerCategory, number>> = {
  "AY 2026-27 & 2027-28": {
    "General": 400000,
    "Woman or Senior Citizen (65+)": 450000,
    "Third Gender or Physically Challenged": 525000,
    "War-Wounded Gazetted Freedom Fighter or July Fighter": 550000,
  },
  "AY 2028-29 & 2029-30": {
    "General": 450000,
    "Woman or Senior Citizen (65+)": 500000,
    "Third Gender or Physically Challenged": 575000,
    "War-Wounded Gazetted Freedom Fighter or July Fighter": 600000,
  },
  "AY 2030-31": {
    "General": 500000,
    "Woman or Senior Citizen (65+)": 550000,
    "Third Gender or Physically Challenged": 625000,
    "War-Wounded Gazetted Freedom Fighter or July Fighter": 650000,
  },
};

const CHILD_DISABILITY_EXEMPTION = 50000;

interface Slab { rate: number; width: number }

const SLABS: Record<AssessmentYear, Slab[]> = {
  "AY 2026-27 & 2027-28": [
    { rate: 0.10, width: 300000 },
    { rate: 0.15, width: 400000 },
    { rate: 0.20, width: 500000 },
    { rate: 0.25, width: 2000000 },
    { rate: 0.30, width: Infinity },
  ],
  "AY 2028-29 & 2029-30": [
    { rate: 0.10, width: 300000 },
    { rate: 0.15, width: 400000 },
    { rate: 0.20, width: 500000 },
    { rate: 0.25, width: 2000000 },
    { rate: 0.30, width: 26350000 },
    { rate: 0.35, width: Infinity },
  ],
  "AY 2030-31": [
    { rate: 0.10, width: 300000 },
    { rate: 0.15, width: 400000 },
    { rate: 0.20, width: 500000 },
    { rate: 0.25, width: 2000000 },
    { rate: 0.30, width: 26300000 },
    { rate: 0.35, width: Infinity },
  ],
};

const ENV_SURCHARGE: { cc: string; amount: number }[] = [
  { cc: "Up to 1,500cc", amount: 25000 },
  { cc: "1,501-2,000cc", amount: 50000 },
  { cc: "2,001-2,500cc", amount: 75000 },
  { cc: "2,501-3,000cc", amount: 150000 },
  { cc: "3,001-3,500cc", amount: 200000 },
  { cc: "Above 3,500cc", amount: 350000 },
];

const DIVIDEND_RATE = 0.15;
const CG_GOLD_RATE = 0.05;
const CG_LONG_TERM_RATE = 0.15;
const INVESTMENT_CREDIT_RATE = 0.03;
const INVESTMENT_CREDIT_INVEST_RATE = 0.10;
const INVESTMENT_CREDIT_CAP = 750000;
const EMPLOYMENT_EXEMPTION_CAP = 500000;

export function getWealthSurchargeRate(netWealth: number, motorCars: number, houseArea: number): number {
  if (netWealth > 5000000000) return 0.05;
  if (netWealth > 2000000000) return 0.04;
  if (netWealth > 1000000000) return 0.03;
  if (netWealth > 400000000 || motorCars > 1 || houseArea > 8000) return 0.02;
  return 0;
}

export function computeTaxBD(input: BDTaxInput): BDTaxBreakdown {
  if (!input.isBangladeshiCitizen) {
    const grossAll =
      input.employmentIncome + input.rentIncome + input.agricultureIncome +
      input.businessIncome + input.financialAssetsIncome + input.dividendIncome +
      input.otherIncome + input.capitalGainGold + input.capitalGainOtherLongTerm + input.capitalGainOtherShortTerm;
    const flatTax = grossAll * 0.30;
    return {
      grossEmploymentIncome: input.employmentIncome,
      employmentExemption: 0,
      netEmploymentIncome: input.employmentIncome,
      otherSlabIncome: 0,
      totalSlabTaxedIncome: grossAll,
      basicExemption: 0,
      childDisabilityExemption: 0,
      totalExemption: 0,
      taxableIncome: grossAll,
      slabTax: flatTax,
      investmentCredit: 0,
      taxAfterCredit: flatTax,
      minimumTaxFloor: 0,
      regularTaxPayable: flatTax,
      dividendTax: 0,
      capitalGainGoldTax: 0,
      capitalGainOtherLongTermTax: 0,
      totalTaxBeforeSurcharge: flatTax,
      surchargeRate: 0,
      surchargeAmount: 0,
      environmentalSurcharge: 0,
      totalTaxLiability: flatTax,
      effectiveRate: grossAll > 0 ? (flatTax / grossAll) * 100 : 0,
    };
  }

  const employmentExemption = Math.min(input.employmentIncome / 3, EMPLOYMENT_EXEMPTION_CAP);
  const netEmploymentIncome = input.employmentIncome - employmentExemption;

  const otherSlabIncome =
    input.rentIncome + input.agricultureIncome + input.businessIncome +
    input.financialAssetsIncome + input.otherIncome + input.capitalGainOtherShortTerm;

  const totalSlabTaxedIncome = netEmploymentIncome + otherSlabIncome;

  const basicExemption = EXEMPTIONS[input.assessmentYear][input.category];
  const childDisabilityExemption = input.childrenWithDisabilities * CHILD_DISABILITY_EXEMPTION;
  const totalExemption = basicExemption + childDisabilityExemption;

  const taxableIncome = Math.max(0, totalSlabTaxedIncome - totalExemption);

  let slabTax = 0;
  let remaining = taxableIncome;
  for (const slab of SLABS[input.assessmentYear]) {
    const slice = Math.min(remaining, slab.width);
    if (slice <= 0) break;
    slabTax += slice * slab.rate;
    remaining -= slice;
  }

  const investmentCredit = Math.min(
    totalSlabTaxedIncome * INVESTMENT_CREDIT_RATE,
    input.eligibleInvestments * INVESTMENT_CREDIT_INVEST_RATE,
    INVESTMENT_CREDIT_CAP,
  );

  const taxAfterCredit = Math.max(0, slabTax - investmentCredit);

  const minimumTaxFloor = input.isNewTaxpayer ? 3000 : 5000;
  const regularTaxPayable = Math.max(taxAfterCredit, minimumTaxFloor);

  const dividendTax = input.dividendIncome * DIVIDEND_RATE;
  const capitalGainGoldTax = input.capitalGainGold * CG_GOLD_RATE;
  const capitalGainOtherLongTermTax = input.capitalGainOtherLongTerm * CG_LONG_TERM_RATE;

  const totalTaxBeforeSurcharge = regularTaxPayable + dividendTax + capitalGainGoldTax + capitalGainOtherLongTermTax;

  const surchargeRate = getWealthSurchargeRate(input.netWealth, input.motorCarsOwned, input.housePropertyArea);
  const surchargeAmount = totalTaxBeforeSurcharge * surchargeRate;

  const environmentalSurcharge =
    input.vehiclesUpTo1500 * ENV_SURCHARGE[0].amount +
    input.vehicles1501_2000 * ENV_SURCHARGE[1].amount +
    input.vehicles2001_2500 * ENV_SURCHARGE[2].amount +
    input.vehicles2501_3000 * ENV_SURCHARGE[3].amount +
    input.vehicles3001_3500 * ENV_SURCHARGE[4].amount +
    input.vehiclesAbove3500 * ENV_SURCHARGE[5].amount;

  const totalTaxLiability = totalTaxBeforeSurcharge + surchargeAmount + environmentalSurcharge;

  const grossAll =
    input.employmentIncome + input.rentIncome + input.agricultureIncome +
    input.businessIncome + input.financialAssetsIncome + input.dividendIncome +
    input.otherIncome + input.capitalGainGold + input.capitalGainOtherLongTerm + input.capitalGainOtherShortTerm;

  return {
    grossEmploymentIncome: input.employmentIncome,
    employmentExemption,
    netEmploymentIncome,
    otherSlabIncome,
    totalSlabTaxedIncome,
    basicExemption,
    childDisabilityExemption,
    totalExemption,
    taxableIncome,
    slabTax,
    investmentCredit,
    taxAfterCredit,
    minimumTaxFloor,
    regularTaxPayable,
    dividendTax,
    capitalGainGoldTax,
    capitalGainOtherLongTermTax,
    totalTaxBeforeSurcharge,
    surchargeRate,
    surchargeAmount,
    environmentalSurcharge,
    totalTaxLiability,
    effectiveRate: grossAll > 0 ? (totalTaxLiability / grossAll) * 100 : 0,
  };
}
