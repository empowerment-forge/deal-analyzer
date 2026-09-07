<script setup lang="ts">
import { ref } from "vue";
import DealCalculator from "./components/DealCalculator.vue";

const mobileOpen = ref(false);
const featureItems = [
  { icon: "↗", title: "Deal Analysis", text: "Get the metrics that matter in one clear, decision-ready view." },
  { icon: "▦", title: "Core Investment Metrics", text: "Calculate cash flow, cap rate, DSCR, and cash-on-cash return in one focused workspace." },
];
</script>

<template>
  <main>
    <nav class="navbar" aria-label="Primary navigation">
      <a class="brand" href="#calculator" aria-label="Rental Property Analyzer home">Rental Property Analyzer</a>
      <button class="menu-button" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen" aria-label="Toggle navigation"><span></span><span></span></button>
      <div class="nav-links" :class="{ open: mobileOpen }">
        <!-- Temporarily hidden; restore when the Features section returns to the public page. -->
        <a v-if="false" href="#features" @click="mobileOpen = false">Features</a><a href="#about" @click="mobileOpen = false">About</a>
      </div>
    </nav>

    <DealCalculator />
    <!-- Temporarily hidden; preserve this section for a future public release. -->
    <section v-if="false" class="features-section" id="features"><div class="section-heading"><div class="eyebrow"><span></span> Everything you need</div><h2>From first look to <em>confident offer.</em></h2><p>Rental Property Analyzer keeps your analysis organized, understandable, and ready to act on.</p></div><div class="feature-grid"><article v-for="(feature, index) in featureItems" :key="feature.title" class="feature-card" :style="{ '--delay': `${index * 60}ms` }"><div class="feature-icon">{{ feature.icon }}</div><h3>{{ feature.title }}</h3><p>{{ feature.text }}</p><a href="#calculator">Learn more <span>→</span></a></article></div></section>
    <section class="about-strip" id="about"><div><span>Built for better decisions</span><h2>Your numbers deserve more than a spreadsheet.</h2></div><p>Rental Property Analyzer brings professional-grade rental analysis into a focused workspace that feels simple from the first deal.</p></section>
    <footer><div class="footer-brand"><div class="brand footer-product-name">Rental Property Analyzer</div><p>Helping investors make smarter decisions.</p></div><div class="footer-links"><a v-if="false" href="#features">Features</a><a href="#about">About</a></div><div class="footer-bottom"><span>© 2026 Rental Property Analyzer</span><span>Powered by <a href="https://empowerment-forge.com/" target="_blank" rel="noopener noreferrer">The Empowerment Forge</a></span></div></footer>
  </main>
</template>
