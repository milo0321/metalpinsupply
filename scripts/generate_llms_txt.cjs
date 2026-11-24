#!/usr/bin/env node
/**
 * Deterministic Generator for public/llms.txt and public/llms-full.txt
 * Follows the llmstxt.org GEO standard to expose MedalPinSupply.com's complete
 * 150 Metal Craft Specifications, 10 Category Hubs, 40 Engineering & Sourcing Guides,
 * Custom Tooling Waiver Policy (500+ 2D / 1,000+ 3D Waivers · 3-Yr Free Storage),
 * and CPSIA/EN71-3/REACH QC Standards to ChatGPT, Claude, Perplexity, and Gemini.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_DIR = path.join(ROOT, 'src/content/products');
const INSIGHTS_DIR = path.join(ROOT, 'src/content/insights');
const PUBLIC_DIR = path.join(ROOT, 'public');

function parseFrontmatterAndBody(mdContent) {
  const match = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: mdContent };
  const fmRaw = match[1];
  const body = match[2];
  const data = {};
  for (const line of fmRaw.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m) {
      const key = m[1];
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      } else if (val.startsWith('[') && val.endsWith(']')) {
        try {
          val = JSON.parse(val);
        } catch {
          // keep raw
        }
      }
      data[key] = val;
    }
  }
  return { data, body };
}

function htmlToCleanMarkdown(html) {
  return html
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<div class="sourcing-cta-box">[\s\S]*?<\/div>/gi, '')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n#### $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n##### $1\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/t[hd]>\s*<t[hd][^>]*>/gi, ' | ')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function main() {
  // 1. Load all 150 Products sorted by rowId
  const products = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, f), 'utf8')))
    .sort((a, b) => a.rowId - b.rowId);

  // 2. Load all 40 Insights
  const insights = fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, f), 'utf8');
      const { data, body } = parseFrontmatterAndBody(raw);
      return {
        slug: data.slug || f.replace(/\.md$/, ''),
        title: data.title || '',
        category: data.category || '',
        readTime: data.readTime || '10 min read',
        publishDate: data.publishDate || '',
        updatedDate: data.updatedDate || '',
        summary: data.summary || '',
        relatedSkus: Array.isArray(data.relatedSkus) ? data.relatedSkus : [],
        cleanBody: htmlToCleanMarkdown(body)
      };
    });

  // 3. Ten Collection definitions matching src/data/collections.ts
  const collections = [
    {
      num: 1,
      slug: 'custom-enamel-pins',
      name: 'Custom Enamel Pins & Die-Struck Lapel Badges',
      skuCount: 24,
      priceRange: '$0.14 – $2.35',
      moq: '50 – 200 pcs',
      summary: '24 specialized lapel pin configurations covering Cloisonne hard enamel, die-struck soft enamel, clear epoxy domes, photo-etched brass, 3D die-cast zinc/pewter, glitter, glow-in-the-dark, interactive spinners, crossed flag pins, and tinplate buttons ($0.14–$2.35/pc, 2D dies waived @ 500+ pcs).'
    },
    {
      num: 2,
      slug: 'custom-medals',
      name: 'Custom Race Medals & Sports Medallions',
      skuCount: 20,
      priceRange: '$0.24 – $3.85',
      moq: '100 – 200 pcs',
      summary: '20 heavyweight custom race and award medal styles in 3mm–5mm die-cast zinc alloy and die-struck brass from 2.0" tournament medallions to 4.5" 3D marathon medals with custom dye-sublimated satin neck ribbons (3D molds waived @ 1,000+ pcs).'
    },
    {
      num: 3,
      slug: 'custom-challenge-coins',
      name: 'Custom Challenge Coins & Commemorative Coins',
      skuCount: 16,
      priceRange: '$0.95 – $4.50',
      moq: '50 – 100 pcs',
      summary: '16 heirloom challenge and commemorative coin styles in heavy brass and zinc alloy (3mm–4mm thick) supporting double-sided 3D relief, dual two-tone gold/silver plating, 6 diamond-cut edge styles, and sequential laser edge numbering.'
    },
    {
      num: 4,
      slug: 'custom-metal-keychains',
      name: 'Custom Metal Keychains & Branded Keyrings',
      skuCount: 20,
      priceRange: '$0.16 – $2.25',
      moq: '100 – 500 pcs',
      summary: '20 commercial metal keychain styles spanning anodized carabiners, laser-engraved 304 stainless fobs, 3D zinc alloy landmark charms, spinning keyrings, genuine leather + metal emblem fobs, and stamped brass hotel key tags.'
    },
    {
      num: 5,
      slug: 'trolley-coin-keyrings',
      name: 'European Trolley Coins & Supermarket Token Keyrings',
      skuCount: 10,
      priceRange: '$0.30 – $1.75',
      moq: '200 pcs',
      summary: '10 European and international supermarket trolley token keyrings matching 23.25mm €1 Euro, 12-sided 23.43mm UK £1, 26.5mm CAD, and 25.0mm AUD lock tolerances with custom coin dies ($55 waived @ 500+ pcs).'
    },
    {
      num: 6,
      slug: 'police-badges-insignia',
      name: 'Police, Security, Fire & Military Insignia',
      skuCount: 14,
      priceRange: '$0.42 – $7.50',
      moq: '50 – 100 pcs',
      summary: '14 institutional uniform and award craft styles including embossed stainless dog tags, magnetic name plates, curved 3D brass police shield badges, firefighter Maltese crosses, leather belt clip holsters, and sports championship rings.'
    },
    {
      num: 7,
      slug: 'executive-cufflinks-tie-bars',
      name: 'Executive Cufflinks, Tie Bars & Heavy Belt Buckles',
      skuCount: 14,
      priceRange: '$0.68 – $6.80',
      moq: '50 pcs / pairs',
      summary: '14 executive menswear and heavy metal buckle styles covering cloisonne cufflinks, solid brass alligator/slide tie bars, boxed cufflink gift sets, tension money clips, and 3D western rodeo & biker belt buckles.'
    },
    {
      num: 8,
      slug: 'custom-golf-accessories',
      name: 'Custom Golf Divot Tools & Magnetic Ball Markers',
      skuCount: 10,
      priceRange: '$0.48 – $4.85',
      moq: '100 pcs / sets',
      summary: '10 specialized golf accessory styles including magnetic zinc divot tools, folding switchblade repair forks, hat-clip magnetic ball markers, 40mm poker-chip markers, and windowed tin tournament gift sets.'
    },
    {
      num: 9,
      slug: 'metal-bookmarks-openers-souvenirs',
      name: 'Custom Metal Bookmarks, Openers & Souvenirs',
      skuCount: 10,
      priceRange: '$0.32 – $2.45',
      moq: '100 – 200 pcs',
      summary: '10 retail and hospitality metalware styles covering 0.4mm photo-etched brass bookmarks, 4mm brewery bottle openers, stainless speed paddles, souvenir spoons, custom zipper pulls, and foldable purse hooks.'
    },
    {
      num: 10,
      slug: 'patches-pvc-packaging',
      name: 'Custom Patches, Soft PVC & Presentation Packaging',
      skuCount: 10,
      priceRange: '$0.11 – $4.50',
      moq: '50 – 200 pcs',
      summary: '10 uniform patch, non-phthalate soft PVC, and retail presentation packaging options—spanning embroidered/woven/bullion crests, 3D PVC patches, 400gsm backing cards ($0.11+), acrylic coin capsules ($0.16+), and velvet gift boxes.'
    },
    {
      num: 11,
      slug: 'custom-metal-fridge-magnets',
      name: 'Custom Metal Fridge Magnets',
      skuCount: 10,
      priceRange: '$0.48 – $3.10',
      moq: '100 – 200 pcs',
      summary: '10 custom magnetic craft architectures backed with recessed N35–N52 neodymium, sintered ferrite, or anti-scratch rubber pads—spanning Cloisonne hard enamel, soft enamel, CMYK offset epoxy domes, 360-degree kinetic spinners & sliders, translucent stained-glass cut-outs, multi-layer 3D panoramas, antique bronze museum crests, glow/glitter fills, and magnetic bottle openers.'
    }
  ];

  // ============================================================================
  // BUILD public/llms.txt (Structured Index + 158 Custom Craft Directory)
  // ============================================================================
  const llmsLines = [
    '# MedalPinSupply.com — Factory-Direct Custom Enamel Pins, Race Medals, Challenge Coins & Metalware Manufacturing Hub',
    '> Positioning: 100% custom-to-order metal craft manufacturer in Zhongshan Xiaolan (no pre-made off-the-shelf inventory), supplying 158 custom pin, medal, challenge coin, keychain, trolley token, fridge magnet & packaging specifications',
    '> Full Self-Contained Knowledge Corpus for LLMs & AI Agents: https://medalpinsupply.com/llms-full.txt',
    '> Manufacturing Base: Zhongshan Xiaolan Industrial Zone, Guangdong, China',
    '> Direct WhatsApp Chat: +86 187 5012 6315 (https://wa.me/8618750126315) — Instant response (Mon - Sat: 8:00 AM - 10:00 PM GMT+8)',
    '> Sourcing Desk Email: sales@medalpinsupply.com',
    '> Supported Languages (18 Locales): en, de, fr, nl, es, it, pt, sv, da, no, fi, pl, cs, ru, ja, ko, id, ar',
    '',
    '## 1. Core Factory Capabilities, Tooling Waiver Policy & QC Standards',
    '- **Transparent Mold & Stamping Die Policy**:',
    '  1. **2D Custom Stamping & Plate Dies ($35 – $85 USD)**: Waived **100%** at **500+ pcs** per design for lapel pins, €1/£1 trolley coins, cufflinks, and badges (or 300+ pcs on patches).',
    '  2. **3D Sculpted Zinc Die-Cast Molds ($95 – $150 USD)**: Waived **100%** at **1,000+ pcs** per design for marathon medals, challenge coins, police shields, and belt buckles.',
    '  3. **3-Year Free Die Vault & $0 Reorder Tooling**: Paid custom steel dies are cataloged and stored free of charge for **3 years** in Zhongshan, making subsequent reorders `$0.00` in setup fees.',
    '- **9 In-House Craft Processes & 12 Electroplating Finishes**:',
    '  - Processes: Cloisonne Hard Enamel (diamond-stone flush polish), Die-Struck Soft Enamel (tactile recessed Pantone wells), Zamak #3 3D High-Pressure Die-Casting, Photo-Etched Brass (`0.8mm`), CMYK Offset Litho + Clear Epoxy Dome, Spin-Cast Pewter, Antique Die-Struck Relief, 3D Non-Phthalate PVC, and Woven/Embroidered/Bullion Patches.',
    '  - Electroplating Lines: Shiny Gold (24K flash/imitation), Shiny Nickel, Chrome, Rose Gold, Satin Gold, Black Nickel, Black Dyed Matte Metal, Matte Copper, plus Hand-Relieved Antique Bronze/Brass/Silver/Pewter and Dual Two-Tone Masked Plating.',
    '- **Pre-Press Proofs, Sampling & Bulk Turnaround**:',
    '  - **Free 1:1 Vector Artwork Proof**: Returned within **12 hours** in coated Pantone specs before production begins.',
    '  - **Custom Physical Pre-Production Samples**: **7–10 working days** (12–15 days for dual-plated/3D puzzle medals); archived craft finish comparison boxes dispatch in **48 hours** via DHL/FedEx.',
    '  - **Export QC & Global Compliance**: **US CPSIA (< 90 ppm Pb)**, **California Prop 65**, **EU EN71-3 Heavy-Metal Migration**, **EU REACH Annex XVII & EN 1811 Nickel-Release (< 0.5 µg/cm²/wk)**, and `> 4.5 kg` silver-soldered pin spur pull-force validation, paired with **4–7 day DDP Air Express** and Ocean container consolidation.',
    '',
    '## 2. Key Commercial, Craft & Compliance Hubs',
    '- Homepage: https://medalpinsupply.com',
    '- All 158 Custom Metal Craft Styles Directory: https://medalpinsupply.com/products',
    '- Custom Wholesale EXW Price Matrix ($0.11–$4.20 at 2,000+): https://medalpinsupply.com/wholesale-catalog',
    '- Craft Finish Comparison Kit & Custom Prototype Program: https://medalpinsupply.com/sample-kit',
    '- Corporate Award Pins, Milestone Coins & Cufflink Sets ($0.24+): https://medalpinsupply.com/corporate-gifts',
    '- Enamel Processes, 3D Die-Casting & Plating SOP: https://medalpinsupply.com/custom-branding',
    '- Custom 400gsm Pin Cards, Coin Capsules & Velvet Boxes: https://medalpinsupply.com/custom-packaging',
    '- US CPSIA, EU EN71-3, REACH & Nickel-Free Compliance: https://medalpinsupply.com/compliance-safety',
    '- Zhongshan Xiaolan Factory Tour & Stamping/Plating Lines: https://medalpinsupply.com/about',
    '- Request 12h Wholesale Quote & Free Vector Proof: https://medalpinsupply.com/contact',
    '',
    '## 3. Eleven Core Category Collection Hubs',
    ...collections.map(
      (c) =>
        `${c.num}. [${c.name} (${c.skuCount} Styles, ${c.priceRange}, MOQ: ${c.moq})](https://medalpinsupply.com/collections/${c.slug}): ${c.summary}`
    ),
    '',
    `## 4. Authoritative Engineering & Global Sourcing Guides (${insights.length} Guides)`,
    '- Insights Hub: https://medalpinsupply.com/insights',
    ...insights.map(
      (g, idx) =>
        `${idx + 1}. [${g.title}](https://medalpinsupply.com/insights/${g.slug}) (${g.category} · ${g.readTime}): ${g.summary}`
    ),
    '',
    `## 5. Complete ${products.length} Custom Metal Craft Specifications Index`,
    ...products.map(
      (p) =>
        `- **[${p.title}](https://medalpinsupply.com/products/${p.slug})** | Category: \`${p.primaryCollection}\` | Material: ${p.material} | Process: ${p.process} | Size: ${p.size} | Weight: ${p.weight} | Attachment: ${p.attachmentEn} | EXW USD Tiers: **$${p.tier100}** (100 pcs) / **$${p.tier500}** (500 pcs) / **$${p.tier2000}** (2,000+ pcs) | Tooling: ${p.toolingFee}`
    ),
    ''
  ];

  const llmsTxtContent = llmsLines.join('\n');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxtContent, 'utf8');

  // ============================================================================
  // BUILD public/llms-full.txt (Complete Self-Contained Corpus)
  // ============================================================================
  const fullLines = [
    '# MedalPinSupply.com — Complete LLM & AI Agent Knowledge Corpus (llms-full.txt)',
    '> Canonical Index: https://medalpinsupply.com/llms.txt',
    '> Full Knowledge Base URL: https://medalpinsupply.com/llms-full.txt',
    '> Positioning: 100% custom-to-order enamel pin, race medal, challenge coin, trolley token & metalware factory supply hub in Zhongshan Xiaolan, Guangdong, China',
    '> Manufacturing Base: Zhongshan Xiaolan Industrial Zone, Guangdong, China',
    '> WhatsApp Sourcing Desk: +86 187 5012 6315 (https://wa.me/8618750126315)',
    '> Email: sales@medalpinsupply.com',
    '',
    '================================================================================',
    '## SECTION 1: FOUNDRY ARCHITECTURE, MOLD WAIVER POLICY & COMPLIANCE STANDARDS',
    '================================================================================',
    '',
    '### 1.1 Transparent Custom Tooling & Mold Waiver Policy',
    'MedalPinSupply.com custom-manufactures **158 core metal craft specifications** strictly to each buyer’s logo artwork (no pre-made off-the-shelf models or stock inventory) in Zhongshan Xiaolan, combining rapid pre-press vector proofing (`12 hours`), flexible low MOQs (`50–200 pcs`), and clear tooling fee waiver structures:',
    '- **Custom Tooling Fees & Bulk Threshold Waivers**: Custom 2D stamping dies (`$45 – $85 USD`) and plate setups (`$35`) are automatically **waived 100% at 500+ pcs** on lapel pins, trolley coins, cufflinks, dog tags, and keychains (`300+ pcs` on embroidered patches).',
    '- **3D Sculpted Zinc Die-Casting Molds (`$95 – $150 USD`)**: Automatically **waived 100%** at **1,000+ pcs** for 3D marathon medals, military challenge coins, police shields, and trophy belt buckles.',
    '- **3-Year Free Reorder Die Storage (`$0 Reorder Tooling`)**: All paid custom client dies are archived cleanly in our Zhongshan vault for **3 years**, so annual race or corporate reorders cost `$0.00` in setup fees.',
    '- **Split-Plating On One Shared Die**: Race directors and HR directors can run Gold, Silver, and Bronze platings (1st/2nd/3rd place awards or 1/5/10-year service milestones) across a single cut die while counting combined quantity toward the waiver threshold.',
    '',
    '### 1.2 In-House Stamping, Enamel, Electroplating & Export Compliance Stack',
    '- **Forming & Casting Lines**: CNC steel die engraving, **300T–800T hydraulic stamping presses** for copper/brass/iron coins & cloisonne badges, and hot-chamber **Zamak #3 zinc alloy die-casting** machines for multi-level 3D medals & cut-outs.',
    '- **Enamel & Specialty Color Systems**: Kiln-fired synthetic cloisonne hard enamel (stone-polished completely flat), Pantone-calibrated soft enamel ink dispensing, crystal clear protective epoxy lenses, glitter, strontium aluminate glow-in-the-dark fills, translucent stained-glass, CMYK litho offset, and photo-etched `0.8mm` brass.',
    '- **12 Rack Electroplating Finishes**: Shiny Gold, Shiny Nickel, Chrome, Rose Gold, Satin Gold, Black Nickel, Matte Black Dye, Matte Copper, plus Hand-Relieved Antique Bronze/Brass/Silver/Pewter and two-tone masked dual plating.',
    '- **Certified Global Safety Compliance**:',
    '  1. **US CPSIA & California Proposition 65**: Virgin low-lead Zamak #3, C26800 brass, copper, iron & SUS304 substrates holding total lead strictly `< 90 ppm`.',
    '  2. **EU EN71-3 & 6P/7P Non-Phthalate**: Enamels, PVC morale patches, and rubber pin clutches formulated free of regulated phthalates and toxic heavy-metal migration.',
    '  3. **EU REACH Annex XVII & EN 1811**: Nickel-free copper underplated gold/rose/palladium baths testing below `< 0.5 µg/cm²/wk` nickel release.',
    '  4. **Hardware Pull-Force & Pre-Shipment QC**: Silver-brazed pin spurs pull-tested to `> 4.5 kg`, breakaway marathon safety clasps on youth ribbons, and 100% cosmetic enamel/bezel inspection before carton sealing.',
    '',
    '================================================================================',
    '## SECTION 2: ELEVEN CORE CATEGORY COLLECTION HUBS',
    '================================================================================',
    ''
  ];

  for (const c of collections) {
    fullLines.push(`### Collection #${c.num}: ${c.name}`);
    fullLines.push(`- **Canonical URL**: https://medalpinsupply.com/collections/${c.slug}`);
    fullLines.push(`- **Custom Craft Options**: ${c.skuCount} Styles`);
    fullLines.push(`- **Wholesale EXW Price Band (USD)**: ${c.priceRange}`);
    fullLines.push(`- **Minimum Order Quantity (MOQ)**: ${c.moq}`);
    fullLines.push(`- **Engineering & Sourcing Summary**: ${c.summary}`);
    fullLines.push('');
  }

  fullLines.push('================================================================================');
  fullLines.push(`## SECTION 3: COMPLETE ${products.length} CUSTOM METAL CRAFT SPECIFICATIONS`);
  fullLines.push('================================================================================');
  fullLines.push('');

  for (const p of products) {
    fullLines.push(`### ${p.title}`);
    fullLines.push(`- **Canonical URL**: https://medalpinsupply.com/products/${p.slug}`);
    fullLines.push(`- **Primary Category**: ${p.primaryCollectionName} (\`${p.primaryCollection}\`)`);
    if (p.crossCollections && p.crossCollections.length > 0) {
      fullLines.push(`- **Related Collections**: ${p.crossCollections.join(', ')}`);
    }
    fullLines.push(`- **Material & Process**: ${p.material} (${p.process})`);
    fullLines.push(`- **Dimensions**: ${p.size} | **Net Weight**: ${p.weight}`);
    fullLines.push(`- **Standard Attachment & Hardware**: ${p.attachmentEn}`);
    fullLines.push(`- **Available Plating Finishes**: ${p.platingEn}`);
    fullLines.push(
      `- **Factory-Direct USD EXW Pricing**: 100 pcs: **$${p.tier100}/pc** | 500 pcs: **$${p.tier500}/pc** | 2,000+ pcs: **$${p.tier2000}/pc**`
    );
    fullLines.push(`- **Tooling Policy**: ${p.toolingFee} | **MOQ**: ${p.moq} | **Lead Time**: ${p.leadTime}`);
    fullLines.push(`- **Engineering Overview**: ${p.overview}`);
    if (Array.isArray(p.variants) && p.variants.length > 1) {
      fullLines.push(`- **Available Size / Material / Craft Configurations**:`);
      for (const v of p.variants) {
        fullLines.push(
          `  - ${v.materialEn} (${v.size}, ${v.weight}) — 100 pcs: $${v.tier100} | 500 pcs: $${v.tier500} | 2,000+ pcs: $${v.tier2000} (${v.finishesEn})`
        );
      }
    }
    fullLines.push('');
  }

  fullLines.push('================================================================================');
  fullLines.push(`## SECTION 4: ${insights.length} AUTHORITATIVE ENGINEERING & SOURCING GUIDES`);
  fullLines.push('================================================================================');
  fullLines.push('');

  insights.forEach((g, idx) => {
    fullLines.push(`### Guide #${idx + 1}: ${g.title}`);
    fullLines.push(`- **Canonical URL**: https://medalpinsupply.com/insights/${g.slug}`);
    fullLines.push(`- **Category**: ${g.category} | **Reading Time**: ${g.readTime} | **Updated**: ${g.updatedDate || g.publishDate}`);
    if (Array.isArray(g.tags) && g.tags.length > 0) {
      fullLines.push(`- **Key Topics**: ${g.tags.join(', ')}`);
    }
    fullLines.push(`- **Executive Summary**: ${g.summary}`);
    fullLines.push('');
    fullLines.push(g.cleanBody);
    fullLines.push('');
    fullLines.push('--------------------------------------------------------------------------------');
    fullLines.push('');
  });

  const llmsFullContent = fullLines.join('\n');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullContent, 'utf8');

  console.log(`✅ Generated public/llms.txt (${llmsLines.length} lines, ${(Buffer.byteLength(llmsTxtContent) / 1024).toFixed(1)} KB)`);
  console.log(`✅ Generated public/llms-full.txt (${fullLines.length} lines, ${(Buffer.byteLength(llmsFullContent) / 1024).toFixed(1)} KB)`);
}

main();
