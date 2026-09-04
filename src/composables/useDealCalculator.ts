import { computed, ref } from "vue";

export type DealInputs = {
  purchasePrice: number; downPayment: number; interestRate: number; loanTerm: number;
  monthlyRent: number; propertyTaxes: number; insurance: number; maintenance: number;
  vacancy: number; management: number; hoa: number; repairs: number;
};

export type DealResults = { cashFlow: number; annualNoi: number; capRate: number; coc: number; dscr: number; score: number };

export const initialDeal: DealInputs = {
  purchasePrice: 245000, downPayment: 49000, interestRate: 6.75, loanTerm: 30,
  monthlyRent: 2450, propertyTaxes: 310, insurance: 145, maintenance: 150,
  vacancy: 5, management: 8, hoa: 0, repairs: 8000,
};

export const fields: Array<{ key: keyof DealInputs; label: string; prefix?: string; suffix?: string; step?: number }> = [
  { key: "purchasePrice", label: "Purchase Price", prefix: "$", step: 1000 },
  { key: "downPayment", label: "Down Payment", prefix: "$", step: 1000 },
  { key: "interestRate", label: "Interest Rate", suffix: "%", step: 0.05 },
  { key: "loanTerm", label: "Loan Term", suffix: "years", step: 1 },
  { key: "monthlyRent", label: "Monthly Rent", prefix: "$", step: 50 },
  { key: "propertyTaxes", label: "Property Taxes", prefix: "$", suffix: "/mo", step: 10 },
  { key: "insurance", label: "Insurance", prefix: "$", suffix: "/mo", step: 5 },
  { key: "maintenance", label: "Maintenance", prefix: "$", suffix: "/mo", step: 10 },
  { key: "vacancy", label: "Vacancy", suffix: "%", step: 0.5 },
  { key: "management", label: "Property Management", suffix: "%", step: 0.5 },
  { key: "hoa", label: "HOA", prefix: "$", suffix: "/mo", step: 10 },
  { key: "repairs", label: "Upfront Repairs", prefix: "$", step: 500 },
];

export function calculateResults(d: DealInputs): DealResults {
  const loan = Math.max(d.purchasePrice - d.downPayment, 0);
  const monthlyRate = d.interestRate / 1200;
  const payments = d.loanTerm * 12;
  // A zero-term loan is invalid input; keep the UI stable rather than returning Infinity/NaN.
  const mortgage = payments > 0 ? monthlyRate > 0
    ? loan * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1)
    : loan / payments : 0;
  const vacancyCost = d.monthlyRent * d.vacancy / 100;
  const managementCost = d.monthlyRent * d.management / 100;
  const operatingExpenses = d.propertyTaxes + d.insurance + d.maintenance + d.hoa + vacancyCost + managementCost;
  const monthlyNoi = d.monthlyRent - operatingExpenses;
  const cashFlow = monthlyNoi - mortgage;
  const annualNoi = monthlyNoi * 12;
  const capRate = d.purchasePrice ? annualNoi / d.purchasePrice * 100 : 0;
  const cashInvested = d.downPayment + d.repairs;
  const coc = cashInvested ? cashFlow * 12 / cashInvested * 100 : 0;
  const dscr = mortgage ? monthlyNoi / mortgage : 0;
  const score = Math.max(0, Math.min(100, Math.round(48 + cashFlow / 20 + (capRate - 5) * 4 + (dscr - 1) * 14 + Math.max(0, coc) * 0.45)));
  return { cashFlow, annualNoi, capRate, coc, dscr, score };
}

export function useDealCalculator() {
  const deal = ref<DealInputs>({ ...initialDeal });
  const analyzedDeal = ref<DealInputs>({ ...initialDeal });
  const isAnalyzing = ref(false);
  const results = computed(() => calculateResults(analyzedDeal.value));

  function updateField(key: keyof DealInputs, value: string | number) {
    const numericValue = typeof value === "number" ? value : Number(value);
    deal.value = { ...deal.value, [key]: Number.isFinite(numericValue) ? numericValue : 0 };
  }
  function resetDeal() { deal.value = { ...initialDeal }; }
  function analyzeDeal() {
    isAnalyzing.value = true;
    window.setTimeout(() => { analyzedDeal.value = { ...deal.value }; isAnalyzing.value = false; }, 450);
  }
  return { deal, analyzedDeal, isAnalyzing, results, updateField, resetDeal, analyzeDeal };
}
