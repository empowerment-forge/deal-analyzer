<script setup lang="ts">
import { fields, useDealCalculator } from "../composables/useDealCalculator";

const { deal, results, isAnalyzing, updateField, resetDeal, analyzeDeal } = useDealCalculator();
const currency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
</script>

<template>
  <section class="calculator-section" id="calculator">
    <div class="section-heading centered">
      <div class="eyebrow"><span></span> Deal calculator</div>
      <h2>Know the numbers. <em>Trust the decision.</em></h2>
      <p>Enter a few property details and turn a listing into a clear investment snapshot.</p>
    </div>
    <div class="calculator-shell">
      <div class="calculator-inputs">
        <div class="card-heading">
          <div><span class="step-number">01</span><div><h3>Property details</h3><p>Start with the fundamentals</p></div></div>
          <button class="text-button" @click="resetDeal">Reset</button>
        </div>
        <div class="field-grid">
          <label v-for="field in fields" :key="field.key" class="field">
            <span>{{ field.label }}</span>
            <div class="input-wrap">
              <span v-if="field.prefix" class="input-affix prefix">{{ field.prefix }}</span>
              <input type="number" :value="deal[field.key]" :step="field.step" min="0" @input="updateField(field.key, ($event.target as HTMLInputElement).value)" />
              <span v-if="field.suffix" class="input-affix suffix">{{ field.suffix }}</span>
            </div>
          </label>
        </div>
        <button class="analyze-button" :class="{ loading: isAnalyzing }" :disabled="isAnalyzing" @click="analyzeDeal">
          <template v-if="isAnalyzing"><span class="spinner"></span> Analyzing your deal…</template>
          <template v-else>Analyze Deal <span>→</span></template>
        </button>
      </div>
      <div class="results-card" aria-live="polite">
        <div class="results-topline"><span>Investment snapshot</span><span class="status-dot"><i></i> Live analysis</span></div>
        <div class="score-area">
          <div class="score-gauge" :style="{ '--score': `${results.score * 3.6}deg` }">
            <div class="score-inner"><strong>{{ results.score }}</strong><span>/ 100</span></div>
          </div>
          <div class="score-copy"><span>Overall Deal Score</span><h3>{{ results.score >= 75 ? "Strong opportunity" : results.score >= 55 ? "Worth a closer look" : "Proceed with caution" }}</h3><p>Based on your projected return, coverage, and cash flow.</p></div>
        </div>
        <div class="results-grid">
          <div class="result highlight"><span>Monthly Cash Flow</span><strong>{{ currency(results.cashFlow) }}</strong><small>After debt service</small></div>
          <div class="result"><span>Net Operating Income</span><strong>{{ currency(results.annualNoi) }}</strong><small>Per year</small></div>
          <div class="result"><span>Cap Rate</span><strong>{{ results.capRate.toFixed(2) }}%</strong><small>Unlevered return</small></div>
          <div class="result"><span>Cash-on-Cash</span><strong>{{ results.coc.toFixed(2) }}%</strong><small>Annual return</small></div>
          <div class="result"><span>DSCR</span><strong>{{ results.dscr.toFixed(2) }}x</strong><small>{{ results.dscr >= 1.25 ? "Healthy coverage" : "Below target" }}</small></div>
        </div>
        <button class="save-button" type="button">Save this deal <span>＋</span></button>
        <p class="disclaimer">Estimates are for preliminary analysis and are not financial advice.</p>
      </div>
    </div>
  </section>
</template>
