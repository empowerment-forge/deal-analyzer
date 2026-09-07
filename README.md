# Rental Property Analyzer

Vue 3 + Vite + TypeScript rental-property deal calculator.

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The production build is generated in `dist/` and can be served with `npm run preview`. The app is a client-side Vite SPA and currently requires no backend, database, authentication, or environment variables. It is suitable for deployment as a single Railway service serving the static `dist/` output.

## Project structure

- `src/App.vue` — page shell and static marketing sections
- `src/components/DealCalculator.vue` — calculator presentation and interactions
- `src/composables/useDealCalculator.ts` — calculator state, formulas, and derived results
- `src/assets/styles.css` — preserved handcrafted responsive design
- `public/` — local fonts and static assets
- `tests/calculator.test.ts` — calculator business-logic tests

The public release is intentionally calculator-only: it works without registration and does not include persistence, accounts, subscriptions, payments, a database, or AI functionality. Saved deals and other account-based features may be added in a future phase.

## Validation

```bash
npm run typecheck
npm test
npm run build
```

The original exported source remains available in `empowerment-forge-source.zip` as a migration reference.
