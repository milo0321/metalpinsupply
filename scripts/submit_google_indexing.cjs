#!/usr/bin/env node
/**
 * Closed-Loop Google Indexing API & Sitemap Submission Script (Zero-Dependency Native Node.js)
 *
 * DEFAULT MODE (Delta-Only):
 *   Only submits newly added or modified pages (auto-detected via `git diff --diff-filter=ACMR`
 *   from `--since <ref>` [default: HEAD~1] to HEAD, or explicitly provided via `--urls <u1,u2>`).
 *   Never blasts unchanged URLs by default so the shared 200 req/day quota is preserved.
 *
 * Options:
 *   --since <ref>        Git base ref for delta detection (default: HEAD~1)
 *   --urls <list>        Comma-separated URLs or /paths to submit directly
 *   --dry-run            Print resolved mode and target URLs without calling Google APIs
 *   --no-sitemaps        Skip submitting sitemap-index.xml + 18 locale sitemaps to GSC
 *   --all-priority       Opt-in: submit all 149 priority URLs (full initial seeding only)
 *   --remaining-products Opt-in: submit remaining non-priority SKU URLs
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CREDENTIALS_CANDIDATES = [
  process.env.GSC_CREDENTIALS_PATH,
  path.join(ROOT, 'scratch/gsc_credentials.json'),
  '/Users/player/code/fidgetsupply/scratch/gsc_credentials.json'
].filter(Boolean);

const SITE_URL = 'sc-domain:medalpinsupply.com';
const BASE_URL = 'https://medalpinsupply.com';
const REPORT_OUT_PATH =
  '/Users/player/.gemini/antigravity/brain/9dfff627-70b1-4c34-ab12-b98d5a2ad29d/scratch/google_indexing_submit_report.json';

const COLLECTION_SLUGS = [
  'custom-enamel-pins',
  'custom-medals',
  'custom-challenge-coins',
  'custom-metal-keychains',
  'trolley-coin-keyrings',
  'police-badges-insignia',
  'executive-cufflinks-tie-bars',
  'custom-golf-accessories',
  'metal-bookmarks-openers-souvenirs',
  'patches-pvc-packaging',
  'custom-metal-fridge-magnets'
];

function parseArgs(argv) {
  const opts = {
    dryRun: false,
    noSitemaps: false,
    allPriority: false,
    remainingProducts: false,
    sinceRef: 'HEAD~1',
    urlsArg: ''
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--no-sitemaps') opts.noSitemaps = true;
    else if (a === '--all-priority') opts.allPriority = true;
    else if (a === '--remaining-products') opts.remainingProducts = true;
    else if (a === '--since' && argv[i + 1]) opts.sinceRef = argv[++i];
    else if (a.startsWith('--since=')) opts.sinceRef = a.slice('--since='.length);
    else if (a === '--urls' && argv[i + 1]) opts.urlsArg = argv[++i];
    else if (a.startsWith('--urls=')) opts.urlsArg = a.slice('--urls='.length);
  }
  return opts;
}

function normalizeTargetUrl(raw) {
  let u = String(raw || '').trim();
  if (!u) return null;
  if (u.startsWith('/')) {
    u = `${BASE_URL}${u}`;
  } else if (!/^https?:\/\//i.test(u)) {
    u = `${BASE_URL}/${u}`;
  }
  if (u.length > `${BASE_URL}/`.length && u.endsWith('/')) {
    u = u.replace(/\/+$/, '');
  }
  if (u === BASE_URL) u = `${BASE_URL}/`;
  return u;
}

function dedupePreserveOrder(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    if (item && !seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

function detectDeltaUrls(sinceRef) {
  const diffOut = execFileSync(
    'git',
    ['diff', '--diff-filter=ACMR', '--name-only', `${sinceRef}..HEAD`],
    { cwd: ROOT, encoding: 'utf8' }
  );
  const changedFiles = diffOut
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const urls = [];
  for (const relPath of changedFiles) {
    if (relPath.startsWith('src/content/products/') && relPath.endsWith('.json')) {
      const fullPath = path.join(ROOT, relPath);
      let slug = path.basename(relPath, '.json');
      if (fs.existsSync(fullPath)) {
        try {
          const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          if (parsed && parsed.slug) slug = String(parsed.slug).trim();
        } catch (_) {}
      }
      urls.push(`${BASE_URL}/products/${slug}`);
    } else if (relPath.startsWith('src/content/insights/') && relPath.endsWith('.md')) {
      const slug = path.basename(relPath, '.md');
      urls.push(`${BASE_URL}/insights/${slug}`);
    } else if (relPath === 'src/pages/index.astro') {
      urls.push(`${BASE_URL}/`);
    } else {
      const pageMatch = relPath.match(/^src\/pages\/([^/]+)\/index\.astro$/);
      if (pageMatch && pageMatch[1] !== '[lang]' && pageMatch[1] !== '404') {
        urls.push(`${BASE_URL}/${pageMatch[1]}`);
      } else if (
        relPath === 'src/data/collections.ts' ||
        relPath === 'src/pages/collections/[slug].astro'
      ) {
        for (const cSlug of COLLECTION_SLUGS) {
          urls.push(`${BASE_URL}/collections/${cSlug}`);
        }
      }
    }
  }

  return {
    changedFilesCount: changedFiles.length,
    urls: dedupePreserveOrder(urls)
  };
}

function resolveFullPriorityOrRemainingUrls(isRemainingProductsOnly) {
  const coreUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/products`,
    `${BASE_URL}/insights`,
    `${BASE_URL}/custom-branding`,
    `${BASE_URL}/custom-packaging`,
    `${BASE_URL}/wholesale-catalog`,
    `${BASE_URL}/corporate-gifts`,
    `${BASE_URL}/sample-kit`,
    `${BASE_URL}/compliance-safety`,
    `${BASE_URL}/about`
  ];
  const collectionUrls = COLLECTION_SLUGS.map((s) => `${BASE_URL}/collections/${s}`);
  const insightsDir = path.join(ROOT, 'src/content/insights');
  const insightUrls = fs
    .readdirSync(insightsDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => `${BASE_URL}/insights/${f.replace(/\.md$/, '')}`);

  const prodDir = path.join(ROOT, 'src/content/products');
  const allProdObjects = fs
    .readdirSync(prodDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(prodDir, f), 'utf8')))
    .sort((a, b) => a.rowId - b.rowId);

  const extraPriorityIds = new Set([61, 62, 63, 66, 78, 81, 82, 84, 91, 93, 95, 114, 119, 125, 134, 149]);
  const batch1Prods = allProdObjects.filter(
    (p) =>
      (p.rowId >= 1 && p.rowId <= 60) ||
      (p.rowId >= 151 && p.rowId <= 158) ||
      extraPriorityIds.has(p.rowId)
  );
  const batch1Ids = new Set(batch1Prods.map((p) => p.rowId));
  const remainingProds = allProdObjects.filter((p) => !batch1Ids.has(p.rowId));

  return isRemainingProductsOnly
    ? remainingProds.map((p) => `${BASE_URL}/products/${p.slug}`)
    : [
        ...coreUrls,
        ...collectionUrls,
        ...insightUrls,
        ...batch1Prods.map((p) => `${BASE_URL}/products/${p.slug}`)
      ];
}

function resolveCredentialsPath() {
  for (const p of CREDENTIALS_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf8');
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken(creds, scopes) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: creds.client_email,
    scope: scopes.join(' '),
    aud: creds.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };
  const unsigned = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  const signature = signer.sign(creds.private_key);
  const jwt = `${unsigned}.${base64UrlEncode(signature)}`;

  const res = await fetch(creds.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Failed to obtain access token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  let mode = 'delta';
  let targetUrls = [];
  let deltaMeta = null;

  if (opts.urlsArg) {
    mode = 'urls';
    targetUrls = dedupePreserveOrder(opts.urlsArg.split(',').map(normalizeTargetUrl).filter(Boolean));
  } else if (opts.allPriority) {
    mode = 'all-priority';
    targetUrls = resolveFullPriorityOrRemainingUrls(false);
  } else if (opts.remainingProducts) {
    mode = 'remaining-products';
    targetUrls = resolveFullPriorityOrRemainingUrls(true);
  } else {
    mode = 'delta';
    deltaMeta = detectDeltaUrls(opts.sinceRef);
    targetUrls = deltaMeta.urls;
  }

  if (opts.dryRun) {
    console.log(`=== Google Indexing Dry-Run (mode: ${mode}) ===`);
    if (deltaMeta) {
      console.log(`Git delta range: ${opts.sinceRef}..HEAD (${deltaMeta.changedFilesCount} changed files)`);
    }
    console.log(`Sitemaps: ${opts.noSitemaps ? 'skipped (--no-sitemaps)' : 'would submit 19 sitemaps to GSC'}`);
    console.log(`Target URLs (${targetUrls.length}):`);
    targetUrls.forEach((u, idx) => console.log(`  [${idx + 1}] ${u}`));
    return;
  }

  const credPath = resolveCredentialsPath();
  if (!credPath) {
    console.error('Credentials file not found in:', CREDENTIALS_CANDIDATES.join(', '));
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(credPath, 'utf8'));
  const token = await getAccessToken(creds, [
    'https://www.googleapis.com/auth/indexing',
    'https://www.googleapis.com/auth/webmasters'
  ]);

  // 1. Re-submit sitemap-index.xml + 18 locale sitemaps to GSC (unless --no-sitemaps)
  const sitemapResults = [];
  if (!opts.noSitemaps) {
    const locales = [
      'en', 'de', 'fr', 'nl', 'es', 'it', 'pt', 'sv', 'da',
      'no', 'fi', 'pl', 'cs', 'ru', 'ja', 'ko', 'id', 'ar'
    ];
    const sitemapList = [
      `${BASE_URL}/sitemap-index.xml`,
      ...locales.map((l) => `${BASE_URL}/sitemap-${l}.xml`)
    ];

    console.log(`=== 1. Re-Submitting ${sitemapList.length} Sitemaps to Google Search Console ===`);
    for (const sm of sitemapList) {
      const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(sm)}`;
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok || res.status === 204) {
        sitemapResults.push({ sitemap: sm, status: res.status, ok: true });
        console.log(`✅ Submitted sitemap (${res.status}): ${sm}`);
      } else {
        const txt = await res.text();
        sitemapResults.push({ sitemap: sm, status: res.status, ok: false, error: txt });
        console.error(`❌ Failed sitemap ${sm} (${res.status}): ${txt}`);
      }
    }
  } else {
    console.log('=== 1. Sitemap Submission Skipped (--no-sitemaps) ===');
  }

  // 2. Publish ONLY target URLs (Delta-Only by default) to Google Indexing API
  let successCount = 0;
  let errorCount = 0;
  let rateLimited = false;
  const submittedUrls = [];

  if (targetUrls.length === 0) {
    console.log(`\n=== 2. No added or modified page URLs detected (${opts.sinceRef}..HEAD). Skipping Google Indexing API calls. ===`);
  } else {
    console.log(`\n=== 2. Publishing ${targetUrls.length} URL(s) [mode=${mode}] to Google Indexing API ===`);
    for (let i = 0; i < targetUrls.length; i++) {
      const url = targetUrls[i];
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, type: 'URL_UPDATED' })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        successCount++;
        const notifyTime = data?.urlNotificationMetadata?.latestUpdate?.notifyTime || 'OK';
        submittedUrls.push({ url, status: 200, notifyTime });
        console.log(`[${i + 1}/${targetUrls.length}] ✅ 200 URL_UPDATED -> ${url} (${notifyTime})`);
      } else {
        errorCount++;
        const msg = data?.error?.message || JSON.stringify(data);
        submittedUrls.push({ url, status: res.status, error: msg });
        console.error(`[${i + 1}/${targetUrls.length}] ❌ ${res.status} -> ${url}: ${msg}`);
        if (res.status === 429) {
          rateLimited = true;
          console.warn('⚠️ Daily Google Indexing API quota reached (HTTP 429). Stopping batch cleanly.');
          break;
        }
        if (res.status === 403 && i === 0) {
          console.warn('⚠️ HTTP 403 Permission Denied on Indexing API. Stopping batch.');
          break;
        }
      }
    }
  }

  fs.mkdirSync(path.dirname(REPORT_OUT_PATH), { recursive: true });
  fs.writeFileSync(
    REPORT_OUT_PATH,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        siteUrl: SITE_URL,
        mode,
        ...(deltaMeta ? { sinceRef: opts.sinceRef, changedFilesCount: deltaMeta.changedFilesCount } : {}),
        sitemaps: sitemapResults,
        summary: {
          requested: targetUrls.length,
          succeeded: successCount,
          failed: errorCount,
          rateLimited
        },
        urls: submittedUrls
      },
      null,
      2
    )
  );
  console.log(`\n=== Summary: ${successCount} succeeded, ${errorCount} failed | Report saved to ${REPORT_OUT_PATH} ===`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
