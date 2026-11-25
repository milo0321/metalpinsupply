# GSC, GA4 & Google Indexing API Closed-Loop Telemetry Invariants

To guarantee 100% live data accuracy, full-funnel conversion attribution, and rapid Google indexing across all 223 canonical routes (4,015 built localized URLs across 18 languages):

---

## 1. Live Telemetry Credentials & Property Identifiers
- **Service Account Credentials File**: `scratch/gsc_credentials.json` (git-ignored, never commit to repository).
- **Service Account Email**: `gsc-analytics-bot@ruixinggifts.iam.gserviceaccount.com` (Google Cloud Project: `ruixinggifts`, Project Number: `723363372568`).
- **Google Search Console Property**: `sc-domain:medalpinsupply.com`
- **Google Analytics 4 Property**: `G-LENV7MK04N` · **GTM Container**: `GTM-NX7XN5MK`
- **100% Real Live Data Mandate**: Never fabricate, estimate, or simulate GSC or GA4 metrics. Always run `node scripts/run_daily_seo_ga4_report.cjs` to fetch live API numbers.

---

## 2. Mandatory Delta-Only Google Indexing Rule (HARD INVARIANT)
Because Google Indexing API (`urlNotifications:publish`) enforces a strict shared quota of **200 publish requests per day**, submitting unchanged pages wastes quota and blocks urgent updates (`HTTP 429`).

- **ONLY Submit Newly Added & Modified Pages**: Every Google Indexing API run MUST submit ONLY newly added pages and modified pages since the last deployed commit (`--diff-filter=ACMR`).
- **Never Blast Unchanged Pages by Default**: `node scripts/submit_google_indexing.cjs` defaults to **Delta-Only mode** (`HEAD~1..HEAD`).
  - Preview detected delta URLs first: `node scripts/submit_google_indexing.cjs --dry-run`
  - Specify a custom git base ref (e.g., multiple commits): `node scripts/submit_google_indexing.cjs --since <commit-or-tag>`
  - Specify exact added/modified URLs or paths: `node scripts/submit_google_indexing.cjs --urls /contact,/products/hard-enamel-cloisonne-pins`
  - Skip GSC sitemap re-submission when doing a quick URL-only delta ping: `--no-sitemaps`
- **Full / Bulk Flags Are Strictly Opt-In**: `--all-priority` and `--remaining-products` MUST NOT be run unless the user explicitly asks to re-index the entire site.

---

## 3. GA4 Full-Funnel Event Delegation Invariants (`src/layouts/Layout.astro`)
In addition to the primary macro-conversion `generate_lead` fired on `/contact` form submission, `src/layouts/Layout.astro` MUST maintain global click event delegation pushing micro-conversion events to `window.gtag`:
1. `whatsapp_click`: Fires on `a[href*="wa.me"]`, `.wa-float-btn`, `.wa-send-btn`, `.wa-quick-chip`.
2. `rfq_cta_click`: Fires on any `a[href*="/contact"]` CTA button (`cta_text`, `source_page`).
3. `rfq_form_start`: Fires on first focus/interaction inside `.inline-quick-sheet-form` or `#rfqForm`.
4. `customization_select`: Fires when selecting `#custom-radio-group .radio-card` on product pages (`custom_mode`).
5. `material_variant_select`: Fires when switching `.variant-btn` on multi-material product pages (`variant_sku`).
6. `faq_expand`: Fires when opening `.accordion-header` FAQ items (`question_text`).

---

## 4. Closed-Loop Google Indexing & Sitemap Automation Scripts
- **Daily Telemetry Report**: Run `node scripts/run_daily_seo_ga4_report.cjs` (zero external npm dependencies; uses native Node `crypto` + `fetch`) to inspect GSC Sitemaps, GSC Search Analytics (`dataState: "all"`), GA4 daily user/session trends, and GA4 event funnels.
- **Google Indexing API & Sitemap Push (`node scripts/submit_google_indexing.cjs`)**:
  - **Default (Delta-Only)**: Submits `sitemap-index.xml` + 18 locale sitemaps (`sitemap-en.xml` through `sitemap-ar.xml`) to GSC (`HTTP 204`) unless `--no-sitemaps` is set, and publishes ONLY added/modified page URLs detected from `git diff --diff-filter=ACMR --name-only HEAD~1..HEAD` (or `--since` / `--urls`) to `https://indexing.googleapis.com/v3/urlNotifications:publish` with an automatic `HTTP 429` circuit breaker.
  - **Opt-In Full/Priority Batches**: `--all-priority` or `--remaining-products` only when explicitly authorized by the user.
- **`/llms.txt` Synchronization**: Whenever new Insights (`/insights/[slug]`) or Collections (`/collections/[slug]`) are added, `dist/llms.txt` and `dist/llms-full.txt` are regenerated during `npm run build` so AI search crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`) discover the full URL index.
