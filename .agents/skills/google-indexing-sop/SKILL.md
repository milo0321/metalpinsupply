---
name: google-indexing-sop
description: >-
  Standard operating procedure for batch-submitting newly published, updated, or renamed URLs to the Google Indexing API using service account credentials.
  Use when the user asks to submit indexing, notify Google, update index status, or after completing a batch of SEO optimizations and pushing to remote.
---

# Google Indexing API Standard Operating Procedure (SOP)

This skill provides the standard workflow and automation script for notifying Googlebot of **newly added or modified URLs only** via the Google Indexing API (`https://indexing.googleapis.com/v3/urlNotifications:publish`).

---

## 1. Prerequisites & Safety Invariants

1. **Prerequisite Push & Live Deploy**:
   - The agent MUST NOT submit indexing requests for local-only changes. Indexing notifications MUST ONLY be dispatched AFTER `git push` and live Cloudflare Worker deployment (`https://medalpinsupply.com`) are verified.
2. **Mandatory Delta-Only Policy**:
   - **ONLY submit newly added and modified pages.** Never re-submit unchanged site-wide URLs by default (the Google Indexing API quota is 200 requests/day shared across projects).
   - Full/bulk flags (`--all-priority`, `--remaining-products`) are strictly opt-in and only used if the user explicitly requests a full re-index.
3. **Service Account Credentials**:
   - Uses the authorized service account key resolved from `GSC_CREDENTIALS_PATH`, `scratch/gsc_credentials.json`, or `/Users/player/code/fidgetsupply/scratch/gsc_credentials.json`.
   - OAuth 2.0 Scopes: `https://www.googleapis.com/auth/indexing` and `https://www.googleapis.com/auth/webmasters`.

---

## 2. Standard Delta-Only Submission Workflow

When requested to update Google Indexing after pushing & deploying changes:

### Step 1: Collect Only Newly Added & Modified Page URLs
Identify the exact pages added or modified in the deployment:
- New or modified Product SKUs (`src/content/products/*.json` -> `https://medalpinsupply.com/products/[slug]`)
- New or modified Insights (`src/content/insights/*.md` -> `https://medalpinsupply.com/insights/[slug]`)
- Modified Core Static Pages (`src/pages/index.astro`, `src/pages/<route>/index.astro` -> `https://medalpinsupply.com/<route>`)
- Updated Collection Hubs (`src/data/collections.ts` or `src/pages/collections/[slug].astro` -> `https://medalpinsupply.com/collections/[slug]`)

### Step 2: Preview & Execute Delta Script
1. Preview detected delta URLs without sending requests:
   ```bash
   node scripts/submit_google_indexing.cjs --dry-run
   ```
2. Run live submission:
   - Auto-detect added/modified pages from the latest commit (`HEAD~1..HEAD`):
     ```bash
     node scripts/submit_google_indexing.cjs
     ```
   - Multiple commits since last index push:
     ```bash
     node scripts/submit_google_indexing.cjs --since <base-commit-sha>
     ```
   - Explicit URL / path override (e.g. a template change affecting specific pages):
     ```bash
     node scripts/submit_google_indexing.cjs --urls /contact,/products/hard-enamel-cloisonne-pins
     ```
   - Optional: pass `--no-sitemaps` to skip GSC sitemap submission when only pushing a few modified URLs.

### Step 3: Verify API Response & Audit Log
1. Verify submitted URLs return `200 OK` (or confirm clean circuit-breaker stop if `HTTP 429` shared daily quota is hit).
2. Inspect the generated output report at `/Users/player/.gemini/antigravity/brain/9dfff627-70b1-4c34-ab12-b98d5a2ad29d/scratch/google_indexing_submit_report.json`.
3. Report the exact list/count of notified delta URLs (and sitemap status if run) to the user.
