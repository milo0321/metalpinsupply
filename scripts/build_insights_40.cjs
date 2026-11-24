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
    angle: 'MedalPinSupply produces flush stone-polished cloisonne hard enamel pins ($0.58–$1.45/pc EXW) and recessed 180°C baked soft enamel pins ($0.42–$1.15/pc EXW) at 50 pcs MOQ, with 2D steel dies ($55–$65) waived automatically at 500+ pcs.'
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
    angle: 'Hot-chamber Zamak #3 zinc die-casting forms multi-level 3D relief and open windows for medals and pins ($95–$150 molds waived at 1,000+ pcs), while hydraulic coining stamps razor-sharp 2D brass and iron badges ($55–$75 dies waived at 500+ pcs).'
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
    angle: 'Acid photo-etched 0.8mm brass ($0.38–$1.05/pc) resolves intricate thin-line filigree without stamping burrs, whereas CMYK offset litho printing under clear epoxy domes reproduces photographic portraits and continuous gradients starting at 100 pcs MOQ.'
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
    angle: 'MedalPinSupply electroplates custom pins, medals, and coins across 12 industrial bath finishes—spanning 18K gold, rhodium silver, mirror black nickel, brushed antique bronze, dyed black matte, and PVD rainbow—sealed with clear protective lacquer.'
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
    angle: 'Optical polyurethane and clear epoxy dome coatings protect soft enamel colors and CMYK offset prints from key-ring scratching while adding a smooth 3D magnifying lens gloss from $0.32–$1.25/pc EXW.'
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
    angle: 'CNC 3D Z-axis sculpting carves continuous 0.8mm–2.5mm multi-plane contours for faces, skylines, and mascots, while stepped 2D multi-level molds sharpen tiered corporate crests and text at 15%–20% lower mold cost.'
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
    angle: 'Custom cut-out medals, hollow challenge coins, and silhouette keychains require minimum 2.5mm load-bearing metal bridges on 4mm castings plus precision trimming dies to keep inner windows crisp and burr-free.'
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
    angle: 'Specialty collector pins, night-run medals, and tourist fridge magnets combine translucent stained-glass resin windows, metallic micro-glitter, and strontium aluminate night-glow pigments from 50–100 pcs MOQ.'
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
    angle: 'Kinetic spinner bearings, 0.25mm-clearance sliding tracks, and hinged clasp joints transform custom lapel pins, fridge magnets, and marathon medals into interactive merchandise starting at 100 pcs MOQ.'
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
    angle: 'Standard 2D stamping dies ($45–$85) waive 100% automatically at 500+ pcs per artwork, and 3D zinc die-cast molds ($95–$150) waive 100% at 1,000+ pcs, with free 3-year reorder vault storage.'
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
    angle: 'Race directors engineer tiered events using 2.5-inch 5K medals (54g) through 4.5-inch triathlon finishers (178g), sharing unified Gold, Silver, and Bronze 3D molds to cross the 1,000-pc mold fee waiver threshold.'
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
    angle: 'Multi-race 2-to-4-piece magnetic interlocking finisher series, 360° spinning center medallions, and integrated brewery bottle-opener medals lift multi-event runner retention across marathon series.'
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
    angle: 'Full-color 25mm and 38mm dye-sublimated satin neck ribbons reproduce unlimited sponsor graphics with zero color charges, while jacquard woven lanyards add heavyweight stitched drape and V-bar hardware.'
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
    angle: 'Youth leagues stretch seasonal budgets by combining $0.82–$1.85 tournament medallions with oversized 1.75–2.0-inch glitter, slider, and spinner baseball trading pins delivered in 8–12 business days.'
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
    angle: 'Heirloom solid C26000 brass academic medallions and military commendation medals stamp with sharp 0.15mm seals, pairing with striped grosgrain pin-bar drape ribbons and hinged velvet award cases.'
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
    angle: 'Custom 3D tournament championship rings (US sizes 7–13, bezel cubic zirconia stones, 50 pcs MOQ) command trophy prestige from $2.85–$6.40/pc compared with oversized 4-inch heavyweight finisher medals.'
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
    angle: 'Weight-optimized 2.8mm Zamak #3 virtual race medals (72g vs 130g standard) slash parcel postage costs by up to 35% while keeping full 3.0-inch diameter, flat-folded ribbons, and barcode-labeled bags.'
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
    angle: 'Military and law enforcement challenge coins stamp from solid C26000 brass in 1.75-inch and 2.0-inch diameters at 3.5mm thickness with six CNC diamond-cut edges: oblique, rope, spur, wave, crosscut, and reeded.'
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
    angle: 'Selective electroplating hand-masking combines 24K mirror gold and antique silver or black nickel on one challenge coin or shield badge through primary plating, liquid resist masking, and secondary bath contrast.'
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
    angle: 'Rotary Galvo fiber lasers engrave sequential edition numbers (001/500) directly onto 3.5mm coin edges, paired with EVA-fitted 40–50mm acrylic capsules and custom foil-stamped velvet presentation boxes.'
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
    angle: 'Curved brass and zinc police shields, 5-to-7-point sheriff stars, and Maltese crosses undergo hydraulic dome forming, flush cloisonne polishing, silver-soldered safety catches, and cowhide belt clip fitting.'
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
    angle: 'US-spec 0.4mm rolled-edge 304 stainless steel dog tags stamp five embossed lines with silicone silencers ($0.24+/pc), whereas 3D Zamak #3 pendant tags cast deep cut-out streetwear and club jewelry.'
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
    angle: 'Three-magnet neodymium backing bars hold heavy hotel and airline uniform name plates securely without fabric pinholes, alongside beveled solid brass plates and reusable paper-insert window frames.'
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
    angle: 'Corporate HR teams run cost-efficient 5, 10, 15, and 25-year tenure award programs by sharing one master die across progressive silver/18K gold electroplatings and swappable cubic zirconia accents.'
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
    angle: 'MedalPinSupply stamps supermarket trolley tokens within ±0.08mm lock tolerances—23.25×2.33mm €1 Euro, 23.43×2.8mm 12-sided UK £1, 26.5mm CAD Loonie, and 25.0mm AUD—starting at $0.30/pc EXW.'
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
    angle: 'European grocery chains choose among magnetic snap-out coin holders (no coin hole needed), nickel lobster clasps ($0.30–$0.72/pc), non-detaching front-pull key unlockers, and stitched PU loops.'
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
    angle: 'Our Zhongshan keychain foundry manufactures 11 custom metal formats—spanning 3D sculpted zinc alloy, dual-sided cloisonne enamel, 360° rotating spinners, nail-clipper hybrids, and pocket bottle openers.'
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
    angle: 'Stitched top-grain cowhide and microfiber PU key fobs bond recessed chrome or black-nickel emblems securely to eliminate cabin rattle noise for automotive dealers, EV brands, and closing gifts.'
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
    angle: 'Boutique hotels specify 2.0mm solid C26000 brass diamond and oval room fobs with hand-relieved antique bronze patina, deep laser-numbered suites, and heavy matching solid brass split rings.'
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
    angle: 'Urgent conferences source anodized aluminum carabiner loops and brushed 304 stainless steel laser keyrings from $0.29–$0.85/pc with automatic fixture fee waivers at 500+ pcs and 5–8 day turnarounds.'
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
    angle: 'Corporate and university menswear sets pair cloisonne hard enamel cufflinks on swivel bullet-back toggles with 55mm alligator or slide tie bars, engraved money clips, and two-piece velvet gift boxes.'
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
    angle: 'Heavyweight 4×3-inch 165g Zamak #3 western rodeo and biker club belt buckles feature reinforced rear structural ribs, 1.5–1.75-inch leather strap loops, cubic zirconia stones, and opener lips.'
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
    angle: 'Golf pro shops and charity outings use ferromagnetic stamped iron ball markers (instead of non-magnetic brass) so markers lock cleanly onto neodymium 2-prong divot forks, switchblades, and cap visor clips.'
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
    angle: 'Acid photo-etched 0.4mm solid C26000 brass museum bookmarks preserve ultra-fine hollow filigree bridges (>= 0.35mm width) free of stamping burrs, paired with Pantone silk tassels on 350gsm retail cards.'
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
    angle: 'Craft breweries and taprooms pair bend-resistant 4.2mm Zamak #3 pry openers and 2.0mm 304 stainless speed paddles with high-pull N45 neodymium 3D souvenir fridge magnets from $0.45/pc.'
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
    angle: 'Uniform and outdoor brands select 50%–100% merrowed embroidery for textured twill crests, high-density woven threads for crisp sub-2mm typography, and waterproof 3D soft PVC morale patches with Velcro backs.'
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
    angle: 'Pin back hardware determines garments retention and fabric safety—comparing standard brass butterfly clutches, color-matched PVC caps, tool-free locking mechanisms, and triple-magnet suit bars.'
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
    angle: 'Foundry-direct pre-mounting onto 350–400gsm Euro-slot backing cards, custom magnet blister headers, 38–50mm acrylic coin capsules, and velvet clamshell gift boxes raises retail shelf margins by 35%+.'
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
    angle: 'Every MedalPinSupply batch certifies virgin Zamak #3 zinc, solid brass, non-phthalate Pantone enamels, and soft PVC to US CPSIA (<90 ppm lead), California Prop 65, EU REACH SVHC, and EN 1811 nickel limits.'
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
    angle: 'Direct ordering from our Zhongshan Xiaolan foundry locks 12-hour free vector proofs, 2–3 day CNC die cutting, 7–15 business day batch finishing, and 4–7 day door-to-door DDP express air shipping.'
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
    angle: 'MedalPinSupply manufactures custom 3D Zamak #3 zinc, flush cloisonne hard enamel, recessed soft enamel, and CMYK epoxy fridge magnets from $0.48–$1.95/pc EXW, with 2D dies waived at 500+ pcs and 3D sculpted molds waived at 1,000+ pcs.'
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

