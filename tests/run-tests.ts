import { computeTaxBD } from '@/lib/tax/bd';
import assert from 'node:assert';

function almostEqual(a: number, b: number, eps = 0.01) {
  return Math.abs(a - b) <= eps;
}

// Test 1: Spreadsheet sample
const sample = computeTaxBD({
  ay: 'AY 2026-27',
  category: 'General',
  resident: true,
  employmentIncome: 904397,
  eligibleInvestments: 200000,
  disabledChildren: 0,
  vehicles: {},
  netWealth: 0,
  minTaxFloor: 5000,
});
console.log('Sample breakdown:', sample);
assert(sample.totalTaxLiability === 5000, `Expected totalTaxLiability 5000, got ${sample.totalTaxLiability}`);

// Test 2: Non-resident flat 30%
const nr = computeTaxBD({ resident: false, employmentIncome: 100000 });
assert(almostEqual(nr.totalTaxLiability, 30000), `Expected 30000, got ${nr.totalTaxLiability}`);

// Test 3: Zero income
const z = computeTaxBD({ employmentIncome: 0, eligibleInvestments: 0 });
assert(z.totalTaxLiability === 0, `Expected 0, got ${z.totalTaxLiability}`);

// Test 4: Investment credit cap
const bigInv = computeTaxBD({ employmentIncome: 1_000_000, eligibleInvestments: 10_000_000 });
console.log('Big investment breakdown:', bigInv);
assert(bigInv.investmentCredit <= 750000 + 1, 'investment credit should be capped at 750000');

console.log('All tests passed');
