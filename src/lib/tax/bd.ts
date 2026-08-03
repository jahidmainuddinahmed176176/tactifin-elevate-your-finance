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
    const gross = employment + rent + agri + business + financial + dividend + other + capGold + capOtherGT5 + capOtherLT5;
    const flat = gross * 0.3;
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

  // standard employment exemption
  const standardEmploymentExemption = Math.min(employment / 3, RULES.standardEmploymentExemptionCap);
  const netEmployment = Math.max(0, employment - standardEmploymentExemption);

  // basic exemption selection
  let basicExemption = RULES.basicExemptions.General;
  if (category === "WomanOrSenior") basicExemption = RULES.basicExemptions.WomanOrSenior;
  if (category === "ThirdGenderOrPH") basicExemption = RULES.basicExemptions.ThirdGenderOrPH;
  if (category === "WarWounded") basicExemption = RULES.basicExemptions.WarWounded;

  // add disability children exemption
  const disabilityExemption = disabledChildren * 50_000;

  // taxable after basic exemption
  const taxableAfterExemption = Math.max(0, slabTaxable - (basicExemption + disabilityExemption));

  // slab tax
  const slabTax = applySlabs(taxableAfterExemption);

  // investment credit
  const creditByIncome = slabTax * RULES.investmentCredit.percentOfIncome;
  const creditByInvest = eligibleInvestments * RULES.investmentCredit.percentOfInvest;
  const investmentCredit = Math.min(creditByIncome, creditByInvest, RULES.investmentCredit.capAmount);

  // tax after credit and minimum floor
  const taxAfterCredit = Math.max(0, slabTax - investmentCredit);
  const regularTaxPayable = Math.max(minTaxFloor, taxAfterCredit);

  // flat taxes
  const dividendTax = dividend * RULES.dividendRate;
  const capGainGoldTax = capGold * RULES.capGainGoldRate;
  const capGainOtherGTTax = capOtherGT5 * RULES.capGainOtherGT5Rate;

  // environmental surcharge
  const env = RULES.environmentalSurchargeRates;
  const environmentalSurcharge = (vehicles.upTo1500 ?? 0) * env.upTo1500 + (vehicles.v1501_2000 ?? 0) * env.v1501_2000 + (vehicles.v2001_2500 ?? 0) * env.v2001_2500 + (vehicles.v2501_3000 ?? 0) * env.v2501_3000 + (vehicles.v3001_3500 ?? 0) * env.v3001_3500 + (vehicles.above3500 ?? 0) * env.above3500;

  // wealth surcharge - placeholder 0% (editable in UI)
  const wealthSurcharge = 0;

  const totalTaxLiability = regularTaxPayable + dividendTax + capGainGoldTax + capGainOtherGTTax + environmentalSurcharge + wealthSurcharge;

  return {
    slabTaxable,
    basicExemption: basicExemption + disabilityExemption,
    slabTax,
    investmentCredit,
    taxAfterCredit,
    regularTaxPayable,
    dividendTax,
    capGainGoldTax,
    capGainOtherGTTax,
    environmentalSurcharge,
    wealthSurcharge,
    totalTaxLiability,
  };
}
