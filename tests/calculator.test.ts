import { describe, expect, it } from "vitest";
import { calculateResults, initialDeal, normalizeSemiannualPropertyTaxes } from "../src/composables/useDealCalculator";

describe("deal calculator", () => {
  it("normalizes semiannual property taxes", () => {
    expect(normalizeSemiannualPropertyTaxes(1860)).toBe(310);
    expect(normalizeSemiannualPropertyTaxes(0)).toBe(0);
  });

  it("calculates the default deal with equivalent economics", () => {
    const result = calculateResults(initialDeal);
    expect(result.cashFlow).toBeCloseTo(255.25, 1);
    expect(result.annualNoi).toBeCloseTo(18318, 0);
    expect(result.capRate).toBeCloseTo(7.48, 2);
    expect(result.coc).toBeCloseTo(5.37, 2);
    expect(result.dscr).toBeCloseTo(1.20, 2);
    expect(result.score).toBe(76);
  });

  it("handles zero semiannual property taxes", () => {
    const withTaxes = calculateResults(initialDeal);
    const withoutTaxes = calculateResults({ ...initialDeal, semiannualPropertyTaxes: 0 });
    expect(withoutTaxes.cashFlow - withTaxes.cashFlow).toBeCloseTo(310, 8);
    expect(Object.values(withoutTaxes).every(Number.isFinite)).toBe(true);
  });

  it("uses the zero-interest mortgage branch", () => {
    const result = calculateResults({ ...initialDeal, interestRate: 0 });
    expect(result.cashFlow).toBeCloseTo(982.06, 1);
  });

  it("clamps a down payment above purchase price to a zero loan", () => {
    const result = calculateResults({ ...initialDeal, downPayment: 300000 });
    expect(result.dscr).toBe(0);
    expect(Number.isFinite(result.cashFlow)).toBe(true);
  });

  it("returns stable finite results for a zero-term loan", () => {
    const result = calculateResults({ ...initialDeal, loanTerm: 0 });
    expect(result.cashFlow).toBeCloseTo(1526.5, 1);
    expect(Object.values(result).every(Number.isFinite)).toBe(true);
  });

  it("handles zero purchase price and zero invested cash", () => {
    const result = calculateResults({ ...initialDeal, purchasePrice: 0, downPayment: 0, repairs: 0 });
    expect(result.capRate).toBe(0);
    expect(result.coc).toBe(0);
  });

  it("preserves score threshold behavior", () => {
    expect(calculateResults({ ...initialDeal, monthlyRent: 10000 }).score).toBeGreaterThanOrEqual(75);
    expect(calculateResults({ ...initialDeal, monthlyRent: 500 }).score).toBeLessThan(75);
  });
});
