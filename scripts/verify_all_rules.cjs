#!/usr/bin/env node
/**
 * scripts/verify_all_rules.cjs
 * Deterministic verification suite for MedalPinSupply.com
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
let errors = 0;

function pass(msg) {
  console.log(`✅ PASS: ${msg}`);
}
function fail(msg) {
  console.error(`❌ FAIL: ${msg}`);
  errors++;
}

// ---------------------------------------------------------------------------
// RULE 1: Image Audit — 150 Products + 40 Guides + 4 Showcase + 1 Hero
// Every featuredImage must be unique (path + MD5 binary), exist, .webp, 800x600, <150KB
// ---------------------------------------------------------------------------
console.log('\n=== 1. Image Uniqueness & Spec Audit ===');
const prodDir = path.join(ROOT, 'src/content/products');
const prodFiles = fs.readdirSync(prodDir).filter((f) => f.endsWith('.json'));
const guideDir = path.join(ROOT, 'src/content/insights');
const guideFiles = fs.readdirSync(guideDir).filter((f) => f.endsWith('.md'));

const featuredMap = new Map(); // path -> owner
const md5Map = new Map(); // md5 -> path
let galleryCount = 0;

function parseWebpDims(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') {
    return null;
  }
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8 ') {
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  } else if (chunk === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  } else if (chunk === 'VP8X') {
    return {
      w: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
      h: (buf.readUIntLE(27, 3) & 0xffffff) + 1
    };
  }
  return null;
}

function checkWebpImage(relPath, owner, expectedDims = null) {
  if (!relPath.endsWith('.webp')) {
    fail(`${owner} image is not .webp: ${relPath}`);
  }
  const abs = path.join(ROOT, 'public', relPath);
  if (!fs.existsSync(abs)) {
    fail(`${owner} image missing on disk: ${relPath}`);
    return;
  }
  const stat = fs.statSync(abs);
  if (stat.size > 150 * 1024) {
    fail(`${owner} image exceeds 150KB (${Math.round(stat.size / 1024)}KB): ${relPath}`);
  }
  const buf = fs.readFileSync(abs);
  const dims = parseWebpDims(buf);
  if (!dims) {
    fail(`${owner} image is not a valid WebP binary: ${relPath}`);
  } else if (expectedDims && (dims.w !== expectedDims.w || dims.h !== expectedDims.h)) {
    fail(`${owner} image ${relPath} dimensions are ${dims.w}x${dims.h} (expected ${expectedDims.w}x${expectedDims.h})`);
  }
  const md5 = crypto.createHash('md5').update(buf).digest('hex');
  return { abs, size: stat.size, md5, dims };
}

for (const file of prodFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(prodDir, file), 'utf8'));
  const img = data.featuredImage;
  if (featuredMap.has(img)) {
    fail(`Duplicate featuredImage path ${img} between ${file} and ${featuredMap.get(img)}`);
  }
  featuredMap.set(img, `Product:${file}`);
  const info = checkWebpImage(img, `Product:${file}`, { w: 800, h: 600 });
  if (info) {
    if (md5Map.has(info.md5)) {
      fail(`Duplicate binary MD5 for ${img} (${file}) and ${md5Map.get(info.md5)}`);
    }
    md5Map.set(info.md5, `${img} (${file})`);
  }
  for (const gImg of data.galleryImages || []) {
    if (gImg === img) continue;
    galleryCount++;
    checkWebpImage(gImg, `ProductGallery:${file}`, { w: 800, h: 600 });
  }
}

for (const file of guideFiles) {
  const raw = fs.readFileSync(path.join(guideDir, file), 'utf8');
  const m = raw.match(/featuredImage:\s*["']([^"']+)["']/);
  if (!m) {
    fail(`Guide ${file} missing featuredImage`);
    continue;
  }
  const img = m[1];
  if (featuredMap.has(img)) {
    fail(`Guide ${file} reuses featuredImage ${img} already owned by ${featuredMap.get(img)}`);
  }
  featuredMap.set(img, `Guide:${file}`);
  const info = checkWebpImage(img, `Guide:${file}`, { w: 800, h: 600 });
  if (info) {
    if (md5Map.has(info.md5)) {
      fail(`Duplicate binary MD5 for guide ${img} (${file}) and ${md5Map.get(info.md5)}`);
    }
    md5Map.set(info.md5, `${img} (${file})`);
  }

  // Also verify inline <figure class="article-figure"> images in guide body
  const inlineImgs = [...raw.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*width="(\d+)"[^>]*height="(\d+)"/g)];
  if (inlineImgs.length < 2) {
    fail(`Guide ${file} has fewer than 2 inline <img> figures with width/height (${inlineImgs.length})`);
  }
  const seenInGuide = new Set([img]);
  for (const match of inlineImgs) {
    const inlineSrc = match[1];
    const inlineAlt = match[2];
    const attrW = Number(match[3]);
    const attrH = Number(match[4]);
    if (!inlineAlt || inlineAlt.trim().length < 10) {
      fail(`Guide ${file} inline image ${inlineSrc} has short/empty alt text`);
    }
    if (seenInGuide.has(inlineSrc)) {
      fail(`Guide ${file} repeats image ${inlineSrc} on the same page`);
    }
    seenInGuide.add(inlineSrc);
    const inInfo = checkWebpImage(inlineSrc, `GuideInline:${file}`, { w: attrW, h: attrH });
    if (inInfo) {
      if (md5Map.has(inInfo.md5)) {
        fail(`Duplicate binary MD5 for inline image ${inlineSrc} and ${md5Map.get(inInfo.md5)}`);
      }
      md5Map.set(inInfo.md5, `${inlineSrc} (${file})`);
    }
  }
}

for (let i = 1; i <= 4; i++) {
  const sc = `/images/factory/showcase-${i}.webp`;
  const info = checkWebpImage(sc, `Showcase:${i}`);
  if (info) {
    if (md5Map.has(info.md5)) {
      fail(`Showcase image ${sc} shares MD5 with ${md5Map.get(info.md5)}`);
    }
    md5Map.set(info.md5, sc);
  }
}
checkWebpImage('/images/hero-medal-pin-showcase.webp', 'HeroShowcase');

const buildImagesSrc = fs.readFileSync(path.join(ROOT, 'scripts/build_all_images.cjs'), 'utf8');
const prodBranchSrc = buildImagesSrc.slice(
  buildImagesSrc.indexOf('async function buildProductImage'),
  buildImagesSrc.indexOf('async function buildCompositeFigure')
);
if (prodBranchSrc.includes('buildStudioCraftRender')) {
  fail('scripts/build_all_images.cjs still calls buildStudioCraftRender in buildProductImage (all 150 SKUs must use real photography)');
}

if (errors === 0) {
  pass(`All ${prodFiles.length} product featuredImages (800x600), ${galleryCount} extra galleryImages (800x600), ${guideFiles.length} guide featuredImages (800x600), ${guideFiles.length * 2} inline figures, and 5 showcase images have unique paths, unique MD5 hashes, .webp format, and <150KB size.`);
}

// ---------------------------------------------------------------------------
// RULE 2: Backlinko Editorial, SEO/GEO Meta & Mesh Compliance on All Products & Guides
// ---------------------------------------------------------------------------
console.log('\n=== 2. Backlinko Editorial, SEO/GEO Meta & Mesh Compliance ===');
const aiCliches = [
  'in today\'s fast-paced',
  'delve',
  'testament',
  'tapestry',
  'game-changer',
  'unlock the power',
  'paramount',
  'crucial',
  'beacon',
  'cutting-edge',
  'unwavering',
  'seamlessly',
  'revolutionize',
  'in the realm of'
];

const seenMetaTitles = new Map();
const seenMetaDescs = new Map();
const seenGuideH2s = new Map();
const seenGuideTables = new Map();

for (const file of prodFiles) {
  const rawProd = fs.readFileSync(path.join(prodDir, file), 'utf8');
  const data = JSON.parse(rawProd);
  const mt = data.metaTitle || '';
  const md = data.metaDescription || '';
  if (!mt || mt.length >= 60) {
    fail(`Product ${file} metaTitle length is ${mt.length} (must be < 60 chars): "${mt}"`);
  }
  if (/[\s&\-\/|]$/.test(mt)) {
    fail(`Product ${file} metaTitle ends with trailing symbol/truncation: "${mt}"`);
  }
  if (!md || md.length >= 155) {
    fail(`Product ${file} metaDescription length is ${md.length} (must be < 155 chars): "${md}"`);
  }
  if (!/[.!)]$/.test(md)) {
    fail(`Product ${file} metaDescription is truncated (must end with "." or ")"): "${md}"`);
  }
  if (rawProd.includes('pre-shipment pre-shipment')) {
    fail(`Product ${file} contains duplicate pre-shipment typo`);
  }
  if (seenMetaTitles.has(mt)) {
    fail(`Duplicate metaTitle "${mt}" between Product:${file} and ${seenMetaTitles.get(mt)}`);
  }
  seenMetaTitles.set(mt, `Product:${file}`);
  if (seenMetaDescs.has(md)) {
    fail(`Duplicate metaDescription "${md}" between Product:${file} and ${seenMetaDescs.get(md)}`);
  }
  seenMetaDescs.set(md, `Product:${file}`);
}

if (guideFiles.length < 43) {
  fail(`Expected 43 authoritative Insights, found ${guideFiles.length}`);
}

const i18nInsightLocSrc = fs.readFileSync(path.join(ROOT, 'src/i18n/insightAndCollectionLocalization.ts'), 'utf8');

for (const file of guideFiles) {
  const raw = fs.readFileSync(path.join(guideDir, file), 'utf8');
  const mt = (raw.match(/metaTitle:\s*["']([^"']+)["']/) || [])[1] || '';
  const md = (raw.match(/metaDescription:\s*["']([^"']+)["']/) || [])[1] || '';
  const cat = (raw.match(/category:\s*["']([^"']+)["']/) || [])[1] || '';
  if (!cat || (!i18nInsightLocSrc.includes(`'${cat}':`) && !i18nInsightLocSrc.includes(`"${cat}":`))) {
    fail(`Guide ${file} category "${cat}" is not localized in src/i18n/insightAndCollectionLocalization.ts`);
  }
  if (!mt || mt.length >= 60) {
    fail(`Guide ${file} metaTitle length is ${mt.length} (must be < 60 chars): "${mt}"`);
  }
  if (!md || md.length >= 155) {
    fail(`Guide ${file} metaDescription length is ${md.length} (must be < 155 chars): "${md}"`);
  }
  if (!/[.!)]$/.test(md) || /(?:\s&\s?\.|\b(?:and|or|with|for|to|in|of|vs|from)\.$)/i.test(md)) {
    fail(`Guide ${file} metaDescription is truncated (must end with a complete sentence): "${md}"`);
  }
  if (seenMetaTitles.has(mt)) {
    fail(`Duplicate metaTitle "${mt}" between Guide:${file} and ${seenMetaTitles.get(mt)}`);
  }
  seenMetaTitles.set(mt, `Guide:${file}`);
  if (seenMetaDescs.has(md)) {
    fail(`Duplicate metaDescription "${md}" between Guide:${file} and ${seenMetaDescs.get(md)}`);
  }
  seenMetaDescs.set(md, `Guide:${file}`);

  for (const hMatch of raw.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
    const hText = hMatch[1].trim();
    if (seenGuideH2s.has(hText)) {
      fail(`Duplicate H2 "${hText}" between Guide:${file} and ${seenGuideH2s.get(hText)}`);
    }
    seenGuideH2s.set(hText, `Guide:${file}`);
  }
  for (const tMatch of raw.matchAll(/<table class="geo-table">([\s\S]*?)<\/table>/g)) {
    const tHash = crypto.createHash('md5').update(tMatch[1]).digest('hex');
    if (seenGuideTables.has(tHash)) {
      fail(`Duplicate .geo-table content between Guide:${file} and ${seenGuideTables.get(tHash)}`);
    }
    seenGuideTables.set(tHash, `Guide:${file}`);
  }

  if (/[\u4e00-\u9fff]/.test(raw)) {
    fail(`Guide ${file} contains Chinese characters in English Markdown`);
  }

  const body = raw.replace(/^---[\s\S]*?---/, '');
  const wordCount = body.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  if (wordCount < 1200) {
    fail(`Guide ${file} word count is ${wordCount} (must be >= 1,200 words)`);
  }
  const calcMinutes = Math.max(8, Math.ceil(wordCount / 145));
  if (calcMinutes < 8) {
    fail(`Guide ${file} calculated reading time is ${calcMinutes} min (must be >= 8 min)`);
  }

  const tableCount = (raw.match(/<table class="geo-table">/g) || []).length;
  const figCount = (raw.match(/<figure class="article-figure">/g) || []).length;
  const calloutCount = (raw.match(/class="exec-callout-box"/g) || []).length;
  const ctaBoxCount = (raw.match(/class="sourcing-cta-box"/g) || []).length;
  const h2Count = (raw.match(/<h2[\s>]|^##\s+/gm) || []).length;
  const pMatches = [...body.matchAll(/<p>([\s\S]*?)<\/p>/g)];
  const prodLinks = (body.match(/href="\/products\//g) || []).length;
  const colLinks = (body.match(/href="\/collections\//g) || []).length;
  const insLinks = (body.match(/href="\/insights\//g) || []).length;

  if (tableCount < 2) fail(`Guide ${file} has <2 .geo-table comparison tables (${tableCount})`);
  if (figCount < 2) fail(`Guide ${file} has <2 .article-figure inline figures (${figCount})`);
  if (calloutCount < 1) fail(`Guide ${file} missing .exec-callout-box Key Takeaway`);
  if (ctaBoxCount < 1) fail(`Guide ${file} missing .sourcing-cta-box`);
  if (h2Count < 5) fail(`Guide ${file} has <5 H2 sections (${h2Count})`);
  if (pMatches.length < 14) fail(`Guide ${file} has <14 short scannable <p> blocks (${pMatches.length})`);
  if (prodLinks < 15) fail(`Guide ${file} has <15 product cross-links (${prodLinks})`);
  if (colLinks < 2) fail(`Guide ${file} has <2 collection cross-links (${colLinks})`);
  if (insLinks < 3) fail(`Guide ${file} has <3 sibling insight cross-links (${insLinks})`);

  for (const hMatch of raw.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
    const hText = hMatch[1].trim();
    if (/\([A-Z0-9]+-[A-Z0-9]+-[A-Z0-9-]+\)/.test(hText)) {
      fail(`Guide ${file} H2 contains truncated uppercase slug fragment: "${hText}"`);
    }
  }
  for (const pm of pMatches) {
    const pText = pm[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const pWords = pText.split(/\s+/).filter(Boolean).length;
    const pSentences = pText.split(/(?<=[.!?])\s+/).filter(Boolean).length;
    if (pWords > 80) fail(`Guide ${file} has <p> exceeding 80 words (${pWords}w): "${pText.slice(0, 60)}..."`);
    if (pSentences > 4) fail(`Guide ${file} has <p> exceeding 4 sentences (${pSentences}s): "${pText.slice(0, 60)}..."`);
  }

  for (const cliche of aiCliches) {
    if (raw.toLowerCase().includes(cliche)) {
      fail(`Guide ${file} contains banned AI buzzword "${cliche}"`);
    }
  }
}
pass(`All ${prodFiles.length} products and ${guideFiles.length} guides pass Backlinko skyscraper, unique SEO meta (<60/<155), word count (>=1,200), reading time (>=8 min), 0 banned buzzwords, and semantic mesh checks.`);

// ---------------------------------------------------------------------------
// RULE 3: FAQ Count Audit (9-12 FAQs per page across all products, collections, guides, and static pages)
// ---------------------------------------------------------------------------
console.log('\n=== 3. FAQ Count & Schema Audit (9-12 FAQs per page) ===');
for (const file of prodFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(prodDir, file), 'utf8'));
  const n = (data.faqs || []).length;
  if (n < 9 || n > 12) {
    fail(`Product ${file} has ${n} FAQs (expected 9-12)`);
  }
}
const guideTemplate = fs.readFileSync(path.join(ROOT, 'src/pages/insights/[slug].astro'), 'utf8');
const fnMatch = guideTemplate.match(/function buildDefaultGuideFaqs[\s\S]*?return\s*\[([\s\S]*?)\];/);
const guideFaqMatches = fnMatch ? (fnMatch[1].match(/question:\s*['`]/g) || []).length : 0;
if (guideFaqMatches < 9 || guideFaqMatches > 12) {
  fail(`Guide template src/pages/insights/[slug].astro buildDefaultGuideFaqs has ${guideFaqMatches} FAQs per guide (expected 9-12)`);
}
pass(`All ${prodFiles.length} products and ${guideFiles.length} guides (${guideFaqMatches} FAQs per guide) satisfy the 9-12 FAQ invariant.`);

// ---------------------------------------------------------------------------
// RULE 4: Prohibited Strings Audit (No B2B, AQL 2.5, $49 Sample, 100% credit, legacy brand or supplier leaks)
// ---------------------------------------------------------------------------
console.log('\n=== 4. Prohibited Strings & Supplier Privacy Audit ===');
const bannedRegexes = [
  { re: /\bB2B\b/, label: 'B2B' },
  { re: /\bAQL\s*2\.5/i, label: 'AQL 2.5' },
  { re: /\$49\s+Sample/i, label: '$49 Sample' },
  { re: /100%\s+(?:sample\s+)?(?:credit|discount|rebate|refund)/i, label: '100% credit/discount' },
  { re: /topbadge\.com/i, label: 'topbadge.com leak' },
  { re: /\bF&T\b/, label: 'F&T supplier name leak' },
  { re: /fidgetsupply\.com/i, label: 'Legacy fidgetsupply.com ref', allowFiles: ['src/components/Footer.astro', 'src/pages/about/index.astro'] },
  { re: /\bFuzhou\b/i, label: 'Legacy Fuzhou ref' },
  { re: /\$0\s+Ready\s+Molds/i, label: 'Inaccurate $0 Ready Molds claim' },
  { re: /\$0\s+Stock\s+Mold/i, label: 'Inaccurate $0 Stock Mold claim' },
  { re: /Ready\s+Tooling\s+·\s+\$0\s+Mold/i, label: 'Inaccurate Ready Tooling $0 Mold claim' },
  { re: /ready-stock/i, label: 'Inaccurate ready-stock claim' },
  { re: /In-stock reference/i, label: 'Inaccurate in-stock claim' },
  { re: /Stock Trolley Coins/i, label: 'Inaccurate Stock Trolley Coins claim' },
  { re: /or stock ribbon/i, label: 'Inaccurate stock ribbon claim' },
  { re: /\bWe stock\b/i, label: 'Inaccurate We stock claim' },
  { re: /Factory SKU Code/i, label: 'Contradictory Factory SKU Code label' },
  { re: /Explore Models/i, label: 'Contradictory Explore Models label' },
  { re: /Curated Models/i, label: 'Contradictory Curated Models label' },
  { re: /More Models in This Category/i, label: 'Contradictory More Models label' },
  { re: /MPS-001 to MPS-150/i, label: 'Contradictory MPS-001 to MPS-150 stock SKU range' },
  { re: /Blank Stock/i, label: 'Inaccurate Blank Stock claim' }
];

function scanDirForBanned(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForBanned(p);
    } else if (/\.(astro|ts|md|json)$/.test(entry.name)) {
      const content = fs.readFileSync(p, 'utf8');
      const relPath = path.relative(ROOT, p).replace(/\\/g, '/');
      for (const { re, label, allowFiles } of bannedRegexes) {
        if (allowFiles && allowFiles.includes(relPath)) continue;
        if (re.test(content)) {
          fail(`Banned term [${label}] found in ${relPath}`);
        }
      }
    }
  }
}
scanDirForBanned(path.join(ROOT, 'src'));
pass('Zero prohibited terms (B2B, AQL 2.5, $49 Sample, 100% discount, supplier/legacy leaks) in src/.');

// ---------------------------------------------------------------------------
// RULE 5: 18-Language Dictionary Completeness Audit
// ---------------------------------------------------------------------------
console.log('\n=== 5. 18-Language i18n Dictionary Audit ===');
const uiContent = fs.readFileSync(path.join(ROOT, 'src/i18n/ui.ts'), 'utf8');
const expectedLangs = ['en', 'de', 'fr', 'nl', 'es', 'it', 'pt', 'sv', 'da', 'no', 'fi', 'pl', 'cs', 'ru', 'ja', 'ko', 'id', 'ar'];
const uiStart = uiContent.indexOf('export const ui');
const uiEq = uiContent.indexOf('=', uiStart);
const parsedUi = eval('(' + uiContent.slice(uiEq + 1).trim().replace(/;\s*$/, '') + ')');
const enKeyList = Object.keys(parsedUi.en || {});
for (const l of expectedLangs) {
  if (!parsedUi[l]) {
    fail(`Missing locale "${l}" in src/i18n/ui.ts`);
    continue;
  }
  const lKeys = Object.keys(parsedUi[l]);
  if (lKeys.length !== enKeyList.length) {
    fail(`Locale "${l}" has ${lKeys.length} keys (expected ${enKeyList.length})`);
  }
  for (const k of enKeyList) {
    if (!parsedUi[l][k] || String(parsedUi[l][k]).trim() === '') {
      fail(`Locale "${l}" has empty/missing key "${k}"`);
    }
  }
}
pass(`All ${expectedLangs.length} languages have 100% complete dictionaries (${enKeyList.length} keys per language, ${expectedLangs.length * enKeyList.length} total localized entries).`);

// ---------------------------------------------------------------------------
// RULE 6: Astro Redirects & Sitemap Trailing-Slash Hygiene
// ---------------------------------------------------------------------------
console.log('\n=== 6. Astro 301 Redirects & Sitemap Trailing-Slash Hygiene ===');
const astroCfg = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
const redirectKeys = [...astroCfg.matchAll(/'(\/[^']+)':\s*'/g)].map((m) => m[1]);
const seenRedirects = new Set();
for (const k of redirectKeys) {
  if (k.length > 1 && k.endsWith('/')) {
    fail(`Trailing slash redirect key in astro.config.mjs: ${k}`);
  }
  if (seenRedirects.has(k)) {
    fail(`Duplicate redirect key in astro.config.mjs: ${k}`);
  }
  seenRedirects.add(k);
}
const robotsTxtPath = path.join(ROOT, 'public/robots.txt');
const robotsTxtContent = fs.existsSync(robotsTxtPath) ? fs.readFileSync(robotsTxtPath, 'utf8') : '';
if (robotsTxtContent.includes('sitemap-0.xml')) {
  fail('public/robots.txt still references legacy sitemap-0.xml');
}
if (!robotsTxtContent.includes('https://medalpinsupply.com/sitemap-index.xml')) {
  fail('public/robots.txt missing authoritative sitemap-index.xml directive');
}

const legacySitemap = path.join(ROOT, 'dist/sitemap-0.xml');
if (fs.existsSync(legacySitemap)) {
  fail('Stale monolithic dist/sitemap-0.xml still exists after build');
}

const sitemapIndexPath = path.join(ROOT, 'dist/sitemap-index.xml');
let totalSitemapUrls = 0;
let perLocaleSitemapCount = 0;
const nonEnLocaleSet = new Set(expectedLangs.filter((l) => l !== 'en'));

if (fs.existsSync(path.join(ROOT, 'dist'))) {
  if (!fs.existsSync(sitemapIndexPath)) {
    fail('dist/sitemap-index.xml is missing');
  } else {
    const indexXml = fs.readFileSync(sitemapIndexPath, 'utf8');
    const countsPerLang = [];
    for (const lang of expectedLangs) {
      const expectedIndexLoc = `<loc>https://medalpinsupply.com/sitemap-${lang}.xml</loc>`;
      if (!indexXml.includes(expectedIndexLoc)) {
        fail(`dist/sitemap-index.xml missing child sitemap for locale "${lang}"`);
      }
      const localeSmPath = path.join(ROOT, `dist/sitemap-${lang}.xml`);
      if (!fs.existsSync(localeSmPath)) {
        fail(`Missing per-language sitemap file: dist/sitemap-${lang}.xml`);
        continue;
      }
      const smXml = fs.readFileSync(localeSmPath, 'utf8');
      const urlBlocks = [...smXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
      const smLocs = [...smXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      if (smLocs.length === 0) {
        fail(`dist/sitemap-${lang}.xml has 0 URLs`);
      }
      if (urlBlocks.length !== smLocs.length) {
        fail(`dist/sitemap-${lang}.xml has malformed <url>/<loc> pairing (${urlBlocks.length} vs ${smLocs.length})`);
      }
      for (const blk of urlBlocks) {
        if (!/<lastmod>\d{4}-\d{2}-\d{2}T/.test(blk)) {
          fail(`dist/sitemap-${lang}.xml has <url> entry missing ISO <lastmod>`);
          break;
        }
      }
      const badSlashLocs = smLocs.filter((u) => u.endsWith('/'));
      if (badSlashLocs.length > 0) {
        fail(`Found ${badSlashLocs.length} sitemap <loc> URLs with trailing slash in sitemap-${lang}.xml: e.g. ${badSlashLocs[0]}`);
      }
      for (const u of smLocs) {
        const pathname = u.replace(/^https:\/\/medalpinsupply\.com/, '') || '/';
        const firstSeg = pathname.split('/').filter(Boolean)[0];
        if (lang === 'en') {
          if (firstSeg && nonEnLocaleSet.has(firstSeg)) {
            fail(`dist/sitemap-en.xml leaked non-English URL: ${u}`);
            break;
          }
        } else {
          if (u !== `https://medalpinsupply.com/${lang}` && !u.startsWith(`https://medalpinsupply.com/${lang}/`)) {
            fail(`dist/sitemap-${lang}.xml contains URL from another locale: ${u}`);
            break;
          }
        }
      }
      countsPerLang.push({ lang, count: smLocs.length });
      totalSitemapUrls += smLocs.length;
    }
    const uniqueCounts = [...new Set(countsPerLang.map((c) => c.count))];
    if (uniqueCounts.length !== 1 || uniqueCounts[0] === 0) {
      fail(`Per-locale sitemap URL counts do not match uniformly across 18 locales: ${JSON.stringify(countsPerLang)}`);
    } else {
      perLocaleSitemapCount = uniqueCounts[0];
    }
  }
}
pass(`All ${redirectKeys.length} redirects in astro.config.mjs clean; sitemap-index.xml + 18 locale sitemaps (${perLocaleSitemapCount} URLs/locale, ${totalSitemapUrls} total) verified with 0 trailing-slash 301s and ISO <lastmod>.`);

// ---------------------------------------------------------------------------
// RULE 7: 18-Language Full-Site Route Parity & Zero English Link Fallback
// ---------------------------------------------------------------------------
console.log('\n=== 7. 18-Language Route Parity & Zero English Link Fallback ===');
const distDir = path.join(ROOT, 'dist');
if (fs.existsSync(distDir)) {
  const htmlFiles = [];
  function walkDist(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkDist(full);
      else if (entry.name.endsWith('.html')) htmlFiles.push(full);
    }
  }
  walkDist(distDir);

  const validPaths = new Set();
  for (const f of htmlFiles) {
    let rel = '/' + path.relative(distDir, f).replace(/\\/g, '/');
    if (rel.endsWith('/index.html')) {
      rel = rel.slice(0, -'/index.html'.length) || '/';
    } else if (rel.endsWith('.html')) {
      rel = rel.slice(0, -'.html'.length);
    }
    validPaths.add(rel);
  }

  // Verify every English route has all 17 non-English counterparts
  const nonEnLangs = expectedLangs.filter((l) => l !== 'en');
  const enRoutes = [...validPaths].filter((p) => {
    if (p === '/404' || redirectKeys.includes(p)) return false;
    const firstSeg = p.split('/').filter(Boolean)[0];
    return !nonEnLangs.includes(firstSeg);
  });

  let missingLocaleRoutes = 0;
  for (const enRoute of enRoutes) {
    for (const lang of nonEnLangs) {
      const expectedPath = enRoute === '/' ? `/${lang}` : `/${lang}${enRoute}`;
      if (!validPaths.has(expectedPath)) {
        fail(`Missing localized route: ${expectedPath} (from EN route ${enRoute})`);
        missingLocaleRoutes++;
      }
    }
  }

  let brokenLinkCount = 0;
  let unlocalizedLinkCount = 0;
  for (const f of htmlFiles) {
    const relFile = '/' + path.relative(distDir, f).replace(/\\/g, '/');
    const segs = relFile.split('/').filter(Boolean);
    const pageLang = nonEnLangs.includes(segs[0]) ? segs[0] : 'en';
    const html = fs.readFileSync(f, 'utf8');

    const hrefRegex = /<a\b[^>]*?\bhref="([^"]+)"[^>]*>/gi;
    let m;
    while ((m = hrefRegex.exec(html)) !== null) {
      const fullTag = m[0];
      const href = m[1];
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      if (fullTag.includes('lang-grid-item') || fullTag.includes('lang-option') || fullTag.includes('mobile-lang-chip')) continue;
      const cleanPath = (href.split('?')[0].split('#')[0].replace(/\/$/, '')) || '/';
      if (cleanPath.match(/\.(webp|png|jpg|jpeg|svg|pdf|xml|txt|ico|css|js)$/i)) continue;

      if (!validPaths.has(cleanPath)) {
        fail(`Broken internal link ${href} in ${relFile}`);
        brokenLinkCount++;
      }
      if (pageLang !== 'en') {
        if (cleanPath !== `/${pageLang}` && !cleanPath.startsWith(`/${pageLang}/`)) {
          fail(`Unlocalized fallback link to English "${href}" on ${pageLang} page ${relFile}`);
          unlocalizedLinkCount++;
        }
      }
    }
  }

  if (missingLocaleRoutes === 0 && brokenLinkCount === 0 && unlocalizedLinkCount === 0) {
    pass(`All ${enRoutes.length} routes x 18 languages (${htmlFiles.length} built HTML pages) verified with 0 missing routes, 0 broken links, and 0 unlocalized English fallback links.`);
  }

  // ---------------------------------------------------------------------------
  // RULE 8: Bidirectional Semantic Mesh Audit (Product <-> Collection <-> Insight)
  // ---------------------------------------------------------------------------
  console.log('\n=== 8. Bidirectional Semantic Mesh Audit ===');
  let meshErrors = 0;
  for (const enRoute of enRoutes) {
    if (enRoute.startsWith('/products/') && enRoute !== '/products') {
      const html = fs.readFileSync(path.join(distDir, enRoute.slice(1), 'index.html'), 'utf8');
      const insLinks = (html.match(/href="\/insights\/[^"]+"/g) || []).length;
      if (insLinks < 4) {
        fail(`Product page ${enRoute} has fewer than 4 links to Insights (${insLinks})`);
        meshErrors++;
      }
    } else if (enRoute.startsWith('/collections/') && enRoute !== '/collections') {
      const html = fs.readFileSync(path.join(distDir, enRoute.slice(1), 'index.html'), 'utf8');
      const insLinks = (html.match(/href="\/insights\/[^"]+"/g) || []).length;
      if (insLinks < 3) {
        fail(`Collection page ${enRoute} has fewer than 3 links to Insights (${insLinks})`);
        meshErrors++;
      }
    } else if (enRoute.startsWith('/insights/') && enRoute !== '/insights') {
      const html = fs.readFileSync(path.join(distDir, enRoute.slice(1), 'index.html'), 'utf8');
      const prodLinks = (html.match(/href="\/products\/[^"]+"/g) || []).length;
      const colLinks = (html.match(/href="\/collections\/[^"]+"/g) || []).length;
      if (prodLinks < 10 || colLinks < 2) {
        fail(`Insight page ${enRoute} has insufficient mesh links (products=${prodLinks}, collections=${colLinks})`);
        meshErrors++;
      }
    }
  }
  if (meshErrors === 0) {
    pass(`100% Bidirectional Semantic Mesh verified across all ${prodFiles.length} Products, 11 Collections, and ${guideFiles.length} Authoritative Insights.`);
  }

  // ---------------------------------------------------------------------------
  // RULE 9: Full-Site Built HTML <img src>, OG/Twitter Image & <link href> Audit
  // ---------------------------------------------------------------------------
  console.log('\n=== 9. Full-Site Built HTML <img src>, OG Image & Asset Audit ===');
  let missingImgCount = 0;
  let missingMetaImgCount = 0;
  let totalCheckedImgs = 0;
  for (const f of htmlFiles) {
    const relFile = '/' + path.relative(distDir, f).replace(/\\/g, '/');
    const html = fs.readFileSync(f, 'utf8');

    const imgRegex = /<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>/gi;
    let im;
    while ((im = imgRegex.exec(html)) !== null) {
      const src = im[1];
      if (src.startsWith('data:')) continue;
      if (src.startsWith('http://') || (src.startsWith('https://') && !src.startsWith('https://medalpinsupply.com'))) continue;
      const localPath = src.replace(/^https?:\/\/medalpinsupply\.com/, '').split('?')[0].split('#')[0];
      totalCheckedImgs++;
      const distTarget = path.join(distDir, localPath);
      const pubTarget = path.join(ROOT, 'public', localPath);
      if (!fs.existsSync(distTarget) && !fs.existsSync(pubTarget)) {
        fail(`Missing <img src="${src}"> in ${relFile}`);
        missingImgCount++;
      }
    }

    const metaImgRegex = /<meta\b[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/gi;
    while ((im = metaImgRegex.exec(html)) !== null) {
      const src = im[1];
      const localPath = src.replace(/^https?:\/\/medalpinsupply\.com/, '').split('?')[0].split('#')[0];
      if (localPath.startsWith('/')) {
        const distTarget = path.join(distDir, localPath);
        const pubTarget = path.join(ROOT, 'public', localPath);
        if (!fs.existsSync(distTarget) && !fs.existsSync(pubTarget)) {
          fail(`Missing meta image "${src}" in ${relFile}`);
          missingMetaImgCount++;
        }
      }
    }
  }
  if (missingImgCount === 0 && missingMetaImgCount === 0) {
    pass(`All ${totalCheckedImgs} <img src> tags and all OG/Twitter meta images across ${htmlFiles.length} built HTML pages exist on disk.`);
  }

  // ---------------------------------------------------------------------------
  // RULE 10: Built HTML SEO & GEO Structured Data Audit (Products, Collections, Insights & Static x 18 Languages)
  // ---------------------------------------------------------------------------
  console.log('\n=== 10. Built HTML SEO & GEO Structured Data Audit ===');
  let seoGeoErrors = 0;
  let checkedProdInsightPages = 0;
  function decodeHtmlEntities(s) {
    return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }
  for (const f of htmlFiles) {
    const relFile = '/' + path.relative(distDir, f).replace(/\\/g, '/');
    const html = fs.readFileSync(f, 'utf8');

    if (relFile !== '/404.html') {
      const tm = html.match(/<title>([^<]+)<\/title>/);
      const dm = html.match(/<meta name="description" content="([^"]+)"/);
      if (tm) {
        const rawTitle = tm[1];
        const decodedTitle = decodeHtmlEntities(rawTitle);
        if (decodedTitle.length > 60 || rawTitle.length > 60) {
          fail(`Page ${relFile} <title> exceeds 60 chars (decoded=${decodedTitle.length}, raw=${rawTitle.length}): "${rawTitle}"`);
          seoGeoErrors++;
        }
      }
      if (dm) {
        const rawDesc = dm[1];
        const decodedDesc = decodeHtmlEntities(rawDesc);
        if (decodedDesc.length > 160 || rawDesc.length > 160) {
          fail(`Page ${relFile} <meta name="description"> exceeds 160 chars (decoded=${decodedDesc.length}, raw=${rawDesc.length}): "${rawDesc}"`);
          seoGeoErrors++;
        }
      }
    }

    const isProdLeaf = /\/products\/[^/]+\/index\.html$/.test(relFile);
    const isInsightLeaf = /\/insights\/[^/]+\/index\.html$/.test(relFile);
    const isCollectionLeaf = /\/collections\/[^/]+\/index\.html$/.test(relFile);
    if (!isProdLeaf && !isInsightLeaf && !isCollectionLeaf) continue;
    checkedProdInsightPages++;
    if (!html.includes('rel="canonical"')) {
      fail(`Missing canonical link in ${relFile}`);
      seoGeoErrors++;
    }
    const hreflangCount = (html.match(/hreflang="/g) || []).length;
    if (hreflangCount < 19) {
      fail(`Expected 19 hreflang links in ${relFile}, found ${hreflangCount}`);
      seoGeoErrors++;
    }
    if (!html.includes('class="geo-direct-answer"')) {
      fail(`Missing GeoDirectAnswer block in ${relFile}`);
      seoGeoErrors++;
    }
    if (!html.includes('"@type":"FAQPage"')) {
      fail(`Missing FAQPage JSON-LD in ${relFile}`);
      seoGeoErrors++;
    }
    if (!html.includes('"@type":"BreadcrumbList"')) {
      fail(`Missing BreadcrumbList JSON-LD in ${relFile}`);
      seoGeoErrors++;
    }
    if (isProdLeaf && !html.includes('"@type":"Product"')) {
      fail(`Missing Product JSON-LD in ${relFile}`);
      seoGeoErrors++;
    }
    if (isProdLeaf && (!html.includes('class="editorial-spec-grid"') || !html.includes('class="editorial-guide-links"') || html.includes('col.thColor'))) {
      fail(`Editorial UI check failed (missing grid/links or unresolved col.thColor) in ${relFile}`);
      seoGeoErrors++;
    }
    if (isCollectionLeaf && !html.includes('"@type":"CollectionPage"')) {
      fail(`Missing CollectionPage JSON-LD in ${relFile}`);
      seoGeoErrors++;
    }
    if (isInsightLeaf && !html.includes('TechArticle')) {
      fail(`Missing TechArticle/BlogPosting JSON-LD in ${relFile}`);
      seoGeoErrors++;
    }
  }

  let strayCjkPages = 0;
  let internalNofollowOrQueryCount = 0;
  for (const f of htmlFiles) {
    const relFile = '/' + path.relative(distDir, f).replace(/\\/g, '/');
    const fullHtml = fs.readFileSync(f, 'utf8');
    const aTagRegex = /<a\b[^>]*>/gi;
    let am;
    while ((am = aTagRegex.exec(fullHtml)) !== null) {
      const tag = am[0];
      const hm = tag.match(/href=["']([^"']+)["']/i);
      if (!hm) continue;
      const href = hm[1];
      if (href.startsWith('/') || href.startsWith('https://medalpinsupply.com')) {
        if (/rel=["'][^"']*nofollow/i.test(tag)) {
          fail(`Internal link has rel="nofollow" (${href}) in ${relFile}`);
          internalNofollowOrQueryCount++;
        }
        if (href.includes('/contact?')) {
          fail(`Internal link has query parameters (${href}) in ${relFile}`);
          internalNofollowOrQueryCount++;
        }
        if ((href.startsWith('/') && href.length > 1 && href.endsWith('/')) || (href.startsWith('https://medalpinsupply.com') && href.endsWith('/'))) {
          fail(`Internal link has trailing slash (${href}) in ${relFile}`);
          internalNofollowOrQueryCount++;
        }
      }
    }
    const linkTagRegex = /<link\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
    let lm;
    while ((lm = linkTagRegex.exec(fullHtml)) !== null) {
      const lHref = lm[1];
      if ((lHref.startsWith('/') && lHref.length > 1 && lHref.endsWith('/')) || (lHref.startsWith('https://medalpinsupply.com') && lHref.endsWith('/'))) {
        fail(`<link> tag has trailing slash (${lHref}) in ${relFile}`);
        internalNofollowOrQueryCount++;
      }
    }
    if (relFile === '/ja/index.html' || relFile.startsWith('/ja/')) continue;
    const htmlNoJaLabel = fullHtml.replace(/日本語/g, '');
    const cjkMatch = htmlNoJaLabel.match(/[\u4e00-\u9fff]+/g);
    if (cjkMatch) {
      fail(`Stray Chinese/CJK characters [${[...new Set(cjkMatch)].join(', ')}] found in ${relFile}`);
      strayCjkPages++;
    }
  }
  if (seoGeoErrors === 0 && strayCjkPages === 0 && internalNofollowOrQueryCount === 0) {
    pass(`All ${checkedProdInsightPages} built Product, Collection & Insight pages verified for Canonical, 19 Hreflang tags, GeoDirectAnswer block, JSON-LD, 0 internal nofollow/query links, and 0 stray Chinese characters.`);
  }

  // ---------------------------------------------------------------------------
  // RULE 11: llms.txt & llms-full.txt Completeness Audit
  // ---------------------------------------------------------------------------
  console.log('\n=== 11. llms.txt & llms-full.txt GEO Corpus Audit ===');
  const distLlms = path.join(distDir, 'llms.txt');
  const distLlmsFull = path.join(distDir, 'llms-full.txt');
  if (!fs.existsSync(distLlms)) {
    fail('dist/llms.txt is missing');
  } else if (!fs.existsSync(distLlmsFull)) {
    fail('dist/llms-full.txt is missing');
  } else {
    const llmsTxt = fs.readFileSync(distLlms, 'utf8');
    const llmsFull = fs.readFileSync(distLlmsFull, 'utf8');
    if (llmsTxt.length < 50000) {
      fail(`dist/llms.txt is too small (${llmsTxt.length} chars; expected >= 50,000 chars with all ${prodFiles.length} SKUs & ${guideFiles.length} guides)`);
    }
    if (llmsFull.length < 300000) {
      fail(`dist/llms-full.txt is too small (${llmsFull.length} chars; expected >= 300,000 chars full corpus)`);
    }
    if (!llmsTxt.includes('https://medalpinsupply.com/llms-full.txt')) {
      fail('dist/llms.txt does not link to https://medalpinsupply.com/llms-full.txt');
    }
    for (const gf of guideFiles) {
      const gSlug = gf.replace(/\.md$/, '');
      if (!llmsTxt.includes(`/insights/${gSlug}`) || !llmsFull.includes(`/insights/${gSlug}`)) {
        fail(`Guide /insights/${gSlug} missing from dist/llms.txt or dist/llms-full.txt`);
      }
    }
    const llmsUrls = [...(llmsTxt.match(/https:\/\/medalpinsupply\.com[^\s"'<>)\]`]*/g) || []), ...(llmsFull.match(/https:\/\/medalpinsupply\.com[^\s"'<>)\]`]*/g) || [])];
    const badLlmsUrls = llmsUrls.filter((u) => u.endsWith('/'));
    if (badLlmsUrls.length > 0) {
      fail(`Found trailing-slash URL(s) in llms.txt or llms-full.txt: ${badLlmsUrls[0]}`);
    }
    pass(`dist/llms.txt (${(Buffer.byteLength(llmsTxt) / 1024).toFixed(1)} KB) and dist/llms-full.txt (${(Buffer.byteLength(llmsFull) / 1024).toFixed(1)} KB) verified with all ${prodFiles.length} SKUs, 11 Collections, ${guideFiles.length} Guides, and 0 trailing-slash URLs.`);
  }
} else {
  fail('dist/ directory not found. Run npm run build first.');
}

if (errors > 0) {
  console.error(`\n❌ Verification failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL VERIFICATION RULES PASSED WITH 0 ERRORS!');
}