function getPillarCopy(g, row1, row2, row3) {
  const isMagnet = Array.isArray(g.cols) && g.cols[0] === 'custom-metal-fridge-magnets';
  const cat = g.category;

  if (isMagnet) {
    return {
      leadLine: `Fridge magnet unit cost depends on 3D relief depth, mold waiver thresholds, and rear magnet pull hold on brushed stainless doors.`,
      pillarBullets: `<li><strong>Die-Struck Brass &amp; Hard Enamel:</strong> Crisp 0.15mm borders and stone-polished cloisonne pair cleanly with recessed N45 magnets in ${pLinkFn(row2[2])} and ${pLinkFn(row2[3])}.</li>
  <li><strong>Zamak #3 3D &amp; Kinetic Die-Casting:</strong> Mold multi-level city landmarks, rotating spinners, and stained-glass cut-outs with ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Offset CMYK + Optical Epoxy:</strong> Seal gradients and photography beneath UV-stabilized domes across ${pLinkFn(row3[0])} and ${pLinkFn(row3[1])}.</li>
  <li><strong>Rear Magnet &amp; Scratch Shielding:</strong> Embed 10×2mm N45 rare-earth disks or 1.5mm full-back rubber sheets with PET pads on ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>`,
      workflowNote: `Engineers mill 1.6mm–2.0mm pockets flush into the casting back so bonded magnets grip tightly without tipping heavy castings.`,
      failPara1: `Oversized metal fridge magnets often slide down low-ferritic brushed stainless appliances when thin glued magnets lose shear grip. Exposed sharp metal burrs also scratch luxury door coatings.`,
      failPara2: `Our Zhongshan line tests vertical slip load on brushed steel and verifies epoxy seat cure strength before packing. Every alloy lot passes XRF screening for US CPSIA and EU EN71-3 safety.`,
      failBullets: `<li><strong>Vertical Shear Hold Audit:</strong> Pull testing confirms 18N–35N magnetic grip on stainless steel across ${pLinkFn(row1[4])} and ${pLinkFn(row1[5])}.</li>
  <li><strong>Anti-Scratch Cushion Barriers:</strong> Flush-recessed magnet seats and optional EVA/PET backing pads protect appliances on ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Delta-E Enamel Precision:</strong> Syringe dispensing meters Pantone fills evenly across ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])} before 180°C kiln baking.</li>
  <li><strong>IATA Air Shielded Cartons:</strong> Galvanized iron separator sheets keep magnetic flux below 0.00525 Gauss at 2.1m for express DDP air clearance.</li>`
    };
  }

  if (cat === 'Medals & Sports Events') {
    return {
      leadLine: `Race-day unit margins hinge on shared multi-tier molds, thickness-to-weight tuning, and sewn ribbon slot tensile durability.`,
      pillarBullets: `<li><strong>2.5" to 4.5" 3D Zinc Medallions:</strong> High-pressure Zamak #3 casting shapes deep relief tracks for finisher medals such as ${pLinkFn(row2[2])} and ${pLinkFn(row2[3])}.</li>
  <li><strong>Shared Gold / Silver / Bronze Tooling:</strong> Cast multiple placement finishes from one steel cavity across ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])} to cut setup overhead.</li>
  <li><strong>Dye-Sublimated &amp; Woven Ribbons:</strong> Sew 25mm or 38mm satin neck lanyards with crisp V-angle bars on ${pLinkFn(row3[0])} and ${pLinkFn(row3[1])}.</li>
  <li><strong>Spinner Hubs &amp; Interlocking Series:</strong> Add 360° center pivots or recessed neodymium edge locks to boost participant sign-ups via ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>`,
      workflowNote: `Sharing one base 3D mold across 5K, 10K, and Half-Marathon finishes with ribbon swaps frequently lowers unit tooling cost below zero above 1,000 total pieces.`,
      failPara1: `Heavy 140g+ race medallions face delivery delays or clasp failure when cast top slots lack 2.5mm structural bridges or arrive close to event expos without V-stitch inspection.`,
      failPara2: `We load-test every jump ring and ribbon V-seam above 45N prior to bagging, scheduling express air split shipments when race deadlines tighten.`,
      failBullets: `<li><strong>Ribbon Slot &amp; Jump Ring Load:</strong> Tensile testing confirms 45N+ neck-strap strength across ${pLinkFn(row1[4])} and ${pLinkFn(row1[5])}.</li>
  <li><strong>Balanced Medal Weight Tuning:</strong> Thickness tapering keeps postage-sensitive formats light on ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Sponsor Ribbon Color Lock:</strong> Sublimation heat-transfer matches Pantone brand hues across ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>
  <li><strong>Rain-Ready Individual Sleeves:</strong> Sealed polybags keep antique plating dry in outdoor finisher chutes across 5-ply export cartons.</li>`
    };
  }

  if (cat === 'Coins & Military Insignia') {
    return {
      leadLine: `Official-grade command coins and duty badges demand crisp hydraulic coining edges, dome curvature forming, and zero-pinhole attachment hardware.`,
      pillarBullets: `<li><strong>Heavy-Gauge Solid Brass Coining:</strong> 3.5mm C26000 mint blanks strike sharp unit insignia across ${pLinkFn(row2[2])} and ${pLinkFn(row2[3])}.</li>
  <li><strong>Six CNC Diamond-Cut Rims:</strong> Mill oblique, rope, spur, wave, crosscut, or reeded edges onto ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Two-Tone Selective Masking:</strong> Combine 24K mirror gold and antique silver through hand-applied liquid resist on ${pLinkFn(row3[0])} and ${pLinkFn(row3[1])}.</li>
  <li><strong>Rotary Edge Numbering &amp; Fasteners:</strong> Index 001/500 edition serials or solder heavy safety catches and leather holsters on ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>`,
      workflowNote: `Multi-strike hydraulic presses exert up to 800 tons on 2-inch solid brass blanks so microscopic motto typography stays sharp around reeded rims.`,
      failPara1: `Cheap cast coins fail inspections when shallow surface plating peels along diamond-cut borders or thin curved police badges warp under ball-and-catch pin pressure.`,
      failPara2: `Engineers silver-solder heavy safety catches after dome pressing and seal dual-plated baths under clear baked lacquer before capsule insertion.`,
      failBullets: `<li><strong>Curved Badge Catch Strength:</strong> High-temp silver brazing secures safety pins on ${pLinkFn(row1[4])} and ${pLinkFn(row1[5])}.</li>
  <li><strong>Two-Tone Mask Line Crispness:</strong> Microscope checks verify clean resist boundaries across ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Three-Magnet Suit Grip Audit:</strong> Pull-force tests confirm fabric hold through heavy blazers on ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>
  <li><strong>Capsule &amp; Velvet Box Sizing:</strong> Precision EVA foam rings cushion 40mm–50mm coins tightly inside acrylic presentation shells.</li>`
    };
  }

  if (cat === 'Keychains & Trolley Coins') {
    return {
      leadLine: `Daily pocket hardware fails fast unless mechanical tolerances, split-ring spring tension, and abrasion-proof coatings hold up on crowded key rings.`,
      pillarBullets: `<li><strong>±0.08mm Cart Lock Tolerances:</strong> Die-struck €1 (23.25mm) and 12-sided UK £1 (23.43mm) blanks fit ${pLinkFn(row2[2])} and ${pLinkFn(row2[3])}.</li>
  <li><strong>3D Zinc, Enamel &amp; Magnetic Frames:</strong> Pair un-drilled coins with snap-out magnetic housings or spinners via ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Leather, Brass &amp; Carabiner Hybrid Fobs:</strong> Combine cowhide loops or 2.0mm antique brass hotel tags on ${pLinkFn(row3[0])} and ${pLinkFn(row3[1])}.</li>
  <li><strong>High-Volume Anodized &amp; Stainless Tags:</strong> Laser mark 304 steel or anodized aluminum fast across ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>`,
      workflowNote: `Calibrating both outer coin diameter and rim thickness within ±0.08mm prevents supermarket trolley tokens from jamming inside coin drawers.`,
      failPara1: `Everyday pocket carry exposes keychains to coins, keys, and moisture—causing soft uncoated paint to chip or weak split rings and clasps to pry open prematurely.`,
      failPara2: `Zhongshan technicians verify cart-slot insertion across European and UK test gauges and finish pocket surfaces with clear polyurethane domes or recessed enamel walls.`,
      failBullets: `<li><strong>Go/No-Go Cart Lock Check:</strong> Every trolley batch passes €1 and 12-sided £1 slot gauges across ${pLinkFn(row1[4])} and ${pLinkFn(row1[5])}.</li>
  <li><strong>Clasp &amp; Jump Ring Fatigue Test:</strong> 500-cycle spring tests verify snap-back tension on ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>UV Epoxy Lens Hardness:</strong> Optical resin shields printed artwork from key scratches on ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>
  <li><strong>Anti-Rattle Leather Bonding:</strong> Structural adhesive plus riveted eyelets secure metal crests cleanly inside stitched hides.</li>`
    };
  }

  if (cat === 'Executive, Golf & Souvenirs') {
    return {
      leadLine: `High-perceived-value executive menswear, golf pro-shop kits, and etched filigree souvenirs depend on hardware precision and cohesive gift presentation.`,
      pillarBullets: `<li><strong>Swivel Toggle &amp; Bar Menswear Hardware:</strong> Rhodium-plated brass bases anchor bullet-back cufflinks and 55mm tie bars via ${pLinkFn(row2[2])} and ${pLinkFn(row2[3])}.</li>
  <li><strong>Heavy 165g Buckles &amp; Pry Openers:</strong> Cast Zamak #3 ribs reinforce rope borders and opener lips on ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Ferromagnetic Stamped Golf Markers:</strong> Match iron ball markers to rare-earth divot tools and visor clips with ${pLinkFn(row3[0])} and ${pLinkFn(row3[1])}.</li>
  <li><strong>0.4mm Acid Photo-Etched Filigree:</strong> Chemically etch burr-free museum bookmarks and ornaments across ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>`,
      workflowNote: `Note this critical golf hardware rule: custom ball markers must stamp in ferromagnetic iron (never non-magnetic solid brass) so they snap securely onto divot tools.`,
      failPara1: `Executive and souvenir programs suffer returns when loose cufflink hinges droop, non-magnetic brass golf markers fall off hat clips, or thin brass bookmarks snag delicate book pages.`,
      failPara2: `Our foundry inspects toggle spring detent firmness, tests vertical magnetic marker retention, and electrolytically polishes photo-etched filigree edges before boxing.`,
      failBullets: `<li><strong>Magnetic Marker Attraction Check:</strong> Ferromagnetic testing confirms firm snap retention on ${pLinkFn(row1[4])} and ${pLinkFn(row1[5])}.</li>
  <li><strong>Toggle Spring &amp; Buckle Rib Load:</strong> Torque checks verify zero wobble across swivel hinges on ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Burr-Free Etched Filigree Edges:</strong> Micro-deburring smooths 0.35mm internal bridges on ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>
  <li><strong>Matched Gift Tin &amp; Velvet Insertion:</strong> Factory kitting places matched sets neatly inside custom-cut velvet trays for immediate gifting.</li>`
    };
  }

  if (cat === 'Sourcing, Packaging & Compliance') {
    return {
      leadLine: `Turnkey retail readiness and customs clearance depend on lab-certified raw alloys, proper clutch engineering, and pre-mounted packaging before DDP dispatch.`,
      pillarBullets: `<li><strong>Threaded, Woven &amp; 3D PVC Patches:</strong> Balance crisp 1.5mm woven lettering against waterproof molded rubber crests in ${pLinkFn(row2[2])} and ${pLinkFn(row2[3])}.</li>
  <li><strong>Precision Clutch &amp; Backing Selection:</strong> Match brass butterfly clasps, spring locks, or magnets across ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Foundry-Mounted Retail Cards &amp; Boxes:</strong> Assemble 350–400gsm Euro-slot cards, acrylic capsules, and velvet cases onto ${pLinkFn(row3[0])} and ${pLinkFn(row3[1])}.</li>
  <li><strong>CPSIA, Prop 65 &amp; REACH Certification:</strong> Screen incoming brass, Zamak #3, pigments, and PVC lots via ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>`,
      workflowNote: `Pre-mounting finished hardware onto printed backing cards or inside coin capsules at our Zhongshan packing floor eliminates third-party domestic kitting fees.`,
      failPara1: `Importers face customs holds or retail delisting when recycled scrap zinc spikes above 90 ppm lead, nickel baths trigger skin allergies, or heavy cartons crush in air hubs.`,
      failPara2: `Every shipment uses certified virgin metals, phthalate-free inks, double-wall 15kg master cartons, and verified HS codes (7117/8308) for predictable door-to-door DDP clearance.`,
      failBullets: `<li><strong>XRF Heavy-Metal Screening:</strong> Handheld XRF analyzers test raw ingots under 90 ppm lead on ${pLinkFn(row1[4])} and ${pLinkFn(row1[5])}.</li>
  <li><strong>Thread Density &amp; Hook-Loop Shear:</strong> Merrowed border lockstitch and Velcro peel checks verify durability across ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Shelf-Ready Backing Card Fit:</strong> Die-cut slits align pin posts cleanly onto retail cards for ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>
  <li><strong>15kg Export Carton Drop Shielding:</strong> Honeycomb dividers prevent surface scuffing across long-haul DHL/FedEx DDP air routes.</li>`
    };
  }

  // Default: Pillar 1 Materials & Manufacturing (non-magnet)
  return {
    leadLine: `Pin, medal, and coin unit economics depend on relief depth, die waiver volume breaks, and rear clasp or attachment geometry.`,
    pillarBullets: `<li><strong>Die-Struck C26000 Brass &amp; Iron:</strong> Strike razor-sharp coin rims, 0.15mm borders, and flush stone-polished cloisonne on ${pLinkFn(row2[2])} and ${pLinkFn(row2[3])}.</li>
  <li><strong>Zamak #3 Hot-Chamber 3D Casting:</strong> Inject crisp multi-level relief, inner cut-out windows, and spinner pivots across ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Photo-Etched &amp; Offset Litho Imaging:</strong> Hold thin 0.35mm filigree silhouettes or CMYK photo gradients under clear domes on ${pLinkFn(row3[0])} and ${pLinkFn(row3[1])}.</li>
  <li><strong>12 Electroplating &amp; Dye Coats:</strong> Finish pieces in 18K gold, rhodium silver, mirror black nickel, antique bronze, or matte dye across ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>`,
    workflowNote: `Selecting hydraulic die-struck stamping for crisp flat enamel or molten Zamak #3 die-casting for 3D depth locks yield quality from the first strike.`,
    failPara1: `Wholesale buyers hit avoidable enamel cross-bleeding, brittle rear post snaps, or dull recessed plating when artwork wall clearances drop below factory minimums before engraving.`,
    failPara2: `Our tooling desk enforces >= 0.15mm metal walls on pins (>= 0.35mm on sculpted coins) during free 12-hour proofs and verifies XRF lead safety on every melt.`,
    failBullets: `<li><strong>Rear Post Silver Brazing Audit:</strong> High-torque soldering secures butterfly spurs above 25N pull force on ${pLinkFn(row1[4])} and ${pLinkFn(row1[5])}.</li>
  <li><strong>Pantone Delta-E Metered Filling:</strong> Precision dispensers fill recessed cavities prior to 180°C kiln baking across ${pLinkFn(row2[4])} and ${pLinkFn(row2[5])}.</li>
  <li><strong>Electrophoretic Lacquer Sealing:</strong> Protective clear coats block oxidation across antique and mirror plating on ${pLinkFn(row3[2])} and ${pLinkFn(row3[3])}.</li>
  <li><strong>Individually Sealed Tray Packing:</strong> Separate polybags and divider inserts stop metal-on-metal rub throughout express DDP air transit.</li>`
  };
}

