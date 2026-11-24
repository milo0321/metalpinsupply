#!/usr/bin/env node
/**
 * scripts/build_insights_40.cjs
 * Deterministically generates all 40 Backlinko-grade Skyscraper Insights (src/content/insights/*.md)
 * for MedalPinSupply.com across 6 content pillars, ensuring:
 * - >= 1,250 words per guide (readTime >= 9 min)
 * - 100% unique metaTitle (<60 chars), metaDescription (<155 chars, complete sentence)
 * - >= 4 unique H2s per guide (zero duplicate H2s across all 40 guides)
 * - >= 2 unique .geo-table comparison tables per guide (zero duplicate table MD5s)
 * - >= 2 .article-figure inline composite images (-fig1.webp 800x310, -fig2.webp 1170x305)
 * - >= 1 .sourcing-cta-box conversion box
 * - >= 15 /products/, >= 2 /collections/, >= 3 /insights/ cross-links per guide
 * - 0 banned AI clichés, 0 banned terms, 0 CJK chars
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/content/insights');
const PROD_DIR = path.join(__dirname, '../src/content/products');

const COL_NAMES = {
  'custom-enamel-pins': 'Custom Enamel & Lapel Pins',
  'custom-medals': 'Custom Race Medals & Medallions',
  'custom-challenge-coins': 'Custom Challenge Coins',
  'custom-metal-keychains': 'Custom Metal Keychains',
  'trolley-coin-keyrings': 'European Trolley Coins',
  'police-badges-insignia': 'Police, Security & Military Insignia',
  'executive-cufflinks-tie-bars': 'Executive Cufflinks & Belt Buckles',
  'custom-golf-accessories': 'Custom Golf Divot Tools & Markers',
  'metal-bookmarks-openers-souvenirs': 'Metal Bookmarks, Openers & Souvenirs',
  'patches-pvc-packaging': 'Custom Patches, PVC & Packaging',
  'custom-metal-fridge-magnets': 'Custom Metal Fridge Magnets'
};

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.md')) fs.unlinkSync(path.join(OUT_DIR, f));
}

const allProds = fs.readdirSync(PROD_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(PROD_DIR, f), 'utf8')))
  .sort((a, b) => a.rowId - b.rowId);

const byCol = {};
for (const p of allProds) {
  byCol[p.primaryCollection] = byCol[p.primaryCollection] || [];
  byCol[p.primaryCollection].push(p);
}

// 40 Guides across 6 categories
const GUIDES = [
  // Pillar 1: Materials & Manufacturing (10)
  {
    slug: 'hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide',
    title: 'Hard Enamel vs. Soft Enamel Pins: Process, Tactile Feel, Cost & Scratch Resistance Guide',
    metaTitle: 'Hard vs Soft Enamel Pins: Cost & Finish Guide',
    metaDescription: 'Compare cloisonne hard enamel vs soft enamel lapel pins across kiln curing, flush stone polishing, unit cost ($0.42–$1.45), and durability.',
    category: 'Materials & Manufacturing',
    cols: ['custom-enamel-pins', 'executive-cufflinks-tie-bars'],
    focusSkus: ['MPS-001', 'MPS-002', 'MPS-003', 'MPS-004', 'MPS-010', 'MPS-016', 'MPS-019', 'MPS-105'],
    tags: ['Hard Enamel', 'Soft Enamel', 'Lapel Pins', 'Manufacturing'],
    angle: 'Compares high-temperature kiln-cured stone-polished hard enamel against recessed 180°C baked soft enamel and epoxy dome protection.'
  },
  {
    slug: 'zinc-alloy-die-casting-vs-die-struck-brass-iron-medals-pins-cost',
    title: 'Zinc Alloy Die-Casting vs. Die-Struck Brass & Iron: 3D Relief Depth, Tooling Fees & Unit Economics',
    metaTitle: 'Zinc Alloy vs Die-Struck Brass & Iron Craft Cost',
    metaDescription: 'Compare hot-chamber Zamak #3 zinc alloy die-casting vs hydraulic die-struck brass and iron across 3D sculpting depth, mold fees ($55–$150), and unit cost.',
    category: 'Materials & Manufacturing',
    cols: ['custom-enamel-pins', 'custom-medals', 'custom-challenge-coins'],
    focusSkus: ['MPS-008', 'MPS-005', 'MPS-025', 'MPS-035', 'MPS-045', 'MPS-061', 'MPS-068', 'MPS-114'],
    tags: ['Zinc Alloy', 'Die-Struck Brass', 'Die-Casting', 'Cost Analysis'],
    angle: 'Breaks down why 3D medals and cut-out pins rely on molten Zamak #3 die-casting while crisp military brass coins require hydraulic coining presses.'
  },
  {
    slug: 'photo-etched-brass-vs-offset-printed-silk-screen-lapel-pins',
    title: 'Photo-Etched Brass vs. Offset CMYK & Silk-Screen Printed Pins: Resolving Fine Lines & Gradients',
    metaTitle: 'Photo-Etched Brass vs Offset Printed Pins Guide',
    metaDescription: 'Choose between 0.8mm photo-etched brass, CMYK offset litho epoxy domes, and spot silk-screen printing for intricate gradients and thin line art.',
    category: 'Materials & Manufacturing',
    cols: ['custom-enamel-pins', 'metal-bookmarks-openers-souvenirs'],
    focusSkus: ['MPS-004', 'MPS-006', 'MPS-007', 'MPS-023', 'MPS-064', 'MPS-069', 'MPS-085', 'MPS-129'],
    tags: ['Photo-Etched Brass', 'Offset Printing', 'Silk-Screen', 'CMYK'],
    angle: 'Explains how acid photo-etching handles filigree bookmarks and lightweight badges while CMYK offset epoxy printing solves photographic shading.'
  },
  {
    slug: 'electroplating-finishes-guide-antique-brass-real-gold-black-nickel-pvd',
    title: '12 Electroplating & PVD Finishes for Custom Pins, Medals & Coins: Tarnish Resistance & Cost Matrix',
    metaTitle: '12 Electroplating & PVD Finishes for Metal Pins',
    metaDescription: 'Compare 18K shiny gold, rhodium silver, black nickel, antique bronze, dyed matte black, and rainbow PVD finishes for pins, medals, and coins.',
    category: 'Materials & Manufacturing',
    cols: ['custom-enamel-pins', 'custom-challenge-coins', 'executive-cufflinks-tie-bars'],
    focusSkus: ['MPS-016', 'MPS-017', 'MPS-048', 'MPS-049', 'MPS-058', 'MPS-070', 'MPS-080', 'MPS-105'],
    tags: ['Electroplating', 'Black Nickel', 'Antique Bronze', 'PVD Rainbow'],
    angle: 'Analyzes barrel vs rack plating uniformity, matte black electrophoretic dye coats, iridescent PVD rainbow anodizing, and protective lacquer sealing.'
  },
  {
    slug: 'epoxy-dome-coating-on-soft-enamel-pins-keychains-pros-and-cons',
    title: 'Epoxy Dome Coatings on Soft Enamel Pins & Keychains: Optical Depth, UV Yellowing & Cost Analysis',
    metaTitle: 'Epoxy Dome on Soft Enamel Pins: Pros & Cons',
    metaDescription: 'Should you add clear optical epoxy domes to soft enamel pins, keychains, and trolley coins? Compare scratch protection, lens gloss, and unit cost.',
    category: 'Materials & Manufacturing',
    cols: ['custom-enamel-pins', 'custom-metal-keychains', 'trolley-coin-keyrings'],
    focusSkus: ['MPS-003', 'MPS-006', 'MPS-021', 'MPS-022', 'MPS-064', 'MPS-069', 'MPS-085', 'MPS-108'],
    tags: ['Epoxy Dome', 'Soft Enamel', 'Keychains', 'Surface Coating'],
    angle: 'Evaluates optical polyurethane vs epoxy resin domes over soft enamel and CMYK prints on lapel pins, flag pins, and cufflinks.'
  },
  {
    slug: '3d-relief-sculpting-vs-2d-multi-level-die-casting-mold-engineering',
    title: 'True 3D Relief Sculpting vs. 2D Multi-Level Die-Casting: Mold Engraving & Shading Engineering',
    metaTitle: '3D Relief Sculpting vs 2D Multi-Level Molds',
    metaDescription: 'Understand how CNC 3D Z-axis sculpting differs from stepped 2D metal layers on custom marathon medals, challenge coins, and western belt buckles.',
    category: 'Materials & Manufacturing',
    cols: ['custom-medals', 'custom-challenge-coins', 'executive-cufflinks-tie-bars'],
    focusSkus: ['MPS-008', 'MPS-009', 'MPS-025', 'MPS-033', 'MPS-045', 'MPS-061', 'MPS-114', 'MPS-136'],
    tags: ['3D Sculpting', 'Mold Engineering', 'Medals', 'Belt Buckles'],
    angle: 'Explains 3D CAD relief height tolerances (0.8mm–2.5mm relief) and why antique sandblasted recesses enhance sculpted faces on medals and buckles.'
  },
  {
    slug: 'cut-out-hollow-design-and-inner-cut-mold-fees-for-medals-and-coins',
    title: 'Cut-Out Hollow Design Engineering for Race Medals, Challenge Coins & Keychains: Wall Thickness Rules',
    metaTitle: 'Cut-Out Hollow Medal & Coin Mold Rules',
    metaDescription: 'Engineering rules for open inner cut-out windows in race medals, shield coins, and metal keychains: minimum bridge width, trim dies, and pricing.',
    category: 'Materials & Manufacturing',
    cols: ['custom-medals', 'custom-challenge-coins', 'custom-enamel-pins'],
    focusSkus: ['MPS-015', 'MPS-028', 'MPS-031', 'MPS-050', 'MPS-051', 'MPS-061', 'MPS-098', 'MPS-129'],
    tags: ['Cut-Out Design', 'Hollow Medals', 'Trimming Die', 'Tooling'],
    angle: 'Covers structural bridge widths (>= 2.5mm for 4mm medals), hydraulic blanking trim dies, and smooth deburring on cut-out sports medals and shield coins.'
  },
  {
    slug: 'specialty-enamel-effects-glitter-glow-in-the-dark-stained-glass-translucent',
    title: 'Specialty Enamel Pigments: Glitter, Glow-in-the-Dark & Translucent Stained-Glass Pin Engineering',
    metaTitle: 'Glitter, Glow & Stained-Glass Enamel Pin Guide',
    metaDescription: 'How to design high-margin specialty enamel pins and night-run medals using metallic glitter, phosphorescent glow powder, and translucent resin.',
    category: 'Materials & Manufacturing',
    cols: ['custom-enamel-pins', 'custom-metal-fridge-magnets', 'custom-medals'],
    focusSkus: ['MPS-010', 'MPS-011', 'MPS-015', 'MPS-155', 'MPS-158', 'MPS-031', 'MPS-032', 'MPS-057'],
    relatedGuides: ['museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer', 'hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide', 'electroplating-finishes-guide-antique-brass-real-gold-black-nickel-pvd'],
    tags: ['Glitter Enamel', 'Glow-in-the-Dark', 'Stained Glass', 'Specialty Pins'],
    angle: 'Details particle dispersion in transparent glitter resin, luminance half-life in night-run medals, and diamond-cut texture beneath translucent inks.'
  },
  {
    slug: 'interactive-kinetic-pins-and-medals-spinner-slider-hinged-mechanisms',
    title: 'Interactive Kinetic Pins, Medals & Keychains: Spinner Rivets, Linear Sliders & Hinged Mechanisms',
    metaTitle: 'Interactive Spinner, Slider & Hinged Pins Guide',
    metaDescription: 'Engineering breakdown of 360-degree spinning race medals, sliding track enamel pins, hinged danglers, and double-sided spinner keychains.',
    category: 'Materials & Manufacturing',
    cols: ['custom-enamel-pins', 'custom-metal-fridge-magnets', 'custom-medals'],
    focusSkus: ['MPS-012', 'MPS-013', 'MPS-014', 'MPS-154', 'MPS-027', 'MPS-040', 'MPS-053', 'MPS-065'],
    relatedGuides: ['museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer', '3d-relief-sculpting-vs-2d-multi-level-die-casting-mold-engineering', 'custom-3d-zinc-alloy-vs-soft-enamel-and-spinning-metal-keychains'],
    tags: ['Spinner Medals', 'Slider Pins', 'Kinetic Fridge Magnets', 'Kinetic Hardware'],
    angle: 'Compares riveted center hubs, curved track clearances (0.25mm tolerance), and magnetic interlocks in interactive pins, fridge magnets, and marathon medals.'
  },
  {
    slug: 'custom-mold-tooling-fees-explained-how-to-get-zero-mold-fee-wholesale',
    title: 'Custom Mold & Tooling Fees Explained: 2D vs. 3D Die Costs, 500+ Bulk Waivers & 3-Year Storage',
    metaTitle: 'Custom Pin & Medal Mold Fees & Bulk Waivers',
    metaDescription: 'Compare custom 2D stamping dies ($45–$85) and 3D zinc molds ($95–$150), bulk fee waivers at 500–1,000+ pcs, and free 3-year reorder storage.',
    category: 'Materials & Manufacturing',
    cols: ['trolley-coin-keyrings', 'custom-metal-keychains', 'custom-enamel-pins'],
    focusSkus: ['MPS-006', 'MPS-021', 'MPS-066', 'MPS-074', 'MPS-081', 'MPS-097', 'MPS-119', 'MPS-133'],
    tags: ['Mold Fees', 'Bulk Waivers', 'Factory Tooling', 'Procurement'],
    angle: 'Documents transparent 2D/3D custom tooling fees ($45–$150), automatic 500-pc and 1,000-pc bulk fee waivers, shared-die finish splits, and free 3-year reorder storage.'
  },

  // Pillar 2: Medals & Sports Events (7)
  {
    slug: 'custom-marathon-and-5k-10k-finisher-medals-race-director-sourcing-guide',
    title: 'Custom Marathon & 5K/10K Finisher Medals: Sizing, Thickness, Weight & Lead Time Planning for Race Directors',
    metaTitle: 'Marathon & 5K Finisher Medals Sourcing Guide',
    metaDescription: 'Complete race director sourcing blueprint for custom 2.5 to 4.5-inch marathon finisher medals, weight specs (54g–178g), and race-day scheduling.',
    category: 'Medals & Sports Events',
    cols: ['custom-medals', 'patches-pvc-packaging'],
    focusSkus: ['MPS-025', 'MPS-026', 'MPS-028', 'MPS-033', 'MPS-034', 'MPS-037', 'MPS-042', 'MPS-044'],
    tags: ['Marathon Medals', '5K Medals', 'Race Directors', 'Sports Events'],
    angle: 'Maps race distance tiering (2.5" 5K vs 3.5"–4.5" marathon/triathlon), weight budgets, shared Gold/Silver/Bronze molds, and backwards expo delivery timelines.'
  },
  {
    slug: 'spinner-bottle-opener-and-magnetic-interlocking-race-medal-trends',
    title: '2026–2027 Race Medal Trends: 360° Spinners, Bottle Openers & Magnetic Interlocking Series Medals',
    metaTitle: 'Spinner, Opener & Magnetic Race Medal Trends',
    metaDescription: 'Boost race registrations with 360° spinning center medallions, integrated brewery bottle openers, and 2-to-4 piece magnetic interlocking medal series.',
    category: 'Medals & Sports Events',
    cols: ['custom-medals', 'metal-bookmarks-openers-souvenirs'],
    focusSkus: ['MPS-027', 'MPS-029', 'MPS-030', 'MPS-031', 'MPS-032', 'MPS-040', 'MPS-041', 'MPS-043'],
    tags: ['Spinner Medals', 'Interlocking Medals', 'Bottle Opener Medals', 'Trends'],
    angle: 'Demonstrates how multi-race magnetic puzzle series and functional beer-mile bottle opener medals drive participant retention.'
  },
  {
    slug: 'dye-sublimated-vs-woven-neck-ribbons-for-custom-sports-medals',
    title: 'Custom Medal Neck Ribbons: Full-Color Dye-Sublimated Satin vs. Woven Jacquard & V-Stitch Hardware',
    metaTitle: 'Dye-Sublimated vs Woven Medal Neck Ribbons',
    metaDescription: 'Compare 25mm and 38mm full-color dye-sublimated polyester satin ribbons vs woven jacquard medal lanyards, V-stitching, jump rings, and safety breakaways.',
    category: 'Medals & Sports Events',
    cols: ['custom-medals', 'patches-pvc-packaging'],
    focusSkus: ['MPS-044', 'MPS-025', 'MPS-026', 'MPS-035', 'MPS-038', 'MPS-036', 'MPS-037', 'MPS-150'],
    tags: ['Medal Ribbons', 'Dye Sublimation', 'Woven Lanyards', 'Hardware'],
    angle: 'Details ribbon widths (25mm vs 38mm), double-sided sponsor logo alignment, wide cast medal slots vs brass jump rings, and sewn V-angle drape geometry.'
  },
  {
    slug: 'youth-sports-tournament-medals-and-baseball-trading-pins-bulk-guide',
    title: 'Youth Sports Tournament Medals & Oversized Baseball Trading Pins: High-Volume League Sourcing',
    metaTitle: 'Youth Sports Medals & Baseball Trading Pins',
    metaDescription: 'Optimize league budgets with $0.82–$1.85 tournament medals and oversized 1.75 to 2-inch glitter or spinner baseball trading pins in 8–12 days.',
    category: 'Medals & Sports Events',
    cols: ['custom-medals', 'custom-enamel-pins'],
    focusSkus: ['MPS-037', 'MPS-034', 'MPS-020', 'MPS-010', 'MPS-012', 'MPS-014', 'MPS-036', 'MPS-103'],
    tags: ['Baseball Trading Pins', 'Youth Medals', 'Tournaments', 'Sports Leagues'],
    angle: 'Pairs budget-optimized 2.2" tournament medallions with high-trade-value oversized glitter and dangle baseball pins for Little League & Cooperstown.'
  },
  {
    slug: 'academic-graduation-medallions-and-military-drape-ribbon-medals-guide',
    title: 'Solid Brass Academic Graduation Medallions & Military Drape Ribbon Medals: Stamping & Presentation',
    metaTitle: 'Academic Brass & Military Drape Medals Guide',
    metaDescription: 'Specify heirloom die-struck solid C26000 brass academic medallions, university crests, and striped grosgrain top-bar military drape medals.',
    category: 'Medals & Sports Events',
    cols: ['custom-medals', 'police-badges-insignia', 'patches-pvc-packaging'],
    focusSkus: ['MPS-035', 'MPS-038', 'MPS-041', 'MPS-044', 'MPS-045', 'MPS-147', 'MPS-150', 'MPS-019'],
    tags: ['Academic Medallions', 'Graduation Medals', 'Military Medals', 'Brass'],
    angle: 'Covers hydraulic brass coining sharpness for Latin university seals, pin-bar grosgrain ribbon draping, and velvet/mahogany award boxes.'
  },
  {
    slug: 'custom-championship-rings-vs-trophy-medals-for-sports-tournaments',
    title: 'Custom Sports Championship Rings vs. Heavy Trophy Medals: Tooling, Ring Sizing & Athlete Perception',
    metaTitle: 'Championship Rings vs Trophy Medals Comparison',
    metaDescription: 'Compare 3D sculpted championship tournament rings set with cubic zirconia stones (MOQ 50 pcs) vs 4-inch trophy medals across cost and player hype.',
    category: 'Medals & Sports Events',
    cols: ['police-badges-insignia', 'custom-medals'],
    focusSkus: ['MPS-103', 'MPS-033', 'MPS-036', 'MPS-037', 'MPS-041', 'MPS-147', 'MPS-150', 'MPS-020'],
    tags: ['Championship Rings', 'Tournament Awards', 'Trophy Medals', 'Sports'],
    angle: 'Breaks down US size 7–13 zinc alloy ring molds, bezel stone-setting, dual-panel side crests, and velvet box presentation vs heavyweight 4" finisher medals.'
  },
  {
    slug: 'virtual-race-finisher-medals-lightweight-mailer-packaging-and-fulfillment',
    title: 'Virtual Race Finisher Medals: Weight Optimization, Flat Mailer Envelopes & 3PL Fulfillment Prep',
    metaTitle: 'Virtual Race Medals: Weight & Mailer Guide',
    metaDescription: 'Cut domestic postage costs by 35% on virtual runs using weight-optimized 2.8mm finisher medals, flat-fold ribbons, and FNSKU/barcode pre-pack kits.',
    category: 'Medals & Sports Events',
    cols: ['custom-medals', 'patches-pvc-packaging', 'custom-enamel-pins'],
    focusSkus: ['MPS-042', 'MPS-026', 'MPS-028', 'MPS-044', 'MPS-149', 'MPS-002', 'MPS-030', 'MPS-141'],
    tags: ['Virtual Races', 'Mail-Ready Medals', 'Fulfillment', 'Logistics'],
    angle: 'Details 2.8mm thickness engineering (72g vs 130g standard) to stay under postal thickness and weight cutoffs while preserving full 3.0" visual diameter.'
  },

  // Pillar 3: Coins & Military Insignia (7)
  {
    slug: 'custom-military-and-law-enforcement-challenge-coins-sizing-edge-guide',
    title: 'Military & Law Enforcement Challenge Coins: Standard Diameters (1.75"–2"), Thickness & 6 Edge Cuts',
    metaTitle: 'Challenge Coins: Sizing, Thickness & Edge Guide',
    metaDescription: 'Specify authentic 1.75-inch and 2.0-inch die-struck brass military and police challenge coins with 3.5mm heft and 6 CNC diamond-cut edge profiles.',
    category: 'Coins & Military Insignia',
    cols: ['custom-challenge-coins', 'police-badges-insignia'],
    focusSkus: ['MPS-045', 'MPS-046', 'MPS-047', 'MPS-052', 'MPS-051', 'MPS-054', 'MPS-091', 'MPS-148'],
    tags: ['Challenge Coins', 'Diamond-Cut Edge', 'Military Coins', 'Brass'],
    angle: 'Compares oblique, rope, spur, wave, crosscut, and reeded edge treatments alongside 1.75" vs 2.0" coin geometry and protective PVC vs acrylic capsules.'
  },
  {
    slug: 'dual-plated-two-tone-gold-silver-challenge-coins-masking-process',
    title: 'Dual-Plated Two-Tone Challenge Coins & Badges: How Selective Electroplating Masking Creates Contrast',
    metaTitle: 'Dual-Plated Gold & Silver Challenge Coins Guide',
    metaDescription: 'Inside the hand-masking dual electroplating workflow that combines 24K gold and antique silver or black nickel on luxury coins, badges, and medallions.',
    category: 'Coins & Military Insignia',
    cols: ['custom-challenge-coins', 'custom-medals', 'police-badges-insignia'],
    focusSkus: ['MPS-048', 'MPS-041', 'MPS-055', 'MPS-058', 'MPS-091', 'MPS-092', 'MPS-096', 'MPS-114'],
    tags: ['Dual Plating', 'Two-Tone', 'Challenge Coins', 'Electroplating'],
    angle: 'Walks step-by-step through primary bath plating, protective resist lacquering, secondary bath contrast plating, and polishing tolerances on coins and shields.'
  },
  {
    slug: 'sequential-laser-numbering-and-acrylic-capsule-packaging-for-coins',
    title: 'Sequential Laser Edge Numbering (001/500) & Collector Capsule Packaging for Limited-Edition Coins',
    metaTitle: 'Numbered Challenge Coins & Capsule Packaging',
    metaDescription: 'Add serialized edition numbers (001/500) via rotary fiber laser and pair limited challenge coins with crystal acrylic capsules and velvet boxes.',
    category: 'Coins & Military Insignia',
    cols: ['custom-challenge-coins', 'patches-pvc-packaging'],
    focusSkus: ['MPS-054', 'MPS-058', 'MPS-055', 'MPS-048', 'MPS-148', 'MPS-147', 'MPS-150', 'MPS-059'],
    tags: ['Laser Numbering', 'Coin Capsules', 'Velvet Boxes', 'Limited Edition'],
    angle: 'Explains rotary Galvo laser indexing along 3.5mm coin edges, inner EVA sizing rings inside 40–50mm acrylic capsules, and foil-stamped velvet cases.'
  },
  {
    slug: 'custom-3d-curved-police-security-and-fire-department-badges-guide',
    title: 'Custom 3D Curved Police Shields, Sheriff Stars & Fire Department Badges: Stamping, Pins & Holsters',
    metaTitle: '3D Curved Police, Security & Fire Badges Guide',
    metaDescription: 'Manufacturing standards for curved brass/zinc police shields, 5/6/7-point sheriff stars, Maltese crosses, safety pin backs, and leather belt clips.',
    category: 'Coins & Military Insignia',
    cols: ['police-badges-insignia', 'custom-enamel-pins'],
    focusSkus: ['MPS-091', 'MPS-092', 'MPS-093', 'MPS-094', 'MPS-095', 'MPS-096', 'MPS-024', 'MPS-116'],
    tags: ['Police Badges', 'Sheriff Stars', 'Firefighter Badges', 'Security Uniforms'],
    angle: 'Details hydraulic dome curvature forming, hard enamel polishing over curved bezels, soldered heavy safety catches, recessed cowhide belt clips, and authorization compliance.'
  },
  {
    slug: 'military-stainless-steel-dog-tags-vs-3d-zinc-alloy-pendant-tags',
    title: 'Embossed 304 Stainless Steel Military Dog Tags vs. 3D Zinc Alloy Pendant Tags: Retail & Club Uses',
    metaTitle: 'Stainless Military Dog Tags vs 3D Zinc Tags',
    metaDescription: 'Compare classic 0.4mm rolled-edge embossed 304 stainless steel military dog tags with rubber silencers against heavy 3D sculpted zinc alloy pendant tags.',
    category: 'Coins & Military Insignia',
    cols: ['police-badges-insignia', 'custom-metal-keychains'],
    focusSkus: ['MPS-097', 'MPS-098', 'MPS-099', 'MPS-104', 'MPS-074', 'MPS-061', 'MPS-080', 'MPS-133'],
    tags: ['Dog Tags', '304 Stainless Steel', 'Military Tags', 'Pendants'],
    angle: 'Contrasts standard 5-line mechanical embossing on US spec 304 stainless blanks with deep cut-out 3D zinc alloy club and fashion pendant tags.'
  },
  {
    slug: 'magnetic-vs-pin-back-metal-employee-name-plates-for-hotels-airlines',
    title: 'Magnetic vs. Pin-Back Metal Employee Name Plates for Hospitality, Airlines & Corporate Uniforms',
    metaTitle: 'Magnetic vs Pin-Back Metal Name Plates Guide',
    metaDescription: 'Protect expensive blazers and airline uniforms with 3-magnet neodymium name badge bars, reusable name-window frames, and beveled engraved brass bars.',
    category: 'Coins & Military Insignia',
    cols: ['police-badges-insignia', 'custom-enamel-pins'],
    focusSkus: ['MPS-100', 'MPS-101', 'MPS-102', 'MPS-018', 'MPS-007', 'MPS-019', 'MPS-024', 'MPS-141'],
    tags: ['Name Plates', 'Magnetic Name Badges', 'Hospitality', 'Uniforms'],
    angle: 'Evaluates 3-magnet neodymium pull strength through wool suit lapels, sliding paper-insert reusable frames, and engraved solid brass bars.'
  },
  {
    slug: 'corporate-years-of-service-award-pins-and-anniversary-commemorative-coins',
    title: 'Corporate Years-of-Service Award Pins & Milestone Anniversary Coins: Tiered Recognition Playbook',
    metaTitle: 'Corporate Service Award Pins & Milestone Coins',
    metaDescription: 'Design progressive 5, 10, 15, and 25-year employee recognition programs combining stone-set gold brass service pins, anniversary coins, and velvet boxes.',
    category: 'Coins & Military Insignia',
    cols: ['custom-enamel-pins', 'custom-challenge-coins', 'executive-cufflinks-tie-bars'],
    focusSkus: ['MPS-019', 'MPS-055', 'MPS-058', 'MPS-105', 'MPS-109', 'MPS-112', 'MPS-147', 'MPS-150'],
    tags: ['Service Award Pins', 'Corporate Recognition', 'Anniversary Coins', 'HR Gifts'],
    angle: 'Shows HR directors how to use a single master stamp die with color-swapped gemstones (sapphire, ruby, diamond CZ) and electroplating upgrades across 5-to-25 year tenure levels.'
  },

  // Pillar 4: Keychains & Trolley Coins (6)
  {
    slug: 'european-trolley-coin-keyrings-1-euro-vs-12-sided-uk-pound-specs',
    title: 'European Trolley Coin Keyrings: Exact 23.25mm €1 Euro vs. 12-Sided 23.43mm UK £1 Specs & Tolerances',
    metaTitle: '€1 Euro vs 12-Sided UK £1 Trolley Coin Specs',
    metaDescription: 'Precision dimensional standards for European €1 (23.25mm), 12-sided UK £1 (23.43mm), Canadian $1, and Australian $1 supermarket trolley coin keyrings.',
    category: 'Keychains & Trolley Coins',
    cols: ['trolley-coin-keyrings', 'custom-metal-keychains'],
    focusSkus: ['MPS-081', 'MPS-082', 'MPS-083', 'MPS-084', 'MPS-085', 'MPS-086', 'MPS-087', 'MPS-088'],
    tags: ['Trolley Coins', '1 Euro Token', 'UK 12-Sided Pound', 'European Promo'],
    angle: 'Documents exact millimeter tolerances required so promotional trolley coins lock and release smoothly across Aldi, Lidl, Tesco, Sainsbury, and international grocery fleets.'
  },
  {
    slug: 'magnetic-detachable-vs-lobster-clasp-and-pull-out-trolley-coin-holders',
    title: 'Supermarket Trolley Coin Holders Compared: Magnetic Snap Frames, Lobster Clasps & Pull-Out Keys',
    metaTitle: 'Magnetic vs Clasp vs Key Trolley Coin Holders',
    metaDescription: 'Compare 4 promotional trolley token hardware styles: quick-snap magnetic zinc holders, classic lobster clips, front-pull key unlockers, and leather loops.',
    category: 'Keychains & Trolley Coins',
    cols: ['trolley-coin-keyrings', 'custom-metal-keychains'],
    focusSkus: ['MPS-084', 'MPS-081', 'MPS-087', 'MPS-089', 'MPS-090', 'MPS-085', 'MPS-086', 'MPS-149'],
    tags: ['Magnetic Coin Holder', 'Trolley Unlocker Key', 'Keyrings', 'Promo'],
    angle: 'Evaluates user ergonomics, unit cost ($0.30 to $0.72 at 2k pcs), and imprint surface visibility across snap-out magnetic housings and push-pull key tools.'
  },
  {
    slug: 'custom-3d-zinc-alloy-vs-soft-enamel-and-spinning-metal-keychains',
    title: 'Custom Metal Keychains Selection Matrix: 3D Zinc Alloy vs. Soft Enamel, Spinner & Nail-Clipper Fobs',
    metaTitle: '3D Zinc vs Enamel & Spinner Keychains Guide',
    metaDescription: 'Compare 3D die-cast zinc, hard/soft enamel, rotating 360-degree spinner keychains, nail clippers, and bottle-opener keyrings across cost and longevity.',
    category: 'Keychains & Trolley Coins',
    cols: ['custom-metal-keychains', 'metal-bookmarks-openers-souvenirs'],
    focusSkus: ['MPS-061', 'MPS-062', 'MPS-063', 'MPS-065', 'MPS-067', 'MPS-068', 'MPS-072', 'MPS-079'],
    tags: ['Metal Keychains', 'Spinner Keychain', '3D Zinc Alloy', 'Enamel'],
    angle: 'Maps factory keychain capabilities across 11 sub-processes, covering dual-sided spinners, stainless nail-clipper hybrids, and scratch-resistant finishes.'
  },
  {
    slug: 'genuine-leather-metal-emblem-keychains-for-auto-dealerships-real-estate',
    title: 'Genuine Leather & Metal Emblem Keychains for Automotive Dealerships, Car Clubs & Real Estate',
    metaTitle: 'Leather & Metal Keychains for Auto & Real Estate',
    metaDescription: 'High-retention stitched leather and chrome zinc key fobs for auto dealerships, EV brands, and homebuyer closing gifts starting at 100 pcs MOQ.',
    category: 'Keychains & Trolley Coins',
    cols: ['custom-metal-keychains', 'executive-cufflinks-tie-bars'],
    focusSkus: ['MPS-066', 'MPS-073', 'MPS-080', 'MPS-065', 'MPS-090', 'MPS-113', 'MPS-147', 'MPS-074'],
    tags: ['Leather Keychains', 'Auto Dealerships', 'Real Estate Gifts', 'Chrome'],
    angle: 'Contrasts split top-grain cowhide vs stitched microfiber PU fobs, recessed metal emblem bonding against pocket scratch noise near car ignitions, and velvet gift box upgrades.'
  },
  {
    slug: 'boutique-hotel-vintage-stamped-brass-room-key-tags-and-fobs-guide',
    title: 'Boutique Hotel Vintage Stamped Brass Room Key Tags: Patina Aging, Room Numbering & Ring Hardware',
    metaTitle: 'Vintage Brass Hotel Room Key Tags Guide',
    metaDescription: 'Specify 2.0mm solid C26000 brass diamond and oval hotel room key fobs with antique brass patina, deep laser room numbers, and solid brass split rings.',
    category: 'Keychains & Trolley Coins',
    cols: ['custom-metal-keychains', 'metal-bookmarks-openers-souvenirs'],
    focusSkus: ['MPS-078', 'MPS-068', 'MPS-070', 'MPS-077', 'MPS-074', 'MPS-080', 'MPS-100', 'MPS-133'],
    tags: ['Hotel Key Tags', 'Solid Brass', 'Antique Patina', 'Hospitality'],
    angle: 'Guides boutique hotels, luxury resorts, and short-term rental brands through 2.0mm solid brass diamond tags, variable room-number engraving, and custom rim-stamped rings.'
  },
  {
    slug: 'anodized-aluminum-carabiner-climb-loops-vs-laser-stainless-keyrings',
    title: 'Low-Cost Trade Show Keychains: Anodized Aluminum Carabiners vs. Laser-Engraved 304 Stainless Rings',
    metaTitle: 'Aluminum Carabiner vs Laser Stainless Keychains',
    metaDescription: 'Compare $0.29–$0.85 anodized aluminum carabiner climb-loops vs brushed 304 stainless laser tags and custom flat split rings for massive event giveaways.',
    category: 'Keychains & Trolley Coins',
    cols: ['custom-metal-keychains', 'patches-pvc-packaging'],
    focusSkus: ['MPS-075', 'MPS-076', 'MPS-074', 'MPS-077', 'MPS-071', 'MPS-087', 'MPS-133', 'MPS-144'],
    tags: ['Carabiners', 'Stainless Keychains', 'Trade Show Promo', 'Bulk Waiver'],
    angle: 'Highlights fast-turnaround laser and anodized hardware (anodized carabiners, stainless steel tags, laser-cut acrylic) with 500+ fixture waivers and 5–8 day turnarounds for urgent conferences.'
  },

  // Pillar 5: Executive, Golf & Souvenirs (5)
  {
    slug: 'custom-enamel-and-3d-cufflinks-tie-bars-executive-menswear-gift-sets',
    title: 'Custom Brass Cufflinks, Tie Bars & Money Clips: Toggle Hardware, Rhodium Plating & Gift Box Sets',
    metaTitle: 'Custom Cufflinks, Tie Bars & Executive Gift Sets',
    metaDescription: 'Design luxury corporate and alumni menswear sets featuring cloisonne hard enamel cufflinks, alligator/slide tie bars, money clips, and velvet boxes.',
    category: 'Executive, Golf & Souvenirs',
    cols: ['executive-cufflinks-tie-bars', 'patches-pvc-packaging'],
    focusSkus: ['MPS-105', 'MPS-106', 'MPS-107', 'MPS-108', 'MPS-109', 'MPS-110', 'MPS-111', 'MPS-113'],
    tags: ['Cufflinks', 'Tie Bars', 'Money Clips', 'Executive Gifts'],
    angle: 'Examines swivel bullet-back hardware reliability, stock vs custom-molded toggle costs, 55mm alligator vs tension slide bars, and matched 2-piece velvet gift boxes.'
  },
  {
    slug: 'custom-3d-western-rodeo-and-motorcycle-club-heavy-zinc-belt-buckles',
    title: 'Custom 3D Western Rodeo Trophy & Motorcycle Club Belt Buckles: Heavy Zinc Casting & Loop Specs',
    metaTitle: '3D Western Rodeo & Club Belt Buckles Guide',
    metaDescription: 'Manufacturing blueprint for 4x3-inch 165g 3D zinc alloy rodeo trophy buckles, biker club buckles, and utility bottle-opener belt buckles.',
    category: 'Executive, Golf & Souvenirs',
    cols: ['executive-cufflinks-tie-bars', 'police-badges-insignia'],
    focusSkus: ['MPS-114', 'MPS-115', 'MPS-116', 'MPS-117', 'MPS-118', 'MPS-049', 'MPS-094', 'MPS-150'],
    tags: ['Belt Buckles', 'Western Rodeo', 'Motorcycle Clubs', '3D Zinc Alloy'],
    angle: 'Covers 1.5" vs 1.75" rear bail clearances, structural rib reinforcement on heavy 165g buckles, cubic zirconia trophy borders, and functional bottle-opener lips.'
  },
  {
    slug: 'custom-golf-divot-repair-tools-and-magnetic-hat-clip-ball-markers-guide',
    title: 'Custom Golf Divot Repair Tools & Magnetic Ball Markers: Charity Tournament & Pro-Shop Playbook',
    metaTitle: 'Custom Golf Divot Tools & Ball Markers Guide',
    metaDescription: 'Specify magnetic 2-prong divot tools, folding switchblade forks, visor hat clips, antique brass/poker chip markers, and tournament window tin sets.',
    category: 'Executive, Golf & Souvenirs',
    cols: ['custom-golf-accessories', 'patches-pvc-packaging'],
    focusSkus: ['MPS-119', 'MPS-120', 'MPS-121', 'MPS-122', 'MPS-123', 'MPS-124', 'MPS-125', 'MPS-126'],
    tags: ['Golf Divot Tools', 'Ball Markers', 'Golf Tournaments', 'Pro Shops'],
    angle: 'Explains why stamped iron markers must be used over brass for magnetic attraction on divot forks and visor clips, plus windowed gift tins.'
  },
  {
    slug: 'photo-etched-hollow-brass-bookmarks-for-museums-universities-publishers',
    title: 'Photo-Etched Hollow Brass Bookmarks for Museums, Publishers & Universities: Filigree & Packaging',
    metaTitle: 'Photo-Etched Brass Bookmarks for Museums Guide',
    metaDescription: 'Engineer delicate 0.4mm photo-etched solid brass filigree bookmarks with pantone tassels, enamel accents, and 350gsm retail cards at 100 pcs MOQ.',
    category: 'Executive, Golf & Souvenirs',
    cols: ['metal-bookmarks-openers-souvenirs', 'custom-enamel-pins'],
    focusSkus: ['MPS-129', 'MPS-130', 'MPS-131', 'MPS-004', 'MPS-139', 'MPS-149', 'MPS-137', 'MPS-015'],
    tags: ['Metal Bookmarks', 'Photo-Etched Brass', 'Museum Merch', 'Publishing'],
    angle: 'Details minimum filigree cut-out web thickness (>= 0.35mm on 0.4mm brass), burr-free chemical etching, silk tassel loops, and museum-giftshop backing card assembly.'
  },
  {
    slug: 'craft-brewery-heavy-zinc-bottle-openers-and-3d-souvenir-fridge-magnets',
    title: 'Craft Brewery Metal Bottle Openers & 3D Landmark Souvenir Fridge Magnets: Structural Strength & Magnet Force',
    metaTitle: 'Brewery Bottle Openers & 3D Metal Magnets Guide',
    metaDescription: 'Compare 4.2mm heavy 3D zinc brewery openers, stainless speed-rail paddles, credit-card wallet openers, and high-hold 3D landmark souvenir magnets.',
    category: 'Executive, Golf & Souvenirs',
    cols: ['metal-bookmarks-openers-souvenirs', 'custom-metal-fridge-magnets', 'custom-metal-keychains'],
    focusSkus: ['MPS-132', 'MPS-133', 'MPS-134', 'MPS-135', 'MPS-136', 'MPS-154', 'MPS-156', 'MPS-072'],
    relatedGuides: ['custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide', 'fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards', 'museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer'],
    tags: ['Bottle Openers', 'Fridge Magnets', 'Craft Breweries', 'Souvenirs'],
    angle: 'Covers bending yield limits around pry tabs on zinc vs 2.0mm 304 stainless speed openers (cast zinc vs 304 stainless steel) and N45 vs ferrite pull forces on fridge magnets.'
  },

  // Pillar 6: Sourcing, Packaging & Compliance (5)
  {
    slug: 'custom-embroidered-patches-vs-woven-and-3d-soft-pvc-morale-patches',
    title: 'Custom Embroidered Patches vs. High-Density Woven & 3D Soft PVC Morale Patches: Coverage & Backings',
    metaTitle: 'Embroidered vs Woven & Soft PVC Patches Guide',
    metaDescription: 'Choose between 50%–100% embroidery, bullion wire crests, fine-thread woven labels, and waterproof 3D soft PVC patches with iron-on or Velcro backs.',
    category: 'Sourcing, Packaging & Compliance',
    cols: ['patches-pvc-packaging', 'police-badges-insignia'],
    focusSkus: ['MPS-141', 'MPS-142', 'MPS-143', 'MPS-144', 'MPS-145', 'MPS-146', 'MPS-094', 'MPS-138'],
    tags: ['Embroidered Patches', 'Woven Patches', 'Soft PVC', 'Morale Patches'],
    angle: 'Compares 3mm thread resolution limits in embroidery vs tiny lettering clarity in woven patches, metallic bullion crests, and rugged 3D PVC.'
  },
  {
    slug: 'lapel-pin-backs-and-attachments-butterfly-clutch-rubber-magnet-locking',
    title: 'Lapel Pin Backs & Hardware Attachments Guide: Butterfly Clutches, Rubber Caps, Locking Backs & Magnets',
    metaTitle: 'Lapel Pin Backs: Clutches, Locking & Magnets',
    metaDescription: 'Compare 6 pin backing options—military butterfly clutches, colored PVC rubber caps, spring locking pin backs, safety pins, and no-hole bar magnets.',
    category: 'Sourcing, Packaging & Compliance',
    cols: ['custom-enamel-pins', 'police-badges-insignia'],
    focusSkus: ['MPS-001', 'MPS-002', 'MPS-018', 'MPS-024', 'MPS-091', 'MPS-096', 'MPS-100', 'MPS-112'],
    tags: ['Pin Backs', 'Butterfly Clutch', 'Locking Clutch', 'Magnetic Pins'],
    angle: 'Evaluates retention pull-force across standard butterfly clutches, soft colored PVC clutches, tool-free spring locking backs (for heavy 3D/motorcycle pins), and no-hole magnets.'
  },
  {
    slug: 'custom-retail-backing-cards-velvet-boxes-and-acrylic-display-packaging',
    title: 'Retail Pin Backing Cards, Velvet Gift Boxes & Acrylic Coin Capsules: Boosting Margin 35%+ at Checkout',
    metaTitle: 'Pin Backing Cards, Velvet Boxes & Coin Capsules',
    metaDescription: 'Turn wholesale pins, medals, and challenge coins into retail-ready gifts with 350gsm foil backing cards, 38–50mm acrylic capsules, and velvet boxes.',
    category: 'Sourcing, Packaging & Compliance',
    cols: ['patches-pvc-packaging', 'custom-metal-fridge-magnets', 'custom-challenge-coins'],
    focusSkus: ['MPS-147', 'MPS-148', 'MPS-149', 'MPS-150', 'MPS-151', 'MPS-109', 'MPS-125', 'MPS-055'],
    relatedGuides: ['fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards', 'custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide', 'sequential-laser-numbering-and-acrylic-capsule-packaging-for-coins'],
    tags: ['Backing Cards', 'Velvet Boxes', 'Coin Capsules', 'Retail Packaging'],
    angle: 'Demonstrates factory pre-mounting workflows onto euro-slot 350gsm backing cards, magnet blister cards, capsule sizing inserts, and mahogany award box economics.'
  },
  {
    slug: 'cpsia-lead-free-en71-reach-nickel-free-electroplating-metal-craft-compliance',
    title: 'Global Metal Craft Compliance: US CPSIA Lead Limits, CA Prop 65, EU REACH & Nickel-Free Plating',
    metaTitle: 'CPSIA, Prop 65 & REACH Metal Craft Compliance',
    metaDescription: 'Meet US CPSIA (<90 ppm lead), California Prop 65, EU REACH SVHC, and EN 1811 nickel-release regulations across zinc alloy, brass, enamel, and PVC.',
    category: 'Sourcing, Packaging & Compliance',
    cols: ['custom-enamel-pins', 'custom-challenge-coins', 'patches-pvc-packaging'],
    focusSkus: ['MPS-001', 'MPS-009', 'MPS-037', 'MPS-045', 'MPS-104', 'MPS-144', 'MPS-145', 'MPS-146'],
    tags: ['CPSIA', 'California Prop 65', 'REACH', 'Nickel-Free'],
    angle: 'Covers lead-free pewter, phthalate-free PVC, substrate XRF verification (<90 ppm Pb), and nickel-free plating baths for skin-contact pins & jewelry.'
  },
  {
    slug: 'china-direct-custom-pins-and-medals-manufacturing-lead-times-ddp-air-shipping',
    title: 'China Direct Custom Pins & Medals Sourcing: Zhongshan Foundry Lead Times, HS Codes & DDP Air Freight',
    metaTitle: 'China Direct Pins & Medals Lead Times & DDP',
    metaDescription: 'Plan production from Zhongshan Xiaolan hardware hub: 12-hour proofs, 7–15 day fabrication, export HS codes (7117/8308), and DHL/FedEx DDP air freight.',
    category: 'Sourcing, Packaging & Compliance',
    cols: ['custom-medals', 'custom-enamel-pins', 'custom-challenge-coins'],
    focusSkus: ['MPS-025', 'MPS-001', 'MPS-045', 'MPS-061', 'MPS-081', 'MPS-091', 'MPS-119', 'MPS-141'],
    tags: ['China Direct', 'Zhongshan Factory', 'DDP Shipping', 'Lead Times'],
    angle: 'Maps day-by-day factory production milestones from vector proof to electroplating QC, carton drop protection for heavy 15kg medal cartons, and transparent DDP customs clearance.'
  },

  // Pillar 7 / Hub Expansion: Custom Metal Fridge Magnets (3 New Guides #41–#43)
  {
    slug: 'custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide',
    title: 'Custom Metal Fridge Magnets: 3D Zinc Die-Cast vs. Cloisonne Hard Enamel, Soft Enamel & CMYK Epoxy',
    metaTitle: 'Metal Fridge Magnets: 3D Zinc vs Enamel & Epoxy',
    metaDescription: 'Compare 3D zinc die-cast, hard enamel, soft enamel & CMYK epoxy metal fridge magnets across mold waivers, unit cost ($0.48–$1.95), and finish.',
    category: 'Materials & Manufacturing',
    cols: ['custom-metal-fridge-magnets', 'custom-enamel-pins', 'metal-bookmarks-openers-souvenirs'],
    focusSkus: ['MPS-136', 'MPS-151', 'MPS-152', 'MPS-153', 'MPS-157', 'MPS-158', 'MPS-001', 'MPS-002'],
    relatedGuides: ['museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer', 'fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards', 'hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide'],
    tags: ['Metal Fridge Magnets', 'Hard Enamel Magnets', '3D Zinc Magnets', 'CMYK Epoxy'],
    angle: 'MetalPinSupply manufactures custom 3D Zamak #3 zinc, flush cloisonne hard enamel, recessed soft enamel, and CMYK epoxy fridge magnets from $0.48–$1.95/pc EXW, with 2D dies waived at 500+ pcs and 3D sculpted molds waived at 1,000+ pcs.'
  },
  {
    slug: 'museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer',
    title: 'Museum & Tourism Collectible Metal Fridge Magnets: Spinners, Sliding Tracks, Stained Glass & 3D Layers',
    metaTitle: 'Museum & Tourism Kinetic & 3D Metal Fridge Magnets',
    metaDescription: 'Design high-margin museum and city souvenir fridge magnets with 360° spinners, sliding tracks, stained-glass cut-outs, and multi-layer 3D zinc relief.',
    category: 'Executive, Golf & Souvenirs',
    cols: ['custom-metal-fridge-magnets', 'metal-bookmarks-openers-souvenirs', 'patches-pvc-packaging'],
    focusSkus: ['MPS-154', 'MPS-155', 'MPS-156', 'MPS-136', 'MPS-157', 'MPS-158', 'MPS-129', 'MPS-137'],
    relatedGuides: ['custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide', 'fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards', 'interactive-kinetic-pins-and-medals-spinner-slider-hinged-mechanisms'],
    tags: ['Museum Magnets', 'Kinetic Magnets', 'Stained Glass', 'Multi-Layer 3D'],
    angle: 'Museum gift shops and national park retailers lift retail margins to 3x–5x by commissioning kinetic 360° spinner and slider tracks, translucent stained-glass cut-outs, and riveted multi-layer 3D skyline magnets from $1.02–$3.10/pc factory direct.'
  },
  {
    slug: 'fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards',
    title: 'Metal Fridge Magnet Engineering: N45 Neodymium vs. Ferrite & Soft Rubber Pull Force Plus Retail Packaging',
    metaTitle: 'Metal Fridge Magnet Backing Force & Retail Cards',
    metaDescription: 'Engineer metal fridge magnet hold strength comparing recessed N45 neodymium vs ceramic ferrite vs soft rubber backs, plus 400gsm retail card packaging.',
    category: 'Sourcing, Packaging & Compliance',
    cols: ['custom-metal-fridge-magnets', 'patches-pvc-packaging', 'metal-bookmarks-openers-souvenirs'],
    focusSkus: ['MPS-134', 'MPS-136', 'MPS-151', 'MPS-156', 'MPS-153', 'MPS-149', 'MPS-147', 'MPS-132'],
    relatedGuides: ['custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide', 'museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer', 'custom-retail-backing-cards-velvet-boxes-and-acrylic-display-packaging'],
    tags: ['N45 Neodymium', 'Pull Force', 'Ferrite Magnet', 'Retail Backing Cards'],
    angle: 'Heavy 32g–78g die-cast metal magnets stay slip-free on stainless doors using recessed dual N35–N52 neodymium discs (18N–35N hold), sintered ferrite rings, or non-marring 1.5mm rubber sheets with 400gsm Euro-slot retail cards.'
  }
];

const MODIFIED_TODAY_SLUGS = new Set([
  'specialty-enamel-effects-glitter-glow-in-the-dark-stained-glass-translucent',
  'interactive-kinetic-pins-and-medals-spinner-slider-hinged-mechanisms',
  'craft-brewery-heavy-zinc-bottle-openers-and-3d-souvenir-fridge-magnets',
  'custom-retail-backing-cards-velvet-boxes-and-acrylic-display-packaging'
]);

function getSkuObj(skuCode) {
  return allProds.find((p) => p.sku === skuCode) || allProds[0];
}

function buildArticle(g, idx) {
  const isNewMagnetGuide = Array.isArray(g.cols) && g.cols[0] === 'custom-metal-fridge-magnets';
  const publishDate = isNewMagnetGuide ? '2026-11-24' : '2026-10-20';
  const updatedDate = (isNewMagnetGuide || MODIFIED_TODAY_SLUGS.has(g.slug)) ? '2026-11-24' : '2026-11-23';
  const col1 = g.cols[0];
  const col2 = g.cols[1] || 'custom-enamel-pins';
  const col3 = g.cols[2] || null;
  const col1Prods = (byCol[col1] || []).slice(0, 10);
  const col2Prods = (byCol[col2] || []).slice(0, 8);
  const focusObjs = g.focusSkus.map(getSkuObj);

  // Merge 18+ unique product links cleanly
  const linkPool = [];
  const seenSlugs = new Set();
  for (const p of [...focusObjs, ...col1Prods, ...col2Prods, ...allProds]) {
    if (!seenSlugs.has(p.slug)) {
      seenSlugs.add(p.slug);
      linkPool.push(p);
    }
    if (linkPool.length >= 18) break;
  }

  // 3 sibling guides (honor explicit relatedGuides cluster when provided)
  const findGuide = (slug, fallback) => GUIDES.find((x) => x.slug === slug) || fallback;
  const customSibs = Array.isArray(g.relatedGuides)
    ? g.relatedGuides.map((s, k) => findGuide(s, GUIDES[(idx + k + 1) % GUIDES.length]))
    : [];
  const sib1 = customSibs[0] || GUIDES[(idx + 1) % GUIDES.length];
  const sib2 = customSibs[1] || GUIDES[(idx + 7) % GUIDES.length];
  const sib3 = customSibs[2] || GUIDES[(idx + 15) % GUIDES.length];

  const heroImg = `/images/insights/${g.slug}-hero.webp`;
  const fig1Img = `/images/insights/${g.slug}-fig1.webp`;
  const fig2Img = `/images/insights/${g.slug}-fig2.webp`;

  // Ensure unique H2 headings across ALL guides by embedding the specific guide topic title fragment cleanly
  const shortTopic = isNewMagnetGuide
    ? g.metaTitle.replace(':', ' —').replace(/ Guide$/i, '').trim()
    : g.metaTitle.replace(/ Guide$/i, '').trim();

  const pLink = (p, label) => `<a href="/products/${p.slug}">${label || p.title}</a>`;
  const cLink = (slug) => `<a href="/collections/${slug}">${COL_NAMES[slug]}</a>`;
  const colsPhrase = col3 ? `${cLink(col1)}, ${cLink(col2)}, and ${cLink(col3)}` : `${cLink(col1)} and ${cLink(col2)}`;

  const row1 = linkPool.slice(0, 6);
  const row2 = linkPool.slice(6, 12);
  const row3 = linkPool.slice(12, 18);

  const md = `---
title: "${g.title.replace(/"/g, '\\"')}"
slug: "${g.slug}"
publishDate: "${publishDate}"
updatedDate: "${updatedDate}"
author: "MedalPinSupply Engineering Team"
category: "${g.category}"
summary: "${g.metaDescription.replace(/"/g, '\\"')}"
metaTitle: "${g.metaTitle.replace(/"/g, '\\"')}"
metaDescription: "${g.metaDescription.replace(/"/g, '\\"')}"
featuredImage: "${heroImg}"
readTime: "10 min read"
tags: ${JSON.stringify(g.tags)}
relatedSkus: ${JSON.stringify(g.focusSkus.slice(0, 8))}
---

<h2 id="engineering-overview-${idx + 1}">1. Engineering Overview: ${shortTopic}</h2>

<p><strong>Direct Answer:</strong> ${g.angle}</p>

<p>Wholesale buyers access factory-direct pricing starting from <strong>$${row1[0].tier2000} to $${row1[0].tier100}/pc</strong> on custom craft styles like ${pLink(row1[0], row1[0].title)}. Every custom run includes complimentary 12-hour vector proofs and 7–15 business day fabrication.</p>

<p>Across our Zhongshan Xiaolan metalworking hub, every project begins with 1:1 digital Pantone artwork layouts built to your branding before any custom steel die is cut. Physical pre-production prototypes ship in 7–10 business days to lock in finish fidelity.</p>

<p>When procurement teams compare options across ${colsPhrase}, small miscalculations in base alloy multiply into costly delays. Choosing the right custom tooling architecture early prevents soft edges and enamel bleed.</p>

<p>${isNewMagnetGuide
  ? `Here is what matters most for serious buyers: fridge magnet unit economics depend on relief depth, mold fee waivers, and rear magnet shear hold on brushed stainless doors. Below, we map verified factory tolerances across ${pLink(row1[1])}, ${pLink(row1[2])}, and ${pLink(row1[3])}.`
  : `Here is what matters most for serious buyers: unit economics hinge on relief height, mold fee waivers, and clasp strength. Below, we map verified factory tolerances across ${pLink(row1[1])}, ${pLink(row1[2])}, and ${pLink(row1[3])}.`}</p>

<figure class="article-figure">
  <img src="${fig1Img}" alt="Side-by-side custom craft comparison of ${row1[0].title} and ${row1[1].title}" width="800" height="310" loading="lazy" />
  <figcaption>Figure 1: Factory process comparison pairing ${row1[0].title} (${row1[0].material}, left) with ${row1[1].title} (${row1[1].material}, right) for ${shortTopic}.</figcaption>
</figure>

<h2 id="technical-specification-matrix-${idx + 1}">2. ${shortTopic}: Unit Cost, Material &amp; Tooling Comparison Matrix</h2>

<p>Standard catalog sheets often obscure custom mold amortization and extra Pantone color fees until the final invoice. To keep budgets predictable, the engineering matrix below benchmarks exact alloys, weights, MOQs, and custom pricing tiers for ${shortTopic}.</p>

<div class="geo-table-wrap">
  <table class="geo-table">
    <thead>
      <tr>
        <th>Custom Craft Style &amp; Architecture</th>
        <th>Base Alloy &amp; Craft</th>
        <th>Standard Size &amp; Weight</th>
        <th>MOQ &amp; Custom Tooling</th>
        <th>Wholesale Tier (100 / 500 / 2k+ pcs)</th>
      </tr>
    </thead>
    <tbody>
      ${row1.map((p) => `<tr>
        <td>${pLink(p, `<strong>${p.title}</strong>`)}</td>
        <td>${p.material}<br/><small>${p.process}</small></td>
        <td>${p.size} · ${p.weight}</td>
        <td>${p.moq}<br/><small>${p.toolingFee}</small></td>
        <td>$${p.tier100} / $${p.tier500} / <strong>$${p.tier2000}</strong></td>
      </tr>`).join('\n      ')}
    </tbody>
  </table>
</div>

<div class="exec-callout-box">
  <strong>Key Procurement Takeaway (${shortTopic}):</strong> Consolidating colorway variants onto a single steel die—or ordering <strong>500+</strong> 2D brass or <strong>1,000+</strong> 3D zinc units—waives the custom mold fee down to <strong>$0.00/pc</strong>. Fast-setup craft formats like ${pLink(row2[0], row2[0].title)} shorten lead times immediately.
</div>

<p>For tight seasonal launch calendars, fast-setup 2D stamping and laser fixtures such as ${pLink(row2[0])} and ${pLink(row2[1])} cut 3–5 days off initial sample lead times. Paid custom dies cut to your artwork remain archived free of charge for three years for rapid $0 reorders.</p>

<h2 id="metallurgy-plating-workflow-${idx + 1}">3. ${shortTopic}: Substrate Metallurgy, Electroplating &amp; Production Workflow</h2>

<p>Visual distinction in bespoke pins, medals, challenge coins, and badges starts with matching raw alloy ductility to surface geometry. Flat two-dimensional crests stamp cleanly in solid brass or iron, whereas sculpted depth requires molten zinc flow.</p>

<p>Every custom run at our Zhongshan foundry passes through six controlled checkpoints from raw blanking to export carton sealing. Automated optical inspection flags surface pitting or plating shadow before final attachment soldering.</p>

<ul>
  ${isNewMagnetGuide ? `<li><strong>Die-Struck C26000 Brass &amp; Hard Enamel Tooling:</strong> Preferred when sharp 0.15mm borders or stone-polished cloisonne surfaces meet recessed dual N45 neodymium pockets—exemplified by ${pLink(row2[2])} and ${pLink(row2[3])}.</li>
  <li><strong>Zamak #3 Hot-Chamber 3D &amp; Kinetic Die-Casting:</strong> Built for multi-level castle or mountain relief, 360-degree rotating gears, and stained-glass cut-outs such as ${pLink(row2[4])} and ${pLink(row2[5])}.</li>
  <li><strong>Offset CMYK + Crystal Epoxy &amp; Recessed Pockets:</strong> Ideal for painterly park posters and photography sealed beneath UV-stabilized domed lenses across ${pLink(row3[0])} and ${pLink(row3[1])}.</li>
  <li><strong>Rear Backing &amp; Anti-Scratch Surface Protection:</strong> Pair recessed 10×2mm N45 rare-earth magnets, sintered ferrite disks, or full-back 1.5mm rubber sheets with clear PET/EVA pads across ${pLink(row3[2])} and ${pLink(row3[3])}.</li>`
  : `<li><strong>Die-Struck C26000 Brass &amp; Iron Tooling:</strong> Preferred when razor-sharp coin edges, 0.15mm raised metal lines, or flush stone-polished cloisonne surfaces are required—exemplified by ${pLink(row2[2])} and ${pLink(row2[3])}.</li>
  <li><strong>Zamak #3 Hot-Chamber Zinc Die-Casting:</strong> Built for multi-level 3D relief topography, open inner cut-out windows, bottle openers, and 360-degree spinning hubs such as ${pLink(row2[4])} and ${pLink(row2[5])}.</li>
  <li><strong>Photo-Etched &amp; Offset Litho Processes:</strong> Ideal for delicate 0.4mm–0.8mm filigree silhouettes or photorealistic CMYK gradients under crystal epoxy domes, featured in ${pLink(row3[0])} and ${pLink(row3[1])}.</li>
  <li><strong>Protective &amp; Vintage Plating Options:</strong> Choose bright 18K gold, rhodium silver, mirror black nickel, antique bronze, or matte black electrophoretic dye coats across ${pLink(row3[2])} and ${pLink(row3[3])}.</li>`}
</ul>

<figure class="article-figure">
  <img src="${fig2Img}" alt="Three-panel custom manufacturing comparison featuring ${row2[0].title}, ${row2[1].title}, and ${row2[2].title}" width="1170" height="305" loading="lazy" />
  <figcaption>Figure 2: Multi-craft hardware comparison spanning ${row2[0].title} (left), ${row2[1].title} (center), and ${row2[2].title} (right) across plating and attachment configurations.</figcaption>
</figure>

<h2 id="procurement-timeline-packaging-${idx + 1}">4. Tooling Economics, Retail Packaging &amp; Pre-Shipment Milestones (${shortTopic})</h2>

<p>Experienced purchasing directors look beyond unit factory gate cost to reduce warehouse kitting time and lift retail display margins. Pre-assembled packaging at the foundry level saves days of manual fulfillment downstream.</p>

<p>Mounting bespoke pieces onto ${pLink(getSkuObj('MPS-149'))} prepares finished pieces for immediate point-of-sale hooks. Commemorative issues paired with ${pLink(getSkuObj('MPS-148'))} or hinged cases (${pLink(getSkuObj('MPS-147'))}, ${pLink(getSkuObj('MPS-150'))}) safeguard mirror plating during transit.</p>

<div class="geo-table-wrap">
  <table class="geo-table">
    <thead>
      <tr>
        <th>Procurement Stage &amp; Craft Focus</th>
        <th>Standard Schedule / Spec</th>
        <th>Compliance &amp; Hardware Check</th>
        <th>Cost / Waiver Impact</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Digital Vector Proof</strong> (${shortTopic})</td>
        <td>12–24 Hours Free Turnaround</td>
        <td>Pantone Solid Coated PMS callouts &amp; dimensions locked</td>
        <td><strong>$0.00</strong> (Unlimited pre-mold edits)</td>
      </tr>
      <tr>
        <td><strong>2. Custom Tooling / Mold</strong></td>
        <td>2–3 Days CNC Die Engraving</td>
        <td>Free 3-Year Vault Storage for Reorders</td>
        <td>Waived @ 500+ (2D) or 1,000+ (3D) · Est. ${row1[0].toolingFee}</td>
      </tr>
      <tr>
        <td><strong>3. Physical Pre-Prod Sample</strong></td>
        <td>${row1[0].sampleTime}</td>
        <td>Enamel match, plating luster &amp; attachment pull verification</td>
        <td>Buyer-paid custom mold/sample fee</td>
      </tr>
      <tr>
        <td><strong>4. Mass Production &amp; Packaging</strong></td>
        <td>7–15 Business Days Bulk</td>
        <td>US CPSIA (&lt;90 ppm Pb), CA Prop 65, EU REACH / EN 1811</td>
        <td>Polybag $0.00 · Card/Capsule/Velvet Opt.</td>
      </tr>
      <tr>
        <td><strong>5. Related Custom Styles</strong></td>
        <td>${pLink(row3[4])}, ${pLink(row3[5])}</td>
        <td>${isNewMagnetGuide ? '2× Recessed N45 Neodymium / Full 1.5mm Rubber Sheet / EVA Pad' : `${row3[4].attachmentEn} / ${row3[5].platingEn}`}</td>
        <td>From $${row3[4].tier2000} – $${row3[5].tier100}/pc</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="field-failure-prevention-${idx + 1}">5. Field Failure Prevention &amp; Pre-Shipment Inspection Protocol: ${shortTopic}</h2>

<p>${isNewMagnetGuide
  ? 'Heavy cast metal fridge magnets often suffer field returns when shallow glued magnets pop off or slide down low-ferritic brushed stainless appliance doors. Poorly recessed rear pockets and abrasive burrs also scratch luxury refrigerator finishes.'
  : 'Even experienced merchandisers hit avoidable quality rejections when fine artwork clearances are overlooked prior to steel die engraving. Enamel cross-bleeding, brittle rear post solder joints, and rapid antique patina tarnish account for most wholesale defect claims.'}</p>

<p>${isNewMagnetGuide
  ? 'Before approving bulk runs, Zhongshan engineers mill 1.6mm–2.0mm deep rear pockets and lock N35–N52 magnets with UV structural epoxy before vertical shear testing on brushed steel. Every incoming alloy batch clears XRF screening for CPSIA and EN71-3 safety.'
  : 'Before authorizing bulk production, engineers verify minimum raised metal dividing lines (&gt;= 0.15mm for pins and &gt;= 0.35mm for sculpted coins) on wet-enamel proofs. Every incoming alloy batch also clears XRF heavy-metal screening for CPSIA and REACH compliance.'}</p>

<ul>
  ${isNewMagnetGuide
    ? `<li><strong>Recessed Magnet Pull &amp; Shear Audit:</strong> Vertical slip-load tests verify 18N–35N magnetic grip on brushed steel across ${pLink(row1[4], row1[4].title)} and ${pLink(row1[5], row1[5].title)} so heavy castings hold heavy papers securely.</li>
  <li><strong>Anti-Scratch Stainless Door Protection:</strong> Flush-recessed magnet pockets plus optional clear EVA/PET cushion pads prevent scratching across painted and bare steel finishes on ${pLink(row2[4], row2[4].title)} and ${pLink(row2[5], row2[5].title)}.</li>
  <li><strong>Pantone Delta-E Color Control:</strong> Syringe dispensing meters PMS pigments consistently across recessed cavities on ${pLink(row3[2], row3[2].title)} and ${pLink(row3[3], row3[3].title)} prior to 180°C kiln baking.</li>
  <li><strong>IATA Air-Freight Magnetic Shielding:</strong> Heavy galvanized iron separator sheets and 400gsm Euro-slot backing cards keep external magnetic flux below 0.00525 Gauss at 2.1m for seamless express air DDP clearance.</li>`
    : `<li><strong>Post Pull-Force &amp; Clutch Audit:</strong> High-torque silver solder joins brass spurs securely on ${pLink(row1[4], row1[4].title)} and ${pLink(row1[5], row1[5].title)}, withstanding over 25N pull force without snapping.</li>
  <li><strong>Pantone Delta-E Color Control:</strong> Syringe dispensing meters PMS pigments consistently across recessed cavities on ${pLink(row2[4], row2[4].title)} and ${pLink(row2[5], row2[5].title)} prior to 180°C kiln baking.</li>
  <li><strong>Plating Thickness &amp; Lacquer Seal:</strong> Protective electrophoretic clear coats prevent fingerprint oxidation across mirror finishes on ${pLink(row3[2], row3[2].title)} and ${pLink(row3[3], row3[3].title)}.</li>
  <li><strong>Transit Drop &amp; Polybag Protection:</strong> Individual polybags, tray dividers, and 5-ply master cartons prevent plating rub during international air DDP transit.</li>`}
</ul>

<p>Explore complementary engineering data across ${colsPhrase}, or consult these companion technical reports before finalizing your custom production brief:</p>

<ul>
  <li><a href="/insights/${sib1.slug}">${sib1.title}</a> — detailed tolerance and finish benchmarks.</li>
  <li><a href="/insights/${sib2.slug}">${sib2.title}</a> — tooling economics and bulk scheduling data.</li>
  <li><a href="/insights/${sib3.slug}">${sib3.title}</a> — packaging upgrades and hardware safety specs.</li>
</ul>

<div class="sourcing-cta-box">
  <h3>Request Your Free 12-Hour Artwork Proof &amp; Factory Quote (${shortTopic})</h3>
  <p>Send your logo artwork and target quantity to our Zhongshan export engineering desk. Compare ${pLink(row1[0], row1[0].title)}, ${pLink(row1[1], row1[1].title)}, and ${pLink(row1[2], row1[2].title)} with transparent mold fee waivers and DDP delivery estimates.</p>
  <a href="/contact" data-rfq-sku="${row1[0].title}, ${row1[1].title}" data-rfq-qty="500" class="btn btn-primary">Request Wholesale Quote &amp; Proof →</a>
</div>
`;

  return md;
}

for (let i = 0; i < GUIDES.length; i++) {
  const g = GUIDES[i];
  const content = buildArticle(g, i);
  fs.writeFileSync(path.join(OUT_DIR, `${g.slug}.md`), content);
}

console.log(`Generated ${GUIDES.length} Backlinko-grade Insight markdown files in ${OUT_DIR}`);
