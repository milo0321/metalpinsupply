#!/usr/bin/env node
/**
 * Daily GSC + GA4 Live Telemetry & Diagnostics CLI (Zero-Dependency Native Node.js)
 * Pulls live metrics from Google Search Console (sc-domain:medalpinsupply.com)
 * and auto-discovers any accessible GA4 Property for MedalPinSupply (G-LENV7MK04N).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CREDENTIALS_CANDIDATES = [
  process.env.GSC_CREDENTIALS_PATH,
  path.join(ROOT, 'scratch/gsc_credentials.json'),
  '/Users/player/code/fidgetsupply/scratch/gsc_credentials.json'
].filter(Boolean);

const GSC_SITE = 'sc-domain:medalpinsupply.com';
const EXPECTED_GA4_MEASUREMENT_ID = 'G-LENV7MK04N';
const EXPECTED_GTM_ID = 'GTM-NX7XN5MK';

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
  const jwt = `${unsigned}.${base64UrlEncode(signer.sign(creds.private_key))}`;

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

async function ga4Report(token, propertyId, body) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

async function main() {
  const credPath = resolveCredentialsPath();
  if (!credPath) {
    console.error('Credentials file not found in:', CREDENTIALS_CANDIDATES.join(', '));
    process.exit(1);
  }
  const creds = JSON.parse(fs.readFileSync(credPath, 'utf8'));
  const token = await getAccessToken(creds, [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly'
  ]);
  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  console.log('==============================================================');
  console.log('📊 MEDALPINSUPPLY.COM — LIVE GSC & GA4 TELEMETRY REPORT');
  console.log(`   Service Account: ${creds.client_email}`);
  console.log('==============================================================\n');

  // 1. GSC Sitemaps
  const smRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const smData = await smRes.json();
  console.log('--- 1. GSC Sitemaps Status ---');
  if (!smData.sitemap || smData.sitemap.length === 0) {
    console.log('No sitemaps reported yet.');
  } else {
    for (const s of smData.sitemap) {
      const submitted = (s.contents || []).reduce((acc, c) => acc + Number(c.submitted || 0), 0);
      const indexed = (s.contents || []).reduce((acc, c) => acc + Number(c.indexed || 0), 0);
      console.log(`• ${s.path} | Last Downloaded: ${s.lastDownloaded} | Warnings: ${s.warnings} | Errors: ${s.errors} | Submitted: ${submitted} | Indexed: ${indexed}`);
    }
  }

  // 2. GSC Search Analytics (Last 7 Days & 1 Day, dataState: all)
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const queryGsc = async (dimensions, rowLimit = 25) => {
    const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ startDate, endDate, dimensions, rowLimit, dataState: 'all' })
    });
    return r.json();
  };

  const [byDate, byQuery, byPage, byCountry, byDevice] = await Promise.all([
    queryGsc(['date'], 14),
    queryGsc(['query'], 30),
    queryGsc(['page'], 30),
    queryGsc(['country'], 15),
    queryGsc(['device'], 5)
  ]);

  console.log('\n--- 2. GSC Search Analytics (Last 7d, dataState: all) ---');
  if (!byDate.rows || byDate.rows.length === 0) {
    console.log('• 0 rows returned yet (fresh domain initial crawl/impressions window).');
  } else {
    for (const r of byDate.rows) {
      console.log(`• ${r.keys[0]}: Clicks=${r.clicks}, Impressions=${r.impressions}, CTR=${(r.ctr * 100).toFixed(2)}%, Pos=${r.position.toFixed(1)}`);
    }
    console.log('\n• Top Queries:');
    for (const r of (byQuery.rows || []).slice(0, 15)) {
      console.log(`  - "${r.keys[0]}": Clicks=${r.clicks}, Imp=${r.impressions}, CTR=${(r.ctr * 100).toFixed(2)}%, Pos=${r.position.toFixed(1)}`);
    }
    console.log('\n• Top Pages:');
    for (const r of (byPage.rows || []).slice(0, 15)) {
      console.log(`  - ${r.keys[0]}: Clicks=${r.clicks}, Imp=${r.impressions}, CTR=${(r.ctr * 100).toFixed(2)}%, Pos=${r.position.toFixed(1)}`);
    }
    console.log('\n• Top Countries:', (byCountry.rows || []).slice(0, 8).map((r) => `${r.keys[0]}(${r.clicks}/${r.impressions})`).join(', '));
    console.log('• Devices:', (byDevice.rows || []).map((r) => `${r.keys[0]}(${r.clicks}/${r.impressions})`).join(', '));
  }

  // 3. GSC URL Inspection Spot-Check on 12 Flagship URLs
  const inspectUrls = [
    'https://medalpinsupply.com/',
    'https://medalpinsupply.com/products',
    'https://medalpinsupply.com/insights',
    'https://medalpinsupply.com/collections/custom-enamel-pins',
    'https://medalpinsupply.com/collections/custom-medals',
    'https://medalpinsupply.com/collections/custom-challenge-coins',
    'https://medalpinsupply.com/collections/custom-metal-fridge-magnets',
    'https://medalpinsupply.com/contact',
    'https://medalpinsupply.com/products/custom-hard-enamel-lapel-pins',
    'https://medalpinsupply.com/products/custom-soft-enamel-lapel-pins',
    'https://medalpinsupply.com/products/custom-3d-marathon-finisher-medals',
    'https://medalpinsupply.com/products/custom-baseball-trading-pins',
    'https://medalpinsupply.com/products/military-3d-brass-challenge-coins',
    'https://medalpinsupply.com/insights/hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide'
  ];
  console.log('\n--- 3. GSC URL Inspection Spot-Check (12 Flagship URLs) ---');
  for (const inspectionUrl of inspectUrls) {
    const ir = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ inspectionUrl, siteUrl: GSC_SITE, languageCode: 'en-US' })
    });
    const idata = await ir.json();
    const idx = idata.inspectionResult?.indexStatusResult || {};
    console.log(`• ${inspectionUrl.replace('https://medalpinsupply.com', '') || '/'} | ${idx.verdict || 'ERR'} | ${idx.coverageState || JSON.stringify(idata.error?.message || 'unknown')} | crawl=${idx.lastCrawlTime || 'never'}`);
  }

  // 4. GA4 Property Auto-Discovery & Live Telemetry
  console.log('\n--- 4. GA4 Property & Event Funnel Telemetry ---');
  let targetPropId = process.env.GA4_PROPERTY_ID || '';
  const accRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const accData = await accRes.json();
  const accessibleProps = [];
  for (const acc of accData.accountSummaries || []) {
    for (const p of acc.propertySummaries || []) {
      accessibleProps.push({
        id: (p.property || '').replace('properties/', ''),
        name: p.displayName || '',
        account: acc.displayName || ''
      });
    }
  }
  if (!targetPropId) {
    const match = accessibleProps.find((p) => /medalpin/i.test(p.name) || /medalpin/i.test(p.account));
    if (match) targetPropId = match.id;
  }

  if (!targetPropId) {
    console.log(`⚠️ GA4 Data API property for MedalPinSupply (${EXPECTED_GA4_MEASUREMENT_ID} via ${EXPECTED_GTM_ID}) is NOT YET authorized for ${creds.client_email}.`);
    console.log(`   Currently accessible properties (${accessibleProps.length}): ${accessibleProps.map((p) => `${p.name}(${p.id})`).join(', ')}`);
    console.log(`   Action needed: In Google Analytics -> Admin -> Property Access Management for ${EXPECTED_GA4_MEASUREMENT_ID}, add ${creds.client_email} as Viewer.`);
    return;
  }

  console.log(`✅ Connected GA4 Property: properties/${targetPropId}`);
  const [byDay, byEvent, byGeoDevice] = await Promise.all([
    ga4Report(token, targetPropId, {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'newUsers' },
        { name: 'sessions' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' },
        { name: 'screenPageViews' },
        { name: 'eventCount' },
        { name: 'keyEvents' }
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }]
    }),
    ga4Report(token, targetPropId, {
      dateRanges: [{ startDate: '1daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }, { name: 'keyEvents' }]
    }),
    ga4Report(token, targetPropId, {
      dateRanges: [{ startDate: '1daysAgo', endDate: 'today' }],
      dimensions: [
        { name: 'country' },
        { name: 'city' },
        { name: 'operatingSystem' },
        { name: 'browser' },
        { name: 'language' }
      ],
      metrics: [{ name: 'sessions' }, { name: 'averageSessionDuration' }, { name: 'keyEvents' }],
      limit: 25
    })
  ]);

  for (const r of byDay.rows || []) {
    const d = r.dimensionValues[0].value;
    const m = r.metricValues.map((x) => x.value);
    console.log(`• ${d}: Users=${m[0]} (New=${m[1]}), Sessions=${m[2]} (Engaged=${m[3]}, Rate=${(Number(m[4]) * 100).toFixed(1)}%), AvgDur=${Number(m[5]).toFixed(1)}s, Views=${m[6]}, Events=${m[7]}, KeyEvents=${m[8]}`);
  }
  console.log('\n• 1-Day Event Funnel:');
  for (const r of byEvent.rows || []) {
    console.log(`  - ${r.dimensionValues[0].value}: ${r.metricValues[0].value} events (${r.metricValues[1].value} users, ${r.metricValues[2].value} keyEvents)`);
  }
  console.log('\n• 1-Day Country / City / OS / Browser / Language (Owner Self-Test Filter Check):');
  for (const r of byGeoDevice.rows || []) {
    const dims = r.dimensionValues.map((d) => d.value).join(' | ');
    const mets = r.metricValues.map((m) => m.value);
    console.log(`  - ${dims} => Sessions=${mets[0]}, AvgDur=${Number(mets[1]).toFixed(1)}s, KeyEvents=${mets[2]}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
