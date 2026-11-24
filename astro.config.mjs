import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const SITE = 'https://medalpinsupply.com';
const LOCALES = [
  'en', 'de', 'fr', 'nl', 'es', 'it', 'pt', 'sv', 'da',
  'no', 'fi', 'pl', 'cs', 'ru', 'ja', 'ko', 'id', 'ar'
];
const NON_DEFAULT_LOCALES = new Set(LOCALES.filter((l) => l !== 'en'));

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function loadInsightLastmodMap() {
  const map = new Map();
  const insightsDir = fileURLToPath(new URL('./src/content/insights', import.meta.url));
  if (!fs.existsSync(insightsDir)) return map;
  for (const file of fs.readdirSync(insightsDir)) {
    if (!file.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(insightsDir, file), 'utf8');
    const slug = (raw.match(/slug:\s*["']([^"']+)["']/) || [])[1] || file.replace(/\.md$/, '');
    const upd = (raw.match(/updatedDate:\s*["']([^"']+)["']/) || [])[1];
    const pub = (raw.match(/publishDate:\s*["']([^"']+)["']/) || [])[1];
    const d = upd || pub;
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
      map.set(slug, `${d}T08:00:00.000Z`);
    }
  }
  return map;
}

function walkHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(full, acc);
    } else if (entry.name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

function multilingualSitemapIntegration() {
  return {
    name: 'multilingual-sitemap',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        fs.rmSync(path.join(distDir, 'sitemap-0.xml'), { force: true });

        const insightLastmodMap = loadInsightLastmodMap();
        const perLocale = Object.fromEntries(LOCALES.map((l) => [l, []]));

        for (const file of walkHtmlFiles(distDir)) {
          let rel = '/' + path.relative(distDir, file).replace(/\\/g, '/');
          if (rel === '/404.html' || rel.startsWith('/api/')) continue;
          if (rel.endsWith('/index.html')) {
            rel = rel.slice(0, -'/index.html'.length) || '/';
          } else if (rel.endsWith('.html')) {
            rel = rel.slice(0, -'.html'.length);
          }
          if (rel.length > 1 && rel.endsWith('/')) {
            rel = rel.replace(/\/+$/, '');
          }

          const segs = rel.split('/').filter(Boolean);
          const lang = segs[0] && NON_DEFAULT_LOCALES.has(segs[0]) ? segs[0] : 'en';
          const basePath = lang === 'en' ? rel : (rel.slice(lang.length + 1) || '/');
          const loc = rel === '/' ? SITE : `${SITE}${rel}`;

          let priority = '0.85';
          let changefreq = 'weekly';
          let lastmod = '2026-11-24T05:00:00.000Z';

          if (basePath === '/') {
            priority = '1.0';
            changefreq = 'daily';
            lastmod = '2026-11-24T08:00:00.000Z';
          } else if (basePath.startsWith('/insights/')) {
            const slug = basePath.slice('/insights/'.length);
            priority = '0.85';
            changefreq = 'weekly';
            lastmod = insightLastmodMap.get(slug) || '2026-11-24T08:00:00.000Z';
          } else if (
            basePath.startsWith('/collections/') ||
            basePath === '/products' ||
            basePath === '/insights'
          ) {
            priority = '0.95';
            changefreq = 'weekly';
            lastmod = '2026-11-24T08:00:00.000Z';
          } else if (basePath.startsWith('/products/')) {
            priority = '0.9';
            changefreq = 'weekly';
            lastmod = '2026-11-24T06:00:00.000Z';
          }

          perLocale[lang].push({ loc, priority, changefreq, lastmod });
        }

        const indexEntries = [];
        let totalUrls = 0;

        for (const lang of LOCALES) {
          const items = perLocale[lang].sort((a, b) => a.loc.localeCompare(b.loc));
          totalUrls += items.length;
          const maxLastmod = items.reduce(
            (max, cur) => (cur.lastmod > max ? cur.lastmod : max),
            '2026-11-24T08:00:00.000Z'
          );

          const xml =
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            items
              .map(
                (it) =>
                  `  <url><loc>${escapeXml(it.loc)}</loc><lastmod>${it.lastmod}</lastmod><changefreq>${it.changefreq}</changefreq><priority>${it.priority}</priority></url>`
              )
              .join('\n') +
            '\n</urlset>\n';

          fs.writeFileSync(path.join(distDir, `sitemap-${lang}.xml`), xml, 'utf8');
          indexEntries.push(
            `  <sitemap><loc>${SITE}/sitemap-${lang}.xml</loc><lastmod>${maxLastmod}</lastmod></sitemap>`
          );
        }

        const indexXml =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          indexEntries.join('\n') +
          '\n</sitemapindex>\n';
        fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), indexXml, 'utf8');

        if (logger?.info) {
          logger.info(
            `Generated sitemap-index.xml + ${LOCALES.length} locale sitemaps (${totalUrls} URLs)`
          );
        }
      }
    }
  };
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'sv', 'da', 'no', 'fi', 'cs', 'es', 'it', 'nl', 'pl', 'pt', 'ru', 'ja', 'ko', 'id', 'ar'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  integrations: [react(), multilingualSitemapIntegration()]
});