let pLinkFn;
function buildArticle(g, idx) {
  const isNewMagnetGuide = Array.isArray(g.cols) && g.cols[0] === 'custom-metal-fridge-magnets';
  const publishDate = isNewMagnetGuide ? '2026-11-24' : '2026-10-20';
  const updatedDate = '2026-11-24';
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

  // Ensure unique, clean H2 headings without double colons across all 43 guides
  const shortTopic = g.metaTitle.replace(/:/g, ' —').replace(/\s+Guide$/i, '').trim();

  const pLink = (p, label) => `<a href="/products/${p.slug}">${label || p.title}</a>`;
  pLinkFn = pLink;
  const cLink = (slug) => `<a href="/collections/${slug}">${COL_NAMES[slug]}</a>`;
  const colsPhrase = col3 ? `${cLink(col1)}, ${cLink(col2)}, and ${cLink(col3)}` : `${cLink(col1)} and ${cLink(col2)}`;

  const row1 = linkPool.slice(0, 6);
  const row2 = linkPool.slice(6, 12);
  const row3 = linkPool.slice(12, 18);
  const pillar = getPillarCopy(g, row1, row2, row3);

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

<p>Wholesale buyers access factory-direct pricing from <strong>$${row1[0].tier2000} to $${row1[0].tier100}/pc</strong> on custom options like ${pLink(row1[0], row1[0].title)}. Every custom production run includes complimentary 12-hour vector proofs.</p>

<p>At our Zhongshan Xiaolan metalworking foundry, production begins with 1:1 Pantone die-line layouts before steel cutting starts. Pre-production samples ship in ${row1[0].sampleTime} so procurement teams confirm weight and finish luster early.</p>

<p>When teams evaluate crafts across ${colsPhrase}, subtle shifts in alloy thickness and plating adhesion affect land-cost efficiency.</p>

<p><strong>Here is what separates reliable custom tooling from cheap shortcuts:</strong></p>

<p>${pillar.leadLine}</p>

<p>Below, we benchmark factory specifications across ${pLink(row1[1])}, ${pLink(row1[2])}, and ${pLink(row1[3])}.</p>

<figure class="article-figure">
  <img src="${fig1Img}" alt="Side-by-side custom craft comparison of ${row1[0].title} and ${row1[1].title}" width="800" height="310" loading="lazy" />
  <figcaption>Figure 1: Factory process comparison pairing ${row1[0].title} (${row1[0].material}, left) with ${row1[1].title} (${row1[1].material}, right) for ${shortTopic}.</figcaption>
</figure>

<h2 id="technical-specification-matrix-${idx + 1}">2. ${shortTopic} — Unit Cost, Material &amp; Tooling Comparison Matrix</h2>

<p>Opaque quotes often conceal mold amortization and extra Pantone fees until the final invoice. The engineering matrix below benchmarks exact alloys, weights, MOQs, and wholesale pricing tiers for ${shortTopic}.</p>

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

<p><strong>How can purchasing teams unlock zero mold cost right away?</strong></p>

<p>Pairing color-swapped editions on one master die—or crossing 500+ pcs on 2D brass—automatically reduces mold setup to $0.00. Styles like ${pLink(row2[0])} and ${pLink(row2[1])} also retain free 3-year die storage.</p>

<h2 id="metallurgy-plating-workflow-${idx + 1}">3. ${shortTopic} — Substrate Metallurgy, Electroplating &amp; Workflow</h2>

<p><strong>The engineering principle is straightforward:</strong> substrate ductility governs detail sharpness. Flat two-dimensional crests stamp crisply in solid brass or iron, whereas deep sculpted forms flow cleanly in hot-chamber Zamak #3 zinc.</p>

<p>Every batch passes six quality checkpoints between blanking and export boxing. Automated optical screening isolates surface pitting or soldering voids before attachment assembly begins.</p>

<h3>Core Fabrication Stages &amp; Material Pairing</h3>

<ul>
  ${pillar.pillarBullets}
</ul>

<p><strong>Why match specific crafts instead of defaulting to one base alloy?</strong></p>

<p>${pillar.workflowNote} Inspecting physical strikes across textures ensures balanced pocket heft and clean visual borders before full production stamping starts.</p>

<figure class="article-figure">
  <img src="${fig2Img}" alt="Three-panel custom manufacturing comparison featuring ${row2[0].title}, ${row2[1].title}, and ${row2[2].title}" width="1170" height="305" loading="lazy" />
  <figcaption>Figure 2: Multi-craft hardware comparison spanning ${row2[0].title} (left), ${row2[1].title} (center), and ${row2[2].title} (right) across plating and attachment configurations.</figcaption>
</figure>

<h2 id="procurement-timeline-packaging-${idx + 1}">4. Tooling Economics, Retail Packaging &amp; Pre-Shipment Milestones (${shortTopic})</h2>

<p>Experienced buyers look beyond ex-works unit pricing to cut downstream kitting labor and boost retail margins. Pre-mounted factory packaging arrives shelf-ready straight from Guangdong.</p>

<p>Mounting finished pieces on ${pLink(getSkuObj('MPS-149'))} prepares retail hooks cleanly before air courier dispatch.</p>

<p>Commemorative editions paired with ${pLink(getSkuObj('MPS-148'))}, ${pLink(getSkuObj('MPS-147'))}, or ${pLink(getSkuObj('MPS-150'))} prevent transit scuffing.</p>

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

<p><strong>What happens to your custom steel die after the first production batch?</strong></p>

<p>Every paid custom stamping die or 3D brass master stays archived inside our Zhongshan tool vault for three years at zero fee. Future restocks skip engraving completely and enter production within 24 hours.</p>

<h2 id="field-failure-prevention-${idx + 1}">5. Field Failure Prevention &amp; Pre-Shipment Inspection Protocol (${shortTopic})</h2>

<p>${pillar.failPara1}</p>

<p>${pillar.failPara2}</p>

<h3>Mandatory Foundry QC Checkpoints Before Bulk Release</h3>

<ul>
  ${pillar.failBullets}
</ul>

<p><strong>Ready to finalize your custom brief or cross-check sibling tolerances?</strong></p>

<p>Review matched craft specs across ${colsPhrase}, or read the related engineering field guides below before approving tooling:</p>

<ul class="editorial-guide-links">
  <li><a href="/insights/${sib1.slug}"><span class="guide-link-text">${sib1.title}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="/insights/${sib2.slug}"><span class="guide-link-text">${sib2.title}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="/insights/${sib3.slug}"><span class="guide-link-text">${sib3.title}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
</ul>

<div class="sourcing-cta-box">
  <h3>Request Your Free 12-Hour Artwork Proof &amp; Factory Quote (${shortTopic})</h3>
  <p>Send your artwork and target quantity to our Zhongshan desk. Compare ${pLink(row1[0], row1[0].title)}, ${pLink(row1[1], row1[1].title)}, and ${pLink(row1[2], row1[2].title)} with mold waivers and DDP estimates.</p>
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
