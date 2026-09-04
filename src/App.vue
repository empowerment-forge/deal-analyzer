<script setup lang="ts">
import { ref } from "vue";
import DealCalculator from "./components/DealCalculator.vue";

const mobileOpen = ref(false);
function scrollToCalculator() {
  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  mobileOpen.value = false;
}
const featureItems = [
  { icon: "↗", title: "Deal Analysis", text: "Get the metrics that matter in one clear, decision-ready view." },
  { icon: "▦", title: "Portfolio Tracking", text: "Monitor performance across every property from one dashboard." },
  { icon: "✦", title: "AI Insights", text: "Spot risks, opportunities, and questions worth asking before you buy." },
  { icon: "∞", title: "Unlimited Saved Properties", text: "Build a complete pipeline without losing a promising deal." },
  { icon: "⇩", title: "Export Reports", text: "Share polished analysis with partners, lenders, and clients." },
  { icon: "☁", title: "Cloud Sync", text: "Keep every deal current and available across all your devices." },
];
</script>

<template>
  <main>
    <nav class="navbar" aria-label="Primary navigation">
      <a class="brand" href="#top" aria-label="Empowerment Forge home"><span class="brand-mark"><img src="/empowerment-forge-logo.png" alt="" /></span><span>Empowerment <strong>Forge</strong></span></a>
      <button class="menu-button" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen" aria-label="Toggle navigation"><span></span><span></span></button>
      <div class="nav-links" :class="{ open: mobileOpen }">
        <a href="#features" @click="mobileOpen = false">Features</a><a href="#pricing" @click="mobileOpen = false">Pricing</a><a href="#about" @click="mobileOpen = false">About</a><span class="nav-divider"></span><a href="#signin" @click="mobileOpen = false">Sign In</a><button class="button button-small button-dark" @click="scrollToCalculator">Get Started</button>
      </div>
    </nav>

    <section class="hero" id="top"><div class="hero-glow hero-glow-one"></div><div class="hero-glow hero-glow-two"></div><div class="hero-content"><div class="eyebrow"><span></span> Clarity for every investment</div><h1>Analyze Rental Properties <em>in Minutes</em></h1><p>Calculate cash flow, cap rate, DSCR, and cash-on-cash return—then quickly determine whether a property is worth pursuing.</p><div class="hero-actions"><button class="button button-primary" @click="scrollToCalculator">Start Free <span>→</span></button><button class="button button-secondary" @click="scrollToCalculator"><span class="play">▶</span> View Demo</button></div><div class="trust-row"><span><b>✓</b> No credit card</span><span><b>✓</b> Free forever plan</span><span><b>✓</b> Results in seconds</span></div></div><div class="hero-brand-panel" aria-hidden="true"><div class="brand-orbit orbit-one"></div><div class="brand-orbit orbit-two"></div><img src="/empowerment-forge-logo.png" alt="" /><div class="signal-pill signal-one"><span class="signal-icon">↗</span><div><small>Monthly cash flow</small><b>+$482</b></div></div><div class="signal-pill signal-two"><span class="signal-icon">✓</span><div><small>Deal score</small><b>Strong · 82</b></div></div></div></section>
    <DealCalculator />
    <section class="features-section" id="features"><div class="section-heading"><div class="eyebrow"><span></span> Everything you need</div><h2>From first look to <em>confident offer.</em></h2><p>Empowerment Forge keeps your analysis organized, understandable, and ready to act on.</p></div><div class="feature-grid"><article v-for="(feature, index) in featureItems" :key="feature.title" class="feature-card" :style="{ '--delay': `${index * 60}ms` }"><div class="feature-icon">{{ feature.icon }}</div><h3>{{ feature.title }}</h3><p>{{ feature.text }}</p><a href="#calculator">Learn more <span>→</span></a></article></div></section>
    <section class="about-strip" id="about"><div><span>Built for better decisions</span><h2>Your numbers deserve more than a spreadsheet.</h2></div><p>Empowerment Forge brings professional-grade rental analysis into a focused workspace that feels simple from the first deal.</p></section>
    <section class="pricing-section" id="pricing"><div class="section-heading centered"><div class="eyebrow"><span></span> Simple pricing</div><h2>Start free. <em>Grow when you’re ready.</em></h2><p>No complicated tiers, no hidden fees. Just the tools you need to move with confidence.</p></div><div class="pricing-grid"><article class="price-card"><div><span class="plan-name">Free</span><h3>$0 <small>/ forever</small></h3><p>For investors evaluating their first opportunities.</p></div><ul><li><b>✓</b> Unlimited calculations</li><li><b>✓</b> Save up to 5 deals</li><li><b>✓</b> Core investment metrics</li></ul><button class="button button-secondary" @click="scrollToCalculator">Start for free</button></article><article class="price-card featured"><div class="popular">Most popular</div><div><span class="plan-name">Pro</span><h3>$10 <small>/ month</small></h3><p>For serious investors building a repeatable process.</p></div><ul><li><b>✓</b> Unlimited saved deals</li><li><b>✓</b> AI-powered analysis</li><li><b>✓</b> PDF reports</li><li><b>✓</b> Cloud sync</li><li><b>✓</b> Priority support</li></ul><button class="button button-primary" @click="scrollToCalculator">Start Pro <span>→</span></button></article></div></section>
    <section class="cta-section"><div class="cta-logo"><img src="/empowerment-forge-logo.png" alt="" /></div><div><span>Forge your next opportunity</span><h2>Make your next property decision with confidence.</h2></div><button class="button button-primary" @click="scrollToCalculator">Analyze a Deal <span>→</span></button></section>
    <footer><div class="footer-brand"><a class="brand" href="#top"><span class="brand-mark"><img src="/empowerment-forge-logo.png" alt="" /></span><span>Empowerment <strong>Forge</strong></span></a><p>Helping investors make smarter decisions.</p></div><div class="footer-links"><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#about">About</a><a href="#signin">Sign In</a></div><div class="footer-bottom"><span>© 2026 The Empowerment Forge, LLC</span><span>Built in Indianapolis, Indiana</span></div></footer>
  </main>
</template>
